// ===== Selectors =====
const addBtn = document.querySelector(".add-btn");
const categoryInput = document.querySelector("input[type='text']");
const tableBody = document.querySelector("tbody");

// Load existing categories from localStorage or initialize with defaults
let categories = JSON.parse(localStorage.getItem("categories")) || [];

// Initialize with default categories if empty
if (categories.length === 0) {
  categories = [
    { name: "Philosophy", books: 7 },
    { name: "Psychology", books: 5 },
    { name: "Fantasy", books: 15 },
    { name: "Fiction", books: 20 },
    { name: "Science", books: 18 },
    { name: "Technology", books: 12 },
    { name: "History", books: 12 },
    { name: "Art & Design", books: 8 },
    { name: "Business", books: 10 },
    { name: "Fairy Tale", books: 6 },
    { name: "Mystery", books: 4 },
    { name: "Politics", books: 6 },
    { name: "Romance", books: 10 },
    { name: "Thriller", books: 9 },
    { name: "Adventure", books: 3 },
    { name: "Self Help", books: 8 },
    { name: "Poetry", books: 5 },
    { name: "Biography", books: 7 },
  ];
  localStorage.setItem("categories", JSON.stringify(categories));
}

// ===== Render categories in admin table =====
function renderCategoriesTable() {
  tableBody.innerHTML = "";

  if (categories.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="3" style="text-align: center; padding: 20px;">
          No categories available. Add one above!
        </td>
      </tr>
    `;
    return;
  }

  categories.forEach((cat, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${cat.name}</td>
      <td>${cat.books || 0}</td>
      <td>
        <button class="delete" data-index="${index}">Delete</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  attachDeleteEvents();
}

// ===== Add Category =====
addBtn.addEventListener("click", () => {
  const categoryName = categoryInput.value.trim();

  if (!categoryName) {
    alert("Please enter a category name.");
    return;
  }

  // Check duplicate
  if (
    categories.some(
      (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
    )
  ) {
    alert("Category already exists!");
    categoryInput.value = "";
    return;
  }

  // Ask for number of books
  let bookCount = prompt(`How many books are in "${categoryName}"?`, "0");
  if (bookCount === null) return; // Cancel pressed

  bookCount = parseInt(bookCount);
  if (isNaN(bookCount) || bookCount < 0) bookCount = 0;

  // Add to array and localStorage
  const newCategory = {
    name: categoryName,
    books: bookCount,
  };

  categories.push(newCategory);
  localStorage.setItem("categories", JSON.stringify(categories));

  renderCategoriesTable();
  categoryInput.value = "";

  alert(`Category "${categoryName}" added successfully!`);
});

// ===== Delete Category =====
function attachDeleteEvents() {
  const deleteBtns = document.querySelectorAll(".delete");

  deleteBtns.forEach((btn) => {
    btn.onclick = () => {
      const index = parseInt(btn.dataset.index);
      const categoryName = categories[index].name;

      if (confirm(`Are you sure you want to delete "${categoryName}"?`)) {
        categories.splice(index, 1);
        localStorage.setItem("categories", JSON.stringify(categories));
        renderCategoriesTable();
        alert(`Category "${categoryName}" deleted successfully!`);
      }
    };
  });
}

// ===== Initial render =====
renderCategoriesTable();
