

//
let numbers = document.querySelector(".numbers");

//additional counter to set numeric buttons 
let num = 11;

// creating number buttons
//in line
for (let i = 0; i < 4; i++) {
    let row = document.createElement('div');
    row.className = `row${i}`;
    num--;
    // in rows
    for (let j = 0; j < 3; j++) {
        num--;
        if (num == -1) { break; }
        let item = document.createElement('button');
        item.className = 'button';
        item.id = num;
        item.textContent = num;
        row.appendChild(item);
    }
    num++;
    numbers.appendChild(row);

}
//handler for number row that will have additional buttons
let row_3 = document.querySelector('.row3');

//placing other functional buttons
let operators = document.querySelector(".operators .col_1");

//operants for the first column +
let operants = ['/', 'x', '-', '+', '.', '='];
for (let i of operants) {
    let item = document.createElement('button');
    item.className = 'button';
    item.id = i;
    item.textContent = i;
    //these 2 buttons are placed in numbers div
    if (i == '.' || i == '=') {
        row_3.appendChild(item);
    } else {
        //other are going to operators div
        operators.appendChild(item);
    }
    ;
}

//operants for the second column 
let operants2 = ['AC', 'C', '-/+', 'ON'];
let operators2 = document.querySelector(".operators .col_2");
for (let i of operants2) {
    let item = document.createElement('button');
    item.className = 'button';
    item.id = i;
    item.textContent = i;
    //these 2 buttons are placed in numbers div
    operators2.appendChild(item);
}

//#################################################################
//Operations on numbers
// Declaration of all variables
let onOff = true;
//buffer for number recording
let enterNum = [];
// operants and operator declaration
let numberA = '';
let numberB = ''
let mainOperator = '';
let result = '';
//selectors of the html elements

let col_1_operator = document.querySelector('.col_1');
let col_2_operator = document.querySelector('.col_2');
//grab the user input by event listening
let number = document.querySelector('.numbers');
//selecting the line where the equalization is being displayed
let line1 = document.querySelector('.line_1');
//selecting the line where the result is being displayed
let line2 = document.querySelector('.line_2');


// Function for mathematical operations
const add = function (a, b) {
    return a + b;
};

const subtract = (a, b) => {
    return a - b;
};

const multiply = function (a, b) {
    return a * b;
};

const divide = function (a, b) {
    if (b === 0) {
        return 'error';
    } else {
        return a / b;
    }
};


const operate = function (a, b, operator) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '/':
            return divide(a, b);
        case 'x':
            return multiply(a, b);
    };
};


number.addEventListener('click', (e) => {
    //check if '.' was not pushed more then one time
    if (e.target.textContent === '.' && enterNum.includes('.')) { return };

    //check if the number is not too long
    if (enterNum.length > 9) { return }

    //condition to start singular equation
    if (e.target.textContent === '=') {
        if (numberA !== '' && numberB !== '' && mainOperator !== '' && result === '') {
            getResult();
        } return;
    };
    //condition to start singular equation after previous one was done and result is not needed
    if (numberA !== '' && numberB !== '' && mainOperator !== '' && result !== '') {
        resetAllVariable();
    }
    //Collecting information for numbers and operants
    getNumber(e.target.textContent)
});

function getNumber(num) {
    //adding a number that was clicked to the figure
    enterNum.push(num);

    //while no operator was clicked we record first operant
    if (mainOperator === '') {
        console.log(enterNum);
        numberA = Number(enterNum.join(''));
        //refresh what is being displayed in line 1
        line1.textContent = `${numberA} ${mainOperator}  ${numberB}`;
        //after the operator was clicked we start to record second operant
    } else {
        numberB = Number(enterNum.join(''));
        console.log(enterNum);
        //refresh what is being displayed in line 1
        line1.textContent = `${numberA}${mainOperator}${numberB}`;
    }
}

function getResult() {
    result = operate(numberA, numberB, mainOperator);
    if (result !== 'error') {
        result = Math.round(result * 1000000) / 1000000;
        line2.textContent = '= ' + result;
        enterNum = [];
    } else {
        resetAllVariable();
        line2.textContent = 'error';
    };
}

col_1_operator.addEventListener('click', (e) => {

    // If user doesn't enter first number nothing is happened 
    if (numberA === '') { return };
    console.log(e.target.textContent);

    // if user would like to reuse the result in next step
    if (numberA !== '' && numberB !== '' && mainOperator !== '' && result !== '') {
        mainOperator = e.target.textContent;
        numberA = result;
        result = '';
        numberB = ''
        line1.textContent = `${numberA}${mainOperator}${numberB}`;
        line2.textContent = '=';
        ; return;
    }

    mainOperator = e.target.textContent;
    //reset the buffer for recording first number
    enterNum = [];
    //refresh what is being displayed in line 1
    line1.textContent = `${numberA}${mainOperator}${numberB}`;
});


col_2_operator.addEventListener('click', (e) => {
    if (e.target.textContent === 'AC') {
        resetAllVariable();
    };

    //all situations when user wants to change sign to opposite one for the current number or result
    if (e.target.textContent === '-/+') {

        //if nothing was entered yet
        if (numberA === '') {
            enterNum = ['-'];
            line1.textContent = `- ${mainOperator}${numberB}`;
            return;
        }
        //if user wants to reuse the result but with opposite value
        if (result !== '') {
            result *= -1;
            line2.textContent = '=' + result; return;
        }

        //if user have first number but would like to have it mult. by -1
        if (mainOperator === '') {
            numberA *= -1;
            enterNum = numToArray(numberA);
            line1.textContent = `${numberA}${mainOperator}${numberB}`; return;
        }

        //
        if (mainOperator !== '' && result === '') {
            if (numberB === '') {

                enterNum = ['-'];
                line1.textContent = `${numberA}${mainOperator} -`; return
            }

            numberB *= -1;
            enterNum = numToArray(numberB);
            line1.textContent = `${numberA}${mainOperator}${numberB}`; return;
        }
    };

    //user wants to change current number
    if (e.target.textContent === 'C') {
        console.log(e.target.textContent)
        //if it is the first one
        if (enterNum.length === 0 ) {return;} else {
            enterNum.pop();
            if (mainOperator ==='') {
                numberA = Number(enterNum.join(''));
                line1.textContent = `${numberA}${mainOperator}${numberB}`;
                return;
            }
            //if it is the second one
            if (mainOperator !=='' && result ==='') {
                numberB = Number(enterNum.join(''));
                line1.textContent = `${numberA}${mainOperator}${numberB}`;
            }
        }
    }

    if (e.target.textContent === 'ON') {
        if (onOff) {
        line1.textContent =''
        line2.textContent =''
        onOff=false;
        }else {
            resetAllVariable();
            line1.textContent = `0`;
            line2.textContent = '=';
            onOff=true;
        }

    }
});

const resetAllVariable = function () {
    numberA = ''; numberB = '';
    mainOperator = ''; result = '';
    enterNum = []; line1.textContent = 0;
    line2.textContent = '=';
    
}

function numToArray(num) {
    return num.toString().split('');
}



