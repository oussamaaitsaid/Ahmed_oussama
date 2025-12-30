function updateDashboardStats() {
  // USERS (array)
  const users = JSON.parse(localStorage.getItem("libraryUsers")) || [];
  document.getElementById("totalUsers").textContent = users.length;

  // BOOKS (array)
  const books = JSON.parse(localStorage.getItem("books")) || [];
  document.getElementById("totalBooks").textContent = books.length;

  // CATEGORIES (array)
  const categories = JSON.parse(localStorage.getItem("categories")) || [];
  document.getElementById("totalCategories").textContent = categories.length;

  // FEEDBACKS / CONTACT MESSAGES (array)
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
  document.getElementById("totalFeedbacks").textContent = feedbacks.length;
}

// Run when page loads
updateDashboardStats();

function loadUsersTable() {
  const usersTableBody = document.getElementById("usersTableBody");
  const users = JSON.parse(localStorage.getItem("libraryUsers")) || [];

  usersTableBody.innerHTML = "";

  if (users.length === 0) {
    usersTableBody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center;">No users found</td>
      </tr>
    `;
    return;
  }

  // Show most recent users first
  users
    .slice()
    .reverse()
    .forEach((user, index) => {
      const role = user.role || "User";

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${role}</td>
        <td class="actions">
          <button class="edit" onclick="editUser(${index})">Edit</button>
          <button class="delete" onclick="deleteUser(${index})">Delete</button>
        </td>
      `;

      usersTableBody.appendChild(row);
    });
}

// Load users when page opens
loadUsersTable();

function editUser(index) {
  let users = JSON.parse(localStorage.getItem("libraryUsers")) || [];
  const realIndex = users.length - 1 - index;

  const newName = prompt("Edit name:", users[realIndex].name);
  if (!newName) return;

  users[realIndex].name = newName;
  localStorage.setItem("libraryUsers", JSON.stringify(users));

  // Update currentUser if this is the logged-in user
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser && currentUser.email === users[realIndex].email) {
    currentUser.name = newName;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }

  loadUsersTable();
  updateHeader(); // update header dynamically
}

function deleteUser(index) {
  let users = JSON.parse(localStorage.getItem("libraryUsers")) || [];
  const realIndex = users.length - 1 - index;

  if (confirm("Are you sure you want to delete this user?")) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.email === users[realIndex].email) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");
    }

    users.splice(realIndex, 1);
    localStorage.setItem("libraryUsers", JSON.stringify(users));

    loadUsersTable();
    updateHeader(); // update header dynamically
  }
}
