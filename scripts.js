/* HISTORY FUNCTION */

function getHistory() {
    return document.getElementById("history-value").innerText;
}

function printHistory(num) {
    document.getElementById("history-value").innerText=num;
}

/* OUTPUT FUNCTIONS TO RETRIEVE AND DISPLAY THE USERS RESULTS */

function getOutput() {
    return document.getElementById("output-value").innerText;
}

function printOutput(num) {
    if (num == "") {
        document.getElementById("output-value").innerText=num;
        console.log("PRINT-OUTPUT: ",num);
    }
    else {
        document.getElementById("output-value").innerText=getFormattedNumber(num);
        console.log("PRINT-OUTPUT2: ", document.getElementById("output-value").innerText);
    }
}

function getFormattedNumber(num) {
    if(num == "-") {
        return "";
    }

    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}

/* FUNCTION TO CLEAR COMAS TO OUTPUT FIELD */
function reverseNumberFormat(num) {
    return Number(num.replace(/,/g,''));
}

var operator = document.getElementsByClassName("operator");
for(var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function() {
        if(this.id == "clear") {
            printHistory("");
            printOutput("");
        } else if(this.id == "backspace") {
            var output = reverseNumberFormat(getOutput()).toString();
            if(output) { //if output has a value
                output = output.substr(0, output.length-1);
                printOutput(output);
            }
        } else {
            var output = getOutput();
            var history = getHistory();
            if(output == "" && history != "") {
                if(isNaN(history(history.length-1))) { // isNaN return true or false if Not A Number
                    history = history.substr(0, history.length-1);
                }
            }
            if(output != "" || history != "" ) {
                output = output == ""? // TEST "?" TRUE : FALSE
                output:reverseNumberFormat(output);
                history = history + output;
                if(this.id == "=") {
                    var result = eval(history); //eval - evaluates javascript code and executes it
                    printOutput(result);
                    printHistory("");
                } else {
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}

var number = document.getElementsByClassName("number");
for(var i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function() {
        var output = reverseNumberFormat(getOutput());
        if (output != NaN) { //if output is a number
            output += this.id;
            console.log(operator);
            console.log(this.id);
            console.log(output);
            printOutput(output);
            // console.log("OUTPUT: ", printOutput())
        }
    });
}