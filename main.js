
function operation(operator = '', num1 = '', num2 = '') {
    let numb1 = num1;
    let numb2 = num2;

    //check if num1 or num2 is a porcent
    if(numb1.includes('%')|| numb2.includes('%')){
        //return value / 100
        function toPorcent(Str){
            //get a copy to array of num1 or num2
            let str = Array.from(Str);
            //pop out % sign
            str.pop()
            //return value to string / 100 => value / 100 = porcent%
            return Number(str.join('')) / 100
        }
        if(num1.includes('%')){
            numb1 = toPorcent(num1);
        } else {
            numb2 = toPorcent(num2);
        }     
    }
    
    switch (operator) {
        case '+':
            return Number(numb1) + Number(numb2);
        case '-':
            return Number(numb1) - Number(numb2);
        case '*':
            return Number(numb1) * Number(numb2);
        case '/':
            return Number(numb1) / Number(numb2);
        default:
            return 'wrong operation ...error';
    }
}
const keyboard = {
    numberKeys: document.querySelectorAll('.numb-bttn'),
    operationKeys: document.querySelectorAll('.operation-bttn'),
    specialKeys: document.querySelectorAll('.special-bttn'),
};
const resultVar = {
    numb1: document.querySelector('#numb1'),
    numb2: document.querySelector('#numb2'),
    operator: document.querySelector('#operator'),
    addNumber1: function (number = '') {
        if (number == '') {
            this.numb1.innerText = '';
        } else {
            this.numb1.innerText = number;
        }
    },
    addNumber2: function (number = '') {
        if (number == '') {
            this.numb2.innerText = '';
        } else {
            this.numb2.innerText = number;
        }
    },
    addOperator: function (operator = '') {
        if (operator == '') {
            this.operator.innerText = '';
        } else {
            this.operator.innerText = operator;
        }
    },
    addPoint: function (target) {
        let targetText = Array.from(target.innerText);
        let dotCounter = 0;
        targetText.forEach(character => {
            if (character == '.') {
                dotCounter += 1;
            }
        });
        if (dotCounter == 0) {
            target.innerText += '.';
        }
    },
    addSign: function (target) {
        //convert numb1 or numb2 into a array of characters
        let targetText = Array.from(target.innerText);
        let minusCounter = 0;
        //check if it have a minus sign
        targetText.forEach(character => {
            if (character == '-') {
                minusCounter += 1;
            }
        });
        // check there is not more than one 
        if (minusCounter == 1 || minusCounter == 0) {
            //switch to positive 
            if (minusCounter == 1) {
                // remove frist element '-'
                targetText.shift();
                // update target
                target.innerText = targetText.join('');

            }
            //switch to negative
            else {
                //add '-'
                targetText.unshift('-')
                // update target
                target.innerText = targetText.join('');
            }
        }

    },
    addPorcent : function(target){
            //get inner text and convert to string
        let targetText = Array.from(target.innerText);
        let counterPerSign = 0 ;
            //check if it have porcent character 
        targetText.forEach(char => {
                if (char == '%'){
                    counterPerSign += 1 ;
                }
        });
        if(counterPerSign == 0 || counterPerSign == 1){
            //it have one % 
            if(counterPerSign == 1){
                targetText.pop();
                console.log(targetText);
                target.innerText = targetText.join('');
            }
            // it haven't one %
            else {
                targetText.push('%');
                console.log(targetText);
                target.innerText = targetText.join('');
            }
        }
    },
    
}
// events :

// add number  
keyboard.numberKeys.forEach(key => {
    key.addEventListener('click', e => {
        // #1 is being edited
        if (resultVar.operator.innerText == '') {
            if (resultVar.numb1.innerText == '') {
                resultVar.addNumber1(key.innerText);
            } else {
                // if % sign at the end , numb1 can't have more #
                if(Array.from(numb1.innerText)[Array.from(numb1.innerText).length - 1] != '%'){
                    resultVar.numb1.innerText += key.innerText;
                }    
            }
        }
        // #2 is being edited
        if (resultVar.operator.innerText != '') {
            if (resultVar.numb2.innerText == '') {
                resultVar.addNumber2(key.innerText);
            } else {
                // if % sign at the end , numb2 can't have more #
                if(Array.from(numb2.innerText)[Array.from(numb2.innerText).length - 1] != '%'){
                    resultVar.numb2.innerText += key.innerText;
                }  
            }
        }

    });
});
//add operator
keyboard.operationKeys.forEach(key => {
    key.addEventListener('click', e => {
        //numb1 isn't ready , dont' add operator yet
        if (resultVar.numb1.innerText == '') {
            resultVar.addOperator('');
        }
        //numb1 is ready add operator
        else {
            resultVar.addOperator(key.innerText);
        }
    });
});
// trigger operation 
document.querySelector('#equal-bttn').addEventListener('click', e => {
    // numb1 , numb2 and operator are ready 
    if (resultVar.numb1.innerText != '' && resultVar.numb2.innerText != '' && resultVar.operator.innerText != '') {
        // take all of them and perform a operation , then asign result to numb1
        resultVar.addNumber1(
            operation(resultVar.operator.innerText,
                resultVar.numb1.innerText,
                resultVar.numb2.innerText)
        );
        //clear numb2 & operator 
        resultVar.addNumber2('');
        resultVar.addOperator('');
    }
});
//special buttons :
keyboard.specialKeys.forEach(key => {
    //check wich one was pressed
    key.addEventListener('click', e => {
        switch (key.innerText) {
            case 'C':
                // clean inner text for numb1 , numb2 & operator
                for (let atribute in resultVar) {
                    if (typeof (resultVar[atribute]) == 'object') {
                        resultVar[atribute].innerText = '';
                    }
                }
                break;

            case '.':
                //add a dot to numb1 o numb2 for decimal calculations
                if (resultVar.operator.innerText == '') {
                    resultVar.addPoint(resultVar.numb1);
                } else if (resultVar.operator.innerText != '') {
                    resultVar.addPoint(resultVar.numb2);
                }
                break;

            case '+/-':
                //switch sign 
                if (resultVar.operator.innerText == '') {
                    resultVar.addSign(resultVar.numb1);
                } else if (resultVar.operator.innerText != '') {
                    resultVar.addSign(resultVar.numb2);
                }
                break ;
            case '%' :
                //switch to porcent
                if (resultVar.operator.innerText == ''){
                    resultVar.addPorcent(resultVar.numb1);
                } else if(resultVar.operator.innerText != ''){
                    resultVar.addPorcent(resultVar.numb2);
                }
                break;
                
        }


    });
});
