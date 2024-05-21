// Tab Handling
const tab1Button = document.querySelector('#tab1-btn');
const tab2Button = document.querySelector('#tab2-btn');
const calculator1 = document.querySelector('#calculator1');
const calculator2 = document.querySelector('#calculator2');

tab1Button.addEventListener('click', function() {
    calculator1.style.display = 'flex';
    calculator2.style.display = 'none';
    tab1Button.classList.add('active');
    tab2Button.classList.remove('active');
});

tab2Button.addEventListener('click', function() {
    calculator1.style.display = 'none';
    calculator2.style.display = 'flex';
    tab1Button.classList.remove('active');
    tab2Button.classList.add('active');
});

// Calculator 1

// Elements for Calculator 1
const calculatorData = {
    number1: null,
    operation: null,
    number2: null
};
const number1 = calculator1.querySelector('.number1');
const operation = calculator1.querySelector('.operation');
const number2 = calculator1.querySelector('.number2');
const calculate = calculator1.querySelector('.calculate');

number1.addEventListener('blur', (e) => {
    calculatorData.number1 = parseFloat(e.target.value);
});
operation.addEventListener('change', (e) => {
    calculatorData.operation = e.target.value;
});
number2.addEventListener('blur', (e) => {
    calculatorData.number2 = parseFloat(e.target.value);
});
calculate.addEventListener('click', () => {
    const { number1, operation, number2 } = calculatorData;

    if (number1 === null || operation === null || number2 === null || operation === "") {
        alert('Please enter all fields');
        return;
    }

    let result;
    switch (operation) {
        case '+':
            result = (number1 * 1000 + number2 * 1000) / 1000;
            break;
        case '-':
            result = (number1 * 1000 - number2 * 1000) / 1000;
            break;
        case '*':
            result = number1 * number2;
            break;
        case '/':
            result = number1 / number2;
            break;
        default:
            alert('Invalid operation');
            return;
    }

    alert(`The result is: ${result}`);
});

// Calculator 2

// Elements for Calculator 2
const display = calculator2.querySelector('#display');
const numButtons = calculator2.querySelectorAll('.num-btn:not(.decimal)');
const opButtons = calculator2.querySelectorAll('.op-btn');
const equalsButton = calculator2.querySelector('#equals-btn');
const clearButton = calculator2.querySelector('#clear-btn');
const decimalButton = calculator2.querySelector('.decimal');

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        display.value += button.textContent;
    });
});

opButtons.forEach(button => {
    button.addEventListener('click', () => {
        display.value += ` ${button.textContent} `;
    });
});

decimalButton.addEventListener('click', () => {
    if (!display.value.endsWith('.') || display.value.endsWith(' ')) {
        display.value += '.';
    }
});
equalsButton.addEventListener('click', () => {
    try {
        display.value = preciseCalculation(display.value);
    } catch (error) {
        alert(`Error: ${error.message}`);
        display.value = '';
    }
});

clearButton.addEventListener('click', () => {
    display.value = '';
});

function preciseCalculation(expression) {
    const result = eval(expression);
    return +result.toFixed(10);
}