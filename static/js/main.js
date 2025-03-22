"use strict";
(function () {
    console.log(window.btoa("Can't take it when you die, but you can't live without it. ~J.Cole"));
    // -- remove hover underline in nav --
    const nav = document.getElementById("nav");
    const resizeOffset = 768;
    const navLi = Array.from(nav.getElementsByTagName("li"));
    const navA = navLi.map((elem) => elem.firstChild);
    const underlineSpan = navLi.map((elem) => {
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
                a.appendChild(underlineSpan[i]);
            });
        }
    });
    // -- on scroll add nav shadow, blur and ring --
    const scrollOffset = 8;
    const navScrollClass = [
        "ring-1",
    ];
    window.addEventListener("load", () => {
        if (window.scrollY > scrollOffset) {
            nav.classList.add(...navScrollClass);
        }
    });
    window.addEventListener("scroll", () => {
        if (window.scrollY > scrollOffset) {
            nav.classList.add(...navScrollClass);
        }
        else {
            nav.classList.remove(...navScrollClass);
        }
    });
})();