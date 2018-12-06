const displayText = document.querySelector(".js-displayText");
const btns = Array.from(document.querySelectorAll(".js-btns"));

let number = "";
let operatorArray = [];
let numArray = [];

function initialize() {
  number = "";
  numArray = [];
  operatorArray = [];
}

function paintText(text) {
  displayText.innerText = text;
}

function cleanAll() {
  initialize();
  paintText("0");
}

function makeNumber(num) {
  if (number === "0") {
    number = "";
  }
  number = number + num;
  paintText(number);
}

function eraseLastNum() {
  if (number.length === 1) {
    number = "0";
  } else {
    number = number.substr(0, number.length - 1);
  }
  paintText(number);
}

function addOperator(symbol) {
  operatorArray.push(symbol);
  numArray.push(parseInt(number));
  number = "";
  paintText("0");
}

function calcNums() {
  if (operatorArray.length === 0 || numArray.length <= 1) return;
  numArray.push(parseInt(number));

  let result = numArray[0];

  for (let i = 0; i < operatorArray.length; i++) {
    if (operatorArray[i] === "＋") {
      result = result + numArray[i + 1];
    } else if (operatorArray[i] === "－") {
      result = result - numArray[i + 1];
    } else if (operatorArray[i] === "×") {
      result = result * numArray[i + 1];
    } else {
      // ÷
      result = result / numArray[i + 1];
    }
  }
  paintText(result);
  initialize();
}

function handleClick(event) {
  const btn = event.target;
  const list = btn.classList;
  const x = btn.innerText;

  if (list.contains("clean")) {
    cleanAll();
  } else if (list.contains("num")) {
    makeNumber(x);
  } else if (list.contains("backarrow")) {
    eraseLastNum();
  } else if (list.contains("operator")) {
    addOperator(x);
  } else {
    calcNums();
  }
}

function init() {
  paintText("0");
  btns.forEach(btns => btns.addEventListener("click", handleClick));
}

init();
