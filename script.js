const slideContainer = document.querySelector(".container");
const slide = document.querySelector(".slides");
let slides = document.querySelectorAll(".slide");

const dotContainer = document.querySelector(".dot-container");
const dot = document.querySelectorAll(".dot");

const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

const interval = 1000000;

let lastIndex;
let index = 1;
let slideId;

let isDragging = false;
let startPosX = 0;
let currentPosX = 0;
let dragOffset = 0;

// Check if the device supports touch events
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

dot[0].classList.add("active"); // initialize to the active dot in the first slide

let slideWidth = slides[index].clientWidth;
const updateSlideWidth = () => {
  slideWidth = slides[index].clientWidth;
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
};

window.addEventListener("resize", updateSlideWidth);

// Call the updateSlideWidth function to initialize the slideWidth
updateSlideWidth();

slide.style.transform = `translateX(${-slideWidth * index}px)`; // actions for left forward

const getSlide = () => (slides = document.querySelectorAll(".slide"));

const moveNextSlide = () => {
  slides = getSlide();
  console.log("before move next:", index);
  if (index >= slides.length - 1) return; // if the picture gets into the last, it will return nothing

  index++;
  console.log("after next:", index);
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
    if (lastIndex < index) {
      let trans = index - lastIndex - 1;
      for (let i = lastIndex + 1; i < index; i++) {
        slides[i].classList.add("hide-slide");

        slide.style.transition = "1s";
        slide.style.transform = `translateX(${
          -slideWidth * (index - trans)
        }px)`;
      }
      setTimeout(() => {
        for (let i = 0; i < slides.length; i++) {
          slides[i].classList.remove("hide-slide");
        }
        slide.style.transition = "none";
        slide.style.transform = `translateX(${-slideWidth * index}px)`;
      }, 1100);
    } else {
      for (i = lastIndex - 1; i > index; i--) {
        slides[i].classList.add("hide-slide");
      }

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
      }, 1200);
      setTimeout(() => {
        slide.style.transition = "1s";
        slide.style.transform = `translateX(${-slideWidth * index}px)`;
      }, 1000);
      console.log(slides);
    }
  }
  console.log("lastIndex: ", lastIndex);
  console.log("present index: ", index);

  updateDotNavigation();
};

dot.forEach((dotElement, i) => {
  slides = getSlide();
  dotElement.addEventListener("click", () => {
    selectDot(i);
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    moveNextSlide();
  } else if (e.key === "ArrowLeft") {
    movePrevSlide();
  }
});

function areConsecutive(num1, num2) {
  // Calculate the absolute difference between the two numbers
  const difference = Math.abs(num1 - num2);

  // Check if the difference is equal to 1
  if (difference === 1) {
    return true; // Numbers are consecutive
  } else {
    return false; // Numbers are not consecutive
  }
}

function SameNumbers(num1, num2) {
  // Calculate the absolute difference between the two numbers

  // Check if the difference is equal to 1
  if (num1 === num2) {
    return true; // Numbers are consecutive
  } else {
    return false; // Numbers are not consecutive
  }
}
