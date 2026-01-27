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

const setBudgetForm = document.getElementById("setBudgetForm");
const userBudgetAmmount = document.getElementById("userBudgetAmmount");
const setBudgetAmmount = document.getElementById("setBudgetAmmount");
const setBudgetBalance = document.getElementById("setBudgetBalance");
const remainingBudgetBalanceUI = document.getElementById("remainingBudgetBalanceUI");


const incomeAmmount = document.getElementById("incomeAmmount");
const setIncomeAmmountUI = document.getElementById("setIncomeAmmount");

setIncomeAmmountUI.addEventListener('click', () => {
    accountBalance = Number(incomeAmmount.value) + accountBalance;
    incomeAmmount.value=''
    render()
})

showExpenses();

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const newExpense = {
        id: Date.now(),
        title: expense.value,
        ammount: Number(ammount.value),
        category: category.value,
    }

    expenses.push(newExpense);
    accountBalance = accountBalance - newExpense.ammount;
    showExpenses()

    expense.value = '';
    ammount.value = '';
    category.value = '';
})

function showExpenses() {
    expenseList.innerHTML = ""
    expenses.forEach((e) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${e.title} </span><span>${e.ammount} </span><span> (${e.category})</span>`
        expenseList.appendChild(li);
    })
    render()
}

setBudgetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    budgetAmmout = Number(userBudgetAmmount.value);
    setBudgetAmmount.innerText = budgetAmmout;
    userBudgetAmmount.value = '';
})

function render() {
    totalBudgetAmmont = 0;
    expenses.forEach((e) => {
        totalBudgetAmmont = totalBudgetAmmont + e.ammount
    });

    setBudgetBalance.innerText = totalBudgetAmmont
    accountBalanceUI.innerText = accountBalance;

    remainingBudgetBalance = budgetAmmout - totalBudgetAmmont;
    remainingBudgetBalanceUI.innerText = remainingBudgetBalance;


}
