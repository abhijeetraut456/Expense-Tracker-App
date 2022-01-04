const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');

const text = document.getElementById('text');
const amount = document.getElementById('amount');

const form = document.getElementById('form');
const list = document.getElementById('list');

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 },
// ];

//update localStorage transactions
const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

const addTransaction = (e) => {
  e.preventDefault();

  if (text.value === '' || amount.value === '') {
    alert('Please enter text and amount');
  } else {
    const transaction = {
      id: randomID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    amount.value = '';
    text.value = '';
  }
};

//generate random id
const randomID = () => {
  return Math.floor(Math.random() * 1000);
};

//Add transaction to DOM list
const addTransactionDOM = (transactions) => {
  const sign = transactions.amount > 0 ? '+' : '-';

  const item = document.createElement('li');

  //add class based on value
  item.classList.add(transactions.amount > 0 ? 'plus' : 'minus');
  item.innerHTML = `${transactions.text} <span> ${sign} ${Math.abs(
    transactions.amount
  )} </span> <button class='delete-btn' onclick="removeTransaction(${
    transactions.id
  })">x</button>`;

  list.appendChild(item);
};

//remove transaction by id
const removeTransaction = (id) => {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
};

//update the balance income or expense
const updateValues = () => {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((amount) => amount > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense =
    amounts
      .filter((amount) => amount < 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2) * -1;

  balance.innerHTML = `$${total}`;
  money_minus.innerHTML = `$${expense}`;
  money_plus.innerHTML = `$${income}`;
};

//Init app
const init = () => {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
};

init();

//Add event listener
form.addEventListener('submit', addTransaction);
