// ================= SELECTORS =================
const reservationsBody = document.getElementById("reservationsBody");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

// ================= LOAD RESERVATIONS =================
let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

// Add sample data only if no reservations exist
if (reservations.length === 0) {
  const sampleReservations = [
    {
      id: Date.now(),
      userName: "Alice Brown",
      userEmail: "alice@example.com",
      bookTitle: "The Great Gatsby",
      reservedAt: new Date().toISOString().split('T')[0],
      pickupDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: "pending"
    },
    {
      id: Date.now() + 1,
      userName: "Bob Smith",
      userEmail: "bob@example.com",
      bookTitle: "1984",
      reservedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pickupDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: "approved"
    },
    {
      id: Date.now() + 2,
      userName: "Carol White",
      userEmail: "carol@example.com",
      bookTitle: "To Kill a Mockingbird",
      reservedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pickupDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: "collected"
    }
  ];
  
  reservations = sampleReservations;
  localStorage.setItem("reservations", JSON.stringify(reservations));
}

// ================= RENDER FUNCTION =================
function renderReservations() {
  reservationsBody.innerHTML = "";

  const searchVal = searchInput ? searchInput.value.toLowerCase() : "";
  const statusVal = statusFilter ? statusFilter.value : "";

  const filteredReservations = reservations.filter((res) => {
    const userName = (res.userName || "").toLowerCase();
    const userEmail = (res.userEmail || "").toLowerCase();
    const bookTitle = (res.bookTitle || "").toLowerCase();
    
    const matchesSearch = 
      userName.includes(searchVal) ||
      bookTitle.includes(searchVal) ||
      userEmail.includes(searchVal);
    
    const matchesStatus = statusVal === "" || res.status === statusVal;
    
    return matchesSearch && matchesStatus;
  });

  if (filteredReservations.length === 0) {
    reservationsBody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 20px;">
          No reservations found
        </td>
      </tr>
    `;
    return;
  }

  filteredReservations.forEach((res) => {
    const tr = document.createElement("tr");
    
    const userName = res.userName || "Guest";
    const userEmail = res.userEmail || "guest@example.com";
    const bookTitle = res.bookTitle || "Untitled";
    const reservedAt = res.reservedAt || "N/A";
    const pickupDate = res.pickupDate || "N/A";
    
    tr.innerHTML = `
      <td>${res.id}</td>
      <td>${userName}</td>
      <td>${userEmail}</td>
      <td>${bookTitle}</td>
      <td>${reservedAt}</td>
      <td>${pickupDate}</td>
      <td><span class="badge ${res.status}">${res.status}</span></td>
      <td>
        ${res.status === "pending" ? `
          <button class="action-btn approve-btn" data-id="${res.id}">Approve</button>
          <button class="action-btn reject-btn" data-id="${res.id}">Reject</button>` : ""}
        ${res.status === "approved" ? `
          <button class="action-btn collect-btn" data-id="${res.id}">Collect</button>` : ""}
        <button class="action-btn delete-btn" data-id="${res.id}">Delete</button>
      </td>
    `;
    reservationsBody.appendChild(tr);
  });

  attachActions();
}

// ================= ATTACH BUTTON EVENTS =================
function attachActions() {
  document.querySelectorAll(".approve-btn").forEach((btn) => {
    btn.onclick = () => updateStatus(btn.dataset.id, "approved");
  });

  document.querySelectorAll(".reject-btn").forEach((btn) => {
    btn.onclick = () => updateStatus(btn.dataset.id, "rejected");
  });

  document.querySelectorAll(".collect-btn").forEach((btn) => {
    btn.onclick = () => updateStatus(btn.dataset.id, "collected");
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.onclick = () => {
      if (confirm("Are you sure you want to delete this reservation?")) {
        const index = reservations.findIndex((r) => r.id == btn.dataset.id);
        if (index > -1) {
          reservations.splice(index, 1);
          localStorage.setItem("reservations", JSON.stringify(reservations));
          renderReservations();
        }
      }
    };
  });
}

// ================= UPDATE STATUS =================
function updateStatus(id, newStatus) {
  const res = reservations.find((r) => r.id == id);
  if (res) {
    res.status = newStatus;
    localStorage.setItem("reservations", JSON.stringify(reservations));
    renderReservations();
  }
}

// ================= SEARCH & FILTER =================
if (searchInput) searchInput.addEventListener("input", renderReservations);
if (statusFilter) statusFilter.addEventListener("change", renderReservations);

// ================= INITIAL RENDER =================
renderReservations();