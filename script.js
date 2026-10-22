
"use strict";

const $ = (selector) => document.querySelector(selector);

const STORAGE_KEY = "masroofi-expenses";
const BUDGET_KEY = "masroofi-monthly-budget";
const LANGUAGE_KEY = "masroofi-language";

const SUPABASE_URL = "https://gjnbullclitgdumjhuex.supabase.co";
const SUPABASE_KEY = "sb_publishable_-9G0DmlzLmu8bnRMYv6JpQ_sKXiNhXN";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const CATEGORIES = [
    "طعام ومشروبات", "مواصلات", "تسوق",
    "فواتير", "ترفيه", "أخرى"
];

const CATEGORY_META = {
    "طعام ومشروبات": { icon: "☕", color: "#198754", en: "Food & Drinks", db: "food" },
    "مواصلات": { icon: "🚗", color: "#36a2eb", en: "Transport", db: "transport" },
    "تسوق": { icon: "🛍️", color: "#ffcd56", en: "Shopping", db: "shopping" },
    "فواتير": { icon: "🧾", color: "#ff6384", en: "Bills", db: "bills" },
    "ترفيه": { icon: "🎮", color: "#9966ff", en: "Entertainment", db: "entertainment" },
    "أخرى": { icon: "📦", color: "#ff9f40", en: "Other", db: "other" }
};

const translations = {
    ar: {
        tagline: "تابع مصروفاتك وتحكّم بميزانيتك",
        analytics: "التحليلات",
        overview: "نظرة عامة",
        dashboard: "لوحة التحكم",
        "dashboard-desc": "كل مصروفاتك في مكان واحد.",
        "total-expenses": "إجمالي المصروفات",
        "all-recorded": "جميع المصروفات المسجلة",
        "expense-count": "عدد المصروفات",
        transactions: "عملية مسجلة",
        "monthly-budget": "الميزانية الشهرية",
        "edit-budget": "تعديل الميزانية",
        remaining: "المتبقي هذا الشهر",
        "transactions-label": "المعاملات",
        "my-expenses": "مصروفاتي",
        "expenses-desc": "تابع مصروفاتك اليومية بكل سهولة.",
        "add-expense": "إضافة مصروف",
        "new-expense": "إضافة مصروف جديد",
        "edit-expense": "تعديل المصروف",
        "form-desc": "أدخل تفاصيل العملية.",
        "expense-name": "اسم المصروف",
        amount: "المبلغ (ر.س)",
        category: "التصنيف",
        date: "التاريخ",
        "save-expense": "حفظ المصروف",
        "update-expense": "حفظ التعديلات",
        cancel: "إلغاء",
        "all-categories": "جميع التصنيفات",
        newest: "الأحدث أولًا",
        oldest: "الأقدم أولًا",
        highest: "الأعلى مبلغًا",
        lowest: "الأقل مبلغًا",
        "recent-expenses": "سجل المصروفات",
        "empty-title": "لا توجد مصروفات حتى الآن",
        "empty-desc": "أضف أول مصروف لك لتبدأ متابعة إنفاقك.",
        "no-results": "لا توجد نتائج تطابق بحثك.",
        insights: "التقارير والإحصائيات",
        "analytics-title": "التحليلات المالية",
        "analytics-desc": "افهم عادات إنفاقك واتخذ قرارات أفضل.",
        back: "العودة للمصروفات ←",
        "top-category": "أكثر تصنيف إنفاقًا",
        "monthly-average": "متوسط الإنفاق الشهري",
        "last-six-months": "خلال آخر ستة أشهر",
        "monthly-comparison": "مقارنة المصروفات الشهرية",
        "category-distribution": "توزيع المصروفات",
        "by-category": "حسب التصنيف",
        "category-details": "تفاصيل الإنفاق حسب التصنيف",
        "category-details-desc": "نسبة كل تصنيف من إجمالي المصروفات.",
        "chart-unavailable": "الرسوم البيانية غير متاحة حاليًا.",
        footer: "إدارة أموالك تبدأ بخطوة.",
        budget: "أدخل ميزانيتك الشهرية بالريال:",
        "budget-saved": "تم تحديث الميزانية.",
        "expense-added": "تمت إضافة المصروف بنجاح.",
        "expense-updated": "تم تحديث المصروف بنجاح.",
        "expense-deleted": "تم حذف المصروف.",
        "confirm-delete": "هل أنت متأكد من حذف هذا المصروف؟",
        "invalid-amount": "أدخل مبلغًا صحيحًا أكبر من صفر.",
        "invalid-name": "أدخل اسم المصروف.",
        "invalid-date": "تأكد من صحة التاريخ.",
        "save-error": "تعذر حفظ البيانات.",
        "search-placeholder": "ابحث عن مصروف...",
        "count-label": "عملية",
        "over-budget": "تجاوزت ميزانيتك الشهرية.",
        "budget-ok": "أنت ضمن ميزانيتك الشهرية.",
        "no-budget": "حدد ميزانيتك لمتابعة المتبقي.",
        "no-category-data": "أضف مصروفاتك حتى تظهر التحليلات.",
        "no-category": "لا يوجد إنفاق",
        "share-percent": "من إجمالي الإنفاق",
        currency: "ر.س",
        "confirm-reset": "إلغاء التعديل؟ ستفقد التغييرات غير المحفوظة.",
        login: "تسجيل الدخول",
        signup: "إنشاء حساب",
        "login-description": "سجّل دخولك لمتابعة مصروفاتك من أي جهاز.",
        "signup-description": "أنشئ حسابًا لحفظ مصروفاتك بأمان.",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        "google-login": "المتابعة باستخدام Google",
        "no-account": "ليس لديك حساب؟ أنشئ حسابًا",
        "have-account": "لديك حساب؟ سجّل الدخول",
        logout: "تسجيل الخروج",
        "login-success": "تم تسجيل الدخول بنجاح.",
        "signup-success": "تم إنشاء الحساب. تحقق من بريدك إذا طُلب منك ذلك.",
        "login-error": "تعذر تسجيل الدخول. تحقق من البيانات وحاول مجددًا.",
        "cloud-error": "تعذر الاتصال بقاعدة البيانات. حاول مجددًا.",
        loading: "جارٍ التحميل..."
    },
    en: {
        tagline: "Track expenses and manage your budget",
        analytics: "Analytics",
        overview: "OVERVIEW",
        dashboard: "Dashboard",
        "dashboard-desc": "All your expenses in one place.",
        "total-expenses": "Total expenses",
        "all-recorded": "All recorded expenses",
        "expense-count": "Number of expenses",
        transactions: "transactions recorded",
        "monthly-budget": "Monthly budget",
        "edit-budget": "Edit budget",
        remaining: "Remaining this month",
        "transactions-label": "TRANSACTIONS",
        "my-expenses": "My expenses",
        "expenses-desc": "Track your daily spending with ease.",
        "add-expense": "Add expense",
        "new-expense": "Add a new expense",
        "edit-expense": "Edit expense",
        "form-desc": "Enter the transaction details.",
        "expense-name": "Expense name",
        amount: "Amount (SAR)",
        category: "Category",
        date: "Date",
        "save-expense": "Save expense",
        "update-expense": "Save changes",
        cancel: "Cancel",
        "all-categories": "All categories",
        newest: "Newest first",
        oldest: "Oldest first",
        highest: "Highest amount",
        lowest: "Lowest amount",
        "recent-expenses": "Expense history",
        "empty-title": "No expenses yet",
        "empty-desc": "Add your first expense to start tracking spending.",
        "no-results": "No expenses match your search.",
        insights: "REPORTS & INSIGHTS",
        "analytics-title": "Financial analytics",
        "analytics-desc": "Understand your spending habits and make better decisions.",
        back: "← Back to expenses",
        "top-category": "Top spending category",
        "monthly-average": "Monthly spending average",
        "last-six-months": "Over the last six months",
        "monthly-comparison": "Monthly expense comparison",
        "category-distribution": "Expense distribution",
        "by-category": "By category",
        "category-details": "Spending by category",
        "category-details-desc": "Each category's share of total spending.",
        "chart-unavailable": "Charts are currently unavailable.",
        footer: "Better money management starts with one step.",
        budget: "Enter your monthly budget in SAR:",
        "budget-saved": "Budget updated.",
        "expense-added": "Expense added successfully.",
        "expense-updated": "Expense updated successfully.",
        "expense-deleted": "Expense deleted.",
        "confirm-delete": "Are you sure you want to delete this expense?",
        "invalid-amount": "Enter a valid amount greater than zero.",
        "invalid-name": "Enter an expense name.",
        "invalid-date": "Check the date.",
        "save-error": "Could not save data.",
        "search-placeholder": "Search expenses...",
        "count-label": "transactions",
        "over-budget": "You have exceeded your monthly budget.",
        "budget-ok": "You are within your monthly budget.",
        "no-budget": "Set a budget to track your remaining balance.",
        "no-category-data": "Add expenses to see your analytics.",
        "no-category": "No spending",
        "share-percent": "of total spending",
        currency: "SAR",
        "confirm-reset": "Cancel editing? Unsaved changes will be lost.",
        login: "Sign in",
        signup: "Create account",
        "login-description": "Sign in to access your expenses on any device.",
        "signup-description": "Create an account to save your expenses securely.",
        email: "Email address",
        password: "Password",
        "google-login": "Continue with Google",
        "no-account": "Don't have an account? Sign up",
        "have-account": "Already have an account? Sign in",
        logout: "Sign out",
        "login-success": "Signed in successfully.",
        "signup-success": "Account created. Check your email if verification is required.",
        "login-error": "Could not sign in. Check your details and try again.",
        "cloud-error": "Could not connect to the database. Try again.",
        loading: "Loading..."
    }
};

/* ---------- Elements ---------- */

const authPage = $("#auth-page");
const authForm = $("#auth-form");
const authTitle = $("#auth-title");
const authDescription = $("#auth-description");
const authEmail = $("#auth-email");
const authPassword = $("#auth-password");
const authSubmit = $("#auth-submit");
const authSwitch = $("#auth-switch");
const authMessage = $("#auth-message");
const googleLogin = $("#google-login");
const userBar = $("#user-bar");
const userEmail = $("#user-email");
const logoutButton = $("#logout-button");

const homePage = $("#home-page");
const analyticsPage = $("#analytics-page");
const analyticsButton = $("#analytics-button");
const backButton = $("#back-button");
const brandLink = $("#brand-link");
const languageButton = $("#language-button");

const addButton = $("#show-form-button");
const expenseForm = $("#expense-form");
const cancelButton = $("#cancel-button");
const cancelFormButton = $("#cancel-form-button");
const formTitle = $("#form-title");
const saveButton = $("#save-button");
const expensesList = $("#expenses-list");
const emptyMessage = $("#empty-message");

const totalExpenses = $("#total-expenses");
const expensesCount = $("#expenses-count");
const analyticsTotal = $("#analytics-total");
const topCategory = $("#top-category");
const topCategoryAmount = $("#top-category-amount");
const monthlyAverage = $("#monthly-average");

const budgetValue = $("#budget-value");
const remainingValue = $("#remaining-value");
const budgetProgress = $("#budget-progress");
const budgetStatus = $("#budget-status");
const editBudgetButton = $("#edit-budget-button");

const nameInput = $("#expense-name");
const amountInput = $("#expense-amount");
const categoryInput = $("#expense-category");
const dateInput = $("#expense-date");

const searchInput = $("#search-expenses");
const filterCategory = $("#filter-category");
const sortExpenses = $("#sort-expenses");
const visibleCount = $("#visible-count");

const categoryBreakdown = $("#category-breakdown");
const monthlyCanvas = $("#monthly-chart");
const categoryCanvas = $("#category-chart");
const monthlyFallback = $("#monthly-chart-fallback");
const categoryFallback = $("#category-chart-fallback");
const todayLabel = $("#today-label");
const toast = $("#toast");

/* ---------- State ---------- */

let expenses = [];
let budget = 1000;
let editingId = null;
let language = "ar";
let monthlyChart = null;
let categoryChart = null;
let toastTimer = null;
let currentUser = null;
let authMode = "login";
let isLoading = false;

/* ---------- Helpers ---------- */

function t(key) {
    return translations[language][key] || key;
}

function todayDate() {
    const now = new Date();

    return [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0")
    ].join("-");
}

function money(amount) {
    return new Intl.NumberFormat(
        language === "ar" ? "ar-SA" : "en-US",
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    ).format(amount) + " " + t("currency");
}

function displayCategory(category) {
    return language === "en"
        ? (CATEGORY_META[category]?.en || category)
        : category;
}

function displayDate(dateString) {
    const parts = dateString.split("-").map(Number);
    const date = new Date(parts[0], parts[1] - 1, parts[2]);

    return new Intl.DateTimeFormat(
        language === "ar" ? "ar-SA" : "en-GB",
        { day: "numeric", month: "short", year: "numeric" }
    ).format(date);
}

function monthKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getCurrentMonthExpenses() {
    const currentMonth = monthKey(new Date());
    return expenses.filter((expense) => expense.date.startsWith(currentMonth));
}

function makeId() {
    return window.crypto?.randomUUID
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function showToast(message, isError = false) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.toggle("error", isError);
    toast.classList.add("show");

    toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function setAuthMessage(message, type = "") {
    authMessage.textContent = message;
    authMessage.classList.remove("error", "success");

    if (type) authMessage.classList.add(type);
}

function setAuthBusy(busy) {
    isLoading = busy;
    authSubmit.disabled = busy;
    googleLogin.disabled = busy;
    authSwitch.disabled = busy;
    authSubmit.textContent = busy
        ? t("loading")
        : t(authMode === "login" ? "login" : "signup");
}

/* ---------- Local preferences ---------- */

function loadBudget() {
    try {
        const value = Number(localStorage.getItem(BUDGET_KEY));
        return Number.isFinite(value) && value >= 0 ? value : 1000;
    } catch {
        return 1000;
    }
}

function saveBudget() {
    try {
        localStorage.setItem(BUDGET_KEY, String(budget));
        return true;
    } catch (error) {
        console.error(error);
        showToast(t("save-error"), true);
        return false;
    }
}

/* ---------- Authentication ---------- */

function setAuthMode(mode) {
    authMode = mode;
    authTitle.textContent = t(mode === "login" ? "login" : "signup");
    authDescription.textContent = t(
        mode === "login" ? "login-description" : "signup-description"
    );
    authSubmit.textContent = t(mode === "login" ? "login" : "signup");
    authSwitch.textContent = t(
        mode === "login" ? "no-account" : "have-account"
    );
    authPassword.autocomplete = mode === "login"
        ? "current-password"
        : "new-password";
    setAuthMessage("");
}

authSwitch.addEventListener("click", () => {
    if (isLoading) return;
    setAuthMode(authMode === "login" ? "signup" : "login");
});

authForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (isLoading) return;

    const email = authEmail.value.trim();
    const password = authPassword.value;

    if (!email || !password) return;

    setAuthBusy(true);
    setAuthMessage("");

    try {
        if (authMode === "signup") {
            const { data, error } = await supabaseClient.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: window.location.origin
                }
            });

            if (error) throw error;

            if (data.session) {
                setAuthMessage(t("signup-success"), "success");
            } else {
                setAuthMessage(t("signup-success"), "success");
            }
        } else {
            const { error } = await supabaseClient.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;
        }
    } catch (error) {
        console.error("Authentication error:", error);
        setAuthMessage(
            authMode === "login" ? t("login-error") : error.message,
            "error"
        );
    } finally {
        setAuthBusy(false);
    }
});

googleLogin.addEventListener("click", async () => {
    if (isLoading) return;

    setAuthBusy(true);
    setAuthMessage("");

    try {
        const { error } = await supabaseClient.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.origin
            }
        });

        if (error) throw error;
    } catch (error) {
        console.error("Google sign-in error:", error);
        setAuthMessage(error.message || t("login-error"), "error");
        setAuthBusy(false);
    }
});

logoutButton.addEventListener("click", async () => {
    logoutButton.disabled = true;

    try {
        const { error } = await supabaseClient.auth.signOut();
        if (error) throw error;
    } catch (error) {
        console.error("Sign-out error:", error);
        showToast(t("cloud-error"), true);
    } finally {
        logoutButton.disabled = false;
    }
});

function showSignedOut() {
    currentUser = null;
    expenses = [];
    editingId = null;

    authPage.classList.remove("hidden");
    userBar.classList.add("hidden");
    homePage.classList.add("hidden");
    analyticsPage.classList.add("hidden");
    analyticsButton.classList.add("hidden");

    expenseForm.classList.add("hidden");
    expensesList.replaceChildren();
    renderAll();
}

async function showSignedIn(user) {
    currentUser = user;

    authPage.classList.add("hidden");
    userBar.classList.remove("hidden");
    homePage.classList.remove("hidden");
    analyticsPage.classList.add("hidden");
    analyticsButton.classList.remove("hidden");

    userEmail.textContent = user.email || "";
    budget = loadBudget();

    setAuthMessage("");

    try {
        await loadCloudExpenses();
        renderAll();
    } catch (error) {
        console.error("Could not load expenses:", error);
        expenses = [];
        renderAll();
        showToast(t("cloud-error"), true);
    }
}

/* ---------- Cloud database ---------- */

function categoryToDatabase(category) {
    return CATEGORY_META[category]?.db || "other";
}

function categoryFromDatabase(value) {
    const match = CATEGORIES.find(
        (category) => CATEGORY_META[category]?.db === value
    );

    // Supports rows that contain the original Arabic category name.
    return match || (CATEGORIES.includes(value) ? value : "أخرى");
}

function mapDatabaseExpense(row) {
    return {
        id: String(row.id),
        name: row.name,
        amount: Number(row.amount),
        category: categoryFromDatabase(row.category),
        date: row.date
    };
}

async function loadCloudExpenses() {
    if (!currentUser) {
        expenses = [];
        return;
    }

    const { data, error } = await supabaseClient
        .from("expenses")
        .select("id, user_id, name, amount, category, date")
        .eq("user_id", currentUser.id)
        .order("date", { ascending: false });

    if (error) throw error;

    expenses = (data || []).map(mapDatabaseExpense);

    // Import old browser-only expenses once if the cloud account is empty.
    // Imported records are assigned to the currently signed-in user.
    if (expenses.length === 0) {
        await importOldLocalExpenses();
    }
}

async function importOldLocalExpenses() {
    if (!currentUser) return;

    let oldExpenses = [];

    try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

        if (Array.isArray(stored)) {
            oldExpenses = stored.filter((item) =>
                item &&
                typeof item.name === "string" &&
                item.name.trim() &&
                Number.isFinite(Number(item.amount)) &&
                Number(item.amount) > 0 &&
                CATEGORIES.includes(item.category) &&
                /^\d{4}-\d{2}-\d{2}$/.test(item.date)
            );
        }
    } catch {
        oldExpenses = [];
    }

    if (!oldExpenses.length) return;

    const rows = oldExpenses.map((item) => ({
        id: makeId(),
        user_id: currentUser.id,
        name: item.name.trim(),
        amount: Number(item.amount),
        category: categoryToDatabase(item.category),
        date: item.date
    }));

    const { data, error } = await supabaseClient
        .from("expenses")
        .insert(rows)
        .select("id, user_id, name, amount, category, date");

    if (error) {
        console.error("Old expense import failed:", error);
        throw error;
    }

    expenses = (data || []).map(mapDatabaseExpense);
}

async function insertCloudExpense(expense) {
    if (!currentUser) throw new Error("No signed-in user.");

    const row = {
        id: expense.id,
        user_id: currentUser.id,
        name: expense.name,
        amount: expense.amount,
        category: categoryToDatabase(expense.category),
        date: expense.date
    };

    const { data, error } = await supabaseClient
        .from("expenses")
        .insert(row)
        .select("id, user_id, name, amount, category, date")
        .single();

    if (error) throw error;

    return mapDatabaseExpense(data);
}

async function updateCloudExpense(expense) {
    if (!currentUser) throw new Error("No signed-in user.");

    const { data, error } = await supabaseClient
        .from("expenses")
        .update({
            name: expense.name,
            amount: expense.amount,
            category: categoryToDatabase(expense.category),
            date: expense.date
        })
        .eq("id", expense.id)
        .eq("user_id", currentUser.id)
        .select("id, user_id, name, amount, category, date")
        .single();

    if (error) throw error;

    return mapDatabaseExpense(data);
}

async function deleteCloudExpense(id) {
    if (!currentUser) throw new Error("No signed-in user.");

    const { error } = await supabaseClient
        .from("expenses")
        .delete()
        .eq("id", id)
        .eq("user_id", currentUser.id);

    if (error) throw error;
}

/* ---------- Language ---------- */

function updateLanguage() {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    languageButton.textContent = language === "ar" ? "English" : "العربية";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;

        if (translations[language][key]) {
            element.textContent = t(key);
        }
    });

    document.querySelectorAll("[data-category]").forEach((option) => {
        const category = CATEGORIES.find(
            (item) => CATEGORY_META[item]?.db === option.dataset.category
        );

        if (category) option.textContent = displayCategory(category);
    });

    searchInput.placeholder = t("search-placeholder");

    $("#brand-title").innerHTML = language === "ar"
        ? 'مصروفي <span>Masroofi</span>'
        : 'Masroofi <span>Personal Finance</span>';

    authEmail.previousElementSibling.textContent = t("email");
    authPassword.previousElementSibling.textContent = t("password");
    googleLogin.textContent = t("google-login");
    logoutButton.textContent = t("logout");

    todayLabel.textContent = new Intl.DateTimeFormat(
        language === "ar" ? "ar-SA" : "en-GB",
        { day: "numeric", month: "long", year: "numeric" }
    ).format(new Date());

    authTitle.textContent = t(authMode === "login" ? "login" : "signup");
    authDescription.textContent = t(
        authMode === "login" ? "login-description" : "signup-description"
    );
    authSubmit.textContent = t(authMode === "login" ? "login" : "signup");
    authSwitch.textContent = t(
        authMode === "login" ? "no-account" : "have-account"
    );

    renderAll();
}

languageButton.addEventListener("click", () => {
    language = language === "ar" ? "en" : "ar";

    try {
        localStorage.setItem(LANGUAGE_KEY, language);
    } catch {
        // Keep language for this session.
    }

    updateLanguage();
});

/* ---------- Page navigation ---------- */

function showHome() {
    if (!currentUser) return;

    analyticsPage.classList.add("hidden");
    homePage.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function showAnalytics() {
    if (!currentUser) return;

    homePage.classList.add("hidden");
    analyticsPage.classList.remove("hidden");
    renderAnalytics();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

analyticsButton.addEventListener("click", showAnalytics);
backButton.addEventListener("click", showHome);

brandLink.addEventListener("click", (event) => {
    event.preventDefault();
    showHome();
});

/* ---------- Expense form ---------- */

function openForm(expense = null) {
    if (!currentUser) return;

    editingId = expense ? expense.id : null;

    expenseForm.reset();
    dateInput.value = expense ? expense.date : todayDate();

    if (expense) {
        nameInput.value = expense.name;
        amountInput.value = expense.amount;
        categoryInput.value = expense.category;
    }

    formTitle.textContent = t(expense ? "edit-expense" : "new-expense");
    saveButton.textContent = t(expense ? "update-expense" : "save-expense");

    expenseForm.classList.remove("hidden");
    expenseForm.scrollIntoView({ behavior: "smooth", block: "nearest" });
    nameInput.focus();
}

function closeForm() {
    if (editingId !== null && !expenseForm.classList.contains("hidden")) {
        if (!window.confirm(t("confirm-reset"))) return;
    }

    editingId = null;
    expenseForm.reset();
    dateInput.value = todayDate();
    expenseForm.classList.add("hidden");
    formTitle.textContent = t("new-expense");
    saveButton.textContent = t("save-expense");
}

addButton.addEventListener("click", () => {
    if (!currentUser) return;

    if (!expenseForm.classList.contains("hidden") && editingId === null) {
        nameInput.focus();
        return;
    }

    openForm();
});

cancelButton.addEventListener("click", closeForm);
cancelFormButton.addEventListener("click", closeForm);

expenseForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!currentUser || isLoading) return;

    const name = nameInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    const date = dateInput.value;

    if (!name) {
        showToast(t("invalid-name"), true);
        nameInput.focus();
        return;
    }

    if (!Number.isFinite(amount) || amount <= 0 || amount > 100000000) {
        showToast(t("invalid-amount"), true);
        amountInput.focus();
        return;
    }

    if (
        !CATEGORIES.includes(category) ||
        !date ||
        !/^\d{4}-\d{2}-\d{2}$/.test(date)
    ) {
        showToast(t("invalid-date"), true);
        dateInput.focus();
        return;
    }

    const wasEditing = editingId !== null;
    const oldId = editingId;

    saveButton.disabled = true;

    try {
        if (wasEditing) {
            const updated = await updateCloudExpense({
                id: oldId,
                name,
                amount,
                category,
                date
            });

            expenses = expenses.map((expense) =>
                expense.id === oldId ? updated : expense
            );
        } else {
            const inserted = await insertCloudExpense({
                id: makeId(),
                name,
                amount,
                category,
                date
            });

            expenses.push(inserted);
        }

        editingId = null;
        expenseForm.reset();
        dateInput.value = todayDate();
        expenseForm.classList.add("hidden");

        renderAll();
        showToast(t(wasEditing ? "expense-updated" : "expense-added"));
    } catch (error) {
        console.error("Expense save failed:", error);
        showToast(t("cloud-error"), true);
    } finally {
        saveButton.disabled = false;
    }
});

/* ---------- Search, filter and sort ---------- */

searchInput.addEventListener("input", renderExpenses);
filterCategory.addEventListener("change", renderExpenses);
sortExpenses.addEventListener("change", renderExpenses);

function getVisibleExpenses() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    const category = filterCategory.value;
    const sort = sortExpenses.value;

    const result = expenses.filter((expense) => {
        const matchesName = expense.name.toLocaleLowerCase().includes(query);
        const matchesCategory = category === "all" || expense.category === category;
        return matchesName && matchesCategory;
    });

    result.sort((a, b) => {
        if (sort === "newest") return b.date.localeCompare(a.date);
        if (sort === "oldest") return a.date.localeCompare(b.date);
        if (sort === "highest") return b.amount - a.amount;
        if (sort === "lowest") return a.amount - b.amount;
        return 0;
    });

    return result;
}

/* ---------- Render expenses ---------- */

function renderExpenses() {
    expensesList.replaceChildren();

    const visibleExpenses = getVisibleExpenses();
    visibleCount.textContent = `${visibleExpenses.length} ${t("count-label")}`;

    emptyMessage.classList.toggle("hidden", visibleExpenses.length > 0);

    const hasFilters =
        searchInput.value.trim() !== "" || filterCategory.value !== "all";

    if (visibleExpenses.length === 0) {
        $("#empty-message h3").textContent = hasFilters
            ? t("no-results")
            : t("empty-title");

        $("#empty-message p").textContent = hasFilters ? "" : t("empty-desc");
    }

    visibleExpenses.forEach((expense) => {
        const item = document.createElement("article");
        item.className = "expense-item";

        const details = document.createElement("div");
        details.className = "expense-details";

        const categoryIcon = document.createElement("div");
        categoryIcon.className = "expense-category-icon";
        categoryIcon.textContent = CATEGORY_META[expense.category]?.icon || "📦";
        categoryIcon.setAttribute("aria-hidden", "true");

        const textDetails = document.createElement("div");
        textDetails.className = "expense-text";

        const title = document.createElement("h3");
        title.textContent = expense.name;

        const info = document.createElement("p");
        info.textContent =
            `${displayCategory(expense.category)} · ${displayDate(expense.date)}`;

        textDetails.append(title, info);
        details.append(categoryIcon, textDetails);

        const right = document.createElement("div");
        right.className = "expense-right";

        const amount = document.createElement("span");
        amount.className = "expense-amount";
        amount.textContent = money(expense.amount);

        const editButton = document.createElement("button");
        editButton.className = "edit-button";
        editButton.type = "button";
        editButton.textContent = language === "ar" ? "تعديل" : "Edit";
        editButton.setAttribute("aria-label", `${editButton.textContent} ${expense.name}`);
        editButton.addEventListener("click", () => openForm(expense));

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.type = "button";
        deleteButton.textContent = language === "ar" ? "حذف" : "Delete";
        deleteButton.setAttribute("aria-label", `${deleteButton.textContent} ${expense.name}`);

        deleteButton.addEventListener("click", async () => {
            if (!window.confirm(t("confirm-delete"))) return;

            deleteButton.disabled = true;

            try {
                await deleteCloudExpense(expense.id);
                expenses = expenses.filter((current) => current.id !== expense.id);

                if (editingId === expense.id) {
                    editingId = null;
                    expenseForm.reset();
                    expenseForm.classList.add("hidden");
                }

                renderAll();
                showToast(t("expense-deleted"));
            } catch (error) {
                console.error("Expense deletion failed:", error);
                showToast(t("cloud-error"), true);
            } finally {
                deleteButton.disabled = false;
            }
        });

        right.append(amount, editButton, deleteButton);
        item.append(details, right);
        expensesList.append(item);
    });

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    totalExpenses.textContent = money(total);
    expensesCount.textContent = new Intl.NumberFormat(
        language === "ar" ? "ar-SA" : "en-US"
    ).format(expenses.length);

    renderBudget();

    if (!analyticsPage.classList.contains("hidden")) renderAnalytics();
}

/* ---------- Monthly budget ---------- */

function renderBudget() {
    const spent = getCurrentMonthExpenses().reduce(
        (sum, expense) => sum + expense.amount,
        0
    );

    const remaining = budget - spent;
    const percent = budget > 0 ? (spent / budget) * 100 : 0;

    budgetValue.textContent = money(budget);
    remainingValue.textContent = money(remaining);

    budgetProgress.style.width = `${Math.min(percent, 100)}%`;
    budgetProgress.style.background =
        percent > 100 ? "#c43d3d" : "var(--primary)";

    if (budget === 0) {
        budgetStatus.textContent = t("no-budget");
    } else if (remaining < 0) {
        budgetStatus.textContent = t("over-budget");
    } else {
        budgetStatus.textContent = t("budget-ok");
    }

    remainingValue.style.color = remaining < 0 ? "#c43d3d" : "var(--text)";
}

editBudgetButton.addEventListener("click", () => {
    if (!currentUser) return;

    const answer = window.prompt(t("budget"), String(budget));
    if (answer === null) return;

    const newBudget = Number(answer.trim());

    if (!Number.isFinite(newBudget) || newBudget < 0 || newBudget > 100000000) {
        showToast(t("invalid-amount"), true);
        return;
    }

    const oldBudget = budget;
    budget = newBudget;

    if (!saveBudget()) {
        budget = oldBudget;
        return;
    }

    renderBudget();
    showToast(t("budget-saved"));
});

/* ---------- Analytics ---------- */

function renderAnalytics() {
    if (!currentUser) return;

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    analyticsTotal.textContent = money(total);

    const categoryTotals = {};

    expenses.forEach((expense) => {
        categoryTotals[expense.category] =
            (categoryTotals[expense.category] || 0) + expense.amount;
    });

    const categories = Object.keys(categoryTotals).sort(
        (a, b) => categoryTotals[b] - categoryTotals[a]
    );

    if (categories.length === 0) {
        topCategory.textContent = "—";
        topCategoryAmount.textContent = "";
    } else {
        topCategory.textContent = displayCategory(categories[0]);
        topCategoryAmount.textContent = money(categoryTotals[categories[0]]);
    }

    const months = getLastSixMonths();

    const monthlyTotal = months.reduce((sum, month) => {
        return sum + expenses
            .filter((expense) => expense.date.startsWith(month.key))
            .reduce((monthSum, expense) => monthSum + expense.amount, 0);
    }, 0);

    monthlyAverage.textContent = money(monthlyTotal / 6);

    renderMonthlyChart(months);
    renderCategoryChart(categories, categoryTotals);
    renderCategoryBreakdown(categories, categoryTotals, total);
}

function getLastSixMonths() {
    const current = new Date();
    current.setDate(1);
    current.setHours(12, 0, 0, 0);

    const months = [];

    for (let offset = 5; offset >= 0; offset--) {
        const date = new Date(
            current.getFullYear(),
            current.getMonth() - offset,
            1,
            12
        );

        months.push({
            key: monthKey(date),
            label: new Intl.DateTimeFormat(
                language === "ar" ? "ar-SA" : "en-US",
                { month: "short", year: "numeric", calendar: "gregory" }
            ).format(date)
        });
    }

    return months;
}

function chartAvailable(canvas, fallback) {
    const available = typeof window.Chart !== "undefined";
    canvas.classList.toggle("hidden", !available);
    fallback.classList.toggle("hidden", available);
    return available;
}

function renderMonthlyChart(months) {
    if (!chartAvailable(monthlyCanvas, monthlyFallback)) return;

    const values = months.map((month) =>
        expenses
            .filter((expense) => expense.date.startsWith(month.key))
            .reduce((sum, expense) => sum + expense.amount, 0)
    );

    if (monthlyChart) monthlyChart.destroy();

    monthlyChart = new Chart(monthlyCanvas, {
        type: "bar",
        data: {
            labels: months.map((month) => month.label),
            datasets: [{
                label: t("total-expenses"),
                data: values,
                backgroundColor: "#198754",
                hoverBackgroundColor: "#126c42",
                borderRadius: 7,
                maxBarThickness: 45
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 300 },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => money(context.parsed.y || 0)
                    }
                }
            },
            scales: {
                x: { grid: { display: false }, ticks: { maxRotation: 0 } },
                y: {
                    beginAtZero: true,
                    grid: { color: "#edf1ee" },
                    ticks: {
                        callback: (value) => new Intl.NumberFormat(
                            language === "ar" ? "ar-SA" : "en-US"
                        ).format(value)
                    }
                }
            }
        }
    });
}

function renderCategoryChart(categories, totals) {
    if (!chartAvailable(categoryCanvas, categoryFallback)) return;

    if (categoryChart) categoryChart.destroy();

    const hasData = categories.length > 0;
    const labels = hasData
        ? categories.map(displayCategory)
        : [t("no-category")];

    const values = hasData
        ? categories.map((category) => totals[category])
        : [1];

    const colors = hasData
        ? categories.map((category) => CATEGORY_META[category]?.color || "#9ba9a0")
        : ["#e3ebe5"];

    categoryChart = new Chart(categoryCanvas, {
        type: "doughnut",
        data: {
            labels,
            datasets: [{
                data: values,
                backgroundColor: colors,
                borderColor: "#ffffff",
                borderWidth: 3,
                hoverOffset: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "67%",
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        usePointStyle: true,
                        pointStyle: "circle",
                        padding: 17,
                        font: { family: "Arial", size: 12 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => hasData
                            ? `${context.label}: ${money(Number(context.raw))}`
                            : t("no-category")
                    }
                }
            }
        }
    });
}

function renderCategoryBreakdown(categories, totals, total) {
    categoryBreakdown.replaceChildren();

    if (categories.length === 0) {
        const message = document.createElement("p");
        message.className = "breakdown-empty";
        message.textContent = t("no-category-data");
        categoryBreakdown.append(message);
        return;
    }

    categories.forEach((category) => {
        const amount = totals[category];
        const percentage = total > 0 ? amount / total * 100 : 0;

        const item = document.createElement("div");
        item.className = "breakdown-item";

        const top = document.createElement("div");
        top.className = "breakdown-top";

        const name = document.createElement("span");
        name.textContent =
            `${CATEGORY_META[category]?.icon || ""} ${displayCategory(category)}`;

        const value = document.createElement("strong");
        value.textContent = `${money(amount)} (${percentage.toFixed(1)}%)`;

        const track = document.createElement("div");
        track.className = "breakdown-track";

        const fill = document.createElement("div");
        fill.className = "breakdown-fill";
        fill.style.width = `${percentage}%`;
        fill.style.background = CATEGORY_META[category]?.color || "var(--primary)";

        top.append(name, value);
        track.append(fill);
        item.append(top, track);
        categoryBreakdown.append(item);
    });
}

/* ---------- Refresh views ---------- */

function renderAll() {
    renderExpenses();

    if (currentUser && !analyticsPage.classList.contains("hidden")) {
        renderAnalytics();
    }
}

/* ---------- Initialize ---------- */

async function initializeApp() {
    dateInput.value = todayDate();
    budget = loadBudget();

    try {
        const savedLanguage = localStorage.getItem(LANGUAGE_KEY);

        if (savedLanguage === "ar" || savedLanguage === "en") {
            language = savedLanguage;
        }
    } catch {
        // Arabic is the default.
    }

    updateLanguage();
    setAuthMode("login");
    showSignedOut();

    const { data, error } = await supabaseClient.auth.getSession();

    if (error) {
        console.error("Session error:", error);
        setAuthMessage(t("login-error"), "error");
        return;
    }

    if (data.session?.user) {
        await showSignedIn(data.session.user);
    }

    supabaseClient.auth.onAuthStateChange((event, session) => {
        // Defer database requests outside the auth callback.
        setTimeout(async () => {
            if (session?.user) {
                if (currentUser?.id !== session.user.id) {
                    await showSignedIn(session.user);
                }
            } else {
                showSignedOut();
            }
        }, 0);
    });
}

initializeApp();
