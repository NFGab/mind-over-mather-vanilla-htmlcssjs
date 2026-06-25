const numElem1 = document.querySelector('.js-number1');
const numElem2 = document.querySelector('.js-number2');
const ansElem = document.querySelector('.js-answer');
const result = document.querySelector('.js-result');
const pntsElem = document.querySelector('.js-points');
const operators = ['+','-','*','/'];
let difficulty;
let points = 0;
let streak = 0;

function gameStartCheck(diff){
    if(diff){
        difficulty = diff;
        localStorage.setItem('difficulty',diff);
    }

    switch(difficulty){
        case 'ez': generateNumbers(1, 10); break;
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

function generateNumbers(min, max) {
    if (!numElem1 || !numElem2) return;
    const operator = operators[getRandomInt(0,operators.length-1)];
    let a, b;

    switch(operator){
        case '+':
        case '*':
            a = getRandomInt(min, max);
            b = getRandomInt(min, max);
            break;
        case '-':
            [a, b] = generateSub(min, max);
            break;
        case '/':
            [a, b] = generateDiv(min, max);
            break;
    }

    numElem1.innerHTML = a;
    numElem2.innerHTML = b;
    document.querySelector('.js-operator').innerHTML = operator;
}

function generateSub(min, max){
    let a = getRandomInt(min, max);
    let b = getRandomInt(min, max);
    if (a < b) [a, b] = [b, a];
    return [a, b];
    //js destructuring wow
}

function generateDiv(min, max){
    let b = getRandomInt(min, max);
    let answer = getRandomInt(min, max);
    const a = b * answer;
    return [a, b];
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
            return a - b;
        case '*': 
            return a * b;
        case '/': 
            return a / b;
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
        streak += 1;

        const multiplier = streakMult(streak);
        points += 1 * multiplier;

        result.innerHTML = `<p>Correct! (x${multiplier.toFixed(2)})</p>`;;
        ansElem.value = '';
        pntsElem.innerHTML = Math.round(points);
        
        console.log(streak);
        gameStartCheck();
    }else{
        result.innerHTML = '<p>Wrong!</p>';
        streak = 0;
        console.log(streak);
    }
}

function streakMult(streak){
    if (streak >= 20) return 2.25;
    if (streak >= 10) return 2.00;
    if (streak >= 5) return 1.70;
    return 1.00;
}

const savedDiff = localStorage.getItem('difficulty');
if(savedDiff && numElem1){
    gameStartCheck(savedDiff);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitAnswer();
})
// gameStartCheck();
// generateNumbers();