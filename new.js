let transactions=[];
let incomeExpenseChart;

document.getElementById("date").valueAsDate=new Date();

document.getElementById("transactionForm").addEventListener("submit",async function(e){

e.preventDefault();

const transaction={

user_id:1,
description:document.getElementById("description").value,
amount:parseFloat(document.getElementById("amount").value),
type:document.getElementById("type").value,
category:document.getElementById("category").value,
transaction_date:document.getElementById("date").value,
};

try{

const response=await fetch("http://localhost:3000/addTransaction",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(transaction)
});

const result=await response.text();

alert(result);

loadTransactions();

document.getElementById("transactionForm").reset();

document.getElementById("date").valueAsDate=new Date();

}catch(error){

console.log(error);
}
});

function updateDisplay(){

updateSummary();
updateTransactionTable();
}

function updateSummary(){

let totalIncome=0;
let totalExpenses=0;

transactions.forEach((transaction)=>{

if(transaction.type==="income"){

totalIncome+=Number(transaction.amount);

}else{

totalExpenses+=Number(transaction.amount);
}
});

const balance=totalIncome-totalExpenses;

document.getElementById("totalIncome").textContent=totalIncome.toFixed(2);

document.getElementById("totalExpenses").textContent=totalExpenses.toFixed(2);

document.getElementById("balance").textContent=balance.toFixed(2);

const balanceElement=document.getElementById("balance");

if(balance>=0){

balanceElement.style.color="green";

}else{

balanceElement.style.color="red";
}

renderPieChart(totalIncome,totalExpenses);
}

function renderPieChart(totalIncome,totalExpenses){

const ctx=document.getElementById("incomeExpenseChart").getContext("2d");

const data={

labels:["Income","Expenses"],

datasets:[
{
data:[totalIncome,totalExpenses],
backgroundColor:["#4CAF50","#F44336"],
},
],
};

const options={

responsive:true,

plugins:{
legend:{position:"bottom"},
},
};

if(incomeExpenseChart){

incomeExpenseChart.data=data;
incomeExpenseChart.update();

}else{

incomeExpenseChart=new Chart(ctx,{

type:"pie",
data:data,
options:options,
});
}
}

function updateTransactionTable(){

const table=document.getElementById("transactionTable");

const noTransactionsMsg=document.getElementById("noTransactions");

while(table.rows.length>1){

table.deleteRow(1);
}

if(transactions.length===0){

noTransactionsMsg.style.display="block";
table.style.display="none";

}else{

noTransactionsMsg.style.display="none";
table.style.display="table";

const sortedTransactions=[...transactions].sort(
(a,b)=>new Date(b.transaction_date)-new Date(a.transaction_date)
);

sortedTransactions.forEach((transaction)=>{

const row=table.insertRow();

row.insertCell(0).textContent=transaction.transaction_date;
row.insertCell(1).textContent=transaction.description;
row.insertCell(2).textContent=transaction.category;

const typeCell=row.insertCell(3);

typeCell.textContent=transaction.type;

typeCell.style.color=
transaction.type==="income"?"green":"red";

const amountCell=row.insertCell(4);

amountCell.textContent=
"₹"+Number(transaction.amount).toFixed(2);

amountCell.style.color=
transaction.type==="income"?"green":"red";

const actionCell=row.insertCell(5);

const deleteBtn=document.createElement("button");

deleteBtn.textContent="Delete";

deleteBtn.onclick=()=>deleteTransaction(transaction.id);

actionCell.appendChild(deleteBtn);
});
}
}

function deleteTransaction(id){

if(confirm("Are you sure you want to delete this transaction?")){

transactions=transactions.filter((t)=>t.id!==id);

updateDisplay();
}
}

function clearAllTransactions(){

if(confirm("Are you sure you want to clear all transactions?")){

transactions=[];

updateDisplay();
}
}

async function loadTransactions(){

try{

const response=await fetch("http://localhost:3000/transactions");

const data=await response.json();

transactions=data;

updateDisplay();

}catch(error){

console.log(error);
}
}

loadTransactions();