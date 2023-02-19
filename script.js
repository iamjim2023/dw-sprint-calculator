const calculator = document.querySelector('.calculator');
const buttons = calculator.querySelector('.calculator__buttons');
const firstOperend = document.querySelector('.calculator__operend--left');
const operator = document.querySelector('.calculator__operator');
const secondOperend = document.querySelector('.calculator__operend--right');
const calculatedResult = document.querySelector('.calculator__result');

function calculate(n1, operator, n2) {
  const a = n1;
  const eq = operator;
  const b = n2;
  let result = 0;

  if (n1 + n2){

  }
  // TODO : make function to operate according to the n1, n2, operator.
  // ex) if input is n1 : '1', operator : '+', n2 : '2' , 3 will be returned.
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
    if (action === 'decimal') {
      alert('Decimal is not working. please dont click this decimal sh1t.');
    }

    if (action === 'calculate') {
      console.log('compute button');
    }
  }
});

// this field is for numbers
buttons.addEventListener('click', function (event) {

  const target = event.target;
  const action = target.classList[0];
  const buttonContent = target.textContent;

  if (target.matches('button')){
    if (action === 'number') {
      firstOperend.innerText = buttonContent;
      console.log('You click the first number ' + buttonContent);
      }
    if (action === 'number') {
        secondOperend.innerText = buttonContent;
        console.log('You click the second number ' + buttonContent);
      }
    }
});

// this is for operator
buttons.addEventListener('click', function (event) {

  const target = event.target;
  const action = target.classList[0];
  const buttonContent = target.textContent;

  if (target.matches('button')){
  if (action === 'operator') {
      operator.innerText = buttonContent;
      console.log('You click an operator ' + buttonContent);
    }
  }
});

// Clear Numbers
buttons.addEventListener('click', function (event) {

  const target = event.target;
  const action = target.classList[0];

  if (target.matches('button')){
    if (action === 'clear') {
	  console.log('You clear the numbers and operator');
    firstOperend.innerText = "0";
    operator.innerText = "+";
    secondOperend.innerText = "0";
    calculatedResult.innerText = "0";
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
