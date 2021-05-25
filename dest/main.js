// Show and hide nav
const menuBtn = document.querySelector(".header__burger");
const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll(".nav ul li a");

menuBtn.addEventListener("click", () => {
  if (menuBtn.classList.contains("clicked")) {
    menuBtn.classList.remove("clicked");
    nav.classList.remove("open");
  } else {
    menuBtn.classList.add("clicked");
    nav.classList.add("open");
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 992) {
    nav.classList.remove("open");
    menuBtn.classList.remove("clicked");
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const section = document.querySelector(
      `.${link.getAttribute("href").replace("#", "")}`
    );
    window.scrollTo({
      top:
        section.getBoundingClientRect().top + window.scrollY - headerHeight + 5,
      behavior: "smooth",
    });
    nav.classList.remove("open");
    menuBtn.classList.remove("clicked");
  });
});

// Show header
const header = document.querySelector("header");
const headerHeight = header.clientHeight;
const slider = document.querySelector(".slider");
const sliderHeight = slider.clientHeight;

function showHeader() {
  const offsetY = window.pageYOffset;
  if (offsetY > sliderHeight - headerHeight) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

// Scroll event listener
window.addEventListener("scroll", () => {
  showHeader();
  showBackToTop();
});

// Language options
const languageOptions = document.querySelector(".header__language-options");
const languageOptionsList = document.querySelectorAll(
  ".header__language-options li a"
);

const currentLanguageEl = document.querySelector(
  ".header__language-current span"
);

currentLanguageEl.addEventListener("click", (e) => {
  e.stopPropagation();
  languageOptions.classList.toggle("active");
});

languageOptionsList.forEach((option) => {
  option.addEventListener("click", () => {
    let langOption = option.textContent;
    let langTemp = currentLanguageEl.textContent;
    currentLanguageEl.textContent = langOption;
    option.textContent = langTemp;
    languageOptions.classList.remove("active");
  });
});

document.addEventListener("click", (e) => {
  languageOptions.classList.remove("active");
});
// Show toTopBtn
const toTopBtn = document.querySelector(".totop");

function showBackToTop() {
  const offsetY = window.pageYOffset;
  if (offsetY > 500) {
    toTopBtn.classList.add("active");
  } else {
    toTopBtn.classList.remove("active");
  }
}

toTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// News Tabs
const tabsContainer = document.querySelector(".news__tabs-container");
const tabs = document.querySelectorAll(".news__tab");
const newsLists = document.querySelectorAll(".news__list");

tabsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".news__tab");
  if (!clicked) return;
  tabs.forEach((tab) => tab.classList.remove("news__tab--active"));
  clicked.classList.add("news__tab--active");
  newsLists.forEach((list) => list.classList.remove("news__list--active"));
  document
    .querySelector(`.news__list--${clicked.dataset.tab}`)
    .classList.add("news__list--active");
});

// Accordion
const accordions = document.querySelectorAll(".accordion");
accordions.forEach((accordion) =>
  accordion.addEventListener("click", () => {
    accordion.classList.toggle("active");
    const panel = accordion.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  })
);

// Menu event listener
const menuLinks = document.querySelectorAll(".header__menu li a");
const sectionList = [];

function removeActiveMenu() {
  menuLinks.forEach((link) => link.classList.remove("active"));
}

menuLinks.forEach((link) => {
  // Scroll To sections
  const className = link.getAttribute("href").replace("#", "");
  const section = document.querySelector(`.${className}`);
  sectionList.push(section);
  const sectionHeight = document.querySelector(`.${className}`).offsetTop;
  link.addEventListener("click", (e) => {
    e.preventDefault();

    window.scrollTo({
      top:
        section.getBoundingClientRect().top + window.scrollY - headerHeight + 5,
      behavior: "smooth",
    });

    // show active class
    removeActiveMenu();
    link.classList.add("active");
  });
});

window.addEventListener("scroll", () => {
  const windowYOffset = window.pageYOffset;
  sectionList.forEach((section, index) => {
    if (windowYOffset > section.offsetTop - headerHeight) {
      removeActiveMenu();
      menuLinks[index].classList.add("active");
    } else {
      menuLinks[index].classList.remove("active");
    }
  });
});
// Show and hide video overlay
const videoThumbnailList = document.querySelectorAll(".video__thumbnail");
const overlay = document.querySelector(".overlay");
const closeVideoBtn = document.querySelector(".close-video-btn");
const iframe = document.querySelector("iframe");

videoThumbnailList.forEach((video) => {
  video.addEventListener("click", () => {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    const id = video.dataset.id;
    iframe.src = `https://www.youtube.com/embed/${id}`;
  });
});

closeVideoBtn.addEventListener("click", () => {
  overlay.classList.remove("active");
  document.body.style.overflow = "auto";
  iframe.src = "";
});

overlay.addEventListener("click", (e) => {
  overlay.classList.remove("active");
  document.body.style.overflow = "auto";
  iframe.src = "";
});

// Slider
const slides = document.querySelectorAll(".slider__item");
const btnNext = document.querySelector(".controller__btn--next");
const btnPrev = document.querySelector(".controller__btn--prev");
const pagiNumber = document.querySelector(".pagination__number");
const dots = document.querySelectorAll(".pagination__dots li");

let curSlide = 0;
const goToSlide = function (slide) {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[slide].classList.add("active");
};

const nextSlide = function () {
  slides[curSlide].classList.remove("active");
  curSlide++;
  if (curSlide > slides.length - 1) {
    curSlide = 0;
  }
  goToSlide(curSlide);
  updatePagiNumber(curSlide);
  updateDots(curSlide);
};

const prevSlide = function () {
  slides[curSlide].classList.remove("active");
  curSlide--;
  if (curSlide < 0) {
    curSlide = slides.length - 1;
  }
  goToSlide(curSlide);
  updatePagiNumber(curSlide);
  updateDots(curSlide);
};

const updatePagiNumber = function (number) {
  pagiNumber.innerText = (number + 1).toString().padStart(2, "0");
};

const updateDots = function (number) {
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[number].classList.add("active");
};

goToSlide(0);
updatePagiNumber(0);

btnNext.addEventListener("click", nextSlide);
btnPrev.addEventListener("click", prevSlide);
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    goToSlide(index);
    updatePagiNumber(index);
    updateDots(index);
  });
});
