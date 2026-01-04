// ===== Selectors =====
const addBtn = document.querySelector(".add-btn");
const categoryInput = document.querySelector("input[type='text']");
const tableBody = document.querySelector("tbody");

// Load existing categories from localStorage
let categories = JSON.parse(localStorage.getItem("categories")) || [];

// Render existing categories in table
// ===== Render existing categories in admin table =====
function renderCategoriesTable() {
  tableBody.innerHTML = "";
  categories.forEach((cat) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${cat.name}</td>
      <td>${cat.books}</td>
      <td><button class="delete">Delete</button></td>
    `;
    tableBody.appendChild(tr);
  });
  attachDeleteEvents();
}

// ===== Add Category =====
addBtn.addEventListener("click", async () => {
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

  // Ask for image
  let imageFile = await getCategoryImage();
  let imageData = "";
  if (imageFile) {
    imageData = await readFileAsDataURL(imageFile);
  }

  // Add to array and localStorage
  const newCategory = {
    name: categoryName,
    books: bookCount,
    image: imageData,
  };
  categories.push(newCategory);
  localStorage.setItem("categories", JSON.stringify(categories));

  renderCategoriesTable(); // update table
  categoryInput.value = "";
});

// ===== Delete Category =====
function attachDeleteEvents() {
  const deleteBtns = document.querySelectorAll(".delete");
  deleteBtns.forEach((btn, index) => {
    btn.onclick = () => {
      if (confirm("Are you sure you want to delete this category?")) {
        categories.splice(index, 1); // remove from array
        localStorage.setItem("categories", JSON.stringify(categories));
        renderCategoriesTable(); // update table
      }
    };
  });
}

// ===== Helpers for Image Upload =====
function getCategoryImage() {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => resolve(input.files[0]);
    input.click();
  });
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

// Initial render
renderCategoriesTable();
