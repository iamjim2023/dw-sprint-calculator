const calculator = document.querySelector('.calculator');
const buttons = calculator.querySelector('.calculator__buttons');
const firstOperend = document.querySelector('.calculator__operend--left');
const operator = document.querySelector('.calculator__operator');
const secondOperend = document.querySelector('.calculator__operend--right');
const calculatedResult = document.querySelector('.calculator__result');

function calculates(n1, opertor, n2) {
  firstOperend = n1;
  operator = opertor;
  secondOperend = n2;
  let result;

  if (opertor === '+'){
    result = n1 + n2;
  }else if(opertor === '-'){
    result = n1 - n2;
  }
  else if(opertor === '*'){
    result = n1 * n2;
  }
  else if(opertor === '/'){
    result = n1 / n2;
  }
  return result;
}

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
      console.log('You click an operator this ' + buttonContent);
    }else if(action === 'number'){
      secondOperend.innerText = buttonContent;
      console.log('You click the second number ' + buttonContent);
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

// calculate the numbers
buttons.addEventListener('click', function (event) {
  const target = event.target;
  const action = target.classList[0];
  const buttonContent = target.textContent;

  if (target.matches('button')){
    if (action === 'calculate') {
      calculates = calculatedResult.innerText;
      console.log('The total number is', calculates);
    }
  }
});

// this is for decimal
buttons.addEventListener('click', function (event) {
  const target = event.target;
  const action = target.classList[0];

  if (target.matches('button')){
    if (action === 'decimal') {
      alert('Decimal is not working. please dont click the decimal ty. :)');
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
