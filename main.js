function operation(oprt , num1 , num2){
    let numb1 = num1;
    let numb2 = num2;
    let operator = oprt ;
    switch(operator){   
        case '+' :
            return Number(numb1) + Number(numb2) ;
        case '-' : 
            return Number(numb1) - Number(numb2) ;
        case '*' : 
            return Number(numb1) * Number(numb2) ;
        case '/' :
            return Number(numb1) / Number(numb2) ;
        default :
            return 'error' ;
    }
}

const showResultVar = document.querySelector('#show-result-var');

const keyboard = {
    numberKeys : document.querySelectorAll('.numb-bttn') ,
    operationKeys :  document.querySelectorAll('.operation-bttn'),
};

const resultVar = {
    numb1 : document.querySelector('#numb1') ,
    numb2 : document.querySelector('#numb2') ,
    operator : document.querySelector('#operator') ,
    result : document.querySelector('#result') ,
    addNumber1 : function (number = '' ) {
        if (number == ''){
            this.numb1.innerText = '';
        } else {
            this.numb1.innerText = number;
        }
    } ,
    addNumber2 : function (number = '') {
        if (number == ''){
            this.numb2.innerText = '';
        } else {
            this.numb2.innerText = number;
        }
    } ,
    addOperator : function (operator = '') {
        if (operator == ''){
            this.operator.innerText = '';
        } else {
            this.operator.innerText = operator;
        }
    } ,


} 

function addKey(keyValue = '' , tag){
    tag.innerText += keyValue ;
}
// events

// add number  // remake with switch please 
keyboard.numberKeys.forEach( key => {
    key.addEventListener('click' , e=>{
        if(resultVar.numb1.innerText == '' && resultVar.operator.innerText == ''){
                resultVar.addNumber1(key.innerText);
        } 
        else if (resultVar.numb1.innerText != '' && resultVar.operator.innerText == '') {
            resultVar.numb1.innerText += key.innerText ;
        }
        else if (resultVar.numb2.innerText == '' && resultVar.operator.innerText != '') {
                resultVar.addNumber2(key.innerText);
        }
        else if (resultVar.numb2.innerText != '' && resultVar.operator.innerText != '') {
            resultVar.numb2.innerText+= key.innerText ;
        }
        
    });
});
//add operator
keyboard.operationKeys.forEach(key => {
    key.addEventListener('click' , e=>{
        if(resultVar.numb1.innerText == '') {
            resultVar.addOperator('');
        } else {
            if(key.innerText != '='){
                resultVar.addOperator(key.innerText);
            }
        }
    });
    });
// trigger operation 
document.querySelector('#equal-bttn').addEventListener('click' ,e=>{
    if (resultVar.numb1.innerText != '' && resultVar.numb2.innerText != '' && resultVar.operator.innerText != ''){
        let result = operation(resultVar.operator.innerText ,resultVar.numb1.innerText, resultVar.numb2.innerText );
        resultVar.addNumber1(result);
        //clear equation
        resultVar.addNumber2('');
        resultVar.addOperator('');
        
    }
});


