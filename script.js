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
let operatorSet = false; // Tracks whether the user has selected an operator
let decimilSelected = false; // Tracks whether the user has selected a decimil point

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
            display.textContent = secondNumber;
        } else {
            firstNumber += buttonValue;
            display.textContent = firstNumber;
            console.log('firstNum: ' + firstNumber); // Debugging
            console.log('secondNum: ' + secondNumber); // Debugging
        }
    })
})

// Register input from operator buttons and switch to second number
const operatorButtons = document.querySelectorAll('.button-operator');

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (firstNumber === '') return; // Do nothing if missing first number

        if (operatorSet) { // Replace current operator if already set
            operator = button.textContent; 
            display.textContent = operator;
        } else {
            operator = button.textContent;
            operatorSet = true;
            isEnteringSecondNumber = true;
            display.textContent = operator;
        }
    })
})

// Register input from decimal point button
const decimalButton = document.querySelector('#decimal-point');

decimalButton.addEventListener('click', () => {
    // Prevent multiple decimal points in the same number
    if (isEnteringSecondNumber) {
        if (!secondNumber.includes('.')) {
            secondNumber += '.';
            display.textContent = secondNumber;
        }
    } else {
        if (!firstNumber.includes('.')) {
            firstNumber += '.';
            display.textContent = firstNumber;
        }
    }
    console.log('firstNum: ' + firstNumber); // Debugging
    console.log('secondNum: ' + secondNumber); // Debugging
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

    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);

    const result = operate(num1, num2, operator);
    display.textContent = parseFloat(result.toFixed(4));

    firstNumber = result; // Store result in first number to allow for subsequent calculation
    secondNumber = '';
    isEnteringSecondNumber = false;
    operatorSet = false;
    console.log('firstNum: ' + firstNumber); // Debugging
    console.log('secondNum: ' + secondNumber); // Debugging
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

// function updateDisplay(value) {
//     if (display.textContent === '0') {
//         display.textContent = value;
//     } else {
//         display.textContent += value;
//     }
// }
