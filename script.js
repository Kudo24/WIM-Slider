const slideContainer = document.querySelector(".container");
const slide = document.querySelector(".slides");
let slides = document.querySelectorAll(".slide");

const dotContainer = document.querySelector(".dot-container");
const dot = document.querySelectorAll(".dot");

const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

const interval = 500000;

let index = 1;
let slideId;
let isDragging = false;
let startPosX = 0;
let currentPosX = 0;
let dragOffset = 0;

const firstClone = slides[0].cloneNode(true);
const secondClone = slides[1].cloneNode(true);
const thirdClone = slides[2].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = "first-clone";
secondClone.id = "second-clone";
thirdClone.id = "third-clone";
lastClone.id = "last-clone";

slide.append(firstClone);
slide.prepend(lastClone);

dot[0].classList.add("active"); // initialize to the active dot in the first slide

let slideWidth = slides[index].clientWidth;

slide.style.transform = `translateX(${-slideWidth * index}px)`; // actions for left forward

const getSlide = () => (slides = document.querySelectorAll(".slide"));

const moveNextSlide = () => {
  if (index >= slides.length - 1) return; // if the picture gets into the last, it will return nothing
  index++;
  updateDotNavigation();
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  slide.style.transition = "1s";
};

const movePrevSlide = () => {
  if (index <= 0) return;
  index--;
  updateDotNavigation();
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  slide.style.transition = "1s";
};

const startSlide = () => {
  slideId = setInterval(() => {
    moveNextSlide();
  }, interval);
};

startSlide();

slide.addEventListener("transitionend", () => {
  slides = getSlide();
  if (slides[index].id === firstClone.id) {
    slide.style.transition = "none";
    index = 1;
    updateDotNavigation();
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }

  if (slides[index].id === lastClone.id) {
    slide.style.transition = "none";
    index = slides.length - 2;
    updateDotNavigation();
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});

slideContainer.addEventListener("mousedown", (e) => {
  isDragging = true;
  startPosX = e.clientX;
  currentPosX = startPosX;
  slide.style.transition = "none";
  clearInterval(slideId);
});

slideContainer.addEventListener("touchstart", (e) => {
  isDragging = true;
  startPosX = e.touches[0].clientX;
  currentPosX = startPosX;
  slide.style.transition = "none";
  clearInterval(slideId);
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  currentPosX = e.clientX;
  dragOffset = currentPosX - startPosX;
  slide.style.transform = `translateX(${-slideWidth * index + dragOffset}px)`;
});

document.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  currentPosX = e.touches[0].clientX;
  dragOffset = currentPosX - startPosX;
  slide.style.transform = `translateX(${-slideWidth * index + dragOffset}px)`;
});

document.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;
  slide.style.transition = "1s";

  if (Math.abs(dragOffset) >= slideWidth / 4) {
    if (dragOffset > 0) {
      movePrevSlide();
    } else {
      moveNextSlide();
    }
  } else {
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }

  startSlide();
});

document.addEventListener("touchend", () => {
  if (!isDragging) return;
  isDragging = false;
  slide.style.transition = "1s";

  if (Math.abs(dragOffset) >= slideWidth / 4) {
    if (dragOffset > 0) {
      movePrevSlide();
    } else {
      moveNextSlide();
    }
  } else {
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }

  startSlide();
});

slideContainer.addEventListener("mouseleave", () => {
  if (isDragging) {
    isDragging = false;
    slide.style.transition = "1s";
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});

slideContainer.addEventListener("touchcancel", () => {
  if (isDragging) {
    isDragging = false;
    slide.style.transition = "1s";
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});

const updateDotNavigation = () => {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.remove("active");
    if (i === index - 1) {
      dot.classList.add("active");
    }
  });
};
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    moveNextSlide();
  } else if (e.key === "ArrowLeft") {
    movePrevSlide();
  }
});

nextBtn.addEventListener("click", moveNextSlide);

prevBtn.addEventListener("click", movePrevSlide);

const selectDot = (clickedIndex) => {
  slides = getSlide();
  slide.style.transition = "none";
  index = clickedIndex + 1;

  updateDotNavigation();
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
};

dot.forEach((dotElement, i) => {
  slides = getSlide();
  dotElement.addEventListener("click", () => {
    selectDot(i);
  });
});
