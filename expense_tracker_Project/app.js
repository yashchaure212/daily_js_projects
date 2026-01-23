
const form = document.getElementById('expenseForm');
const expense = document.getElementById('expense')
const ammount = document.getElementById('ammount')
const type = document.getElementById('type')
const expenseList = document.getElementById("expenseList");

const expenses = [];

//FORM → submit → preventDefault → read values

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newExpense = {
        id: Date.now(),
        title: expense.value,
        ammount: Number(ammount.value),
        typeOfExpense: type.value
    }
    expenses.push(newExpense);
    expense.value = "";
    ammount.value = "";
    renderList()
})

expenseList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const li = e.target.closest('li')
        const id = Number(li.dataset.id);
        const index = expenses.findIndex(e => e.id === id);
        expenses.splice(index, 1);
    }
    renderList()
})

function renderList () {
    expenseList.innerHTML = '';

    expenses.forEach((e) => {
    const li = document.createElement('li');
    // li.setAttribute("id", e.id);
    li.dataset.id = e.id;
    li.innerHTML = `<h3>${e.title} - <span>${e.ammount} (${e.typeOfExpense})</span></h3>
    <button>Delete</button>`
    expenseList.appendChild(li)
    console.log("test");
})
}

function deleteExpense (expense) {
    expenses = expenses.filter(e => e.id !== expense.id)
    renderList();
}



