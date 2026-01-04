// ================= LOAD BOOK DATA =================
const book = JSON.parse(localStorage.getItem("selectedBook"));

if (!book) {
  window.location.href = "book.html";
}

document.getElementById("bookImage").src = book.image;
document.getElementById("bookTitle").textContent = book.title;
document.getElementById("bookCategory").textContent = book.category;
document.getElementById("bookDescription").textContent = book.description;

// ================= VALIDATE =================
document.getElementById("validateBtn").addEventListener("click", () => {
  const quantity = document.getElementById("quantity").value;
  const date = document.getElementById("date").value;
  const reason = document.getElementById("reason").value;

  if (!date) {
    alert("Please select a reservation date.");
    return;
  }

  alert(
    `Reservation confirmed!\n\n` +
    `Book: ${book.title}\n` +
    `Quantity: ${quantity}\n` +
    `Date: ${date}\n` +
    `Reason: ${reason}`
  );

  window.location.href = "book.html";
});
