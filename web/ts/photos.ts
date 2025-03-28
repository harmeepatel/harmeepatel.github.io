// -- utils --
function addClasses(elem: HTMLElement, classes: string[]) {
    for (const c of classes) {
        elem.classList.add(c)
    }
}

function removeClasses(elem: HTMLElement, classes: string[]) {
    for (const c of classes) {
        elem.classList.remove(c)
    }
}

function addUpscaleSuffix(name: string): string {
    if (name.includes("@2x")) {
        return name
    } else {
        return name.replace(".webp", "@2x.webp")
    }
}
function stripUpscaleSuffix(name: string): string {
    return name.replace("@2x.webp", ".webp")
}

function isImgWide(img: HTMLImageElement): boolean {
    return img.naturalWidth > img.naturalHeight
}

// open modal on clicking on an image if the screen is bigger than 1024px
const modal = document.getElementById("image-modal")! as HTMLDialogElement
const modalImg = modal.querySelector("#modal-image") as HTMLImageElement
const modalTitle = modal.querySelector("#modal-title") as HTMLElement
const mdScreen = 768

let currImgId = -1;
function openImageModal(e: HTMLImageElement) {
    if (window.innerWidth >= mdScreen) {
        modalImg.src = addUpscaleSuffix(e.src);
        modalTitle.innerHTML = e.dataset.title!;
        modal.showModal();
    }
}
function closeImageModal(e: HTMLButtonElement) {
    const parent = e.parentNode!.parentNode
    const img = parent!.querySelector("#modal-image") as HTMLImageElement
    img.src = ""
}

function imageSorter(a: Element, b: Element) {
    const aNum = parseInt(a.id)
    const bNum = parseInt(b.id)
    if (aNum < bNum) {
        return -1;
    } else if (aNum > bNum) {
        return 1;
    }
    return 0;
}

type ImageInfo = {
    name: string
    width: number
    height: number
}
let imgCollection = document.querySelectorAll("figure>img")!
let imgArr = Array.from(imgCollection).sort(imageSorter) as HTMLImageElement[]
let prevImg = imgArr[0] as HTMLImageElement;


const photos = document.getElementById("image-grid")!

// double img res on mobile
if (window.innerWidth < mdScreen) {
    const imgs = photos.querySelectorAll("img");
    for (let i = 0; i < imgs.length; i++) {
        const img = imgs[i];
        if (img.src.includes("@2x")) {
            continue;
        }
        img.src = addUpscaleSuffix(img.src)
    }
}

// -- EVENT LISTENERS --

modal.addEventListener("keydown", (e) => {
    imgArr.forEach((elem) => {
        let img = elem as HTMLImageElement
        if (stripUpscaleSuffix(img.src) === stripUpscaleSuffix(modalImg.src)) {
            currImgId = parseInt(img.id)
        }
    })

    switch (e.code) {
        case "ArrowLeft":
        case "KeyH":
            prevImg = imgArr[currImgId - 1]
            break;
        case "ArrowRight":
        case "KeyL":
            prevImg = imgArr[currImgId + 1]
            break;
        default:
            break;
    }

    console.assert(0 <= currImgId || currImgId < imgArr.length, "edge reached")

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
}, {
    passive: true,
});

modal.addEventListener("touchmove", e => {
    let currentX = e.touches[0].pageX;
    moveX = currentX - initialX;
}, {
    passive: true,
});

modal.addEventListener("touchend", () => {
    imgArr.forEach((elem) => {
        let img = elem as HTMLImageElement
        if (img.src === stripUpscaleSuffix(modalImg.src)) {
            currImgId = parseInt(img.id)
        }
    })

    if (Math.abs(moveX) > MOVE_THRESHOLD && modal.open) {
        if (moveX < 0) { // right
            prevImg = imgArr[currImgId + 1]
        } else { // left
            prevImg = imgArr[currImgId - 1]
        }
    }

    console.assert(0 <= currImgId || currImgId < imgArr.length, "edge reached")

    if (prevImg != undefined) {
        modalImg.src = addUpscaleSuffix(prevImg.src);
    }

});

photos.addEventListener("scroll", () => {
    const nav: HTMLElement = document.getElementById("nav")!
    const scrollOffset = 8
    const navScrollClasses = ["ring-1"]
    if (photos.scrollTop > scrollOffset) {
        nav.classList.add(...navScrollClasses);
    }
    if (photos.scrollTop < scrollOffset) {
        for (let i = 0; i < navScrollClasses.length; i++) {
            nav.classList.remove(...navScrollClasses);
        }
    }
})

window.addEventListener("load", () => {
    const figures = photos.querySelectorAll("figure")
    for (let i = 0; i < figures.length; i++) {
        const figure = figures[i];
        const img = figure.querySelector("img")!;
        if (Math.random() < 0.25) {
            if (isImgWide(img)) {
                figure.classList.add("md:row-span-2", "md:col-span-3")
            } else {
                figure.classList.add("md:row-span-2", "md:col-span-2")
            }
            img.src = addUpscaleSuffix(img.src)
        }
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth < mdScreen) {
        // close open modal
        if (modal.open) {
            modal.close()
        }
    }
})

// mobile scroll indication
const arrowLeft = document.getElementById("arrow-left")!
const arrowRight = document.getElementById("arrow-right")!
const arc = arrowRight.classList;
const alc = arrowLeft.classList;
photos.addEventListener("scroll", () => {
    const isBegining = photos.scrollLeft == 0
    const isEnd = photos.scrollLeft >= photos.scrollWidth - mdScreen

    if (isBegining) {
        // r
        arc.add("hidden");
        // l
        alc.remove("hidden");
        alc.add("animate-bounce-left");
    } else if (isEnd) {
        // r
        arc.remove("hidden");
        arc.add("animate-bounce-right");
        // l
        alc.add("hidden");
        alc.remove("animate-bounce-left");
    } else {
        // r
        arc.remove("hidden");
        arc.remove("animate-bounce-right");
        // l
        alc.remove("hidden");
        alc.remove("animate-bounce-left");
    }
})
