const DIGITS_TO_ROUND = 7;

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

function getQuantityOperators(expression) {
  let quantityOperator = 0;
  for (let i = 0; i < expression.length; i++) {
    if (i != 0 && (expression[i] == "+" || expression[i] == "-" || expression[i] == "*" || expression[i] == "/")) {
      quantityOperator++;
    }
  }
  return quantityOperator;
}

function convertToArray(expression) {
    let elements = [];
    let temp = "";
    for (let i = 0; i < expression.length; i++) {
      
      if (expression[i] == "+" || expression[i] == "-" || expression[i] == "*" || expression[i] == "/") {
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

function resolve(expression) {
  let quantityOperator = getQuantityOperators(expression);
  //console.log("Quantity Operator:" + quantityOperator);

  expression = convertToArray(expression);
  //console.log(expression);

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
  
  console.log(expression);
}