// --- modal ---
const closeDialogThreshold = 1024
const modal = document.getElementById("image_modal")
const modalImg = modal.querySelector("#modal_image");

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

// remove modal if screen size less than 768px
window.onresize = () => {
    if (modal.open && window.innerWidth < closeDialogThreshold) {
        modal.close()
        console.log("modal closed (<md)")
    }
}

const imgGrid = document.getElementById("image-grid")
const imgGridSrc = Array.from(imgGrid.getElementsByTagName("img"), (i) => i.src)
const imgGridOrd = Array.from(imgGrid.getElementsByTagName("img"), (i) => i.id[0])

const imgSrcArr = new Array(imgGridOrd.length)
for (let i = 0; i < imgGridOrd.length; i++) {
    const ord = imgGridOrd[i][0]
    imgSrcArr[parseInt(ord)] = imgGridSrc[i]
} 

function leftImage() {
    console.log("move left")
}

function rightImage() {
    console.log("move right")
}
