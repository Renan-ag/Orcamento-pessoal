class Expense {
  constructor(year, month, day, type, description, value, id) {    
    this.year = year;
    this.month = month;
    this.day = day;
    this.type = type;
    this.description = description;
    this.value = value;
  }

  validateData() {
    return Object.values(this).every(value => value !== undefined && value !== null && value !== '');
  }
}

class DB {
  constructor() {
    const id = localStorage.getItem('id');
    if (id === null) localStorage.setItem('id', 0);
  }

  getNextID() {
    let nextID = localStorage.getItem('id');
    return parseInt(nextID) + 1;
  }

  save(d) {
    const id = this.getNextID();
    localStorage.setItem(id, JSON.stringify(d));
    localStorage.setItem('id', id);
  }

  getAllExpenses() {
    const expenses = Array();
    const id = localStorage.getItem('id')

    for (let i = 1; i <= id; i++) {
      let expense = JSON.parse(localStorage.getItem(i));
      if (expense === null) continue;

      expense.id = i;
      expenses.push(expense);
    }

    return expenses;
  }

  search(expense) {
    let filteredExpenses = this.getAllExpenses();

    Object.keys(expense).forEach(key => {
      if (expense[key]) {
        filteredExpenses = filteredExpenses.filter(d => d[key] == expense[key]);
      }
    });

    return filteredExpenses;
  }

  remove(id) {
    localStorage.removeItem(id);
  }
}

export { Expense, DB }