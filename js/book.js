const books = [];
const booksPerPage = 10;
let currentPage = 1;

// Create 40 books
for (let i = 1; i <= 40; i++) {
  books.push({
    title: `Book Title ${i}`,
    description: "An amazing book full of knowledge and adventure.",
    price: `${10 + (i % 5) * 5} $`,
    image: `https://via.placeholder.com/300x400?text=Book+${i}`,
  });
}

const booksContainer = document.getElementById("booksContainer");
const pagination = document.getElementById("pagination");

function displayBooks(page) {
  booksContainer.innerHTML = "";

  const start = (page - 1) * booksPerPage;
  const end = start + booksPerPage;

  books.slice(start, end).forEach((book) => {
    const card = document.createElement("div");
    card.className = "book-card";

    card.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <div class="content">
        <h3>${book.title}</h3>
        <p>${book.description}</p>
        <div class="price">${book.price}</div>
      </div>
      <button>Reserve</button>
    `;

    booksContainer.appendChild(card);
  });
}

function setupPagination() {
  pagination.innerHTML = "";
  const pageCount = Math.ceil(books.length / booksPerPage);

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;

    if (i === currentPage) btn.classList.add("active");

    btn.addEventListener("click", () => {
      currentPage = i;
      displayBooks(currentPage);
      setupPagination();
    });

    pagination.appendChild(btn);
  }
}

// Init
displayBooks(currentPage);
setupPagination();


