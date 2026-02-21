function costValue(value) {
    document.querySelectorAll('.js-item-cost').forEach((cost) => {
        const costValueText = cost.value;
        const costStr = costValueText.slice(1);
        cost.value = value + costStr;
    });
};

function renderBudgetPage() {
    
    const currency = document.querySelector('.js-currency').value;

    document.querySelector('.js-income-input').value = currency;

    document.querySelector('.js-currency').addEventListener('click', () => {
        const inputValue = document.querySelector('.js-income-input').value;

        const currency = document.querySelector('.js-currency').value;

        const textStr = inputValue.slice(1);

        if (inputValue.at(0) === currency){
            document.querySelector('.js-income-input').value = currency + textStr;

        } else if (inputValue.at(0) !== currency) {
            document.querySelector('.js-income-input').value = currency + textStr;
        };

        const category = document.querySelector('.js-div-item-cost-input');
        if (category !== null) {
            costValue(currency);
        };

        const totalCostValue = document.querySelector('.js-input-total-cost').value;

        const totalCostValueStr = totalCostValue.slice(1);

        document.querySelector('.js-input-total-cost').value = currency + totalCostValueStr;
        
    });

    let inputGrid = null;

    document.querySelector('.js-add-button').addEventListener('click', () => {
        if (inputGrid === null) {
            inputGrid = [];

            inputGrid.push({
                input: `<input type="text" placeholder="items" class="item-input js-item-input">`,
                cost: `<input type="text" placeholder="cost" class="item-cost js-item-cost">`,
                button: `<button class="item-delete-button">Delete</button>`
            });

            display(inputGrid);

        } else if (inputGrid !== null) {
            const costEnteredValue = [];
            const inputEnteredValue = [];
            let calculateCost = 0;

            document.querySelectorAll('.js-item-input').forEach((input) => {
                inputEnteredValue.push(input.value);
            });

            document.querySelectorAll('.js-item-cost').forEach((cost) => {
                costEnteredValue.push(cost.value);

                const costConverted = calculate(cost.value);
                calculateCost += costConverted;
            });

            costDisplay(calculateCost);

            const inputGrid2 = [];

            for (let i = 0; i < costEnteredValue.length; i++) {
                inputGrid2.push({
                    input: `<input type="text" class="item-input js-item-input item-input-placeholder" placeholder="items" value="${inputEnteredValue[i]}">`,
                    cost: `<input type="text" class="item-cost js-item-cost" value=${costEnteredValue[i]}>`,
                    button: `<button class="item-delete-button">Delete</button>`
                });
            };

            inputGrid2.push({
                input: `<input type="text" placeholder="items" class="item-input js-item-input">`,
                cost: `<input type="text" placeholder="cost" class="item-cost       js-item-cost">`,
                button: `<button class="item-delete-button">Delete</button>`
            });


            display(inputGrid2);
        };

    });
};
renderBudgetPage();

function display(inputParam) {
    let itemInput = '';

    for (let i = 0; i < inputParam.length; i++) {
        const grid = inputParam[i];

        itemInput += `
            <div>${grid.input}</div>
            <div>${grid.cost}</div>
            ${grid.button}
        `;
    };

    document.querySelector('.div-item-cost-input').innerHTML = itemInput;

    const currency = document.querySelector('.js-currency').value;

    costValue(currency);

    document.querySelectorAll('.item-delete-button').forEach((delButton, index) => {
        delButton.addEventListener('click', () => {
            inputParam.splice(index, 1);

            display(inputParam);

            const currency = document.querySelector('.js-currency').value;

            costValue(currency);

            let totalCostCent = 0;

            document.querySelectorAll('.js-item-cost').forEach((cost) => {
                const totalCost = calculate(cost.value);
                totalCostCent += totalCost;
            });

            costDisplay(totalCostCent);
            
        });
    });
};

function calculate(costValue) {
    const costStr = costValue.slice(1);
    const costToCent = Math.round(costStr * 100);
    return costToCent;
};

function costDisplay(calculateCost) {
    const costToCurrency = (calculateCost / 100);

    costToCurrency.toFixed(2);

    const currency = document.querySelector('.js-currency').value;

    document.querySelector('.js-input-total-cost').value = currency + costToCurrency;
};

function totalBalance() {
    document.querySelector('.js-calculate-button').addEventListener('click', () => {
        const incomeValue = document.querySelector('.js-income-input').value;
        const incomeStr = incomeValue.slice(1);
        const incomeToStr = Number(incomeStr);

        let totalAddedCost = 0;

        document.querySelectorAll('.js-item-cost').forEach((cost) => {
            const costEnteredValue = cost.value;
            const costStr = costEnteredValue.slice(1);
            const costToStr = Number(costStr);

            totalAddedCost += costToStr;
        });

        const totalBalance = incomeToStr - totalAddedCost;

        const currency = document.querySelector('.js-currency').value;

        document.querySelector('.js-total-balance').innerHTML = currency + totalBalance;

        document.querySelector('.js-currency').addEventListener('click', () => {
            const currency = document.querySelector('.js-currency').value;
        
            document.querySelector('.js-total-balance').innerHTML = currency + totalBalance;
        });
    });

    
};
totalBalance();

document.querySelectorAll('.js-item-cost').forEach((cost) => {
    cost.addEventListener('click', () => {})
});