
function operate(operator = '', num1 = '', num2 = '') {
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
    //check for operators
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
            return NaN;
    }
}
const keyboard = {
    numberKeys: document.querySelectorAll('.numb-bttn'),
    operationKeys: document.querySelectorAll('.operation-bttn'),
    specialKeys: document.querySelectorAll('.special-bttn'),
};

const resVar = {
    numb1: document.querySelector('#numb1'),
    numb2: document.querySelector('#numb2'),
    operator: document.querySelector('#operator'),
    updateNumb : function(num = 'numb1' , value = '') {
        if ( value == '') {
            this[num].innerText = '' ;
        } else {
            this[num].innerText = value; 
        }
    },
    updateOperator : function(value){
        if (operator == '') {
            this.operator.innerText = '';
        } else {
            this.operator.innerText = value;
        }
    },
    getOperator : function(){
        return this.operator.innerText ;
    },
    getNum : function(number = 'numb1'){
        return this[number].innerText;
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
    operate : function() {
        if (this.numb1.innerText != '' && this.numb2.innerText != '' && this.operator.innerText != '') {
            // take all of them and perform a operation , then asign result to numb1
            this.updateNumb('numb1' ,
                operate(this.operator.innerText,
                    this.numb1.innerText,
                    this.numb2.innerText)
            );
            //clear numb2 & operator 
            this.updateNumb('numb2');
            this.updateOperator('');
        }
    }
    
}
// events :

// add number  
keyboard.numberKeys.forEach(key => {
    key.addEventListener('click', e => {
        // #1 is being edited
        if (resVar.getOperator() == '') {
            if (resVar.numb1.innerText == '') {
                resVar.updateNumb('numb1' ,  key.innerText);
            } else {
                // if % sign at the end , numb1 can't have more #
                if(Array.from(numb1.innerText)[Array.from(numb1.innerText).length - 1] != '%'){
                    resVar.numb1.innerText += key.innerText;
                }    
            }
        }
        // #2 is being edited
        if (resVar.getOperator() != '') {
            if (resVar.numb2.innerText == '') {
                resVar.updateNumb('numb2' , key.innerText);
            } else {
                // if % sign at the end , numb2 can't have more #
                if(Array.from(numb2.innerText)[Array.from(numb2.innerText).length - 1] != '%'){
                    resVar.numb2.innerText += key.innerText;
                }  
            }
        }

    });
});
//add operator
keyboard.operationKeys.forEach(key => {
    key.addEventListener('click', e => {
        //operator hasn't been adeed
        if(resVar.getOperator() == ''){
            //numb1 isn't ready , dont' add operator yet
            if (resVar.numb1.innerText == '') {
                resVar.updateOperator('');
            }
            //numb1 is ready add operator
            else {
                resVar.updateOperator(key.innerText);
            }
        } 
        // operator was added
        else if (resVar.getOperator() != '') {
            //trigger an operation asign to numb1 and add this new operator
            if(resVar.getNum('numb2') != '' ){
                resVar.operate()
                resVar.updateOperator(key.innerText);
            }
        }
    });
});
// trigger operation by pressing equal sign
document.querySelector('#equal-bttn').addEventListener('click', e => {
    resVar.operate();
});
//special buttons :
keyboard.specialKeys.forEach(key => {
    //check wich one was pressed
    key.addEventListener('click', e => {
        switch (key.innerText) {
            case 'C':
                // clean inner text for numb1 , numb2 & operator
                for (let atribute in resVar) {
                    if (typeof (resVar[atribute]) == 'object') {
                        resVar[atribute].innerText = '';
                    }
                }
                break;

            case '.':
                //add a dot to numb1 o numb2 for decimal calculations
                if (resVar.operator.innerText == '') {
                    resVar.addPoint(resVar.numb1);
                } else if (resVar.operator.innerText != '') {
                    resVar.addPoint(resVar.numb2);
                }
                break;

            case '+/-':
                //switch sign 
                if (resVar.operator.innerText == '') {
                    resVar.addSign(resVar.numb1);
                } else if (resVar.operator.innerText != '') {
                    resVar.addSign(resVar.numb2);
                }
                break ;
            case '%' :
                //switch to porcent
                if (resVar.operator.innerText == ''){
                    resVar.addPorcent(resVar.numb1);
                } else if(resVar.operator.innerText != ''){
                    resVar.addPorcent(resVar.numb2);
                }
                break;
                
        }


    });
});
