/* HTML Elements */
const dropMenu = document.querySelector(".menu-toggler");
const dropMenuBtn = document.querySelector(".nav-links");
const scrollTopBtn = document.querySelector(".scroll-top-btn");
const navLinks = document.querySelectorAll(".nav-links li a");
const sections = document.querySelectorAll("section");
const animationEls = document.querySelectorAll(".animation");
const showGalleryImgsBtn = document.querySelectorAll(
  ".gallery-photo .show-btn"
);
const galleryImgs = document.querySelectorAll(".gallery-photos .gallery-photo");
const closeShownImageBtn = document.querySelector(
  ".gallery-photos .shown-photo .close-btn"
);
const galleryCategoryBtns = document.querySelectorAll(
  ".gallery-sections li button"
);
const marqueeContent = document.querySelector("#clients .marquee-content");
const showPhotoContainer = document.querySelector(
  ".gallery-photos .shown-photo"
);
const faqsHeadings = document.querySelectorAll(".drop-down .question-heading");

addAnimation();

// Events
window.addEventListener("scroll", () => {
  // Show and hide the scroll to top button
  if (window.scrollY > 100) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
  // Handle navigation links active class
  sections.forEach((section) => {
    if (isInView(section)) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (section.id === link.dataset.section) {
          link.classList.add("active");
        }
      });
    }
  });
  addAnimation();
});

showGalleryImgsBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let image =
      btn.parentElement.parentElement.querySelector(".img-container img");
    showPhotoContainer.querySelector("img").src = image.src;
    showPhotoContainer.classList.add("show");
  });
});

closeShownImageBtn.onclick = function () {
  this.parentElement.classList.remove("show");
};

galleryCategoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    handleClasses(galleryCategoryBtns, btn, "active");
    handleGalleryCategories(btn.dataset.category, galleryImgs);
  });
});

faqsHeadings.forEach((heading) => {
  heading.addEventListener("click", () => {
    handleDropDownClick(heading);
  });
});

// Handle the clients scroll animation
const clients = Array.from(marqueeContent.children);
clients.forEach((client) => {
  let copy = client.cloneNode(true);
  copy.setAttribute("aria-hidden", "true");
  marqueeContent.appendChild(copy);
});

// Functions
function isInView(element, threshold = 500) {
  return (
    window.scrollY + threshold >= element.offsetTop &&
    window.scrollY + threshold <= element.offsetHeight + element.offsetTop
  );
}

function handleDropMenuToggle() {
  dropMenuBtn.classList.toggle("show");
  dropMenu.classList.toggle("show");
}

function handleDropDownClick(e) {
  e.parentElement.classList.toggle("open");
}

function handleScrollTop() {
  window.scrollTo(top);
}

function handleClasses(els, el, className) {
  els.forEach((e) => {
    e.classList.remove(className);
  });
  el.classList.add(className);
}

function closeImage(el) {
  el.parentElement.parentElement.classList.remove("show");
}

function handleGalleryCategories(category, gallery) {
  gallery.forEach((photo) => {
    photo.style.display = "block";
    if (photo.dataset.tag !== category && category !== "all") {
      photo.style.display = "none";
    }
  });
}

function addAnimation() {
  // Add animation to the elements
  animationEls.forEach((el) => {
    if (window.scrollY + window.innerHeight >= el.offsetTop) {
      // Activate the animation
      el.classList.add("animate");
    }
  });
}
