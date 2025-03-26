"use strict";
// -- utils --
function addClasses(elem, classes) {
    for (const c of classes) {
        elem.classList.add(c);
    }
}
function removeClasses(elem, classes) {
    for (const c of classes) {
        elem.classList.remove(c);
    }
}
function addUpscaleSuffix(name) {
    return name.replace(".webp", "@2x.webp");
}
function stripUpscaleSuffix(name) {
    return name.replace("@2x.webp", ".webp");
}
// open modal on clicking on an image if the screen is bigger than 1024px
const modal = document.getElementById("image_modal");
const modalImg = modal.querySelector("#modal_image");
const mdScreen = 768;
let currImgId = -1;
function openImageModal(e) {
    if (window.innerWidth >= mdScreen) {
        currImgId = parseInt(e.id);
        modalImg.src = addUpscaleSuffix(e.src);
        modal.showModal();
    }
}
function closeImageModal(e) {
    const parent = e.parentNode.parentNode;
    const img = parent.querySelector("#modal_image");
    img.src = "";
}
function imageSorter(a, b) {
    const aNum = parseInt(a.id);
    const bNum = parseInt(b.id);
    if (aNum < bNum) {
        return -1;
    }
    else if (aNum > bNum) {
        return 1;
    }
    return 0;
}
let imgCollection = document.querySelectorAll("figure>img");
let imgArr = Array.from(imgCollection).sort(imageSorter);
let prevImg = imgArr[0];
modal.addEventListener("keydown", (e) => {
    imgArr.forEach((elem) => {
        let img = elem;
        if (img.src === stripUpscaleSuffix(modalImg.src)) {
            currImgId = parseInt(img.id);
        }
    });
    switch (e.code) {
        case "ArrowLeft":
        case "KeyH":
            prevImg = imgArr[currImgId - 1];
            break;
        case "ArrowRight":
        case "KeyL":
            prevImg = imgArr[currImgId + 1];
            break;
        default:
            break;
    }
    console.assert(0 <= currImgId || currImgId < imgArr.length, "edge reached");
    if (prevImg != undefined) {
        modalImg.src = addUpscaleSuffix(prevImg.src);
    }
});
// -- modal on touch screens --
const MOVE_THRESHOLD = 50;
let initialX = 0;
let moveX = 0;
let isDeleteButtonOpen = false;
modal.addEventListener("touchstart", e => {
    initialX = e.touches[0].pageX;
});
modal.addEventListener("touchmove", e => {
    let currentX = e.touches[0].pageX;
    moveX = currentX - initialX;
});
modal.addEventListener("touchend", () => {
    imgArr.forEach((elem) => {
        let img = elem;
        if (img.src === stripUpscaleSuffix(modalImg.src)) {
            currImgId = parseInt(img.id);
        }
    });
    if (Math.abs(moveX) > MOVE_THRESHOLD && modal.open) {
        if (moveX < 0) { // right
            prevImg = imgArr[currImgId + 1];
        }
        else { // left
            prevImg = imgArr[currImgId - 1];
        }
    }
    console.assert(0 <= currImgId || currImgId < imgArr.length, "edge reached");
    if (prevImg != undefined) {
        modalImg.src = addUpscaleSuffix(prevImg.src);
    }
});
const photos = document.getElementById("image-grid");
photos.addEventListener("scroll", () => {
    const nav = document.getElementById("nav");
    const scrollOffset = 8;
    const navScrollClasses = ["ring-1"];
    if (photos.scrollTop > scrollOffset) {
        nav.classList.add(...navScrollClasses);
    }
    if (photos.scrollTop < scrollOffset) {
        for (let i = 0; i < navScrollClasses.length; i++) {
            nav.classList.remove(...navScrollClasses);
        }
    }
});
window.addEventListener("resize", () => {
    if (window.innerWidth < mdScreen) {
        // close open modal
        if (modal.open) {
            modal.close();
        }
    }
});
// mobile scroll indication
const arrowLeft = document.getElementById("arrow-left");
const arrowRight = document.getElementById("arrow-right");
const arc = arrowRight.classList;
const alc = arrowLeft.classList;
photos.addEventListener("scroll", () => {
    const isBegining = photos.scrollLeft == 0;
    const isEnd = photos.scrollLeft >= photos.scrollWidth - mdScreen;
    if (isBegining) {
        console.log("start");
        // r
        arc.add("hidden");
        // l
        alc.remove("hidden");
        alc.add("animate-bounce-left");
    }
    else if (isEnd) {
        console.log("end");
        // r
        arc.remove("hidden");
        arc.add("animate-bounce-right");
        // l
        alc.add("hidden");
        alc.remove("animate-bounce-left");
    }
    else {
        console.log("middle");
        // r
        arc.remove("hidden");
        arc.remove("animate-bounce-right");
        // l
        alc.remove("hidden");
        alc.remove("animate-bounce-left");
    }
});
