const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

//Calcualte first and second values depending on  operator
const calcualte = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
 
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
 
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
 
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
 
    '=': (firstNumber, secondNumber) => secondNumber,
 };

// Global Variables
let firstValue = 0;
let operatorValue = '';
let awaitnigNextValue = false;

function sendNumberValue(number) {
//    Repalce current display value if first value is enter
if (awaitnigNextValue) {
    calculatorDisplay.textContent = number;
    awaitnigNextValue = false;
 } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
 }

}

function addDecimal() {
    // if operator press dont add decimal
    if (awaitnigNextValue) return;
    // if no decimal, add one
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operators
    if (operatorValue && awaitnigNextValue) {
        operatorValue = operator;
        return;
    }
    // Assign first value if no value
    if (!firstValue) {
        firstValue = currentValue;
    } else { 
        const calculation = calcualte[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;   
    }
    // Ready for next value , store operator
    awaitnigNextValue = true;
    operatorValue = operator;
    console.log('firstValue', firstValue);
    console.log('operator', operatorValue);
}

// Reset all values, display 
function resetAll() {
    firstValue = 0;
    operatorValue = '';
    awaitnigNextValue = false;
    calculatorDisplay.textContent = '0';
}

// Add Event Listeners for numbers, operators, decimals buttons
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
      inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
      inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
      inputBtn.addEventListener('click', () => addDecimal());
    }
  });

// Event Listener
clearBtn.addEventListener('click', resetAll);