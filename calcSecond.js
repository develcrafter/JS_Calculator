let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const display = document.querySelector(".js-displayText");

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      runningTotal = 0;
      buffer = "0";
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "＝":
      if (previousOperator === null) {
        return;
      }
      flushOperator(parseInt(buffer));
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    case "÷":
    case "×":
    case "－":
    case "＋":
      handleMath(symbol);
      break;
  }
}

function handleMath(operator) {
  if (buffer === "0") {
    return;
  }

  const intBuffer = parseInt(buffer);

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperator(intBuffer);
  }
  previousOperator = operator;

  buffer = "0";
}

function flushOperator(intBuffer) {
  switch (previousOperator) {
    case "＋":
      runningTotal += intBuffer;
      break;
    case "－":
      runningTotal -= intBuffer;
      break;
    case "×":
      runningTotal *= intBuffer;
      break;
    case "÷":
      runningTotal /= intBuffer;
      break;
  }
}

function handleNumber(num) {
  if (buffer === "0") {
    buffer = num;
  } else {
    buffer = buffer + num;
  }
}

function rerender() {
  display.innerText = buffer;
}

function buttonClick(event) {
  const value = event.target.innerText;
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }

  rerender();
}

function init() {
  document
    .querySelectorAll(".js-btns")
    .forEach(btns => btns.addEventListener("click", buttonClick));
}

init();
