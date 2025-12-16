document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".category-card");
  const pageButtons = document.querySelectorAll(".page-btn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const cardsPerPage = 6;
  let currentPage = 1;
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  function showPage(page) {
    currentPage = page;

    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    cards.forEach((card, index) => {
      card.style.display =
        index >= start && index < end ? "block" : "none";
    });

    pageButtons.forEach(btn => {
      btn.classList.toggle(
        "active",
        Number(btn.dataset.page) === page
      );
    });

    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages;
  }

  pageButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      showPage(Number(btn.dataset.page));
    });
  });

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) showPage(currentPage - 1);
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) showPage(currentPage + 1);
  });

  showPage(1);
});
