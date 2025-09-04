
  let transactions = [];
  let transactionId = 1;

  document.getElementById('date').valueAsDate = new Date();

  document.getElementById('transactionForm').addEventListener('submit', function (e) {
    e.preventDefault();

  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;
  const category = document.getElementById('category').value;
  const date = document.getElementById('date').value;

  const transaction = {
    id: transactionId++,
  description: description,
  amount: amount,
  type: type,
  category: category,
  date: date
      };

  transactions.push(transaction);
  updateDisplay();

  document.getElementById('transactionForm').reset();
  document.getElementById('date').valueAsDate = new Date();
    });

  function updateDisplay() {
    updateSummary();
  updateTransactionTable();
    }

  function updateSummary() {
    let totalIncome = 0;
  let totalExpenses = 0;

      transactions.forEach(transaction => {
        if (transaction.type === 'income') {
    totalIncome += transaction.amount;
        } else {
    totalExpenses += transaction.amount;
        }
      });

  const balance = totalIncome - totalExpenses;

  document.getElementById('totalIncome').textContent = totalIncome.toFixed(2);
  document.getElementById('totalExpenses').textContent = totalExpenses.toFixed(2);
  document.getElementById('balance').textContent = balance.toFixed(2);

  const balanceElement = document.getElementById('balance');
      if (balance >= 0) {
    balanceElement.style.color = 'green';
      } else {
    balanceElement.style.color = 'red';
      }
    }

  function updateTransactionTable() {
      const table = document.getElementById('transactionTable');
  const noTransactionsMsg = document.getElementById('noTransactions');

      while (table.rows.length > 1) {
    table.deleteRow(1);
      }

  if (transactions.length === 0) {
    noTransactionsMsg.style.display = 'block';
  table.style.display = 'none';
      } else {
    noTransactionsMsg.style.display = 'none';
  table.style.display = 'table';

        const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

        sortedTransactions.forEach(transaction => {
          const row = table.insertRow();
  row.insertCell(0).textContent = transaction.date;
  row.insertCell(1).textContent = transaction.description;
  row.insertCell(2).textContent = transaction.category;

  const typeCell = row.insertCell(3);
  typeCell.textContent = transaction.type;
  typeCell.style.color = transaction.type === 'income' ? 'green' : 'red';

  const amountCell = row.insertCell(4);
  amountCell.textContent = '₹' + transaction.amount.toFixed(2);
  amountCell.style.color = transaction.type === 'income' ? 'green' : 'red';

  const actionCell = row.insertCell(5);
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
          deleteBtn.onclick = () => deleteTransaction(transaction.id);
  actionCell.appendChild(deleteBtn);
        });
      }
    }

  function deleteTransaction(id) {
      if (confirm('Are you sure you want to delete this transaction?')) {
    transactions = transactions.filter(t => t.id !== id);
  updateDisplay();
      }
    }

  function clearAllTransactions() {
      if (confirm('Are you sure you want to clear all transactions? This cannot be undone.')) {
    transactions = [];
  updateDisplay();
      }
    }

  updateDisplay();