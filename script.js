let currentUser = null;
let expenses = [];
let expenseLimit = null;


function showRegistrationForm() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registrationForm").style.display = "block";
}

function showLoginForm() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registrationForm").style.display = "block";
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simula la autenticación (en una aplicación real, se debe utilizar un sistema de autenticación seguro)
    if (username && password) {
        currentUser = username;
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("expenses").style.display = "block";
    }
}

function register() {
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;

    // Simula el registro de un nuevo usuario (en una aplicación real, se debe almacenar en una base de datos)
    if (newUsername && newPassword) {
        currentUser = newUsername;
        document.getElementById("registrationForm").style.display = "none";
        document.getElementById("expenses").style.display = "block";
    }
}


function login() {
    // Implementa la lógica de autenticación aquí (por ejemplo, con un sistema de usuarios y contraseñas)

    // Simulación: usuario y contraseña válidos
    currentUser = document.getElementById("username").value;
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("expenses").style.display = "block";
}

function addExpense() {
    const value = parseFloat(document.getElementById("expenseValue").value);
    const category = document.getElementById("expenseCategory").value;
    const description = document.getElementById("expenseDescription").value;

    if (value && category && description) {
        expenses.push({ value, category, description, user: currentUser });

        // Actualiza la lista de gastos
        updateExpenseList();
        calculateExpenseAlert();
    }
}

function updateExpenseList() {
    const filterCategory = document.getElementById("filterCategory").value;
    const expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";

    expenses.forEach((expense) => {
        if (!filterCategory || filterCategory === expense.category) {
            const listItem = document.createElement("li");
            listItem.innerHTML = `Valor: $${expense.value}, Categoría: ${expense.category}, Descripción: ${expense.description}`;
            expenseList.appendChild(listItem);
        }
    });
}

function filterExpensesByCategory() {
    updateExpenseList();
}

function filterExpensesByUser() {
    const userFilter = document.getElementById("userFilter").value;
    const userExpenseList = document.getElementById("userExpenseList");
    userExpenseList.innerHTML = "";

    expenses.forEach((expense) => {
        if (userFilter === expense.user) {
            const listItem = document.createElement("li");
            listItem.innerHTML = `Valor: $${expense.value}, Categoría: ${expense.category}, Descripción: ${expense.description}`;
            userExpenseList.appendChild(listItem);
        }
    });
}

function setExpenseLimit() {
    expenseLimit = parseFloat(document.getElementById("expenseLimit").value);
    calculateExpenseAlert();
}

function calculateExpenseAlert() {
    if (expenseLimit && expenses.length > 0) {
        const totalExpenses = expenses.reduce((total, expense) => total + expense.value, 0);
        const remainingBudget = expenseLimit - totalExpenses;

        if (remainingBudget <= 0.1 * expenseLimit) {
            const expenseAlert = document.getElementById("expenseAlert");
            expenseAlert.style.display = "block";
            expenseAlert.innerHTML = `¡Alerta! Te falta $${remainingBudget} para alcanzar el tope máximo de gastos.`;
        }
    }
}
