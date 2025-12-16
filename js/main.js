function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
}
const track = document.querySelector(".books-track");
const cards = document.querySelectorAll(".book-card");
let cardPerView = 3;
let index = 0;

// Clone first few cards to the end for smooth loop
function cloneCards() {
  const clonesNeeded = cardPerView;
  for (let i = 0; i < clonesNeeded; i++) {
    const clone = cards[i].cloneNode(true);
    track.appendChild(clone);
  }
}
cloneCards();

// Update cards per view based on screen width
function updateCardPerView() {
  if (window.innerWidth <= 576) cardPerView = 1;
  else if (window.innerWidth <= 992) cardPerView = 2;
  else cardPerView = 3;
}
updateCardPerView();
window.addEventListener("resize", () => {
  updateCardPerView();
});

// Slide function
function slideCarousel() {
  index++;
  const slideWidth = track.querySelector(".book-card").offsetWidth + 25; // card width + gap
  track.style.transition = "transform 0.8s ease";
  track.style.transform = `translateX(-${slideWidth * index}px)`;

  // Reset after last real card
  if (index >= cards.length) {
    setTimeout(() => {
      track.style.transition = "none";
      track.style.transform = "translateX(0)";
      index = 0;
    }, 800); // same as transition duration
  }
}

// Auto-slide every 3 seconds
setInterval(slideCarousel, 3000);

document.querySelector(".dropdown-btn").addEventListener("click", function (e) {
  e.preventDefault();

  const menu = this.nextElementSibling;

  // Toggle show/hide
  menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// Simulate loading and show landing page
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("fade-out");
    document.getElementById("landingPage").classList.remove("hidden");
  }, 1000); // loader shows for 1.5s
});

// Get the button
const backToTopBtn = document.getElementById("backToTop");

// Show button after scrolling down 300px
window.onscroll = function () {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

// Smooth scroll to top on click
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
