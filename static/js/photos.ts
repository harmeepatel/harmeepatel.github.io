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

function upscaleImage(name: string): string {
    return name.replace(".webp", "@2x.webp")
}
// -- utils -- 

// open modal on clicking on an image if the screen is bigger than 1024px
const modal = document.getElementById("image_modal")! as HTMLDialogElement
const modalImg = modal.querySelector("#modal_image") as HTMLImageElement
const closeDialogThreshold = 768

let currImgId = -1;
function openImageModal(e: HTMLImageElement) {
    if (window.innerWidth >= closeDialogThreshold) {
        currImgId = parseInt(e.id)
        modalImg.src = e.src
        modal.showModal()
    }
}
function closeImageModal(e: HTMLButtonElement) {
    const parent = e.parentNode!.parentNode
    const img = parent!.querySelector("#modal_image") as HTMLImageElement
    img.src = ""
}
function closeImageModal(e: HTMLButtonElement) {
    const parent = e.parentNode?.parentNode
    console.log(parent)
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
let imgCollection = document.getElementsByClassName("row")
let imgArr = Array.from(imgCollection).sort(imageSorter) as HTMLImageElement[]
imgArr.map((i) => {
    i.src = upscaleImage(i.src)
})
let prevImg = imgArr[0] as HTMLImageElement;

modal.addEventListener("keydown", (e) => {

    imgArr.forEach((elem) => {
        let img = elem as HTMLImageElement
        if (img.src === modalImg.src) {
            currImgId = parseInt(img.id)
            console.log(`currImgId: ${currImgId}`)
        }
    })

    if (e.code === "ArrowLeft") {
        prevImg = imgArr[currImgId - 1]
    }
    if (e.code === "ArrowRight") {
        prevImg = imgArr[currImgId + 1]
    }

    if (currImgId < 0) {
        console.log("left edge reached")
    }
    if (currImgId >= imgArr.length) {
        console.log("right edge reached")
    }

    if (prevImg != undefined) {
        modalImg.src = prevImg.src
    }

    console.log(currImgId)
    console.log("---")
    console.log(prevImg.id)
    console.log(" ")

    if (!modal.open) {
        modalImg.src = ""
    }
});

// -- modal --
// "h-[100dvh] absolute top-0 flex flex-col items-center overflow-x-none overflow-y-scroll snap-y touch-pan-y no-scrollbar"
window.addEventListener("resize", () => {
    // remove modal if screen size less than 768px
    // const photosMain = document.getElementById("photos")
    if (window.innerWidth < closeDialogThreshold) {
        if (modal.open) {
            modal.close()
        }
    }
})
