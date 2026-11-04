uniform float uTime;
uniform sampler2D uTexture;
varying vec2 vUv;

// Classic Perlin/Simplex-style pseudo-noise for organic liquid drips
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

    // Drips get heavier toward the bottom of the screen (as uv.y decreases)
    float meltFactor = smoothstep(0.7, 0.0, uv.y); 

    // Combine noise waves to create vertical fluid drips
    float n = noise(vec2(uv.x * 6.0, uv.y * 3.0 - uTime * 0.8));
    float distortion = n * 0.15 * meltFactor;
    
    // Apply downward stretch/distortion
    uv.y += distortion;

    // Chromatic Aberration (Splitting RGB channels along the melt axis)
    float aberration = 0.008 * meltFactor;
    float r = texture2D(uTexture, uv + vec2(0.0, aberration)).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - vec2(0.0, aberration)).b;

    vec4 color = vec4(r, g, b, 1.0);

    // Y2K Thermal/Iridescent Glow mapping on bright areas
    float brightness = (r + g + b) / 3.0;
    if (brightness > 0.2) {
        vec3 icyBlue = vec3(0.1, 0.6, 1.0);
        vec3 fieryOrange = vec3(1.0, 0.4, 0.1);
        vec3 glowColor = mix(icyBlue, fieryOrange, brightness + meltFactor * 0.3);
        color.rgb = mix(color.rgb, glowColor, brightness * meltFactor * 1.8);
    }

    gl_FragColor = color;
}
