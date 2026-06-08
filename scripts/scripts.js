const numElem1 = document.querySelector('.js-number1');
const numElem2 = document.querySelector('.js-number2');
const ansElem = document.querySelector('.js-answer');
const result = document.querySelector('.js-result');
const pntsElem = document.querySelector('.js-points');
const operators = ['+','-','*','/'];
let difficulty;
let points = 0;

function gameStartCheck(diff){
    switch(diff){
        case 'ez': generateNumbers(1, 10);
        case 'med': generateNumbers(11, 99);
        case 'hard': generateNumbers(50, 500);
        default:
            generateNumbers(1,10);
            console.error('No difficulty selected! ');
    }

}

function generateNumbers(a, b) {
    let number1 = getRandomInt(a, b);
    let number2 = getRandomInt(a, b);
    const operator = operators[getRandomInt(0,operators.length-1)];

    document.querySelector('.js-operator').innerHTML = operator;
    numElem1.innerHTML = number1;
    numElem2.innerHTML = number2;
    
}

function randomNumBtn(){
    const RandomBtn = document.querySelector('.js-random');
    numElem1.innerHTML = getRandomInt(10, 100);
    numElem2.innerHTML = getRandomInt(1, 20);
    
}

function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calc(a, operator, b){
    switch(operator){
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return Math.round(a / b);
        default:
            console.error('Unkown operator:',operator);
            return null; 
    }
    
}

function submitAnswer(){
    const userAns = parseInt(ansElem.value);
    const operator = document.querySelector('.js-operator').innerHTML;
    const eq = calc(
        parseInt(numElem1.innerHTML),
        operator,
        parseInt(numElem2.innerHTML)
    );

    const result = document.querySelector('.js-result');

    if(userAns === eq){
        result.innerHTML = '<p>Correct!</p>';
        ansElem.value = '';
        points += 1;
        pntsElem.innerHTML = points;
        gameStartCheck();
    }else{
        result.innerHTML = '<p>Wrong!</p>';
    }
}

// gameStartCheck();
// generateNumbers();