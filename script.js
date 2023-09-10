// const slideContainer = document.querySelector(".container");
// const slide = document.querySelector(".slides");
// let slides = document.querySelectorAll(".slide");

// const dotContainer = document.querySelector(".dot-container");
// const dot = document.querySelectorAll(".dot");

// const nextBtn = document.getElementById("next-btn");
// const prevBtn = document.getElementById("prev-btn");

// const interval = 2000;

// let index = 1;
// let dotIndex;
// let slideId;

// const firstClone = slides[0].cloneNode(true);
// const lastClone = slides[slides.length - 1].cloneNode(true);

// firstClone.id = "first-clone";
// lastClone.id = "last-clone";

// slide.append(firstClone);
// slide.prepend(lastClone);

// dot[0].classList.add("active"); // initialize to active dot in the first slide

// const slideWidth = slides[index].clientWidth;

// slide.style.transform = `translateX(${-slideWidth * index}px)`; // actions for left forward

// const getSlide = () => (slides = document.querySelectorAll(".slide"));

// const getDot = (n) => {
//   dotIndex = n;
//   console.log(dotIndex);
// };

// const moveNextSlide = () => {
//   if (index >= slides.length - 1) return; // if the picture gets into the last it will return nothing,
//   index++;
//   slide.style.transform = `translateX(${-slideWidth * index}px)`;
//   slide.style.transition = ".7s";

//   updateDotNavigation();
// };

// const movePrevSlide = () => {
//   if (index <= 0) return;
//   index--;

//   slide.style.transform = `translateX(${-slideWidth * index}px)`;
//   slide.style.transition = ".7s";
//   updateDotNavigation();
// };

// const startSlide = () => {
//   slideId = setInterval(() => {
//     moveNextSlide();
//   }, interval);
// };

// slide.addEventListener("transitionend", () => {
//   slides = getSlide(); // this will insert the 1st pic
//   if (slides[index].id === firstClone.id) {
//     slide.style.transition = "none"; /// this will stop backing forward into first paghe
//     index = 1;
//     slide.style.transform = `translateX(${-slideWidth * index}px)`;
//     updateDotNavigation();
//   }

//   if (slides[index].id === lastClone.id) {
//     slide.style.transition = "none"; /// this will stop backing forward into first paghe
//     index = slides.length - 2;
//     slide.style.transform = `translateX(${-slideWidth * index}px)`;
//     updateDotNavigation();
//   }
// });

// slideContainer.addEventListener("mouseenter", () => {
//   clearInterval(slideId);
// });

// const updateDotNavigation = () => {
//   const dots = document.querySelectorAll(".dot");
//   dots.forEach((dot, i) => {
//     dot.classList.remove("active");
//     if (i === index - 1) {
//       dot.classList.add("active");
//     }
//   });
// };

// // ... your existing code ...
// dot.forEach((dotElement, i) => {
//   dotElement.addEventListener("click", () => {
//     selectDot(i);
//   });
// });

// const selectDot = (clickedIndex) => {
//   index = clickedIndex + 1;
//   slide.style.transform = `translateX(${-slideWidth * index}px)`;
//   slide.style.transition = ".7s";
//   updateDotNavigation();
// };

// // ... your existing code ...

// slideContainer.addEventListener("mouseleave", startSlide);

// nextBtn.addEventListener("click", moveNextSlide);

// prevBtn.addEventListener("click", movePrevSlide);

// dot.addEventListener("click", selectDot);

// startSlide();

const slideContainer = document.querySelector(".container");
const slide = document.querySelector(".slides");
let slides = document.querySelectorAll(".slide");

const dotContainer = document.querySelector(".dot-container");
const dot = document.querySelectorAll(".dot");

const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

const interval = 2000;

let index = 1;
let slideId;
let isDragging = false;
let startPosX = 0;
let currentPosX = 0;
let dragOffset = 0;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

slide.append(firstClone);
slide.prepend(lastClone);

dot[0].classList.add("active"); // initialize to the active dot in the first slide

const slideWidth = slides[index].clientWidth;

slide.style.transform = `translateX(${-slideWidth * index}px)`; // actions for left forward

const getSlide = () => (slides = document.querySelectorAll(".slide"));

const moveNextSlide = () => {
  if (index >= slides.length - 1) return; // if the picture gets into the last, it will return nothing
  index++;
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  slide.style.transition = ".7s";
  updateDotNavigation();
};

const movePrevSlide = () => {
  if (index <= 0) return;
  index--;
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  slide.style.transition = ".7s";
  updateDotNavigation();
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
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
    updateDotNavigation();
  }

  if (slides[index].id === lastClone.id) {
    slide.style.transition = "none";
    index = slides.length - 2;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
    updateDotNavigation();
  }
});

// slideContainer.addEventListener("mouseenter", () => {
//   clearInterval(slideId);
// });

const updateDotNavigation = () => {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.remove("active");
    if (i === index - 1) {
      dot.classList.add("active");
    }
  });
};

// Add the drag functionality
slideContainer.addEventListener("mousedown", (e) => {
  isDragging = true;
  startPosX = e.clientX;
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

document.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;
  slide.style.transition = ".7s";

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
    slide.style.transition = ".7s";
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});

nextBtn.addEventListener("click", moveNextSlide);

prevBtn.addEventListener("click", movePrevSlide);

const selectDot = (clickedIndex) => {
  index = clickedIndex + 1;
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  slide.style.transition = ".7s";
  updateDotNavigation();
};

dot.forEach((dotElement, i) => {
  slides = getSlide();

  dotElement.addEventListener("click", () => {
    selectDot(i);
  });
});

dot.addEventListener("click", selectDot);
