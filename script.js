let TotalAmountInput = document.getElementById("total-amount");

let UserAmountInput = document.getElementById("user-amount");

let AmountTitleInput = document.getElementById("product-tittle");

const CheckAmountButton = document.getElementById("check-amount");

const TotalAmountButton = document.getElementById("total-amount-button");

const ErroMessage = document.getElementById("budjet-error");

const ProductTittleError = document.getElementById("product-tittle-error");

const ProductCostError = document.getElementById("product-cost-error");

const amountDisplay = document.getElementById("Amount");

const ExpenditurDisplay = document.getElementById("Expenditure-Value");

const BalancedDisplay = document.getElementById("Balance");

const expenselist = document.getElementById("expense-list");
// ---------------------------------------------------------------

//Variables 
let budget =0;
let expences = [];
let expenceAmount = 0;
let balance = 0
let isEditing = false;
let editingId = null;
TotalAmountButton.addEventListener("click", ()=> {
    const amount = parseFloat(TotalAmountInput.value);
    if (isNaN(amount) || amount <0)
    {
        ErroMessage.classList.remove("hide-error");
        return;
    }
    else
    {
        ErroMessage.classList.add("hide-error");
        budget = amount;
        amountDisplay.textContent = budget;
        balance = budget - expenceAmount;
        BalancedDisplay.textContent = balance;
        TotalAmountInput.value = "";
    }
});
//Add Expense Function 
CheckAmountButton.addEventListener('click',()=>{
    const title = AmountTitleInput.value.trim();
    const amount = parseFloat(UserAmountInput.value);
    let isValid = true;
    // console.log('Input values - Title:', tittle, 'Amount:', amount);
    if(title === "")
    {
        ProductTittleError.classList.remove("hide-error");
        isValid = false;
    }
    else{
        ProductTittleError.classList.add("hide-error");
    }

    if(isNaN(amount) || amount<=0)
    {
        ProductCostError.classList.remove("hide-error");
        isValid = false;
    }
    else{
        ProductCostError.classList.add("hide-error");
    }
    if(!isValid) return;
    if (isEditing) {
        const index = expences.findIndex(exp => exp.id === editingId);
        if (index !== -1) {
            expences[index].title = title;
            expences[index].amount = amount;
        }
        isEditing = false;
        editingId = null;
        CheckAmountButton.textContent = "Check Amount";
    } else {
        const expense = {
            id: Date.now(),
            title: title,
            amount: amount
        };
        expences.push(expense);
    }

    AmountTitleInput.value = "";
    UserAmountInput.value = "";
    updateExpenses();
    updateSummary();
});


//Function for update Expence
function updateExpenses(){
expenselist.innerHTML = "";
expenceAmount = 0;

expences.forEach(expense=>{
    expenceAmount+=expense.amount;
    const expenseElement = document.createElement("div");
    expenseElement.className = "expense-item";
    expenseElement.innerHTML= `
            <div class="expense-title">${expense.title}</div>
            <div class="expense-amount">${expense.amount}</div>
            <div class="expense-action">
                <button class="edit" data-id="${expense.id}">Edit</button>
                <button class="delete" data-id="${expense.id}">Delete</button>
            </div>
    `
    expenselist.appendChild(expenseElement);
});
document.querySelectorAll('.delete').forEach(button => {
    button.addEventListener('click', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        expences = expences.filter(expense => expense.id !== id);
        updateExpenses();
        updateSummary();
    });
});
document.querySelectorAll('.edit').forEach(button => {
    button.addEventListener('click', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        const expense = expences.find(exp => exp.id === id);
        if (expense) {
            AmountTitleInput.value = expense.title;
            UserAmountInput.value = expense.amount;
            CheckAmountButton.textContent = "Update Expense";
            isEditing = true;
            editingId = id;
        }
    });
});

}

// Update Expense Function
function updateExpense(id) {
    const title = AmountTitleInput.value.trim();
    const amount = parseFloat(UserAmountInput.value);
    
    if (title === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter valid values");
        return;
    }
    
    // Find and update the expense
    const index = expences.findIndex(expense => expense.id === id);
    if (index !== -1) {
        expences[index].title = title;
        expences[index].amount = amount;
    }
    
    // Reset the form
    CheckAmountButton.textContent = "Add Expense";
    CheckAmountButton.onclick = function() {
        CheckAmountButton.dispatchEvent(new Event('click'));
    };
    
    AmountTitleInput.value = "";
    UserAmountInput.value = "";
    
    updateExpenses();
    updateSummary();
}
function updateSummary() {
    expenceAmount = expences.reduce((total, expense) => total + expense.amount, 0);
    balance = budget - expenceAmount;
    
    ExpenditurDisplay.textContent = expenceAmount.toFixed(2);
    BalancedDisplay.textContent = balance.toFixed(2);
    
    // Change balance color if negative
    if (balance < 0) {
        BalancedDisplay.style.color = "red";
    } else {
        BalancedDisplay.style.color = "green";
    }
}