// Language and Authentication Management
let currentLang = 'en';
let isLoggedIn = false;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Language switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });

    // Authentication modal
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const authModal = document.getElementById('authModal');
    const modalClose = document.getElementById('modalClose');
    const modalTabs = document.querySelectorAll('.modal-tab');
    const modalForms = document.querySelectorAll('.modal-form');
    const registerLink = document.querySelector('.register-link');
    const loginLink = document.querySelector('.login-link');

    loginBtn.addEventListener('click', () => {
        authModal.classList.add('active');
        showTab('login');
    });

    registerBtn.addEventListener('click', () => {
        authModal.classList.add('active');
        showTab('register');
    });

    modalClose.addEventListener('click', () => {
        authModal.classList.remove('active');
    });

    modalTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            showTab(tabName);
        });
    });

    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        showTab('register');
    });

    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        showTab('login');
    });

    // Form submissions
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        handleLogin();
    });

    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        handleRegister();
    });

    // Sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    const contentSections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('pageTitle');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active link
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show corresponding section
            const sectionId = link.getAttribute('data-section');
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(sectionId).classList.add('active');
            
            // Update page title
            const titleElement = pageTitle.querySelector(`[data-${currentLang}]`);
            if (titleElement) {
                pageTitle.textContent = titleElement.getAttribute(`data-${currentLang}`);
            }
        });
    });

    // Initialize charts
    initializeCharts();
});

// Language switching function
function switchLanguage(lang) {
    currentLang = lang;
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });

    // Update all text elements
    document.querySelectorAll('[data-en]').forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation) {
            element.textContent = translation;
        }
    });

    // Update placeholders
    document.querySelectorAll('input[placeholder]').forEach(input => {
        const placeholderEn = input.getAttribute('placeholder-en');
        const placeholderAr = input.getAttribute('placeholder-ar');
        if (lang === 'ar' && placeholderAr) {
            input.placeholder = placeholderAr;
        } else if (placeholderEn) {
            input.placeholder = placeholderEn;
        }
    });

    // Update select options
    document.querySelectorAll('option[data-en]').forEach(option => {
        const translation = option.getAttribute(`data-${lang}`);
        if (translation) {
            option.textContent = translation;
        }
    });

    // Update RTL/LTR
    if (lang === 'ar') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }
}

// Tab switching function
function showTab(tabName) {
    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.add('active');
        }
    });

    document.querySelectorAll('.modal-form').forEach(form => {
        form.classList.remove('active');
    });
    document.getElementById(`${tabName}Form`).classList.add('active');
}

// Handle login
function handleLogin() {
    // Simulate login
    isLoggedIn = true;
    document.getElementById('authModal').classList.remove('active');
    
    // Update UI
    const userActions = document.querySelector('.user-actions');
    userActions.innerHTML = `
        <div class="user-avatar">
            <i class="fas fa-user"></i>
        </div>
        <button class="btn btn-outline" id="logoutBtn">
            <i class="fas fa-sign-out-alt"></i>
            <span data-en="Logout" data-ar="تسجيل الخروج">Logout</span>
        </button>
    `;
    
    // Add logout functionality
    document.getElementById('logoutBtn').addEventListener('click', () => {
        isLoggedIn = false;
        location.reload();
    });
    
    // Update language
    switchLanguage(currentLang);
    
    alert(currentLang === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Login successful!');
}

// Handle registration
function handleRegister() {
    // Simulate registration
    document.getElementById('authModal').classList.remove('active');
    
    // Switch to login tab
    showTab('login');
    document.getElementById('authModal').classList.add('active');
    
    alert(currentLang === 'ar' ? 'تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول.' : 'Account created successfully! Please login.');
}

// Initialize Charts
function initializeCharts() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Revenue',
                data: [3200, 4100, 3800, 5200, 4900, 6100, 5800],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                }
            }
        }
    });

    // Expense Chart
    const expenseCtx = document.getElementById('expenseChart').getContext('2d');
    new Chart(expenseCtx, {
        type: 'doughnut',
        data: {
            labels: ['Food Supplies', 'Labor', 'Utilities', 'Rent', 'Marketing', 'Other'],
            datasets: [{
                data: [45, 30, 8, 10, 4, 3],
                backgroundColor: [
                    '#e74c3c',
                    '#3498db',
                    '#f39c12',
                    '#27ae60',
                    '#9b59b6',
                    '#95a5a6'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

// Placeholder functions for other actions
function showAddSaleForm() {
    alert(currentLang === 'ar' ? 'سيتم فتح نموذج إضافة مبيعات هنا' : 'Add Sale form would open here');
}

function showAddExpenseForm() {
    alert(currentLang === 'ar' ? 'سيتم فتح نموذج إضافة مصروفات هنا' : 'Add Expense form would open here');
}

function showAddInventoryForm() {
    alert(currentLang === 'ar' ? 'سيتم فتح نموذج إضافة مخزون هنا' : 'Add Inventory form would open here');
}

function showAddEmployeeForm() {
    alert(currentLang === 'ar' ? 'سيتم فتح نموذج إضافة موظف هنا' : 'Add Employee form would open here');
}

function showAddTaxForm() {
    alert(currentLang === 'ar' ? 'سيتم فتح نموذج إضافة ضريبة هنا' : 'Add Tax form would open here');
}
