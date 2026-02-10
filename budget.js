function costValue(value) {
    document.querySelectorAll('.js-item-cost').forEach((cost) => {
        cost.value = value;
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
    });

    function renderItems() {
        const inputGrid = [];

        document.querySelector('.js-add-button').addEventListener('click', () => {
            if (inputGrid === null) {
                
            }
            inputGrid.push({
                input: '<input type="text" placeholder="items" class="item-input">',
                cost: '<input type="text" placeholder="cost" class="item-cost js-item-cost">'
            });

            deleteFun(inputGrid);

            const currency = document.querySelector('.js-currency').value;

            costValue(currency);
        });
    };
    renderItems();
}
renderBudgetPage();

function deleteFun(arr) {
    let itemInput = '';

    for (let i = 0; i < arr.length; i++) {
        const grid = arr[i];

        itemInput += `
        <div class="item-cost-input js-div-item-cost-input">
            <div>${grid.input}</div>
            <div>${grid.cost}</div>
            <button class="item-delete-button">Delete
            </button>
        </div>
        `;
    };

    document.querySelector('.div-item-cost-input').innerHTML = itemInput;

    document.querySelectorAll('.item-delete-button').forEach((delButton, index) => {
        delButton.addEventListener('click', () => {
            arr.splice(index, 1);
            deleteFun(arr);

            const currency = document.querySelector('.js-currency').value
            costValue(currency);
        });
    });
};

