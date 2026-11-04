import * as THREE from 'three';

// 1. Scene, Camera, Renderer Setup
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
camera.position.z = 1;

const canvas = document.querySelector('#webgl-canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 2. Create Dynamic Text Texture using 2D Canvas
const canvas2D = document.createElement('canvas');
canvas2D.width = 1024;
canvas2D.height = 1024;
const ctx = canvas2D.getContext('2d');

function drawTextTexture() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas2D.width, canvas2D.height);

    // Subtitle text
    ctx.fillStyle = '#888888';
    ctx.font = '24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("Another day goes by that I can't get you out of my", canvas2D.width / 2, 320);

    // Main Header Text
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 160px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("head", canvas2D.width / 2, 450);
}
drawTextTexture();

const textTexture = new THREE.CanvasTexture(canvas2D);
textTexture.minFilter = THREE.LinearFilter;
textTexture.magFilter = THREE.LinearFilter;

// 3. Static Liquid Drip + Grain Shader Code
const fragmentShaderCode = `
uniform sampler2D uTexture;
varying vec2 vUv;

// Pseudo-random function for static noise & film grain
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// Simplex-style noise for organic liquid columns
vec2 random2(vec2 st) {
    st = vec2(dot(st, vec2(127.1, 311.7)), dot(st, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(st) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(dot(random2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                   dot(random2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
               mix(dot(random2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                   dot(random2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
    vec2 uv = vUv;

    // Invert Y so melting flows downwards from the text
    float dripZone = 1.0 - uv.y; 

    // Static multi-frequency noise (no time variable)
    float n1 = noise(vec2(uv.x * 4.0, uv.y * 2.0));
    float n2 = noise(vec2(uv.x * 12.0, uv.y * 6.0));
    
    // Melt distortion weighted heavily downwards
    float meltDistortion = (n1 * 0.7 + n2 * 0.3) * pow(dripZone, 2.0) * 0.6;
    vec2 distortedUV = vec2(uv.x + meltDistortion * 0.2, uv.y + meltDistortion);

    // Chromatic Aberration channel splitting along the drip
    float split = 0.025 * dripZone;
    float r = texture2D(uTexture, distortedUV + vec2(0.0, split * 1.5)).r;
    float g = texture2D(uTexture, distortedUV).g;
    float b = texture2D(uTexture, distortedUV - vec2(0.0, split * 1.5)).b;

    // Y2K Thermal / Spectral Color Grading
    float intensity = (r + g + b) / 3.0;
    vec3 col = vec3(0.02, 0.02, 0.03); // Deep black background

    if (intensity > 0.05 || dripZone < 0.8) {
        vec3 thermal = mix(
            vec3(0.1, 0.4, 0.8), // Cyan / Deep Blue
            vec3(0.9, 0.6, 0.2), // Fiery Orange
            clamp(intensity + dripZone * 0.4, 0.0, 1.0)
        );
        col = mix(col, thermal, clamp(intensity * 2.5 + dripZone * 0.5, 0.0, 1.0));
        col += vec3(smoothstep(0.5, 0.9, intensity)); // Bright white cores
    }

    // Add Film Grain Texture
    float grain = (random(uv * 500.0) - 0.5) * 0.12;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
}
`;

const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
        uTexture: { value: textTexture }
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: fragmentShaderCode
});

const planeGeometry = new THREE.PlaneGeometry(2, 2);
const planeMesh = new THREE.Mesh(planeGeometry, shaderMaterial);
scene.add(planeMesh);

// Render once statically (or keep rendering loop if you prefer smooth window resizing)
renderer.render(scene, camera);

// Handle Window Resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
});
