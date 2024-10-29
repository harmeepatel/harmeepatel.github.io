console.log(window.btoa("Can't take it when you die, but you can't live without it. ~J.Cole"))

// document elements
const nav = document.getElementById("nav")

// remove hover underline in nav
const resizeOffset = 768
const navUl = nav.lastChild.lastChild
const navA = navUl.getElementsByTagName("a")
const hoverUnderline = Array.from(navUl.getElementsByTagName('span'))

window.addEventListener("load", () => {
    const pageName = window.location.pathname.split('/')
    const navAArr = Array.from(navA)
    const bold = "hover"
    console.log(navAArr)
    switch (pageName[pageName.length - 1].split('.')[0]) {
        case "index":
            navAArr[0].classList.add(bold);
            break;
        case "blog":
            navAArr[1].classList.add(bold);
            console.log("blog");
            break;
        case "photos":
            navAArr[2].classList.add(bold);
            console.log("photos");
            break;
    }

    if (window.innerWidth < resizeOffset) {
        hoverUnderline.forEach((e) => e.remove())
    }
});
window.addEventListener("resize", () => {
    if (window.innerWidth < resizeOffset) {
        hoverUnderline.forEach((e) => e.remove())
    }
    if (window.innerWidth > resizeOffset) {
        Array.from(navA).forEach((e, i) => e.appendChild(hoverUnderline[i]))
    }
});


// on scroll add nav shadow, blur and ring
const scrollOffset = 8
const classes = ["ring-1", "dark:ring-white/60", "ring-black/50", "dark:shadow-[0_0_50px_-12px_rgba(0,0,0,1)]", "shadow-[0_0_50px_-12px_rgba(0,0,0,0.6)]", "backdrop-blur", "duration-200"]
window.addEventListener("load", () => {
    if (window.scrollY > scrollOffset) {
        for (let i = 0; i < classes.length; i++) {
            nav.classList.add(classes[i]);
        }
    }
});

window.addEventListener("scroll", () => {
    if (window.scrollY > scrollOffset) {
        for (let i = 0; i < classes.length; i++) {
            nav.classList.add(classes[i]);
        }
    }
    if (window.scrollY < scrollOffset) {
        for (let i = 0; i < classes.length; i++) {
            nav.classList.remove(classes[i]);
        }
    }
})
