// Protect dashboard: only admin can access
document.addEventListener("DOMContentLoaded", () => {
  // Protect dashboard: only admin can access
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser || currentUser.role !== "Admin") {
    // Immediate redirect without showing any part of the page
    window.location.href = "landing.html";
  }
});

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

function updateHeaderAndSidebar() {
  const headerLogin = document.getElementById("headerLogin");
  const logoutLink = document.getElementById("logoutLink");
  const userNameSpan = document.getElementById("userName");
  const sidebarSignin = document.getElementById("signinLink");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    headerLogin.style.display = "none";
    logoutLink.style.display = "inline-block";
    userNameSpan.style.display = "inline-block";
    userNameSpan.textContent = "Hi, " + currentUser.name;

    if (sidebarSignin) sidebarSignin.style.display = "none";
  } else {
    headerLogin.style.display = "inline-block";
    logoutLink.style.display = "none";
    userNameSpan.style.display = "none";

    if (sidebarSignin) sidebarSignin.style.display = "inline-block";
  }
}

document.addEventListener("DOMContentLoaded", updateHeaderAndSidebar);

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  updateHeaderAndSidebar();
  window.location.href = "auth.html";
}

// ========================= charts =============================
const booksChart = new Chart(document.getElementById("booksChart"), {
  type: "bar",
  data: {
    labels: [
      "Philosophy",
      "Psychology",
      "Fantasy",
      "Fiction",
      "Science",
      "Technology",
      "History",
      "Art",
      "Business",
      "Mystery",
      "Romance",
      "Thriller",
      "Adventure",
      "Self Help",
      "Poetry",
      "Biography",
    ],
    datasets: [
      {
        label: "Books per Category",
        data: [
          120, 95, 210, 180, 160, 140, 110, 90, 130, 100, 150, 85, 105, 98, 70,
          65,
        ],
        backgroundColor: "#ffb400",
        borderRadius: 6,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 50 },
      },
    },
  },
});

const usersChart = new Chart(document.getElementById("usersChart"), {
  type: "doughnut",
  data: {
    labels: ["Readers", "Admins"],
    datasets: [
      {
        data: [320, 5],
        backgroundColor: ["#ffb400", "#2c2c2c"],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  },
});
