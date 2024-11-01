// -- utils --
function addClasses(elem, classes) {
    for (const c of classes) {
        elem.classList.add(c)
    }
}

function removeClasses(elem, classes) {
    for (const c of classes) {
        elem.classList.remove(c)
    }
}

// setting image order
const imgGrid = document.getElementById("image-grid")
const imgGridSrc = Array.from(imgGrid.getElementsByTagName("img"), (i) => i.src)
const imgGridOrd = Array.from(imgGrid.getElementsByTagName("img"), (i) => i.id[0])
const imgSrcArr = new Array(imgGridOrd.length)
for (let i = 0; i < imgGridOrd.length; i++) {
    const ord = imgGridOrd[i][0]
    imgSrcArr[parseInt(ord)] = imgGridSrc[i]
}

// replacing main sections for small and greater screen sizes
const photosMd = document.querySelector("#photos-md")
const photosSm = document.querySelector("#photos-sm")
const mdScreen = 768
function imageView() {
    // const classes = ["mx-auto", "my-0", "mt-4"]
    if (window.innerWidth < mdScreen) {
        document.body.replaceChild(photosSm, photosMd);

    }
    if (window.innerWidth >= mdScreen) {
        document.body.replaceChild(photosMd, photosSm);
    }
}

// setting padding and aspect-ratio based on image orientation
const imgWraper = document.querySelectorAll(".img-wraper")
window.addEventListener("load", () => {
    // change photo viewing mode on small screen
    imageView()

    let elem = imgWraper[0]
    let width = elem.lastChild.width
    let height = elem.lastChild.height
    if (width > height) {
        elem.classList.add("mt-24")
    } else {
        elem.classList.add("my-24")
    }

    // different margin for 5x4 images
    imgWraper.forEach((elem), () => {
        let width = elem.lastChild.width
        let height = elem.lastChild.height
        if (width > height) {
            elem.classList.add("aspect-[5/4]")
        } else {
            elem.classList.add("aspect-[4/5]")
        }
    })
})

// --- adding nav styles on scroll ---
photosSm.addEventListener("scroll", () => {
    const scrollOffset = 8
    const classes = ["ring-1", "dark:ring-white/80", "ring-black/60", "dark:shadow-[0_0_50px_-12px_rgba(0,0,0,1)]", "shadow-[0_0_50px_-12px_rgba(0,0,0,0.6)]", "backdrop-blur", "duration-200"]
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

// --- modal ---
const closeDialogThreshold = 1024
const modal = document.getElementById("image_modal")
const modalImg = modal.querySelector("#modal_image")

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

