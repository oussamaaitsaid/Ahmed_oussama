// ===== LOAD FEEDBACKS =====
const feedbackContainer = document.querySelector(".main");
let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

function renderFeedbacks() {
  feedbackContainer.innerHTML = `
    <div class="header">
      <h1>User Feedback</h1>
    </div>
  `; // reset content

  if (feedbacks.length === 0) {
    feedbackContainer.innerHTML += "<p>No feedbacks yet.</p>";
    return;
  }

  feedbacks.forEach((fb, index) => {
    const div = document.createElement("div");
    div.className = "feedback-card";
    div.innerHTML = `
      <h4>${fb.name} <span>${fb.date}</span></h4>
      <p>${fb.message}</p>
      <button class="delete" data-index="${index}">Delete</button>
    `;
    feedbackContainer.appendChild(div);
  });

  attachDeleteEvents();
}

// Delete feedback
function attachDeleteEvents() {
  const deleteBtns = document.querySelectorAll(".delete");
  deleteBtns.forEach((btn) => {
    btn.onclick = () => {
      const index = btn.dataset.index;
      if (confirm("Are you sure you want to delete this feedback?")) {
        feedbacks.splice(index, 1);
        localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
        renderFeedbacks();
      }
    };
  });
}

// Initial render
renderFeedbacks();
