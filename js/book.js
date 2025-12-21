document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".book-card");
  const pageButtons = document.querySelectorAll(".page-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  const cardsPerPage = 10; // show 10 books per page
  let currentPage = 1;
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  function showPage(page) {
    currentPage = page;

    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    // Show only the cards for the current page
    cards.forEach((card, index) => {
      card.style.display = index >= start && index < end ? "block" : "none";
    });

    // Update active page button
    pageButtons.forEach((btn) => {
      btn.classList.toggle("active", Number(btn.dataset.page) === page);
    });

    // Disable prev/next buttons on first/last page
    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages;
  }

  // Page button clicks
  pageButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      showPage(Number(btn.dataset.page));
    });
  });

  // Prev/Next button clicks
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) showPage(currentPage - 1);
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) showPage(currentPage + 1);
  });

  // Initialize first page
  showPage(1);
});

// +++++++++++++++++++++++++++++++++++++++++++++

// the search part
const searchInput = document.getElementById("bookSearch");
const pagination = document.querySelector(".pagination");
const allCards = document.querySelectorAll(".book-card");
const booksContainer = document.getElementById("books-container");

// Add these declarations
const pages = document.querySelectorAll(".books-page");
const pageButtons = document.querySelectorAll(".page-btn");

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase().trim();

  if (value === "") {
    // Reset: show first page and pagination
    pagination.style.display = "block";
    pages.forEach((page) => (page.style.display = "none"));
    document.querySelector(".books-page[data-page='1']").style.display = "grid";
    pageButtons.forEach((b) => b.classList.remove("active"));
    pageButtons[0].classList.add("active");

    // Reset all cards
    allCards.forEach((card) => (card.style.display = "block"));

    // Remove search results if any
    const existingSearch = document.querySelector(".search-results");
    if (existingSearch) existingSearch.remove();

    return;
  }

  // Search mode: hide pagination
  pagination.style.display = "none";

  // Create a temporary container for search results
  let searchContainer = document.querySelector(".search-results");
  if (!searchContainer) {
    searchContainer = document.createElement("div");
    searchContainer.classList.add("search-results");
    searchContainer.style.display = "grid";
    searchContainer.style.gridTemplateColumns = "repeat(5, 1fr)";
    searchContainer.style.gap = "20px";
    booksContainer.appendChild(searchContainer);
  }

  // Clear previous results
  searchContainer.innerHTML = "";

  // Hide all original pages
  pages.forEach((page) => (page.style.display = "none"));

  // Add matching cards to search container
  let found = false;
  allCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    if (title.startsWith(value)) {
      const clone = card.cloneNode(true);
      clone.style.display = "block";
      searchContainer.appendChild(clone);
      found = true;
    }
  });

  // Show "Result not found" if no matches
  if (!found) {
    const noResult = document.createElement("p");
    noResult.textContent = "Result not found";
    noResult.style.gridColumn = "1 / -1"; // span full width
    noResult.style.textAlign = "center";
    noResult.style.fontSize = "1.2em";
    noResult.style.color = "#e67e22";
    searchContainer.appendChild(noResult);
  }
});
// ++++++++++++++++++++++++++++++++++++++++++++
// back-to-top button

document.querySelector(".dropdown-btn").addEventListener("click", function (e) {
  e.preventDefault();

  const menu = this.nextElementSibling;

  // Toggle show/hide
  menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// +++++++++++++++++++

// Show or hide button on scroll
window.addEventListener("scroll", () => {
  const btn = document.getElementById("backToTop");
  if (window.scrollY > 300) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
});

// Smooth scroll to top
document.getElementById("backToTop").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
