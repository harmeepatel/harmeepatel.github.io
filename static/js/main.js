"use strict";
(function () {
    console.log(window.btoa("Can't take it when you die, but you can't live without it. ~J.Cole"));
    // document elements
    const nav = document.getElementById("nav");
    // --- remove hover underline in nav ---
    const resizeOffset = 768;
    const navLi = Array.from(nav.getElementsByTagName("li"));
    const navA = navLi.map((elem) => elem.firstChild);
    const underlineSpan = navLi.map((elem) => {
        if (elem.lastChild == null) {
            throw new Error("nav>ul>li>a not found");
        }
        if (elem.lastChild.lastChild == null) {
            throw new Error("nav>ul>li>a>span not found");
        }
        return elem.lastChild.lastChild;
    });
    window.addEventListener("load", () => {
        if (window.innerWidth < resizeOffset) {
            underlineSpan.forEach((span) => span.remove());
        }
    });
    window.addEventListener("resize", () => {
        if (window.innerWidth < resizeOffset) {
            underlineSpan.forEach((span) => span.remove());
        }
        if (window.innerWidth > resizeOffset) {
            navA.forEach((a, i) => {
                if (a == null) {
                    throw new Error("nav>ul>li>a not found");
                }
                a.appendChild(underlineSpan[i]);
            });
        }
    });
    // --- on scroll add nav shadow, blur and ring ---
    const scrollOffset = 8;
    const classes = ["ring-1", "dark:ring-white/80", "ring-black/60", "dark:shadow-[0_0_50px_-12px_rgba(0,0,0,1)]", "shadow-[0_0_50px_-12px_rgba(0,0,0,0.6)]", "backdrop-blur", "duration-200"];
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
    });
})();
