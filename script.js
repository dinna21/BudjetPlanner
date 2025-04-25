let TotalAmountInput = document.getElementById("total-amout");

let UserAmountInput = document.getElementById("user-amount");

let AmountTitleInput = document.getElementById("product-tittle");

const CheckAmountButton = document.getElementById("check-amount");

const TotalAmountButton = document.getElementById("total-amount-button");

const ErroMessage = document.getElementById("budjet-error");

const ProductTittleError = document.getElementById("product-tittle-error");

const ProductCostError = document.getElementById("product-cost-error");

const amountDisplay = document.getElementById("Amount");

const ExpenditurDisplay = document.getElementById("Expenditure Value");

const BalancedDisplay = document.getElementById("Balance");

const expenselist = document.getElementById("expense-list");
// ---------------------------------------------------------------

//Variables 
let TempAmount = 0;
let budget =0;
let expences = [];
let expenceAmount = 0;
let balance = 0

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
    const tittle = AmountTitleInput.value.trim();
    const amount = parseFloat(UserAmountInput.value);
    let isValid = true;
    console.log('Input values - Title:', tittle, 'Amount:', amount);
    if(tittle === "")
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
    const expense = {
        id: Date.now(),
        tittle: tittle,
        amount: amount
    };
    expences.push(expense);

    //For Updating UI
    updateExpenses();
    updateSummary();
    console.log('Expenses array after addition:', expences);
    AmountTitleInput.value = "";
    UserAmountInput.value = "";
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
            <div class="expense-title">${expense.tittle}</div>
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
        const expense = expences.find(expense => expense.id === id);
        
        if (expense) {
            AmountTitleInput.value = expense.title;
            UserAmountInput.value = expense.amount;
            
            // Change button text and functionality
            CheckAmountButton.textContent = "Update Expense";
            CheckAmountButton.onclick = function() {
                updateExpenses(id);
            };
        }
    });
});
}


