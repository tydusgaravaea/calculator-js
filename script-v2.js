// VARIABLES

var display = document.querySelector("p.heading");
var buttons = document.querySelectorAll("div.button");

var numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
var operands = ["+", "−", "×", "÷"];

var stringNum = "";
var stringNum2 = "";
var temp;
var temp2;
var operand = "";
var proceed = false;
var lastkey;

// FUNCTIONS

function calculate(num1, num2, op) {
  if (op == "+") {
    return Math.round((num1 + num2) * 10000) / 10000;
  } else if (op == "−") {
    return Math.round((num1 - num2) * 10000) / 10000;
  } else if (op == "×") {
    return Math.round((num1 * num2) * 10000) / 10000;
  } else if (op == "÷") {
    return Math.round((num1 / num2) * 10000) / 10000;
  }
}

function changeDisplay(stringNum, operand, stringNum2) {
  display.textContent = stringNum + " " + operand + " " + stringNum2;
  if (stringNum2) {
    return Number(stringNum2);
  } else {
    return Number(stringNum);
  }
}

function clearAll() {
  stringNum = "";
  stringNum2 = "";
  temp1 = undefined;
  temp2 = undefined;
  operand = "";
  proceed = false;
  lastkey = undefined;
  changeDisplay(stringNum, operand, stringNum2);
}

function main(key) {
  // This is when pressing a number
  if (numbers.includes(key)) {
    if (proceed) {
      stringNum2 += key;
      changeDisplay(stringNum, operand, stringNum2);
    } else {
      stringNum += key;
      changeDisplay(stringNum, operand, stringNum2);
    }
  }
  // This is for pressing an operand
  if (operands.includes(key) && stringNum2 == "") {
    temp = Number(stringNum);
    operand = key;
    changeDisplay(stringNum, operand, stringNum2);
    proceed = true;
  } else if (operands.includes(key) && stringNum2 != "") {
    temp2 = Number(stringNum2);
    temp = calculate(temp, temp2, operand);
    stringNum = temp + "";
    stringNum2 = "";
    operand = key;
    changeDisplay(stringNum, operand, stringNum2);
  }
  // This is for AC
  if (key == "AC") {
    clearAll();
  }
  // This is for =
  if (key == "=" && stringNum2 != "") {
    temp2 = Number(stringNum2);
    temp = calculate(temp, temp2, operand);
    stringNum = temp + "";
    stringNum2 = "";
    operand = "";
    changeDisplay(stringNum, operand, stringNum2);
  }
  // This is for ⌫
  if (key == "⌫") {
    if (!proceed) {
      stringNum = stringNum.substring(0, stringNum.length - 1);
      changeDisplay(stringNum, operand, stringNum2);
    } else if (proceed && stringNum2 == "") {
      operand = "";
      changeDisplay(stringNum, operand, stringNum2);
    } else {
      stringNum2 = stringNum2.substring(0, stringNum2.length - 1);
      changeDisplay(stringNum, operand, stringNum2);
    }
  }

/* DEBUGGER
  document.querySelector("div.d1").textContent = key;
  document.querySelector("div.d2").textContent = typeof(key);
  document.querySelector("div.d3").textContent = stringNum;
  document.querySelector("div.d4").textContent = typeof(stringNum);
  document.querySelector("div.d5").textContent = stringNum2;
  document.querySelector("div.d6").textContent = typeof(stringNum2);
  document.querySelector("div.d7").textContent = temp;
  document.querySelector("div.d8").textContent = typeof(temp);
  document.querySelector("div.d9").textContent = temp2;
  document.querySelector("div.d10").textContent = typeof(temp2);
  document.querySelector("div.d11").textContent = operand;
  document.querySelector("div.d12").textContent = typeof(operand);
  document.querySelector("div.d13").textContent = proceed;
  document.querySelector("div.d14").textContent = typeof(proceed);
*/
}
// EVENT LISTENERS

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", e => {
    lastkey = e.target.textContent;
    main(lastkey);
  })
}
