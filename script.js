const buttons = document.querySelectorAll(".btn");
const resultDisplay = document.getElementById("result");

let firstNumber = 0;
let secondNumber = 0;
let currentAction = "";
let needsClearing = true;

function reset() {
  firstNumber = 0;
  secondNumber = 0;
  currentAction = "";
  needsClearing = true;
  resultDisplay.textContent = 0;
}

function roundNumber(num) {
  return Math.round(num * 1000000) / 1000000;
}

function doMath(num1, num2, action) {
  if (action == "add") {
    return roundNumber(num1 + num2);
  } else if (action == "subtract") {
    return roundNumber(num1 - num2);
  } else if (action == "multiply") {
    return roundNumber(num1 * num2);
  } else {
    if (num2 == 0) {
      return "Division by zero? Really?";
    }
    return roundNumber(num1 / num2);
  }
}

function handleKeyPress(event) {
  // TODO
  console.log(event.key);
}

function handleClick(event) {
  const element = event.target;
  const num = Number(element.id);
  //   console.log(num);
  if (Number.isNaN(num)) {
    // console.log(element.id);
    if (element.id == "c") {
      reset();
    } else if (element.id == "dot") {
      if (!resultDisplay.textContent.includes(".")) {
        resultDisplay.textContent += ".";
        needsClearing = false;
      }
    } else if (element.id == "del") {
    } else if (element.id == "equal") {
      if (!needsClearing && firstNumber != 0) {
        secondNumber = Number(resultDisplay.textContent);
        resultDisplay.textContent = doMath(
          firstNumber,
          secondNumber,
          currentAction
        );
        needsClearing = true;
      }
    } else {
      if (!needsClearing) {
        if (firstNumber != 0) {
          secondNumber = Number(resultDisplay.textContent);
          resultDisplay.textContent = doMath(
            firstNumber,
            secondNumber,
            currentAction
          );
          firstNumber = Number(resultDisplay.textContent);
        }
        firstNumber = Number(resultDisplay.textContent);
        currentAction = element.id;
        needsClearing = true;
      }
    }
  } else {
    if (needsClearing) {
      resultDisplay.textContent = "";
      needsClearing = false;
    }
    resultDisplay.textContent += num;
  }
}

reset();
buttons.forEach((button) => button.addEventListener("click", handleClick));
document.addEventListener("keydown", handleKeyPress);
