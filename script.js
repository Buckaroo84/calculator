function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Nah ah ah, you didn't say the magic word!"
    }
    return a / b;
}

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}

let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let resultDisplayed = false;

document.querySelectorAll('.digit').forEach(button => {
    button.addEventListener('click', () => {
        if (resultDisplayed) {
            firstNumber = '';
            resultDisplayed = false;
        }

        if (!currentOperator) {
            firstNumber += button.textContent;
            updateDisplay(firstNumber);
        } else {
            secondNumber += button.textContent;
            updateDisplay(secondNumber);
        }
    })
})

document.getElementById('clear').addEventListener('click', () => {
    firstNumber = '';
    secondNumber = '';
    currentOperator = null;
    resultDisplayed = false;
    updateDisplay('0');
})

document.querySelector('.decimal').addEventListener('click', () => {
    if (!currentOperator) {
        if (!firstNumber.includes('.')) {
            firstNumber += '.';
            updateDisplay(firstNumber);
        }
    } else {
        if (!secondNumber.includes('.')) {
            secondNumber += '.';
            updateDisplay(secondNumber);
        }
    }
})

document.getElementById('backspace').addEventListener('click', () => {
    if(!currentOperator) {
        firstNumber = firstNumber.slice(0, -1);
        updateDisplay(firstNumber || '0');
    } else {
        secondNumber = secondNumber.slice(0, -1);
        updateDisplay(secondNumber || '0');
    }
})

document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (!isNaN(key)) {
        document.querySelectorAll('.digit').forEach(btn => {
            if (btn.textContent === key) btn.click();
        });
    } else if (['+', '-', '*', '/'].includes(key)) {
        document.querySelectorAll('.operator').forEach(btn => {
            if (btn.textContent === key) btn.click();
        });
    } else if (key === 'Enter' || key === '=') {
        document.getElementById('equals').click();
    } else if (key === 'Backspace') {
        document.getElementById('backspace').click();
    } else if (key === '.') {
        document.querySelector('.decimal').click();
    } else if (key.toLowerCase() === 'c' || key === 'Escape') {
        document.getElementById('clear').click();
    }
});

document.getElementById('equals').addEventListener('click', () => {
    if (!firstNumber || !currentOperator || !secondNumber) {
        updateDisplay("Incomplete input");
        return;
    }

    let result = operate(currentOperator, firstNumber, secondNumber);

    if (typeof result === "string") {
    const displayText = document.getElementById('display-text');
    displayText.textContent = result;
    displayText.classList.add('scroll'); // 👈 Add scroll class

    firstNumber = '';
    secondNumber = '';
    currentOperator = null;
    resultDisplayed = true;
    return;
    }

    result = Math.round(result * 1000) / 1000;
    updateDisplay(result);
    firstNumber = result.toString();
    secondNumber = '';
    currentOperator = null;
    resultDisplayed = true;
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        if (firstNumber && secondNumber) {
            let result = operate(currentOperator, firstNumber, secondNumber);
            result = Math.round(result * 1000) / 1000;
            updateDisplay(result);
            firstNumber = result.toString();
            secondNumber = '';
        }
        currentOperator = button.textContent;
        resultDisplayed = false;
    });
});

function updateDisplay(value) {
    const displayText = document.getElementById('display-text');
    displayText.textContent = value.toString().slice(0, 12);
    displayText.classList.remove('scroll');
}

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
});