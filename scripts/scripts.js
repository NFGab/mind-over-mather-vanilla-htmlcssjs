const numElem1 = document.querySelector('.js-number1');
const numElem2 = document.querySelector('.js-number2');
const ansElem = document.querySelector('.js-answer');
const result = document.querySelector('.js-result');
const pntsElem = document.querySelector('.js-points');
const streakElem = document.querySelector('.js-streak');
const mulElem = document.querySelector('.js-multiplier');
const operators = ['+','-','*','/'];
const correctSound = new Audio('/assets/correct.mp3');
const wrongSound = new Audio('/assets/wrong.mp3');
let difficulty;
let points = 0;
let streak = 0;
// correctSound.addEventListener('canplaythrough', () => console.log('correct sound loaded and ready'));
// correctSound.addEventListener('play', () => console.log('correct sound started playing'));
// correctSound.addEventListener('error', (e) => console.log('correct sound error:', e));

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
    const diff = localStorage.getItem('difficulty');
    if(diff){
        gameStartCheck(diff);
    } else {
        generateNumbers(1, 10);
    }
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

    if(userAns === eq){
        
        streak += 1;
        const multiplier = streakMult(streak);
        points += 1 * multiplier;
        
        playSound('correct');
        ansElem.value = '';
        pntsElem.innerHTML = Math.round(points);
        streakElem.innerHTML = streak;
        mulElem.innerHTML = `x${multiplier.toFixed(2)}`;

        gameStartCheck();
        
    }else{
        playSound('wrong');
        flashWrong();
        streak = 0;
        streakElem.innerHTML = streak;
        mulElem.innerHTML = `x1.00`;
    }
}

function streakMult(streak){
    if (streak >= 20) return 2.25;
    if (streak >= 10) return 2.00;
    if (streak >= 5) return 1.70;
    return 1.00;
}

initGame();

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitAnswer();
    if (e.key === ' ') submitAnswer();
})


function flashWrong() {
    const equation = document.querySelector('.equation');
    equation.classList.remove('flash-wrong');
    void equation.offsetWidth; // forces the browser to reflow — resets the animation
    equation.classList.add('flash-wrong');
}

function playSound(type){    
    if (type === 'correct'){
        correctSound.currentTime = 0;
        correctSound.play();
    }else{
        wrongSound.currentTime = 0;
        wrongSound.play();
    }
}