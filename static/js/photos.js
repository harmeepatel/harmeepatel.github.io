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
function upscaleImage(name) {
    return name.replace(".webp", "@2x.webp");
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
        modalImg.src = e.src;
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
imgArr.map((i) => {
    i.src = upscaleImage(i.src);
});
let prevImg = imgArr[0];
modal.addEventListener("keydown", (e) => {
    imgArr.forEach((elem) => {
        let img = elem;
        if (img.src === modalImg.src) {
            currImgId = parseInt(img.id);
        }
    });
    if (e.code === "ArrowLeft") {
        prevImg = imgArr[currImgId - 1];
    }
    if (e.code === "ArrowRight") {
        prevImg = imgArr[currImgId + 1];
    }
    if (currImgId < 0) {
        console.log("left edge reached");
    }
    if (currImgId >= imgArr.length) {
        console.log("right edge reached");
    }
    if (prevImg != undefined) {
        modalImg.src = prevImg.src;
    }
    if (!modal.open) {
        modalImg.src = "";
    }
});
// -- modal --
// "h-[100dvh] absolute top-0 flex flex-col items-center overflow-x-none overflow-y-scroll snap-y touch-pan-y no-scrollbar"
window.addEventListener("resize", () => {
    // remove modal if screen size less than 768px
    // const photosMain = document.getElementById("photos")
    if (window.innerWidth < closeDialogThreshold) {
        if (modal.open) {
            modal.close();
        }
    }
});
