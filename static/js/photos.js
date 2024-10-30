// --- modal ---
const closeDialogThreshold = 1024
const modal = document.getElementById("image_modal")
const modalImg = modal.querySelector("#modal_image")

const photosMd = document.querySelector("#photos-md")
const photosSm = document.querySelector("#photos-sm")
const footer = document.querySelector("#footer")

const imgGrid = document.getElementById("image-grid")
const imgGridSrc = Array.from(imgGrid.getElementsByTagName("img"), (i) => i.src)
const imgGridOrd = Array.from(imgGrid.getElementsByTagName("img"), (i) => i.id[0])

const imgSrcArr = new Array(imgGridOrd.length)
for (let i = 0; i < imgGridOrd.length; i++) {
    const ord = imgGridOrd[i][0]
    imgSrcArr[parseInt(ord)] = imgGridSrc[i]
}

const mdScreen = 768
function imageView() {
    if (window.innerWidth < mdScreen) {
        document.body.replaceChild(photosSm, photosMd);
        // document.body.classList.add("flex")
        // document.body.classList.add("flex-col")
        nav.classList.add("mx-auto")
        nav.classList.add("my-0")
    }
    if (window.innerWidth >= mdScreen) {
        document.body.replaceChild(photosMd, photosSm);
        // document.body.classList.remove("flex")
        // document.body.classList.remove("flex-col")
        nav.classList.remove("mx-auto")
        nav.classList.remove("my-0")
    }
}
window.addEventListener("load", () => {
    // change photo viewing mode on small screen
    imageView()
})
window.addEventListener("resize", () => {
    // change photo viewing mode on small screen
    imageView()

    // remove modal if screen size less than 768px
    if (modal.open && window.innerWidth < closeDialogThreshold) {
        modal.close()
        console.log("modal closed (<md)")
    }
})


// open modal on clicking on an image if the screen is bigger than 1024px
function openImageModal(e) {
    if (window.innerWidth >= closeDialogThreshold) {
        modalImg.src = e.src
        modal.showModal()
    }
    if (!modal.open) {
        modalImg.src = ""
    }
}

function leftImage() {
    console.log("move left")
}

function rightImage() {
    console.log("move right")
}

