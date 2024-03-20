function operation(operator , numb1 , numb2){
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


// events

// add number 
keyboard.numberKeys.forEach( key => {
    key.addEventListener('click' , e=>{
        if(resultVar.numb1.innerText == '' && resultVar.operator.innerText == ''){
                resultVar.addNumber1(key.innerText);
        }else{
                resultVar.addNumber2(key.innerText);
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
        let num1 = resultVar.numb1.innerText ;
        let num2 = resultVar.numb2.innerText ;
        let opert = resultVar.operator.innerText ;    
        let result = operation(opert , num1 , num2);
        //clear equation 
        let nodes = document.querySelector('#show-result-var').firstElementChild.childNodes;
        nodes.forEach(node =>{
                node.innerText = '';
        });
        //update result spot
        document.querySelector('#result').innerText = result ;
    } else {
        console.log('No trigged');
    }
});



function testOp() {
    let op = ['+' , '-' , '*' , '/' , '='];
    let numb = ['1' , '5' , '10' ];
    let numb2 = [1 , 2 , 3 , 5];
    let result = {
        str : [] ,
        num : []
    }
    op.forEach(op=>{
         numb.forEach(str => {
             result.str.push(operation(op , str , '1'))
         })
    });

}