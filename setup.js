const slideContainer = document.querySelector(".container");
const slide = document.querySelector(".slides");
let slides = document.querySelectorAll(".slide");

const dotContainer = document.querySelector(".dot-container");
const dot = document.querySelectorAll(".dot");

const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

const interval = 5000;

let lastIndex;
let index = 1;
let slideId;

let isDragging = false;
let startPosX = 0;
let currentPosX = 0;
let dragOffset = 0;

const supportsTouch = "ontouchstart" in window || navigator.msMaxTouchPoints;

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

dot[0].classList.add("active");

let slideWidth = slides[index].clientWidth;

const updateSlideWidth = () => {
  slideWidth = slides[index].clientWidth;
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
};

window.addEventListener("resize", updateSlideWidth);

updateSlideWidth();

slide.style.transform = `translateX(${-slideWidth * index}px)`;

const getSlide = () => (slides = document.querySelectorAll(".slide"));

const moveNextSlide = () => {
  slides = getSlide();
  if (index >= slides.length - 1) return;
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

if (supportsTouch) {
  slideContainer.addEventListener("touchstart", (e) => {
    isDragging = true;
    startPosX = e.touches[0].clientX;
    slide.style.transition = "none";
  });

  slideContainer.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    currentPosX = e.touches[0].clientX;
    dragOffset = currentPosX - startPosX;
    slide.style.transform = `translateX(${-slideWidth * index + dragOffset}px)`;
  });

  slideContainer.addEventListener("touchend", () => {
    if (!isDragging) return;

    isDragging = false;

    if (dragOffset > 50) {
      movePrevSlide();
    } else if (dragOffset < -50) {
      moveNextSlide();
    } else {
      slide.style.transform = `translateX(${-slideWidth * index}px)`;
    }

    startPosX = 0;
    currentPosX = 0;
    dragOffset = 0;
  });

  slideContainer.addEventListener("touchcancel", () => {
    if (isDragging) {
      isDragging = false;
      slide.style.transform = `translateX(${-slideWidth * index}px)`;
      startPosX = 0;
      currentPosX = 0;
      dragOffset = 0;
    }
  });
} else {
  slideContainer.addEventListener("mousedown", (e) => {
    isDragging = true;
    startPosX = e.clientX;
    slide.style.transition = "none";
  });

  slideContainer.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    currentPosX = e.clientX;
    dragOffset = currentPosX - startPosX;
    slide.style.transform = `translateX(${-slideWidth * index + dragOffset}px)`;
  });

  slideContainer.addEventListener("mouseup", () => {
    if (!isDragging) return;

    isDragging = false;

    if (dragOffset > 50) {
      movePrevSlide();
    } else if (dragOffset < -50) {
      moveNextSlide();
    } else {
      slide.style.transform = `translateX(${-slideWidth * index}px)`;
    }

    startPosX = 0;
    currentPosX = 0;
    dragOffset = 0;
  });

  slideContainer.addEventListener("mouseleave", () => {
    if (isDragging) {
      isDragging = false;
      slide.style.transform = `translateX(${-slideWidth * index}px)`;
      startPosX = 0;
      currentPosX = 0;
      dragOffset = 0;
    }
  });
}

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

  lastIndex = index;
  index = clickedIndex + 1;

  let consecutive = areConsecutive(lastIndex, index);
  let sameNumbers = SameNumbers(lastIndex, index);

  if (consecutive === true || sameNumbers === true) {
    slide.style.transition = "1s";
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  } else {
    if (lastIndex === 1 && index === 4) {
      slides[2].classList.add("hide-slide");
      slides[3].classList.add("hide-slide");

      slide.style.transition = "1s";
      slide.style.transform = `translateX(${-slideWidth * (index - 2)}px)`;

      setTimeout(() => {
        for (let i = 0; i < slides.length; i++) {
          slides[i].classList.remove("hide-slide");
        }
        slide.style.transition = "none";
        slide.style.transform = `translateX(${-slideWidth * index}px)`;
      }, 1100);
    }

    if (lastIndex === 1 && index === 3) {
      slides[2].classList.add("hide-slide");

      slide.style.transition = "1s";
      slide.style.transform = `translateX(${-slideWidth * (index - 1)}px)`;

      setTimeout(() => {
        for (let i = 0; i < slides.length; i++) {
          slides[i].classList.remove("hide-slide");
        }
        slide.style.transition = "none";
        slide.style.transform = `translateX(${-slideWidth * index}px)`;
      }, 1100);
    }

    if (lastIndex === 2 && index === 4) {
      slides[3].classList.add("hide-slide");

      slide.style.transition = "1s";
      slide.style.transform = `translateX(${-slideWidth * (index - 1)}px)`;

      setTimeout(() => {
        for (let i = 0; i < slides.length; i++) {
          slides[i].classList.remove("hide-slide");
        }
        slide.style.transition = "none";
        slide.style.transform = `translateX(${-slideWidth * index}px)`;
      }, 1100);
    }

    if (lastIndex === 4 && index === 1) {
      slides[0].classList.add("hide-slide");
      slides[2].classList.add("hide-slide");
      slides[3].classList.add("hide-slide");
      slides[5].classList.add("hide-slide");

      slide.style.transition = "none";
      slide.style.transform = `translateX(${-slideWidth * (index - 0)}px)`;

      setTimeout(() => {
        slide.style.transition = "1s";
        slide.style.transform = `translateX(${-slideWidth * (index - 1)}px)`;
      }, 100);

      setTimeout(() => {
        for (let i = 0; i < slides.length; i++) {
          slides[i].classList.remove("hide-slide");
        }
      }, 1000);

      setTimeout(() => {
        slide.style.transition = "none";
        slide.style.transform = `translateX(${-slideWidth * index}px)`;
      }, 1000);
    }

    if (lastIndex === 4 && index === 2) {
      slides[3].classList.add("hide-slide");
      slide.style.transition = "none";
      slide.style.transform = `translateX(${-slideWidth * (index + 1)}px)`;

      setTimeout(() => {
        slide.style.transition = "1s";
        slide.style.transform = `translateX(${-slideWidth * index}px)`;
      }, 100);

      setTimeout(() => {
        for (let i = 0; i < slides.length; i++) {
          slides[i].classList.remove("hide-slide");
        }
      }, 1000);

      setTimeout(() => {
        slide.style.transition = "none";
        slide.style.transform = `translateX(${-slideWidth * index}px)`;
      }, 1000);
    }

    if (lastIndex === 3 && index === 1) {
      slides[2].classList.add("hide-slide");
      slide.style.transition = "none";
      slide.style.transform = `translateX(${-slideWidth * (index + 1)}px)`;

      setTimeout(() => {
        slide.style.transition = "1s";
        slide.style.transform = `translateX(${-slideWidth * index}px)`;
      }, 100);
      setTimeout(() => {
        for (let i = 0; i < slides.length; i++) {
          slides[i].classList.remove("hide-slide");
        }
      }, 1000);
      setTimeout(() => {
        slide.style.transition = "none";
        slide.style.transform = `translateX(${-slideWidth * index}px)`;
      }, 1000);
    }
  }

  updateDotNavigation();
};

dot.forEach((dotElement, i) => {
  slides = getSlide();
  dotElement.addEventListener("click", () => {
    selectDot(i);
  });
});

function areConsecutive(num1, num2) {
  const difference = Math.abs(num1 - num2);
  return difference === 1;
}

function SameNumbers(num1, num2) {
  return num1 === num2;
}