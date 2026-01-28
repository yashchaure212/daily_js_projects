let expenses = []
let accountBalance = 1000;
let totalBudgetAmmont = 0;
let budgetAmmout = 0;
let remainingBudgetBalance = 0;
let income = 0;

const form = document.getElementById("expenseForm");
const ammount = document.getElementById("ammount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const expenseList = document.getElementById("expenseList");
const accountBalanceUI = document.getElementById("totalAmmount");
const deleteExpenseBtn = document.getElementsByClassName("deleteExpenseBtn");

const setBudgetForm = document.getElementById("setBudgetForm");
const userBudgetAmmount = document.getElementById("userBudgetAmmount");
const userErrorMsg = document.getElementById("userErrorMsg");
const setBudgetAmmount = document.getElementById("setBudgetAmmount");
const budgetErrorMsg = document.getElementById("budgetErrorMsg");
const setBudgetBalance = document.getElementById("setBudgetBalance");
const remainingBudgetBalanceUI = document.getElementById("remainingBudgetBalanceUI");


const incomeAmmount = document.getElementById("incomeAmmount");
const setIncomeAmmountUI = document.getElementById("setIncomeAmmount");
const IncomeError = document.getElementById("IncomeError");

setIncomeAmmountUI.addEventListener('click', () => {
    IncomeError.innerText = ''
    if (Number(incomeAmmount.value) <= 0) {
        IncomeError.innerText = "Ammount should be greater than 0"
        return
    }
    accountBalance = Number(incomeAmmount.value) + accountBalance;
    incomeAmmount.value = ''
    render()
})

showExpenses();

form.addEventListener('submit', (e) => {
    e.preventDefault()
    userErrorMsg.innerText = ''
    if (expense.value.trim() === '' || Number(ammount.value) <= 0) {
        userErrorMsg.innerText = "Expense & ammount are invalid !"
        return
    }

    const newExpense = {
        id: Date.now(),
        title: expense.value.trim(),
        ammount: Number(ammount.value),
        category: category.value,
    }

    expenses.push(newExpense);
    accountBalance = accountBalance - newExpense.ammount;
    showExpenses()

    budgetErrorMsg.innerHTML = ''

    if (budgetAmmout < totalBudgetAmmont) {
        console.log(budgetAmmout, totalBudgetAmmont);
        
        console.log('giu');
        
        budgetErrorMsg.innerHTML = "Your expenses are above your Budget!"
        return
    }

    expense.value = '';
    ammount.value = '';
    category.value = '';
})

function showExpenses() {
    expenseList.innerHTML = ""
    expenses.forEach((e) => {
        const li = document.createElement('li');
        li.dataset.id = e.id
        li.innerHTML = `<span>${e.title} </span>
        <span>${e.ammount} </span>
        <span> (${e.category})</span>
        <button class="deleteExpenseBtn">Delete</button>`
        expenseList.appendChild(li);
    })
    render()
}

setBudgetForm.addEventListener('submit', (e) => {
    e.preventDefault();

    budgetErrorMsg.innerHTML = ''

    if (Number(userBudgetAmmount.value) < 0 || userBudgetAmmount.value === '') {
        budgetErrorMsg.innerHTML = "budget ammound should be greater than 0"
        return
    }

    budgetAmmout = Number(userBudgetAmmount.value);
    setBudgetAmmount.innerText = budgetAmmout;
    userBudgetAmmount.value = '';
})

function render() {
    totalBudgetAmmont = 0;
    expenses.forEach((e) => {
        totalBudgetAmmont = totalBudgetAmmont + e.ammount
    });
    
    budgetErrorMsg.innerHTML = ''

    setBudgetBalance.innerText = totalBudgetAmmont
    accountBalanceUI.innerText = accountBalance;

    remainingBudgetBalance = budgetAmmout - totalBudgetAmmont;
    remainingBudgetBalanceUI.innerText = remainingBudgetBalance;
}

expenseList.addEventListener('click', (e) => {
    if (e.target.tagName === "BUTTON") {
        const li = e.target.closest("li");
        const id = Number(li.dataset.id);
        const index = expenses.findIndex(e => e.id === id);
        expenses.splice(index, 1);
        showExpenses()
    }
})
