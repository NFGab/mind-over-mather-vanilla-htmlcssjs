const numElem1 = document.querySelector('.js-number1');
const numElem2 = document.querySelector('.js-number2');
const ansElem = document.querySelector('.js-answer');
const result = document.querySelector('.js-result');
const pntsElem = document.querySelector('.js-points');
const operators = ['+','-','*','/'];
let difficulty;
let points = 0;

function gameStartCheck(diff){
    if(diff){
        difficulty = diff;
        localStorage.setItem('difficulty',diff);
    }

    switch(difficulty){
        case 'ez': generateNumbers(1, 15); break;
        case 'med': generateNumbers(2, 80); break;
        case 'hard': generateNumbers(9, 300); break;
        default:
            generateNumbers(1,10);
            console.error('No difficulty selected! ');
    }

}

function initGame(){
    const diff = localStorage.setItem();
}

function generateNumbers(a, b) {
    if (!numElem1 || !numElem2) return;
    let number1 = getRandomInt(a, b);
    let number2 = getRandomInt(a, b);
    const operator = operators[getRandomInt(0,operators.length-1)];

    document.querySelector('.js-operator').innerHTML = operator;
    numElem1.innerHTML = number1;
    numElem2.innerHTML = number2;
    
}

function randomNumBtn(){
    gameStartCheck();
    
}

function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calc(a, operator, b){
    switch(operator){
        case '+': 
            return a + b;
        case '-': 
            if(a < b){
                return
            }else{
                return a - b;
            }
            
        case '*': 
            return a * b;
        case '/': 
            return Math.round(a / b);
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

const savedDiff = localStorage.getItem('difficulty');
if(savedDiff && numElem1){
    gameStartCheck(savedDiff);
}
// gameStartCheck();
// generateNumbers();