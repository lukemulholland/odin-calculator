function add(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }
    return a + b;
}

function subtract(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }
    return a - b;
}

function multiply(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }
    return a * b;
}

function divide(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }
    if (b === 0) {
        throw new Error('Division by zero is not allowed');
    }
    return a / b;
}

let firstNumber = '';
let secondNumber = '';
let operator = '';
let isEnteringSecondNumber = false; // Tracks whether the user is entering the second number

function operate(firstNumber, secondNumber, operator) {
    switch (operator) {
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return subtract(firstNumber, secondNumber);
        case '*':
            return multiply(firstNumber, secondNumber);
        case '/':
            return divide(firstNumber, secondNumber);
        default:
            throw new Error('Invalid operator');
    }
}

// Register input from number buttons
const numberButtons = document.querySelectorAll('.button-number');
const display = document.querySelector('#display');

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        const buttonValue = button.textContent;
        if (isEnteringSecondNumber) {
            secondNumber += buttonValue;
            display.textContent = buttonValue;
        } else {
            firstNumber += buttonValue;
            display.textContent = buttonValue;
        }
    })
})

// Register input from operator buttons and switch to second number
const operatorButtons = document.querySelectorAll('.button-operator');

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (firstNumber === '') return;

        operator = button.textContent;
        isEnteringSecondNumber = true;
        display.textContent = 0;
    })
})

// Computes result when the user selects 'equals'
const equalsButton = document.querySelector('#equals');

equalsButton.addEventListener('click', () => {
    if (firstNumber === '' || secondNumber === '' || operator === '') {
        display.textContent = 'Error';
        return;
    } else if (secondNumber === '0' && operator === '/') {
        display.textContent = 'Error - cannot divide by 0';
        return; 
    }

    const num1 = parseInt(firstNumber);
    const num2 = parseInt(secondNumber);

    const result = operate(num1, num2, operator);
    display.textContent = Number.isInteger(result) ? result : result.toFixed(4);

    firstNumber = result;
    secondNumber = '';
    isEnteringSecondNumber = false;
    console.log('firstNum: ' + firstNumber); // Debugging
    console.log('secondNum: ' + secondNumber); // Debugging
    console.log('result: ' + result); // Debugging
})

// Clears the display and number values
const clearButton = document.querySelector('#clear');

clearButton.addEventListener('click', () => {
  firstNumber = '';
  operator = '';
  secondNumber = '';
  isEnteringSecondNumber = false;
  display.textContent = '0'; // Reset the display
});

function updateDisplay(value) {
    if (display.textContent === '0') {
        display.textContent = value;
    } else {
        display.textContent += value;
    }
}
