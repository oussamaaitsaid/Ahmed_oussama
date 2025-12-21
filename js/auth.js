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
    welcomeLoginText: "Login to access your library account and explore thousands of books.",
    welcomeRegisterText: "Register now to create your library account and start exploring.",
    switchToRegister: "Register",
    switchToLogin: "Login",

    loginEmail: "Email",
    loginPassword: "Password",
    loginBtn: "Login",  // added

    fullName: "Full Name",
    registerEmail: "Email",
    registerPassword: "Password",
    confirmPassword: "Confirm Password",
    phoneNumber: "Phone Number",
    registerBtn: "Register",  // added
    back: "← Back",
  },

  fr: {
    loginTitle: "Connexion",
    registerTitle: "Inscription",
    welcomeLoginTitle: "Bienvenue !",
    welcomeRegisterTitle: "Bonjour lecteur !",
    welcomeLoginText: "Connectez-vous pour accéder à votre compte bibliothèque.",
    welcomeRegisterText: "Inscrivez-vous maintenant pour créer votre compte et explorer la bibliothèque.",
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

const regConfirmPassword = document.getElementById("regConfirmPassword");
const confirmToggle = document.getElementById("confirmToggle");

loginToggle.addEventListener("click", () => {
  loginPassword.type = loginPassword.type === "password" ? "text" : "password";
});

regToggle.addEventListener("click", () => {
  regPassword.type = regPassword.type === "password" ? "text" : "password";
});

confirmToggle.addEventListener("click", () => {
  regConfirmPassword.type = regConfirmPassword.type === "password" ? "text" : "password";
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
