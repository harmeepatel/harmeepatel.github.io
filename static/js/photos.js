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
function openImageModal(e) {
    const closeDialogThreshold = 768;
    if (window.innerWidth >= closeDialogThreshold) {
        modalImg.src = e.src;
        modal.showModal();
    }
    if (!modal.open) {
        modalImg.src = "";
    }
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
modal.addEventListener("keydown", (e) => {
    let prevImg = imgArr[0];
    let currImgId = -1;
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
    if (!modal.open) {
        modalImg.src = "";
    }
});
// --- main ---
(function () {
    // setting image order
    const imgGrid = document.getElementById("image-grid");
    const imgGridSrc = Array.from(imgGrid.getElementsByTagName("img"), (i) => i.src);
    const imgGridOrd = Array.from(imgGrid.getElementsByTagName("img"), (i) => i.id[0]);
    const imgSrcArr = new Array(imgGridOrd.length);
    for (let i = 0; i < imgGridOrd.length; i++) {
        const ord = imgGridOrd[i][0];
        imgSrcArr[parseInt(ord)] = imgGridSrc[i];
    }
    // replacing main sections for small and greater screen sizes
    const photosMd = document.querySelector("#photos-md");
    const photosSm = document.querySelector("#photos-sm");
    const parentNd = photosMd.parentNode || photosSm.parentNode;
    const mdScreen = 768;
    function imageView() {
        // const classes = ["mx-auto", "my-0", "mt-4"]
        if (photosSm === null || photosMd === null || parentNd === null) {
            throw new Error("photosSm, photosMd, or parent node to photos-md in main not found");
        }
        if (window.innerWidth < mdScreen) {
            parentNd.replaceChild(photosSm, photosMd);
        }
        if (window.innerWidth >= mdScreen) {
            parentNd.replaceChild(photosMd, photosSm);
        }
    }
    // setting padding and aspect-ratio based on image orientation
    const imgWraper = document.querySelectorAll(".img-wraper");
    window.addEventListener("load", () => {
        // change photo viewing mode on small screen
        imageView();
        imgWraper[0].classList.add("mt-28");
        // different margin for 5x4 images
        imgWraper.forEach((elem) => {
            const image = elem.lastChild;
            let width = image.width;
            let height = image.height;
            if (width > height) {
                elem.classList.add("aspect-[5/4]");
            }
            else {
                elem.classList.add("aspect-[4/5]");
            }
        });
    });
    // --- adding nav styles on scroll ---
    const nav = document.getElementById("nav");
    const scrollOffset = 8;
    const classes = ["ring-1", "dark:ring-white/80", "ring-black/60", "dark:shadow-[0_0_50px_-12px_rgba(0,0,0,1)]", "shadow-[0_0_50px_-12px_rgba(0,0,0,0.6)]", "backdrop-blur", "duration-200"];
    photosSm.addEventListener("scroll", () => {
        if (photosSm.scrollTop > scrollOffset) {
            for (let i = 0; i < classes.length; i++) {
                nav.classList.add(classes[i]);
            }
        }
        if (photosSm.scrollTop < scrollOffset) {
            for (let i = 0; i < classes.length; i++) {
                nav.classList.remove(classes[i]);
            }
        }
    });
    // --- modal ---
    const closeDialogThreshold = 768;
    const modal = document.getElementById("image_modal");
    window.addEventListener("resize", () => {
        // change photo viewing mode on small screen
        imageView();
        // remove modal if screen size less than 768px
        if (modal.open && window.innerWidth < closeDialogThreshold) {
            modal.close();
        }
    });
})();
