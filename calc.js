const displayText = document.querySelector(".js-displayText");
const btnsArray = document.querySelectorAll(".js-btns");

let number = "0";
let numArray = [];
let operator;
let result = "0";

function clearAll() {
  number = "0";
  result = 0;
  displayText.innerText = number;
  orderArray = [];
}

function addNums() {
  result = numArray[0] + parseInt(number);
}

function multiplyNums() {
  result = numArray[0] * parseInt(number);
}

function minusNums() {
  result = numArray[0] - parseInt(number);
}

function divideNums() {
  result = numArray[0] / parseInt(number);
  if (result === infinity) {
    result = "infinity";
  }
}

function calcNums() {
  if (operator === "＋") {
    addNums();
  } else if (operator === "×") {
    multiplyNums();
  } else if (operator === "－") {
    minusNums();
  } else {
    // operator === '÷'
    divideNums();
  }
}

function paintNum(num) {
  if (num === "0" && number === "0") {
    return;
  } else if (number === "0") {
    number = "";
  }
  number = number + num;
  displayText.innerText = number;
  if (numArray.length === 1) {
    calcNums();
  }
}

function makeOrder(symbol) {
  operator = symbol;
  numArray.push(parseInt(number));
  number = "0";
  //console.log(typeof symbol);
}

function eraseNum() {
  if (number.length === 1) {
    number = "0";
  } else {
    number = number.substr(0, number.length - 1);
  }
  displayText.innerText = number;
}

function displayResult() {
  displayText.innerText = result;
  number = "0";
  numArray = [];
}

function handleClick(event) {
  const btn = event.target;
  if (btn.classList.contains("clear")) {
    clearAll();
  } else if (btn.classList.contains("num")) {
    paintNum(btn.innerText);
  } else if (btn.classList.contains("operator")) {
    makeOrder(btn.innerText);
  } else if (btn.classList.contains("equal-sign")) {
    displayResult();
  } else {
    //back Arrow <-
    eraseNum();
  }
}

function init() {
  btnsArray.forEach(btns => btns.addEventListener("click", handleClick));
}

init();
