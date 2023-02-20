const calculator = document.querySelector(".calculator");
const buttons = calculator.querySelector(".calculator__buttons");
const firstOperend = document.querySelector(".calculator__operend--left");
const operator = document.querySelector(".calculator__operator");
const secondOperend = document.querySelector(".calculator__operend--right");
const calculatedResult = document.querySelector(".calculator__result");

function calculate(n1, operator, n2) {
  let result = 0;

  if (operator === "+") {
    result = Number(n1) + Number(n2);
  } else if (operator === "-") {
    result = Number(n1) - Number(n2);
  } else if (operator === "*") {
    result = Number(n1) * Number(n2);
  } else if (operator === "/") {
    result = Number(n1) / Number(n2);
  }
  return String(result);
}
let num1;
let num2;
let oper;

buttons.addEventListener("click", function (event) {
  const target = event.target;
  const action = target.classList[0];
  const buttonContent = target.textContent;

  if (target.matches("button")) {
    if (action === "number") {
      console.log("number " + buttonContent + " button");
      if (firstOperend.textContent === "0") {
        firstOperend.textContent = buttonContent;
        num1 = buttonContent;
      } else if (firstOperend.textContent !== "0") {
        secondOperend.textContent = buttonContent;
        num2 = buttonContent;
      }
    }

    if (action === "operator") {
      console.log("Operator " + buttonContent + " button");
      operator.textContent = buttonContent;
      oper = buttonContent;
    }
    if (action === "decimal") {
      alert("decimal doesnt work. please dont click this button.");
    }
    if (action === "clear") {
      console.log("reset button");
      firstOperend.textContent = "0";
      operator.textContent = "+";
      secondOperend.textContent = "0";
      calculatedResult.textContent = "0";
    }
    if (action === "calculate") {
      console.log("calculate button");
      calculatedResult.textContent = calculate(num1, oper, num2);
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
