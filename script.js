const calculator = document.querySelector(".calculator");
const buttons = calculator.querySelector(".calculator__buttons");
const firstOperend = document.querySelector(".calculator__operend--left");
const operator = document.querySelector(".calculator__operator");
const secondOperend = document.querySelector(".calculator__operend--right");
const calculatedResult = document.querySelector(".calculator__result");

function calculates(n1, opertor, n2) {
  firstOperend = n1;
  (operator = opertor), (secondOperend = n2);
  let result;

  if (opertor === "+") {
    return n1 + n2;
  } else if (opertor === "-") {
    return n1 - n2;
  } else if (opertor === "*") {
    return n1 * n2;
  } else if (opertor === "/") {
    return n1 / n2;
  }
  // TODO : make function to operate according to the n1, n2, operator.
  // ex) if input is n1 : '1', operator : '+', n2 : '2' , 3 will be returned.
  return String(result);
}

buttons.addEventListener("click", function (event) {
  // will be triggered when click the buttons.

  const target = event.target;
  const action = target.classList[0];
  const buttonContent = target.textContent;
  // ! DO NOT MODIFY(Line 19 - 21).

  if (target.matches("button")) {
    // TODO : make your code to operate calculator
    if (action === "number") {
      console.log(firstOperend.innerText === "0");
      console.log(typeof firstOperend.innerText);
      console.log(typeof 0);
      console.log(firstOperend === 0);

      if (firstOperend.innerText === "0") {
      }
    }
    if (action === "operator") {
      operator.innerText = buttonContent;
      console.log("You click an operator this " + buttonContent);
    }
    if (action === "decimal") {
      alert("Decimal still not working. please dont click the decimal ty. :)");
    }
    if (action === "clear") {
      console.log("You clear the numbers and operator");
      firstOperend.innerText = "0";
      operator.innerText = "+";
      secondOperend.innerText = "0";
      calculatedResult.innerText = "0";
    }
    if (action === "calculate") {
      calculates = calculatedResult.innerText;
      console.log("The total number is", calculates);
    }
  }
});

// ! Advanced Challenge test and Nightmare test.
const display = document.querySelector(".calculator__display--for-advanced");
let firstNum, operatorForAdvanced, previousKey, previousNum;

buttons.addEventListener("click", function (event) {
  const target = event.target;
  const action = target.classList[0];
  const buttonContent = target.textContent;
  // ! don't touch the code above.

  // ! modify below for Advanced Challenge & Nightmare.
  if (target.matches("button")) {
    if (action === "number") {
    }
    if (action === "operator") {
    }
    if (action === "decimal") {
    }
    if (action === "clear") {
    }
    if (action === "calculate") {
    }
  }
});
