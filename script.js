let runningTotal = 0;
let buffer = "0";
let previousOperator;
let pre_ans = "";
let decimal = false;
let positive = true;

const current_ans  = document.querySelector('.current_ans');
const screen = document.querySelector('.screen');
const previous_ans = document.querySelector(".prev_ans");
const list_operators = ["+", "−", "×", "÷"];

function buttonClick(value){
    if(isNaN(value)){
        handlesymbol(value);
    } 
    else{
        handlenumber(value);
    }

    current_ans.innerText = buffer;
    previous_ans.innerText = pre_ans;
    screen.scrollLeft = screen.scrollWidth;

}

function handlesymbol(symbol){
    switch(symbol){
        case "C":
            buffer = "0";
            runningTotal = 0;
            pre_ans = "";
            positive = true;
            decimal = false;
            break;
        
        case "=":
            if(previousOperator === null){
                return;
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            pre_ans += buffer + " =";
            buffer = runningTotal;
            runningTotal = 0;
            break;

        case "←":
            if(buffer.length === 1){
                positive = true;
                if (list_operators.includes(pre_ans.slice(-1)) && buffer === "0"){
                    pre_ans = pre_ans.substring(0, pre_ans.length - 1);
                    previousOperator = null;
                }
                buffer = "0";
                decimal = false;
            }
            else if(buffer.slice(-1) === "."){
                decimal = false;
                buffer = buffer.substring(0, buffer.length - 1);
            }
            else if("=".includes(pre_ans.slice(-1))){
                return;
            }
            else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;

        case "+":
        case "−":
        case "×":
        case "÷":
            handleMath(symbol);
            break;

        case ".":
            if (decimal){
                return;
            }
            else{
                buffer += ".";
                decimal = true;
            }
            break;

        case "+/-":
            handlenegative();
            break;
    }
}

function handleMath(symbol){
    if(buffer === "0"){
        if(previousOperator === null){
            previousOperator = symbol;
            pre_ans = runningTotal + symbol;
        }
        return;
    }

    const intBuffer = parseFloat(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    }
    else{
        flushOperation(intBuffer);
    }

    previousOperator = symbol;
    pre_ans = runningTotal + symbol;
    buffer = "0";
    positive = true;
    decimal = false;
}

function flushOperation(intBuffer){
    if(previousOperator === "+"){
        runningTotal += intBuffer;
    }
    else if(previousOperator === "−"){
        runningTotal -= intBuffer;
    }
    else if(previousOperator === "×"){
        runningTotal *= intBuffer;
    }
    else if(previousOperator === "÷"){
        runningTotal /= intBuffer;
    }
}

function handlenumber(numberString){
    if((pre_ans !== "") && list_operators.includes(pre_ans.slice(-1))){
        if(buffer === "0"){
            buffer = numberString;
        }
        else {
            buffer += numberString;
        }
    }
    else if(buffer === "0" && pre_ans === ""){
        buffer = numberString;
    }
    else if(buffer !== "0" && pre_ans === ""){
        buffer += numberString;
    }
}

function handlenegative(){
    if (buffer !== "0") {
        if (!(buffer.toString().includes("-"))) {
            buffer = parseFloat("-" + buffer);
            positive = false;
        }
        else{
            buffer = parseFloat((buffer.toString()).substring(1, buffer.length));
            positive = true;
        }
    }
}

function init(){
    document.querySelector(".calc-buttons").addEventListener("click", function(event){
        buttonClick(event.target.innerText);
    });
}

init();