// Console Settings
const debugDiv = document.querySelector('#debugDiv');
if (typeof console  != "undefined") {
    if (typeof console.log != 'undefined') {
        console.olog = console.log;
    } else {
        console.olog = function() {};
    }
}

console.log = function(message) {
    console.olog(message);
    debugDiv.innerHTML += `<p>${message}</p>`;
    debugDiv.style.display = 'block';
    debugDiv.style.opacity = '1';
    debugDiv.classList.remove('fade-out');

    setTimeout(() => {
        debugDiv.classList.add('fade-out');

        debugDiv.addEventListener('animationend', () => {
            debugDiv.style.display = 'none';
            debugDiv.innerHTML = '';
        }, { once: true });
    }, 300);
};
console.error = console.debug = console.info =  console.log;

// Calculator 1
const calculator1 = document.querySelector('#calculator1');

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
const saveCacheBtn = calculator1.querySelector('.save-cache');
const showCacheBtn = calculator1.querySelector('.show-cache');

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
    let result = calculateResult(number1, operation, number2);
    alert(`The result is: ${result}`);
});

saveCacheBtn.addEventListener('click', function() {
    const { number1, operation, number2 } = calculatorData;
    const result = calculateResult(number1, operation, number2);
    localStorage.setItem('calculatorCache', JSON.stringify({ number1, operation, number2, result }));
    alert('Result saved to cache');
});

showCacheBtn.addEventListener('click', function() {
    const cachedData = JSON.parse(localStorage.getItem('calculatorCache'));
    if (cachedData) {
        console.log(`Cached Result: ${cachedData.result}`);
        number1.value = cachedData.number1;
        operation.value = cachedData.operation;
        number2.value = cachedData.number2;
    } else {
        console.log('No data in cache');
    }
});

// Calculate the result based on operation
function calculateResult(number1, operation, number2) {
    if (number1 === null || operation === null || number2 === null || operation === "") {
        alert('Please enter all fields');
        return;
    }

    let result;
    switch (operation) {
        case '+':
            result = (number1 * 1000 + number2 * 1000) / 1000; // for accurate floating-point arithmetic
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

    return result;
}