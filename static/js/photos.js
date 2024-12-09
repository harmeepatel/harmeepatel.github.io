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
// -- utils -- 
// open modal on clicking on an image if the screen is bigger than 1024px
const modal = document.getElementById("image_modal");
const modalImg = modal.querySelector("#modal_image");
const closeDialogThreshold = 768;
let currImgId = -1;
function openImageModal(e) {
    if (window.innerWidth >= closeDialogThreshold) {
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
let imgCollection = document.getElementsByClassName("row");
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
            prevImg = imgArr[currImgId - 1];
            break;
        case "ArrowRight":
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
// -- touch modal --
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
const lgMainClasses = "h-vh md:mx-14 3xl:mx-0 mt-6 md:mt-8 md:block";
const smMainClasses = "h-[100dvh] absolute top-0 flex flex-col items-center overflow-x-none overflow-y-scroll snap-y no-scrollbar";
const photos = document.getElementById("photos");
function mainPhotosClasses() {
    if (window.innerWidth < closeDialogThreshold) {
        photos.classList.value = smMainClasses;
    }
    else {
        photos.classList.value = lgMainClasses;
    }
}
window.addEventListener("resize", () => {
    // remove modal if screen size less than 768px
    if (window.innerWidth < closeDialogThreshold) {
        if (modal.open) {
            modal.close();
        }
    }
    mainPhotosClasses();
});
window.addEventListener("load", () => {
    mainPhotosClasses();
});
photos.addEventListener("scroll", () => {
    const nav = document.getElementById("nav");
    const scrollOffset = 8;
    const navScrollClasses = ["ring-1", "dark:ring-white/80", "ring-black/60", "dark:shadow-[0_0_50px_-12px_rgba(0,0,0,1)]", "shadow-[0_0_50px_-12px_rgba(0,0,0,0.6)]", "backdrop-blur", "duration-200"];
    if (photos.scrollTop > scrollOffset) {
        for (let i = 0; i < navScrollClasses.length; i++) {
            nav.classList.add(navScrollClasses[i]);
        }
    }
    if (photos.scrollTop < scrollOffset) {
        for (let i = 0; i < navScrollClasses.length; i++) {
            nav.classList.remove(navScrollClasses[i]);
        }
    }
});
