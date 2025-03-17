import { Expense, DB } from './classes.js';

let db = new DB();

function clearInputs() {
  document.getElementById('year').selectedIndex = 0;
  document.getElementById('month').selectedIndex = 0;
  document.getElementById('day').value = '';
  document.getElementById('type').selectedIndex = 0;
  document.getElementById('description').value = '';
  document.getElementById('value').value = '';
}

function showModal(title, content, headerClass) {
  document.getElementById('modal_titulo').innerHTML = title;
  document.getElementById('modal_titulo_div').className = `modal-header ${headerClass}`;
  document.getElementById('modal_conteudo').innerHTML = content;
  $('#modalExpenseAlert').modal('show');
}

function listExpenses(expenses = undefined) {
  const expensesToDisplay = expenses ? expenses : db.getAllExpenses();
  const listExpensesElement = document.getElementById('listExpenses');
  let totalValue = 0;

  listExpensesElement.innerHTML = '';

  const expenseTypes = {
    '1': 'Alimentação',
    '2': 'Educação',
    '3': 'Lazer',
    '4': 'Saúde',
    '5': 'Transporte'
  };

  const formatCurrency = (value) => `${parseFloat(value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`;

  const createDeleteButton = (expense) => {
    const button = document.createElement('button');
    button.className = 'btn btn-danger';
    button.innerHTML = '<i class="fas fa-trash"></i>';
    button.onclick = () => {
      db.remove(expense.id);
      listExpenses();
    };
    return button;
  };

  expensesToDisplay.forEach(expense => {
    const row = listExpensesElement.insertRow();

    row.insertCell(0).textContent = `${String(expense.day).padStart(2, '0')} / ${String(expense.month).padStart(2, '0')} / ${expense.year}`;
    row.insertCell(1).textContent = expenseTypes[expense.type] || 'Outro';
    row.insertCell(2).textContent = expense.description;
    row.insertCell(3).textContent = formatCurrency(expense.value);

    row.insertCell(4).append(createDeleteButton(expense));
    totalValue += parseFloat(expense.value);
  });


  updateTotal(totalValue);
}

function registerExpense(e) {
  e.preventDefault();

  const fields = ['year', 'month', 'day', 'type', 'description', 'value'];
  const values = fields.reduce((acc, field) => {
    acc[field] = document.getElementById(field).value.trim();
    return acc;
  }, {});
  console.log(values)

  const expense = new Expense(...fields.map(field => values[field]));

  if (expense.validateData()) {
    db.save(expense);
    showModal('Registro realizado com sucesso', 'Despesa foi cadastrada com sucesso!', 'text-success');
    clearInputs();
  } else {
    showModal('Erro ao realizar registro', 'Há campos obrigatórios em branco, favor preenchê-los.', 'text-danger');
  }
}

function searchInExpenses(e) {
  e.preventDefault();
  const fields = ['year', 'month', 'day', 'type', 'description', 'value'];
  const values = fields.reduce((acc, field) => {
    acc[field] = document.getElementById(field).value;
    return acc;
  }, {});

  const expenses = new Expense(...fields.map(field => values[field]));
  listExpenses(db.search(expenses));
}

function updateTotal(value = 0) {
  const el = document.getElementById('total-expenses');
  el.innerHTML = `Total: R$ ${value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`;
}

window.addEventListener("load", function () {
  const form = document.getElementById("expenseForm");
  const table = document.getElementById("listExpenses");

  if (table) listExpenses();

  if (form.getAttribute("data-action") == "add") form.addEventListener("submit", registerExpense);
  else form.addEventListener("submit", searchInExpenses);

  document.getElementById("clear-inputs").addEventListener('click', clearInputs)
});