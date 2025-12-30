const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const welcomeCard = document.getElementById("welcomeCard");
const welcomeTitle = document.getElementById("welcomeTitle");
const welcomeText = document.getElementById("welcomeText");
const switchBtn = document.getElementById("switchBtn");

let isLogin = true;
let currentLang = "en"; // keep track of current language

const translations = {
  en: {
    loginTitle: "Login",
    registerTitle: "Register",
    welcomeLoginTitle: "Welcome Back!",
    welcomeRegisterTitle: "Hello, Reader!",
    welcomeLoginText:
      "Login to access your library account and explore thousands of books.",
    welcomeRegisterText:
      "Register now to create your library account and start exploring.",
    switchToRegister: "Register",
    switchToLogin: "Login",

    loginEmail: "Email",
    loginPassword: "Password",
    loginBtn: "Login", // added

    fullName: "Full Name",
    registerEmail: "Email",
    registerPassword: "Password",
    confirmPassword: "Confirm Password",
    phoneNumber: "Phone Number",
    registerBtn: "Register", // added
    back: "← Back",
  },

  fr: {
    loginTitle: "Connexion",
    registerTitle: "Inscription",
    welcomeLoginTitle: "Bienvenue !",
    welcomeRegisterTitle: "Bonjour lecteur !",
    welcomeLoginText:
      "Connectez-vous pour accéder à votre compte bibliothèque.",
    welcomeRegisterText:
      "Inscrivez-vous maintenant pour créer votre compte et explorer la bibliothèque.",
    switchToRegister: "S'inscrire",
    switchToLogin: "Connexion",

    loginEmail: "Email",
    loginPassword: "Mot de passe",
    loginBtn: "Connexion",

    fullName: "Nom complet",
    registerEmail: "Email",
    registerPassword: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    phoneNumber: "Numéro de téléphone",
    registerBtn: "S'inscrire",
    back: "← Retour",
  },

  ar: {
    loginTitle: "تسجيل الدخول",
    registerTitle: "التسجيل",
    welcomeLoginTitle: "مرحباً بعودتك!",
    welcomeRegisterTitle: "مرحباً أيها القارئ!",
    welcomeLoginText: "سجّل الدخول للوصول إلى حسابك في المكتبة.",
    welcomeRegisterText: "سجّل الآن لإنشاء حسابك واستكشاف المكتبة.",
    switchToRegister: "التسجيل",
    switchToLogin: "تسجيل الدخول",

    loginEmail: "البريد الإلكتروني",
    loginPassword: "كلمة المرور",
    loginBtn: "تسجيل الدخول",

    fullName: "الاسم الكامل",
    registerEmail: "البريد الإلكتروني",
    registerPassword: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    phoneNumber: "رقم الهاتف",
    registerBtn: "التسجيل",
    back: "رجوع ←",
  },
};

// ----------- Form Switch Function -----------
function switchForms() {
  const t = translations[currentLang];

  if (isLogin) {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");

    welcomeTitle.textContent = t.welcomeRegisterTitle;
    welcomeText.textContent = t.welcomeRegisterText;
    switchBtn.textContent = t.switchToLogin;
  } else {
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");

    welcomeTitle.textContent = t.welcomeLoginTitle;
    welcomeText.textContent = t.welcomeLoginText;
    switchBtn.textContent = t.switchToRegister;
  }

  // update login/register button texts too
  document.getElementById("loginBtn").textContent = t.loginBtn;
  document.getElementById("registerBtn").textContent = t.registerBtn;

  isLogin = !isLogin;
}

switchBtn.addEventListener("click", switchForms);

// ----------- Password Toggle -----------
const loginPassword = document.getElementById("loginPassword");
const loginToggle = document.getElementById("loginToggle");

const regPassword = document.getElementById("regPassword");
const regToggle = document.getElementById("regToggle");

const regConfirmPassword = document.getElementById("confirmPassword");
const confirmToggle = document.getElementById("confirmToggle");

loginToggle.addEventListener("click", () => {
  loginPassword.type = loginPassword.type === "password" ? "text" : "password";
});

regToggle.addEventListener("click", () => {
  regPassword.type = regPassword.type === "password" ? "text" : "password";
});

confirmToggle.addEventListener("click", () => {
  regConfirmPassword.type =
    regConfirmPassword.type === "password" ? "text" : "password";
});

// ----------- Language Function -----------
function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  const t = translations[lang];

  // Titles
  document.querySelector("#loginForm h2").textContent = t.loginTitle;
  document.querySelector("#registerForm h2").textContent = t.registerTitle;

  // Update welcome card based on current form
  if (isLogin) {
    welcomeTitle.textContent = t.welcomeLoginTitle;
    welcomeText.textContent = t.welcomeLoginText;
    switchBtn.textContent = t.switchToRegister;
  } else {
    welcomeTitle.textContent = t.welcomeRegisterTitle;
    welcomeText.textContent = t.welcomeRegisterText;
    switchBtn.textContent = t.switchToLogin;
  }

  // Login inputs
  const loginInputs = document.querySelectorAll("#loginForm input");
  loginInputs[0].placeholder = t.loginEmail;
  loginInputs[1].placeholder = t.loginPassword;
  document.getElementById("loginBtn").textContent = t.loginBtn; // update login button

  // Register inputs
  const registerInputs = document.querySelectorAll("#registerForm input");
  registerInputs[0].placeholder = t.fullName;
  registerInputs[1].placeholder = t.registerEmail;
  registerInputs[2].placeholder = t.registerPassword;
  registerInputs[3].placeholder = t.confirmPassword;
  registerInputs[4].placeholder = t.phoneNumber;
  document.getElementById("registerBtn").textContent = t.registerBtn; // update register button

  // Back button
  const backBtn = document.getElementById("back");
  if (backBtn) backBtn.textContent = t.back;

  // RTL support
  if (lang === "ar") {
    document.body.dir = "rtl";
    document.body.classList.add("font-arabic");
  } else {
    document.body.dir = "ltr";
    document.body.classList.remove("font-arabic");
  }
}

// Language selector
document.getElementById("langSelect").addEventListener("change", (e) => {
  setLanguage(e.target.value);
});

// Initialize
setLanguage("en");

// ================= AUTHENTICATION =================

// Inputs
const loginEmailInput = document.getElementById("loginEmail");
const loginPasswordInput = document.getElementById("loginPassword");

const fullNameInput = document.getElementById("fullName");
const registerEmailInput = document.getElementById("registerEmail");
const phoneInput = document.getElementById("phoneNumber");

// ---------- REGISTER ----------
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (regPassword.value !== regConfirmPassword.value) {
    alert("Passwords do not match");
    return;
  }

  // Get existing users array or empty
  let users = JSON.parse(localStorage.getItem("libraryUsers")) || [];

  // Check if email already exists
  const emailExists = users.some((u) => u.email === registerEmailInput.value);
  if (emailExists) {
    alert("Email already registered");
    return;
  }

  const user = {
    name: fullNameInput.value,
    email: registerEmailInput.value,
    password: regPassword.value,
    phone: phoneInput.value,
    role: "User",
    createdAt: new Date().toISOString(),
  };

  users.push(user);

  // Save updated users array
  localStorage.setItem("libraryUsers", JSON.stringify(users));

  alert("Account created successfully!");

  switchForms();
});

// ---------- LOGIN ----------
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailInput = loginEmailInput.value;
  const passwordInput = loginPasswordInput.value;

  // Admin credentials (hardcoded)
  const adminEmail = "admin@gmail.com";
  const adminPassword = "admin123";

  if (emailInput === adminEmail && passwordInput === adminPassword) {
    // Admin login
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ name: "Admin", email: adminEmail, role: "Admin" })
    );
    window.location.href = "dashboard.html"; // redirect to admin dashboard
    return;
  }

  // Normal users
  const users = JSON.parse(localStorage.getItem("libraryUsers")) || [];
  const user = users.find(
    (u) => u.email === emailInput && u.password === passwordInput
  );

  if (!user) {
    alert("Invalid email or password");
    return;
  }

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("currentUser", JSON.stringify(user));

  window.location.href = "landing.html";
});
