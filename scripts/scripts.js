const numElem1 = document.querySelector('.js-number1');
const numElem2 = document.querySelector('.js-number2');
const ansElem = document.querySelector('.js-answer');
const result = document.querySelector('.js-result');
const pntsElem = document.querySelector('.js-points');
let points = 0;


function generateNumbers() {
    let number1 = getRandomInt(10, 100);
    let number2 = getRandomInt(1, 20);
    numElem1.innerHTML = number1;
    numElem2.innerHTML = number2;
    pntsElem.innerHTML = points;
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

function calc(){
    const userAns = parseInt(ansElem.value);
    
}

function submitAnswer(){
    const userAns = parseInt(ansElem.value);
    const eq = parseInt(numElem1.innerHTML) + parseInt(numElem2.innerHTML);
    let html;

    if(userAns === eq){
        html = `<p>Correct!</p>`;
        points += 1;
        generateNumbers();
    } else{
        html = `<p>Wrong!</p>`;
    }

    result.innerHTML = html;
    pntsElem.innerHTML = points;
    document.querySelector('.js-answer').value = "";
    
}

generateNumbers();