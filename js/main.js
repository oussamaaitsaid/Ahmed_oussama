function toggleSidebar(e) {
  if (e) e.preventDefault(); // prevent jump to top
  document.getElementById("sidebar").classList.toggle("open");
}

const track = document.querySelector(".books-track");
const cards = document.querySelectorAll(".book-card");
let cardPerView = 3;
let index = 0;

// Clone first few cards to the end for smooth loop
function cloneCards() {
  const clonesNeeded = cardPerView;
  for (let i = 0; i < clonesNeeded; i++) {
    const clone = cards[i].cloneNode(true);
    track.appendChild(clone);
  }
}
cloneCards();

const videos = document.querySelectorAll(".hero-video");
let current = 0;
const switchTime = 8000; // 8 seconds

setInterval(() => {
  videos[current].classList.remove("active");

  current = (current + 1) % videos.length;

  videos[current].classList.add("active");
}, switchTime);

// Slide function
function slideCarousel() {
  index++;
  const slideWidth = track.querySelector(".book-card").offsetWidth + 25; // card width + gap
  track.style.transition = "transform 0.8s ease";
  track.style.transform = `translateX(-${slideWidth * index}px)`;

  // Reset after last real card
  if (index >= cards.length) {
    setTimeout(() => {
      track.style.transition = "none";
      track.style.transform = "translateX(0)";
      index = 0;
    }, 800); // same as transition duration
  }
}

// Auto-slide every 3 seconds
setInterval(slideCarousel, 3000);

document.querySelector(".dropdown-btn").addEventListener("click", function (e) {
  e.preventDefault();

  const menu = this.nextElementSibling;

  // Toggle show/hide
  menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// Simulate loading and show landing page
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("fade-out");
    document.getElementById("landingPage").classList.remove("hidden");
  }, 1000); // loader shows for 1.5s
});

// Get the button
const backToTopBtn = document.getElementById("backToTop");

// Show button after scrolling down 300px
window.onscroll = function () {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

const feedbackTrack = document.querySelector(".feedback-track");
const feedbackCards = document.querySelectorAll(".feedback-card");
const cardCount = feedbackCards.length;

let feedbackIndex = 0;

// Clone first card and append to the end for seamless loop
const firstClone = feedbackCards[0].cloneNode(true);
feedbackTrack.appendChild(firstClone);

function showNextFeedback() {
  feedbackIndex++;
  feedbackTrack.style.transition = "transform 0.5s ease-in-out";
  feedbackTrack.style.transform = `translateX(-${feedbackIndex * 100}%)`;

  // Reset to start when reaching the clone
  if (feedbackIndex === cardCount) {
    setTimeout(() => {
      feedbackTrack.style.transition = "none";
      feedbackTrack.style.transform = `translateX(0)`;
      feedbackIndex = 0;
    }, 500); // wait for transition to finish
  }
}

// Auto slide every 4 seconds
setInterval(showNextFeedback, 4000);


// Smooth scroll to top on click
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const translations = {
  en: {
    /* Loader */
    loaderText: "Unlocking the world of stories…",

    /* Sidebar + Header */
    sidebarTitle: "BookVerse",
    headerTitle: "BookVerse",

    navHome: "Home",
    navAbout: "About",
    navFacts: "Facts",
    navContact: "Contact",
    navMore: "More ▼",
    navBooks: "Books",
    navCategories: "Categories",
    signinLink: "sign-in/up",
    headerLogin: "sign-in/up",

    /* Hero */
    heroTitle: "Discover Your Next Favorite Book",
    heroDesc:
      "Explore thousands of books, authors, genres, and timeless stories.",
    heroBtn: "Start Exploring",

    /* About */
    aboutTitle: "About Us",
    aboutP1:
      "BookVerse is an online bookstore created for book lovers, by book lovers. We believe that every story has the power to change lives ignite imagination, and inspire minds of all ages. Whether you're seeking timeless classics, modern bestsellers, or hidden gems, BookVerse is your gateway to a world of stories.",
    aboutP2:
      "Our mission is to make books accessible to everyone, offering an easy,fast, and enjoyable browsing experience. We carefully curate our collection to include a wide variety of genres, from fiction and fantasy to science, history, self-help, and art design, so that every reader can find their perfect match.",
    aboutP3:
      " At BookVerse, we value community and connection. We encourage readers to explore, share, and discuss their favorite books. Our intuitive platform allows you to reserve your chosen titles, keep track of your reading journey, and discover new authors that inspire and challenge you.",
    aboutP4:
      " Join us at BookVerse and embark on a literary adventure where imagination knows no bounds and stories come alive..",

    /* Facts */
    factsTitle: "📘 Book Facts & News",

    fact1Title: "📚 129 Million Books",
    fact1Desc: "There are over 129 million books published in the world.",

    fact2Title: "📖 Oldest Book",
    fact2Desc: "The oldest printed book is the “Diamond Sutra” from 868 AD.",

    fact3Title: "🔥 Trending News",
    fact3Desc: "Fantasy novels are the fastest-growing book category in 2025!",

    fact4Title: "🏆 Best-Selling Book",
    fact4Desc: "“Don Quixote” is the best-selling novel of all time.",

    fact5Title: "🌎 Most Translated Book",
    fact5Desc:
      "The Bible is the most translated book, available in over 3,400 languages.",

    fact6Title: "💡 Reading Benefits",
    fact6Desc:
      "Reading regularly improves memory, focus, and emotional intelligence.",

    fact7Title: "📈 E-Book Growth",
    fact7Desc: "E-books now make up over 25% of global book sales.",

    fact8Title: "🎉 Book Festivals",
    fact8Desc:
      "The largest book fair is the Frankfurt Book Fair, attracting over 300,000 visitors annually.",

    /* Contact */
    contactTitle: "Contact Us",
    contactSubtitle:
      "Have questions or suggestions? We'd love to hear from you!",

    /* Footer */
    footerTitle: "BookVerse",
    footerDesc: "Your gateway to unlimited stories.",
    footerCopy: "© 2025 BookVerse. All Rights Reserved.",
    booksTitle: "Featured Books",
    booksSubtitle:
      "Discover stories that will inspire, excite, and transform your imagination.",

    book1Desc:
      "Childhood innocence confronts racial injustice in the American South.",
    book2Desc:
      "A spiritual guide to achieving peace by living in the present moment.",
    book3Desc:
      "A self-help guide detailing 13 steps to turn thought into wealth and success.",
    book4Desc: "A shepherd’s journey to discover personal legend and destiny.",
    book5Desc: "A romantic novel about manners, upbringing, and marriage.",
    book6Desc: "A hobbit’s quest to reclaim a lost treasure in Middle-earth.",
    book7Desc: "The magical adventures of a young wizard and his friends.",
    book8Desc:
      "Memoir of a girl raised by survivalists who began school at seventeen and earned a PhD.",
    book9Desc:
      "Michelle Obama's memoir about her life from Chicago to the White House.",
    send: "Send Message",

    joinNow1: "Join Now",
    joinNow2: "Join Now",
    joinNow3: "Join Now",
    joinNow4: "Join Now",
    joinNow5: "Join Now",
    joinNow6: "Join Now",
    joinNow7: "Join Now",
    joinNow8: "Join Now",
    joinNow9: "Join Now",
  },

  fr: {
    loaderText: "Déverrouiller le monde des histoires…",

    sidebarTitle: "BookVerse",
    headerTitle: "BookVerse",

    navHome: "Accueil",
    navAbout: "À propos",
    navFacts: "Faits",
    navContact: "Contact",
    navMore: "Plus ▼",
    navBooks: "Livres",
    navCategories: "Catégories",
    signinLink: "Se connecter",
    headerLogin: "Se connecter",

    heroTitle: "Découvrez votre prochain livre préféré",
    heroDesc:
      "Explorez des milliers de livres, d’auteurs, de genres et d’histoires intemporelles.",
    heroBtn: "Commencer",

    aboutTitle: "À propos de nous",
    aboutP1:
      "BookVerse est une librairie en ligne créée par des passionnés de lecture, pour des passionnés de lecture. Nous croyons que chaque histoire a le pouvoir de changer des vies, d’éveiller l’imagination et d’inspirer des esprits de tous âges. Que vous recherchiez des classiques intemporels, des best-sellers modernes ou des trésors cachés, BookVerse est votre porte d’entrée vers un monde d’histoires.",

    aboutP2:
      "Notre mission est de rendre les livres accessibles à tous en offrant une expérience de navigation simple, rapide et agréable. Nous sélectionnons soigneusement notre collection afin d’inclure une grande variété de genres, de la fiction et la fantasy à la science, l’histoire, le développement personnel et le design artistique, pour que chaque lecteur puisse trouver le livre qui lui correspond.",

    aboutP3:
      "Chez BookVerse, nous valorisons la communauté et les échanges. Nous encourageons les lecteurs à explorer, partager et discuter de leurs livres préférés. Notre plateforme intuitive vous permet de réserver vos titres favoris, de suivre votre parcours de lecture et de découvrir de nouveaux auteurs qui vous inspirent et vous challengent.",

    aboutP4:
      "Rejoignez BookVerse et embarquez pour une aventure littéraire où l’imagination n’a pas de limites et où les histoires prennent vie.",

    factsTitle: "📘 Faits & Actualités du Livre",

    fact1Title: "📚 129 millions de livres",
    fact1Desc:
      "Il existe plus de 129 millions de livres publiés dans le monde.",

    fact2Title: "📖 Livre le plus ancien",
    fact2Desc:
      "Le plus ancien livre imprimé est le « Diamond Sutra » datant de 868.",

    fact3Title: "🔥 Tendance",
    fact3Desc:
      "Les romans fantastiques sont la catégorie la plus populaire en 2025.",

    fact4Title: "🏆 Livre le plus vendu",
    fact4Desc:
      "« Don Quichotte » est le roman le plus vendu de tous les temps.",

    fact5Title: "🌎 Livre le plus traduit",
    fact5Desc: "La Bible est traduite dans plus de 3 400 langues.",

    fact6Title: "💡 Bienfaits de la lecture",
    fact6Desc:
      "Lire améliore la mémoire, la concentration et l’intelligence émotionnelle.",

    fact7Title: "📈 Croissance des e-books",
    fact7Desc: "Les e-books représentent plus de 25 % des ventes mondiales.",

    fact8Title: "🎉 Festivals du livre",
    fact8Desc:
      "La Foire du livre de Francfort attire plus de 300 000 visiteurs par an.",

    contactTitle: "Contactez-nous",
    contactSubtitle:
      "Vous avez des questions ou des suggestions ? Contactez-nous !",

    footerTitle: "BookVerse",
    footerDesc: "Votre passerelle vers des histoires illimitées.",
    footerCopy: "© 2025 BookVerse. Tous droits réservés.",
    booksTitle: "Livres à la une",
    booksSubtitle:
      "Découvrez des histoires qui inspireront, captiveront et transformeront votre imagination.",

    book1Desc:
      "L’innocence de l’enfance confrontée à l’injustice raciale dans le sud des États-Unis.",
    book2Desc:
      "Un guide spirituel pour atteindre la paix intérieure en vivant dans le moment présent.",
    book3Desc:
      "Un guide de développement personnel présentant 13 étapes pour transformer la pensée en richesse et en succès.",
    book4Desc:
      "Le voyage d’un berger à la découverte de sa légende personnelle et de son destin.",
    book5Desc:
      "Un roman romantique sur les bonnes manières, l’éducation et le mariage.",
    book6Desc:
      "La quête d’un hobbit pour récupérer un trésor perdu en Terre du Milieu.",
    book7Desc: "Les aventures magiques d’un jeune sorcier et de ses amis.",
    book8Desc:
      "Le récit d’une jeune fille élevée par des survivalistes qui commence l’école à dix-sept ans et obtient un doctorat.",
    book9Desc:
      "Les mémoires de Michelle Obama retraçant sa vie de Chicago à la Maison-Blanche.",
    send: "Envoyer Un Message",

    joinNow1: "Rejoindre maintenant",
    joinNow2: "Rejoindre maintenant",
    joinNow3: "Rejoindre maintenant",
    joinNow4: "Rejoindre maintenant",
    joinNow5: "Rejoindre maintenant",
    joinNow6: "Rejoindre maintenant",
    joinNow7: "Rejoindre maintenant",
    joinNow8: "Rejoindre maintenant",
    joinNow9: "Rejoindre maintenant",
  },

  ar: {
    loaderText: "اكتشف عالم القصص…",

    sidebarTitle: "بوك فيرس",
    headerTitle: "بوك فيرس",

    navHome: "الرئيسية",
    navAbout: "من نحن",
    navFacts: "معلومات",
    navContact: "اتصال",
    navMore: "المزيد ▼",
    navBooks: "الكتب",
    navCategories: "التصنيفات",
    signinLink: "تسجيل الدخول",
    headerLogin: "تسجيل الدخول",

    heroTitle: "اكتشف كتابك المفضل التالي",
    heroDesc: "استكشف آلاف الكتب والمؤلفين والأنواع المختلفة.",
    heroBtn: "ابدأ",

    aboutTitle: "معلومات عنا",
    aboutP1:
      "BookVerse هو متجر كتب إلكتروني أُنشئ من قِبل عشّاق القراءة ولعشّاق القراءة. نؤمن بأن كل قصة تمتلك القدرة على تغيير الحياة، وإشعال الخيال، وإلهام العقول من جميع الأعمار. سواء كنت تبحث عن الكلاسيكيات الخالدة، أو الكتب الأكثر مبيعًا الحديثة، أو الكنوز المخفية، فإن BookVerse هو بوابتك إلى عالم من القصص.",

    aboutP2:
      "مهمتنا هي جعل الكتب في متناول الجميع من خلال تقديم تجربة تصفح سهلة وسريعة وممتعة. نقوم باختيار مجموعتنا بعناية لتشمل مجموعة واسعة من الأنواع، من الأدب والخيال إلى العلوم والتاريخ والتنمية الذاتية وتصميم الفنون، حتى يتمكن كل قارئ من العثور على ما يناسبه.",

    aboutP3:
      "في BookVerse، نُقدّر روح المجتمع والتواصل. نشجع القرّاء على الاستكشاف والمشاركة ومناقشة كتبهم المفضلة. تتيح لك منصتنا السهلة الاستخدام حجز عناوينك المفضلة، ومتابعة رحلتك القرائية، واكتشاف مؤلفين جدد يلهمونك ويتحدّون أفكارك.",

    aboutP4:
      "انضم إلينا في BookVerse وابدأ مغامرة أدبية حيث لا حدود للخيال وتنبض القصص بالحياة.",

    factsTitle: "📘 حقائق وأخبار الكتب",

    fact1Title: "📚 129 مليون كتاب",
    fact1Desc: "تم نشر أكثر من 129 مليون كتاب حول العالم.",

    fact2Title: "📖 أقدم كتاب",
    fact2Desc: "أقدم كتاب مطبوع هو «Diamond Sutra» سنة 868.",

    fact3Title: "🔥 الأخبار الرائجة",
    fact3Desc: "الروايات الخيالية هي الأسرع نموًا في 2025.",

    fact4Title: "🏆 الأكثر مبيعًا",
    fact4Desc: "«دون كيشوت» هو أكثر الروايات مبيعًا.",

    fact5Title: "🌎 الأكثر ترجمة",
    fact5Desc: "الكتاب المقدس مترجم لأكثر من 3400 لغة.",

    fact6Title: "💡 فوائد القراءة",
    fact6Desc: "القراءة تحسن الذاكرة والتركيز.",

    fact7Title: "📈 نمو الكتب الرقمية",
    fact7Desc: "الكتب الرقمية تشكل أكثر من 25٪ من المبيعات.",

    fact8Title: "🎉 مهرجانات الكتب",
    fact8Desc: "معرض فرانكفورت للكتاب هو الأكبر عالميًا.",

    contactTitle: "اتصل بنا",
    contactSubtitle: "هل لديك أسئلة؟ يسعدنا التواصل معك.",

    footerTitle: "بوك فيرس",
    footerDesc: "بوابتك إلى عالم القصص.",
    footerCopy: "© 2025 BookVerse. جميع الحقوق محفوظة.",
    booksTitle: "الكتب المميزة",
    booksSubtitle: "اكتشف قصصًا ستلهمك وتثير حماسك وتغيّر خيالك.",

    book1Desc:
      "براءة الطفولة في مواجهة الظلم العنصري في جنوب الولايات المتحدة.",
    book2Desc:
      "دليل روحي لتحقيق السلام الداخلي من خلال العيش في اللحظة الحالية.",
    book3Desc: "كتاب تطوير ذاتي يشرح 13 خطوة لتحويل الأفكار إلى ثروة ونجاح.",
    book4Desc: "رحلة راعٍ لاكتشاف أسطورته الشخصية ومصيره.",
    book5Desc: "رواية رومانسية عن السلوك الاجتماعي والتربية والزواج.",
    book6Desc: "مغامرة هوبيت لاستعادة كنز مفقود في الأرض الوسطى.",
    book7Desc: "المغامرات السحرية لساحر شاب وأصدقائه.",
    book8Desc:
      "سيرة ذاتية لفتاة نشأت في بيئة انعزالية وبدأت الدراسة في سن السابعة عشرة وحصلت على الدكتوراه.",
    book9Desc:
      "مذكرات ميشيل أوباما التي تروي رحلتها من شيكاغو إلى البيت الأبيض.",
    send: "ارسل رسالة",

    joinNow1: "انضم الآن",
    joinNow2: "انضم الآن",
    joinNow3: "انضم الآن",
    joinNow4: "انضم الآن",
    joinNow5: "انضم الآن",
    joinNow6: "انضم الآن",
    joinNow7: "انضم الآن",
    joinNow8: "انضم الآن",
    joinNow9: "انضم الآن",
  },
};

/* ================== APPLY LANGUAGE ================== */

const langSelect = document.getElementById("langSelect");

function applyLanguage(lang) {
  const data = translations[lang];

  Object.keys(data).forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = data[id];
    }
  });

  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}

langSelect.addEventListener("change", () => {
  applyLanguage(langSelect.value);
});

function setLanguage(lang) {
  document.documentElement.lang = lang;

  if (lang === "ar") {
    document.documentElement.dir = "rtl";
  } else {
    document.documentElement.dir = "ltr";
  }

  applyBooksLanguage(lang);
}

// ======================== CONDITION BUTTON ===============================
// Select all protected buttons
const protectedButtons = document.querySelectorAll(".protected-btn");

protectedButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault(); // prevent default link

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      alert("Please log in first to access this page.");
      window.location.href = "auth.html"; // redirect to login/register
      return;
    }

    // Logged in: redirect based on button
    if (btn.id === "heroBtn") {
      window.location.href = "categorie.html"; // Start Exploring
    } else if (btn.id.startsWith("joinNow")) {
      window.location.href = "book.html"; // Join Now buttons
    }
  });
});
