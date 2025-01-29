// Calculator functions
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
        const key = button.textContent;
        handleNumber(key);
    })
})

// Register input from operator buttons and switch to second number
const operatorButtons = document.querySelectorAll('.button-operator');

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        const key = button.textContent;
        handleOperator(key);
    })
})

// Register input from decimal point button
const decimalButton = document.querySelector('#decimal-point');

decimalButton.addEventListener('click', () => {
    handleDecimalPoint();
})

// Computes result when the user selects 'equals'
const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', () => {
    handleEquals();
})

// Clears the display and number values
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
    handleEscape();
});

// Handle keyboard input
document.addEventListener("keydown", (event) => {
    const key = event.key;
    console.log(key);

    if (!isNaN(key)) {
        handleNumber(key);
    }

    if (["+", "-", "*", "/"].includes(key)) {
        handleOperator(key);
    }

    if (key === 'Enter' || key === '=') {
        handleEquals();
    }

    if (key === 'Escape') {
        handleEscape();
    }

    if (key ==='.') {
        handleDecimalPoint();
    }
});

function handleNumber(key) {
    if (isEnteringSecondNumber) {
        secondNumber += key;
        display.textContent = secondNumber;
    } else {
        firstNumber += key;
        display.textContent = firstNumber;
    }
}

function handleOperator(key) {
    if (firstNumber === '') return; // Do nothing if missing first number

    if (operatorSet) { // Replace current operator if already set
        operator = key; 
        display.textContent = key;
    } else {
        operator = key;
        operatorSet = true;
        isEnteringSecondNumber = true;
        display.textContent = key;
    }
}

function handleEquals() {
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
}

function handleEscape() {
    firstNumber = '';
    operator = '';
    secondNumber = '';
    isEnteringSecondNumber = false;
    display.textContent = '0'; // Reset the display
}

function handleDecimalPoint() {
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
}
