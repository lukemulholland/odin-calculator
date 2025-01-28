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

const display = document.querySelector('#display');
const numberButtons = document.querySelectorAll('.button-number');
const operatorButtons = document.querySelectorAll('.button-operator');
const clearButton = document.querySelector('#clear');
const equalsButton = document.querySelector('#equals');

// Register input from number buttons
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        const buttonValue = button.textContent;
        if (isEnteringSecondNumber) {
            secondNumber += buttonValue;
            updateDisplay(buttonValue);
        } else {
            firstNumber += buttonValue;
            updateDisplay(buttonValue);
        }
    })
})

// Register input from operator buttons and switch to second number
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (firstNumber === '') return;

        operator = button.textContent;
        isEnteringSecondNumber = true;
        display.textContent = 0;
    })
})

// Computes result when the user selects 'equals'
equalsButton.addEventListener('click', () => {
    const num1 = parseInt(firstNumber);
    const num2 = parseInt(secondNumber);

    const result = operate(num1, num2, operator);
    display.textContent = result;
})

// Clears the display and number values
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
