console.log(window.btoa("Can't take it when you die, but you can't live without it. ~J.Cole"))

// on scroll nav shadow, blur and ring
const offset = 16
const classes = ["ring-1", "dark:ring-white/60", "ring-black/50", "dark:shadow-[0_0_50px_-12px_rgba(0,0,0,1)]", "shadow-[0_0_50px_-12px_rgba(0,0,0,0.6)]", "backdrop-blur", "duration-200"]
window.addEventListener("load", () => {
    if (window.scrollY > offset) {
        for (let i = 0; i < classes.length; i++) {
            nav.classList.add(classes[i]);
        }
    }
});
window.onscroll = () => {
    const nav = document.getElementById("nav")

    if (window.scrollY > offset) {
        for (let i = 0; i < classes.length; i++) {
            nav.classList.add(classes[i]);
        }
    }
    if (window.scrollY < offset) {
        for (let i = 0; i < classes.length; i++) {
            nav.classList.remove(classes[i]);
        }
    }
}
