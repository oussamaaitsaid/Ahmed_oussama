const addBtn = document.querySelector(".add-btn");
const modal = document.getElementById("bookModal");
const closeModal = document.querySelector(".close");
const bookForm = document.getElementById("bookForm");
const tableBody = document.querySelector("tbody");

let editMode = false; // false = add, true = edit
let editRow = null;

// Open Add Book modal
addBtn.addEventListener("click", () => {
  modal.style.display = "block";
  editMode = false;
  document.getElementById("modalTitle").innerText = "Add Book";
  bookForm.reset();
});

// Close modal
closeModal.addEventListener("click", () => (modal.style.display = "none"));
window.addEventListener("click", (e) => {
  if (e.target == modal) modal.style.display = "none";
});

// Save book (Add or Edit)
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const id =
    editMode && editRow
      ? editRow.querySelector(".edit-btn").dataset.id
      : Date.now();

  const title = document.getElementById("bookTitle").value.trim();
  const category = document.getElementById("bookCategory").value.trim();
  const price = document.getElementById("bookPrice").value.trim() || "0";
  const stock = document.getElementById("bookStock").value.trim() || "10";
  const coverInput = document.getElementById("bookCover");

  function saveBook(cover) {
    if (editMode && editRow) {
      // Update existing row
      editRow.querySelector("td:nth-child(1) img").src = cover;
      editRow.querySelector("td:nth-child(1) img").alt = title;
      editRow.querySelector("td:nth-child(2)").innerText = title;
      editRow.querySelector("td:nth-child(3)").innerText = category;
      editRow.querySelector("td:nth-child(4)").innerText = "$" + price;
      editRow.querySelector("td:nth-child(5)").innerText = stock;
      editRow.querySelector(".edit-btn").dataset.id = id;
    } else {
      // Add new row
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><img src="${cover}" class="thumb" alt="${title}"></td>
        <td>${title}</td>
        <td>${category}</td>
        <td>$${price}</td>
        <td>${stock}</td>
        <td>
          <button class="edit-btn" data-id="${id}">Edit</button>
          <button class="delete-btn" data-id="${id}">Delete</button>
        </td>
      `;
      tableBody.appendChild(tr);
    }

    modal.style.display = "none";
    attachRowEvents();
  }

  if (coverInput.files && coverInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const cover = e.target.result;
      saveBook(cover);
    };
    reader.readAsDataURL(coverInput.files[0]);
  } else {
    // fallback if no file selected
    const cover =
      editMode && editRow
        ? editRow.children[0].querySelector("img").src
        : "images/default.jpg";
    saveBook(cover);
  }
});

// Attach Edit/Delete buttons to rows
function attachRowEvents() {
  const editBtns = document.querySelectorAll(".edit-btn");
  const deleteBtns = document.querySelectorAll(".delete-btn");

  editBtns.forEach((btn) => {
    btn.onclick = () => {
      editMode = true;
      editRow = btn.closest("tr");

      document.getElementById("modalTitle").innerText = "Edit Book";
      document.getElementById("bookId").value = btn.dataset.id;
      document.getElementById("bookTitle").value =
        editRow.children[1].innerText;
      document.getElementById("bookCategory").value =
        editRow.children[2].innerText;
      document.getElementById("bookPrice").value =
        editRow.children[3].innerText.replace("$", "");
      document.getElementById("bookStock").value =
        editRow.children[4].innerText;
      // file input cannot be set programmatically for security
      document.getElementById("bookCover").value = "";

      modal.style.display = "block";
    };
  });

  deleteBtns.forEach((btn) => {
    btn.onclick = () => {
      if (confirm("Are you sure you want to delete this book?")) {
        btn.closest("tr").remove();
      }
    };
  });
}

// Initial attach for existing rows
attachRowEvents();
