// users.js
document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("tbody");
  const searchInput = document.querySelector(".search-input");

  // ---------------- UTILS ----------------
  const getUsers = () => JSON.parse(localStorage.getItem("libraryUsers")) || [];
  const saveUsers = (users) => localStorage.setItem("libraryUsers", JSON.stringify(users));

  // ---------------- RENDER ----------------
  function loadUsersTable(filter = "") {
    const users = getUsers();
    tableBody.innerHTML = "";

    users.forEach((user, index) => {
      if (
        user.name.toLowerCase().includes(filter) ||
        user.email.toLowerCase().includes(filter)
      ) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td>
            <button class="edit" data-index="${index}">Edit</button>
            <button class="delete" data-index="${index}">Delete</button>
          </td>
        `;
        tableBody.appendChild(tr);
      }
    });
  }

  // ---------------- EDIT USER ----------------
  function editUser(index) {
    let users = getUsers();
    const user = users[index];
    if (!user) return;

    const newName = prompt("Edit user name:", user.name);
    if (!newName) return;

    const newEmail = prompt("Edit user email:", user.email);
    if (!newEmail) return;

    // Prevent duplicate emails
    if (users.some((u, i) => u.email === newEmail && i !== index)) {
      alert("Email already exists!");
      return;
    }

    // Update user
    user.name = newName.trim();
    user.email = newEmail.trim();
    saveUsers(users);

    // Update currentUser if editing logged-in user
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.email === user.email) {
      currentUser.name = user.name;
      currentUser.email = user.email;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }

    loadUsersTable(searchInput.value.toLowerCase());
    if (typeof updateHeader === "function") updateHeader();
  }

  // ---------------- DELETE USER ----------------
  function deleteUser(index) {
    let users = getUsers();
    const user = users[index];
    if (!user) return;

    if (confirm(`Are you sure you want to delete "${user.name}"?`)) {
      // Log out current user if deleting themselves
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser && currentUser.email === user.email) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUser");
      }

      // Remove user
      users.splice(index, 1);
      saveUsers(users);

      loadUsersTable(searchInput.value.toLowerCase());
      if (typeof updateHeader === "function") updateHeader();
    }
  }

  // ---------------- EVENT LISTENERS ----------------
  tableBody.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (!index) return;
    if (e.target.classList.contains("edit")) editUser(Number(index));
    if (e.target.classList.contains("delete")) deleteUser(Number(index));
  });

  searchInput.addEventListener("input", (e) => {
    loadUsersTable(e.target.value.toLowerCase());
  });

  // ---------------- INIT ----------------
  loadUsersTable();
});
