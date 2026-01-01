document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".category-card");
  const pageButtons = document.querySelectorAll(".page-btn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const cardsPerPage = 6;
  let currentPage = 1;
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  function showPage(page) {
    currentPage = page;

    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    cards.forEach((card, index) => {
      card.style.display =
        index >= start && index < end ? "block" : "none";
    });

    pageButtons.forEach(btn => {
      btn.classList.toggle(
        "active",
        Number(btn.dataset.page) === page
      );
    });

    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages;
  }

  pageButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      showPage(Number(btn.dataset.page));
    });
  });

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) showPage(currentPage - 1);
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) showPage(currentPage + 1);
  });

  showPage(1);
});




const translations = {
  en: {
    dir: "ltr",
    back: "← Back",
    title: "Book Categories",
    subtitle: "Choose a category and explore amazing books",
    view: "View Books",
    prev: "Previous",
    next: "Next",
    categories: {
      philosophy: "Philosophy",
      psychology: "Psychology",
      fantasy: "Fantasy",
      fiction: "Fiction",
      science: "Science",
      technology: "Technology",
      history: "History",
      art: "Art & Design",
      business: "Business",
      fairytale: "Fairy Tale",
      mystery: "Mystery",
      politics: "Politics",
      romance: "Romance",
      thriller: "Thriller",
      adventure: "Adventure",
      selfhelp: "Self Help",
      poetry: "Poetry",
      biography: "Biography",
    },
  },

  fr: {
    dir: "ltr",
    back: "← Retour",
    title: "Catégories de livres",
    subtitle: "Choisissez une catégorie et explorez des livres incroyables",
    view: "Voir les livres",
    prev: "Précédent",
    next: "Suivant",
    categories: {
      philosophy: "Philosophie",
      psychology: "Psychologie",
      fantasy: "Fantaisie",
      fiction: "Fiction",
      science: "Science",
      technology: "Technologie",
      history: "Histoire",
      art: "Art & Design",
      business: "Business",
      fairytale: "Conte de fées",
      mystery: "Mystère",
      politics: "Politique",
      romance: "Romance",
      thriller: "Thriller",
      adventure: "Aventure",
      selfhelp: "Développement personnel",
      poetry: "Poésie",
      biography: "Biographie",
    },
  },

  ar: {
    dir: "rtl",
    back: "رجوع →",
    title: "فئات الكتب",
    subtitle: "اختر فئة واستكشف كتبًا رائعة",
    view: "عرض الكتب",
    prev: "السابق",
    next: "التالي",
    categories: {
      philosophy: "الفلسفة",
      psychology: "علم النفس",
      fantasy: "الخيال",
      fiction: "الروايات",
      science: "العلوم",
      technology: "التكنولوجيا",
      history: "التاريخ",
      art: "الفن والتصميم",
      business: "الأعمال",
      fairytale: "القصص الخيالية",
      mystery: "الغموض",
      politics: "السياسة",
      romance: "الرومانسية",
      thriller: "الإثارة",
      adventure: "المغامرة",
      selfhelp: "تطوير الذات",
      poetry: "الشعر",
      biography: "السيرة الذاتية",
    },
  },
};

const langSelect = document.getElementById("langSelect");

function applyLang(lang) {
  const t = translations[lang];
  document.documentElement.dir = t.dir;

  document.getElementById("mf-back").textContent = t.back;
  document.getElementById("mf-title").textContent = t.title;
  document.getElementById("mf-subtitle").textContent = t.subtitle;

  document.querySelectorAll(".mf-view").forEach(
    (btn) => (btn.textContent = t.view)
  );

  document.getElementById("prevBtn").textContent = t.prev;
  document.getElementById("nextBtn").textContent = t.next;

  Object.keys(t.categories).forEach((key) => {
    const el = document.getElementById("mf-" + key);
    if (el) el.textContent = t.categories[key];
  });
}

// Init
const savedLang = localStorage.getItem("lang") || "en";
langSelect.value = savedLang;
applyLang(savedLang);

langSelect.addEventListener("change", () => {
  localStorage.setItem("lang", langSelect.value);
  applyLang(langSelect.value);
});


