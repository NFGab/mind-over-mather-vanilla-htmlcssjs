const numElem1 = document.querySelector('.js-number1');
const numElem2 = document.querySelector('.js-number2');
const ansElem = document.querySelector('.js-answer');
const result = document.querySelector('.js-result');
const pntsElem = document.querySelector('.js-points');
let points = 0;
// let ansInput = document.querySelector('.js-answertest');
// numElem1.innerHTML = getRandomInt(10, 100);
// numElem2.innerHTML = getRandomInt(1, 20);

function generateNumbers() {
    numElem1.innerHTML = getRandomInt(10, 100);
    numElem2.innerHTML = getRandomInt(1, 20);
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