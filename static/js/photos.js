// --- modal ---
const closeDialogThreshold = 1024
const modal = document.getElementById("image_modal")
const modalImg = modal.querySelector("#modal_image")

const photosMd = document.querySelector("#photos-md")
const photosSm = document.querySelector("#photos-sm")

const imgWraper = document.querySelectorAll(".img-wraper")

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
    const classes = ["mx-auto", "my-0", "mt-4"]
    if (window.innerWidth < mdScreen) {
        document.body.replaceChild(photosSm, photosMd);

        for (const c of classes) {
            nav.classList.add(c)
        }
    }
    if (window.innerWidth >= mdScreen) {
        document.body.replaceChild(photosMd, photosSm);

        for (const c of classes) {
            nav.classList.add(c)
        }
    }
}
window.addEventListener("load", () => {
    // change photo viewing mode on small screen
    imageView()

    // different margin for 5x4 images
    imgWraper.forEach((elem) => {
        let width = elem.lastChild.width
        let height = elem.lastChild.height
        if (width > height) {
            elem.classList.add("my-24")
            elem.classList.add("aspect-[5/4]")
        } else {
            elem.classList.add("my-10")
            elem.classList.add("aspect-[4/5]")
        }
    })


})

photosSm.addEventListener("scroll", () => {
    const scrollOffset = 8
    const classes = ["ring-1", "dark:ring-white/60", "ring-black/50", "dark:shadow-[0_0_50px_-12px_rgba(0,0,0,1)]", "shadow-[0_0_50px_-12px_rgba(0,0,0,0.6)]", "backdrop-blur", "duration-200"]
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
})

window.addEventListener("resize", () => {
    // change photo viewing mode on small screen
    imageView()

    // remove modal if screen size less than 768px
    if (modal.open && window.innerWidth < closeDialogThreshold) {
        modal.close()
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

