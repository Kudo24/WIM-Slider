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

let changeTrans;

let slideWidth = slides[index].clientWidth;

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
console.log(slides.length);
const getSlide = () => (slides = document.querySelectorAll(".slide"));

// console.log(index);

slide.style.transform = `translateX(${-slideWidth * index}px)`;
// const getSlide = () => (slides = document.querySelectorAll(".slide"));

slide.addEventListener("transitionend", () => {
  slides = getSlide();
  if (slides[index].id === firstClone.id) {
    console.log("lipat na sa index 1");
    slide.style.transition = "none";
    index = 1;
    updateDotNavigation();
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
    changeTrans = true;
  }

  if (slides[index].id === lastClone.id) {
    console.log("last bago pa sa last");
    slide.style.transition = "none";
    console.log(slides.length);
    index = slides.length - 2;
    updateDotNavigation();
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
    changeTrans = true;
  }
});

const moveToNextSlide = () => {
  slides = getSlide();

  if (index >= slides.length - 1) return console.log("reach 5");

  index++;

  slide.style.transition = "1s";
  slide.style.transform = `translateX(${-slideWidth * index}px)`;

  updateDotNavigation();
};

const moveToPreviousSlide = () => {
  if (index < 0) return console.log("reach 5");
  index--;

  slide.style.transition = ".7s";
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  updateDotNavigation();
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
  console.log(changeTrans);
  lastindex = index;
  index = clickedIndex + 1;
  dotIndex = clickedIndex + 1;
  // all index changed in dotIndex;

  let Pass = areConsecutive(lastindex, dotIndex);
  let Pass2 = SameNumbers(lastindex, dotIndex);
  slides2 = document.querySelectorAll(".slide");

  console.log(" before clicked index", clickedIndex);
  console.log(slides.length);

  if (Pass === true || Pass2 === true) {
    slide.style.transition = "1s";
    slide.style.transform = `translateX(${-slideWidth * dotIndex}px)`;
    // clickedIndex++;

    updateDotNavigation();
  } else {
    console.log("may likdang");
    if (changeTrans === true) {
      if (clickedIndex === 2) {
        //// chcek
        for (let i = 0; i < slides.length; i++) {
          slides[2].classList.add("hide-slide");
          // console.log("remove slide:", slides[2].id);
        }
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

      if (clickedIndex === 3 && lastindex === 1) {
        for (let i = 0; i < slides.length; i++) {
          slides[2].classList.add("hide-slide");
          slides[3].classList.add("hide-slide");
        }

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

      if (clickedIndex === 3 && lastindex === 2) {
        for (let i = 0; i < slides.length; i++) {
          slides[3].classList.add("hide-slide");
          console.log(slides[i]);
        }
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
    } else {
      console.log(slides.length);
      if (clickedIndex === 2) {
        slides[1].classList.add("hide-slide");
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

      if (clickedIndex === slides.length - 1) {
        for (let i = 0; i < slides.length; i++) {
          slides[1].classList.add("hide-slide");
          slides[2].classList.add("hide-slide");
        }
        console.log(slides);

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
      console.log("after:", clickedIndex);

      if (lastindex === 2 && clickedIndex === 3) {
        for (let i = 0; i < slides.length; i++) {
          slides[3].classList.add("hide-slide");
        }
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
    }
    if (clickedIndex === 0 && lastindex === 4) {
      slides[2].classList.add("hide-slide");
      slides[3].classList.add("hide-slide");

      slide.style.transition = "";
      slide.style.transform = `translateX(${-slideWidth * index}px)`;
      // setTimeout(() => {
      //   for (let i = 0; i < slides.length; i++) {
      //     slides[i].classList.remove("hide-slide");
      //   }
      //   slide.style.transition = "none";
      //   slide.style.transform = `translateX(${-slideWidth * index}px)`;
      // }, 1100);
    }

    if (clickedIndex === 1 && lastindex === 4) {
      for (let i = 4; i > 0; i--) {
        slides[3].classList.add("hide-slide");
      }
    }

    updateDotNavigation();
  }
  console.log("clicked index: ", clickedIndex);
  console.log("last Index", lastindex);
  console.log(slides.length);
  // console.log("");
};

dot.forEach((dotElement, i) => {
  dotElement.addEventListener("click", () => {
    // console.log("last", lastindex);
    console.log(i);
    selectDot(i);
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
