"use strict";
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
// open modal on clicking on an image if the screen is bigger than 1024px
const modal = document.getElementById("image_modal");
const modalImg = modal.querySelector("#modal_image");
const closeDialogThreshold = 768;
function openImageModal(e) {
    if (window.innerWidth >= closeDialogThreshold) {
        modalImg.src = e.src.replace(".webp", "@2x.webp");
        modal.showModal();
    }
    if (!modal.open) {
        modalImg.src = "";
    }
}
function closeImageModal(e) {
    var _a;
    const parent = (_a = e.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode;
    console.log(parent);
}
function imageSorter(a, b) {
    const aNum = parseInt(a.id[0]);
    const bNum = parseInt(b.id[0]);
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
let currImgId = -1;
modal.addEventListener("keydown", (e) => {
    imgArr.forEach((elem) => {
        let img = elem;
        if (img.src === modalImg.src) {
            currImgId = parseInt(img.id[0]);
        }
    });
    if (e.code === "ArrowLeft") {
        prevImg = imgArr[currImgId - 1];
    }
    if (e.code === "ArrowRight") {
        prevImg = imgArr[currImgId + 1];
    }
    if (currImgId < 0 || currImgId > imgArr.length - 1) {
        console.log("reached an edge");
    }
    if (prevImg != undefined) {
        modalImg.src = prevImg.src;
    }
    console.log(currImgId);
    console.log("---");
    console.log(prevImg.id);
    console.log(" ");
    if (!modal.open) {
        modalImg.src = "";
    }
});
// --- modal ---
// "h-[100dvh] absolute top-0 flex flex-col items-center overflow-x-none overflow-y-scroll snap-y touch-pan-y no-scrollbar"
window.addEventListener("resize", () => {
    // remove modal if screen size less than 768px
    const photosMain = document.getElementById("photos");
    if (window.innerWidth < closeDialogThreshold) {
        if (modal.open) {
            modal.close();
        }
    }
});
