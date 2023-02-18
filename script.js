const calculator = document.querySelector('.calculator');
const buttons = calculator.querySelector('.calculator__buttons');
const firstOperend = document.querySelector('.calculator__operend--left');
const operator = document.querySelector('.calculator__operator');
const secondOperend = document.querySelector('.calculator__operend--right');
const calculatedResult = document.querySelector('.calculator__result');

function calculate(n1, operator, n2) {
  firstOperend = n1;
  ope = operator;
  secondOperend = n2;
  let result = 0;

  // TODO : make function to operate according to the n1, n2, operator.
  // ex) if input is n1 : '1', operator : '+', n2 : '2' , 3 will be returned.

  if(n1 === n2){

  }
  return String(result);
}

buttons.addEventListener('click', function (event) {
  // will be triggered when click the buttons.

  const target = event.target;
  const action = target.classList[0];
  const buttonContent = target.textContent;
  // ! DO NOT MODIFY(Line 19 - 21).

  if (target.matches('button')){
    // TODO : make your code to operate calculator
    if (action === 'number1') {
        firstOperend.innerText = buttonContent;
    }
    if (action === 'operator') {
      console.log('operator ' + buttonContent + ' button');
    }

    if (action === 'decimal') {
      
    }
    if (action === 'clear') {
      firstOperend.innerText = "0";
      operator.innerText = "+";
      secondOperend.innerText = "0";
      calculatedResult.innerText = "0";
    }

    if (action === 'calculate') {
      console.log('compute button');
    }
  }
});
// ! Advanced Challenge test and Nightmare test.
const display = document.querySelector('.calculator__display--for-advanced');
let firstNum, operatorForAdvanced, previousKey, previousNum;

buttons.addEventListener('click', function (event) {
  const target = event.target;
  const action = target.classList[0];
  const buttonContent = target.textContent;
  // ! don't touch the code above.

  // ! modify below for Advanced Challenge & Nightmare.
  if (target.matches('button')) {
    if (action === 'number') {
    }
    if (action === 'operator') {
    }
    if (action === 'decimal') {
    }
    if (action === 'clear') {
    }
    if (action === 'calculate') {
    }
  }
});
