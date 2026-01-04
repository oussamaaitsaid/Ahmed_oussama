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
    userNameSpan.textContent = currentUser.name;

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
        data: [320, 2],
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

// ================= LOGOUT LOGIC =================
const logoutLink = document.getElementById("logoutLink");

logoutLink.addEventListener("click", () => {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.href = "../auth.html"; // go to root auth.html
  }
});

// ==================== ADDITIONAL ENHANCEMENTS ====================

// ===== DYNAMIC BOOKS TABLE =====
function loadBooksTable() {
  const booksTableContainer = document.querySelector(
    ".table-box:nth-of-type(2)"
  );
  if (!booksTableContainer) return;

  const books = JSON.parse(localStorage.getItem("books")) || [];
  const table = booksTableContainer.querySelector("table");

  // Clear existing rows except header
  const tbody = table.querySelector("tbody") || table;
  const existingRows = tbody.querySelectorAll("tr:not(:first-child)");
  existingRows.forEach((row) => row.remove());

  if (books.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td colspan="4" style="text-align: center; padding: 20px;">
        No books available. <a href="books.html" style="color: #ffb400;">Add books here</a>
      </td>
    `;
    tbody.appendChild(tr);
    return;
  }

  // Show first 5 books
  books.slice(0, 5).forEach((book, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${book.title || "Untitled"}</td>
      <td>${book.category || "N/A"}</td>
      <td>$${book.price || "0"}</td>
      <td class="actions">
        <button class="edit" onclick="window.location.href='books.html'">Edit</button>
        <button class="delete" onclick="deleteBook(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function deleteBook(index) {
  let books = JSON.parse(localStorage.getItem("books")) || [];
  if (confirm("Are you sure you want to delete this book?")) {
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    loadBooksTable();
    updateDashboardStats();
  }
}

// ===== DYNAMIC FEEDBACK SECTION =====
function loadFeedback() {
  const feedbackContainer = document.querySelector(".feedback");
  if (!feedbackContainer) return;

  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

  // Keep h3 title
  const title = feedbackContainer.querySelector("h3");
  feedbackContainer.innerHTML = "";
  if (title) feedbackContainer.appendChild(title);

  if (feedbacks.length === 0) {
    const p = document.createElement("p");
    p.textContent = "No feedback received yet.";
    p.style.textAlign = "center";
    p.style.color = "#999";
    feedbackContainer.appendChild(p);
    return;
  }

  // Show latest 5 feedbacks
  feedbacks
    .slice(-5)
    .reverse()
    .forEach((feedback) => {
      const p = document.createElement("p");
      p.innerHTML = `<strong>${feedback.name || "Anonymous"}:</strong> ${
        feedback.message
      }`;
      feedbackContainer.appendChild(p);
    });
}

// ===== ADD TWO MORE CHARTS =====
function createAdditionalCharts() {
  const chartsDiv = document.querySelector(".charts");
  if (!chartsDiv) return;

  // Chart 3: Reservations Status
  const reservationsChartBox = document.createElement("div");
  reservationsChartBox.className = "chart-box";
  reservationsChartBox.innerHTML = '<canvas id="reservationsChart"></canvas>';
  chartsDiv.appendChild(reservationsChartBox);

  // Chart 4: Monthly Activity
  const activityChartBox = document.createElement("div");
  activityChartBox.className = "chart-box";
  activityChartBox.innerHTML = '<canvas id="activityChart"></canvas>';
  chartsDiv.appendChild(activityChartBox);

  // Create the charts
  createReservationsChart();
  createActivityChart();
}

// ===== RESERVATIONS STATUS CHART =====
function createReservationsChart() {
  const canvas = document.getElementById("reservationsChart");
  if (!canvas) return;

  const reservations = JSON.parse(localStorage.getItem("reservations")) || [];

  const statusCounts = {
    pending: 0,
    approved: 0,
    rejected: 0,
    collected: 0,
  };

  reservations.forEach((res) => {
    if (statusCounts.hasOwnProperty(res.status)) {
      statusCounts[res.status]++;
    }
  });

  new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: ["Pending", "Approved", "Rejected", "Collected"],
      datasets: [
        {
          data: [
            statusCounts.pending,
            statusCounts.approved,
            statusCounts.rejected,
            statusCounts.collected,
          ],
          backgroundColor: ["#FFC107", "#4CAF50", "#F44336", "#2196F3"],
          borderWidth: 2,
          borderColor: "#fff",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        title: {
          display: true,
          text: "Reservations Status",
          font: { size: 16 },
        },
      },
      animation: {
        animateRotate: true,
        animateScale: true,
      },
    },
  });
}

// ===== MONTHLY ACTIVITY CHART =====
function createActivityChart() {
  const canvas = document.getElementById("activityChart");
  if (!canvas) return;

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const newUsers = [12, 19, 15, 25, 22, 30];
  const newBooks = [5, 8, 12, 15, 18, 22];

  new Chart(canvas, {
    type: "line",
    data: {
      labels: months,
      datasets: [
        {
          label: "New Users",
          data: newUsers,
          borderColor: "#ffb400",
          backgroundColor: "rgba(255, 180, 0, 0.1)",
          borderWidth: 3,
          tension: 0.4,
          fill: true,
        },
        {
          label: "New Books",
          data: newBooks,
          borderColor: "#2c2c2c",
          backgroundColor: "rgba(44, 44, 44, 0.1)",
          borderWidth: 3,
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: {
          display: true,
          text: "Monthly Activity",
          font: { size: 16 },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 5 },
        },
      },
      animation: {
        duration: 1500,
        easing: "easeInOutQuart",
      },
    },
  });
}

// ===== SMOOTH STAT CARDS ANIMATION =====
function animateStatCards() {
  const statCards = document.querySelectorAll(".stat-card");
  statCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "all 0.5s ease";

    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// ===== AUTO-REFRESH STATS EVERY 30 SECONDS =====
function startAutoRefresh() {
  setInterval(() => {
    updateDashboardStats();
    loadUsersTable();
    loadBooksTable();
    loadFeedback();
  }, 30000); // 30 seconds
}

// ===== INITIALIZE ALL ENHANCEMENTS =====
document.addEventListener("DOMContentLoaded", () => {
  // Wait a bit for existing code to run first
  setTimeout(() => {
    loadBooksTable();
    loadFeedback();
    createAdditionalCharts();
    animateStatCards();
    startAutoRefresh();
  }, 100);
});
