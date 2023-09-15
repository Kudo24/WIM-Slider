const slideContainer = document.querySelector(".container");
const slide = document.querySelector(".slides");
let slides = document.querySelectorAll(".slide");

const dotContainer = document.querySelector(".dot-container");
const dot = document.querySelectorAll(".dot");

const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

const firstSlide = document.getElementById("first-slide");
const secondSlide = document.getElementById("second-slide");
const thirdSlide = document.getElementById("third-slide");
const fourthSlide = document.getElementById("fourth-slide");
const interval = 30000;

let dotIndex = 0;
let lastindex = 0;
let index = 1;
let slideId;
let isDragging = false;
let startPosX = 0;
let currentPosX = 0;
let dragOffset = 0;

let slideWidth = slides[index].clientWidth;
console.log(slideWidth);

const updateSlideWidth = () => {
  slideWidth = slides[index].clientWidth;
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
};

// Attach the event listener to the window's resize event
window.addEventListener("resize", updateSlideWidth);

// Call the updateSlideWidth function to initialize the slideWidth
updateSlideWidth();

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
const startSlide = () => {
  setInterval(() => {
    moveToNextSlide();
  }, interval);
};

// console.log(document.querySelectorAll(".slide"));
// console.log(slides.length);

const getSlide = () => (slides = document.querySelectorAll(".slide"));
const indexToHide = 1;
slides.forEach((slide, i) => {
  if (i === indexToHide) {
    slide.classList.add("hide-slide");
  }
  slide.style.transition = "1s";
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
});

setTimeout(() => {
  slides = getSlide();
  slides.forEach((slide, i) => {
    slide.classList.remove("hide-slide");
  });
}, 5000);
console.log(index);

slide.style.transform = `translateX(${-slideWidth * index}px)`;
// const getSlide = () => (slides = document.querySelectorAll(".slide"));

slide.addEventListener("transitionend", () => {
  slides = getSlide();
  if (slides[index].id === firstClone.id) {
    // slides.forEach((Slide, i) => {
    //   slide.classList.remove("hide-slide");
    // });
    console.log("lipat na sa index 1");
    slide.style.transition = "none";
    index = 1;
    updateDotNavigation();
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }

  if (slides[index].id === lastClone.id) {
    // console.log("lastcClone Index: ", index);
    // console.log("lipat na sa last index");

    slide.style.transition = "none";
    console.log(slides.length);
    index = slides.length - 2;
    updateDotNavigation();
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});

const moveToNextSlide = () => {
  slides = getSlide();
  console.log(" before press next slide: ", index);
  if (index >= slides.length - 1) return console.log("reach 5");

  index++;

  slide.style.transition = "1s";
  slide.style.transform = `translateX(${-slideWidth * index}px)`;

  updateDotNavigation();
  console.log("after press next slides", index);
};

const moveToPreviousSlide = () => {
  index--;
  updateDotNavigation();
  slide.style.transition = ".7s";
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
};
nextBtn.addEventListener("click", moveToNextSlide);
prevBtn.addEventListener("click", moveToPreviousSlide);

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
    moveToNextSlide();
  } else if (e.key === "ArrowLeft") {
    moveToPreviousSlide();
  }
});

const selectDot = (clickedIndex) => {
  lastindex = index;
  // index = clickedIndex + 1;
  dotIndex = clickedIndex + 1;
  // all index changed in dotIndex;

  let Pass = areConsecutive(lastindex, dotIndex);
  let Pass2 = SameNumbers(lastindex, dotIndex);
  slides2 = document.querySelectorAll(".slide");

  // console.log(Pass);

  if (Pass === true || Pass2 === true) {
    slide.style.transition = "1s";
    slide.style.transform = `translateX(${-slideWidth * dotIndex}px)`;

    updateDotNavigation();
  } else {
    slides.forEach((slide, i) => {
      if (i !== clickedIndex && i !== lastindex - 1) {
        slides.forEach((Slide, i) => {
          slide.classList.add("hide-slide");
          console.log(slide);
        });
      }

      console.log("dot - index", dotIndex);
      slide.style.transition = "1s";
      slide.style.transform = `translateX(${-slideWidth * index}px)`;

      // setTimeout(() => {
      //   slides.forEach((slide, i) => {
      //     slide.classList.remove("hide-slide");
      //   });
      // }, 1000);

      updateDotNavigation();
    });
  }

  console.log(index);
};

dot.forEach((dotElement, i) => {
  dotElement.addEventListener("click", () => {
    selectDot(i);

    // index to dotIndex
    let eventPass = areConsecutive(lastindex, dotIndex);
    let eventPass2 = SameNumbers(lastindex, dotIndex);

    slides = getSlide();
    if (eventPass2 === true || eventPass === true) return;
    if (eventPass === false) {
      // if (slides[dotIndex].id === thirdSlide.id) {
      //   // console.log("slide 3 after trans", index);
      //   setTimeout(() => {
      //     slides.forEach((slide, i) => {
      //       slide.classList.remove("hide-slide");
      //     });
      //     console.log(firstClone);
      //     console.log(lastClone);
      //     slide.style.transition = "none";
      //     slide.style.transform = `translateX(${-slideWidth * (3 - 1)}px)`;
      //     index = 3;
      //     console.log(slides);
      //     updateDotNavigation();
      //   }, 1000);
      // }
      // if (slides[index].id === fourthSlide.id) {
      //   slides = getSlide();
      //   // slide.style.transition = "none";
      //   setTimeout(() => {
      //     slides.forEach((slide, i) => {
      //       slide.classList.remove("hide-slide");
      //       // console.log(slide);
      //     });
      //     slide.style.transition = "none";
      //     slide.style.transform = `translateX(${-slideWidth * (4 - 2)}px)`;
      //   }, 1000);
      //   // console.log(document.querySelectorAll(".slide"));
      // }
    }
  });
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
