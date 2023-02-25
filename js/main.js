const DIGITS_TO_ROUND = 7;
let actualExpression = "";

function add(a,b) {
  return a+b;    
}

function subtract(a,b) {
  return a-b;
}

function multiply(a,b) {
  let result = a*b;
  return round(result);
}

function divide(a,b) {
  if (b === 0) {
    return "Error, Division by cero is undefined";
  } else { 
    let result = a/b;
    return round(result);
  }
}

function round(a) {
  let digits = Math.pow(10, DIGITS_TO_ROUND);
  return Math.round( ( a + Number.EPSILON ) * digits ) / digits;
}

function operate(operator,a,b) {
  let result;
  switch (operator) {
    case "+":
      result = add(a,b);
      break;
    case "-":
      result = subtract(a,b);
      break;
    case "*":
      result = multiply(a,b);
      break;
    case "/": 
      result = divide(a,b);
      break;
    default:
      result = "Error";
      break;
  }
  return result;
}

//Get the number of operators (+,-,*,/) in a given expression
function getQuantityOperators(expression) {
  let quantityOperator = 0;
  for (let i = 0; i < expression.length; i++) {
    if (i != 0 && (expression[i] == "+" || expression[i] == "-" || expression[i] == "*" || expression[i] == "/")) {
      quantityOperator++;
    }
  }
  return quantityOperator;
}

//Convert a given expression to an array with the logic
//separation of quantities and symbols
function convertToArray(expression) {
    let elements = [];
    let temp = "";
    for (let i = 0; i < expression.length; i++) {
      if (i == 0 && (expression[i] == "+" || expression[i] == "-")) {
        temp += expression[i];
      }
      else if (expression[i] == "+" || expression[i] == "-" || expression[i] == "*" || expression[i] == "/") {
        elements.push(temp);
        elements.push(expression[i]);
        temp = "";
      } else {
        temp += expression[i];
      }
      if (i == expression.length-1) { 
        elements.push(temp);
      }
      
    }
    
    return elements;
}

//Validate the correct syntax's of a expression
function validateExpression(expression) {
  //Check for floats with extra dots
  for (let i = 0; i < expression.length-1; i++) {
    let dotQuantity = (expression[i].match(/\./g)||[]).length;
    if (dotQuantity > 1) {
      return false;
    }
  } 

  //Check for empty elements
  for (let i = 0; i < expression.length-1; i++) {
    if (expression[i] == "") {
      return false;
    }    
  }

  return true;
}

//Process the expression from left to right
function resolve(expression) {
  let quantityOperator = getQuantityOperators(expression);
  console.log("Quantity Operator:" + quantityOperator);

  expression = convertToArray(expression);
  console.log(expression);

  if (!validateExpression(expression)) {
    clearDisplay();
    displayValue("Malformed expression");
    return 0;
  }

  for (let i = 0; i < quantityOperator; i++) {
    //console.log("Inside i for: "+i);
    for (let j = 0; j < expression.length; j++) {
      //console.log("Inside j for: "+j);
      if (j != 0 && (expression[j] == "+" || expression[j] == "-" || expression[j] == "*" || expression[j] == "/")) {
        //console.log("Inside if");
        //console.log(expression[j]+" "+ expression[j-1]+" "+expression[j+1]);
        let result = operate(expression[j],parseFloat(expression[j-1]),parseFloat(expression[j+1]));
        //console.log("Result: "+result);
        expression = expression.slice(j+2);
        //console.log(expression);
        expression.unshift(result); 
        //console.log(expression);
        break;
      } 
    }
  }
  actualExpression = "";
  actualExpression = expression;
  console.log(expression);
  clearDisplay();
  displayValue(expression[0]);
}

//Show values in the display
function displayValue(value) {
  let display = document.getElementById("display");
  display.textContent = value;
}

//Aggregate value to the expression
function pushValue(value) {
  if (value != "=") {
    actualExpression += value;
    displayValue(actualExpression);
  } else {
    resolve(actualExpression);
  }
}

function clearDisplay() {
  let display = document.getElementById("display");
  display.textContent = "";
  actualExpression = "";
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  if (button.id != "clear") {
    button.addEventListener('click', () => {
        pushValue(button.value);
      });
  } else {
    button.addEventListener('click', () => {clearDisplay()});
  }
});

displayValue(actualExpression);