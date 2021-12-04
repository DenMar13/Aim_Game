const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const typeList = document.querySelector('#type-list');
const board = document.querySelector('#board');
let time = 0;
let score = 0;
let type;
const colors = ['#da1813', '#ffbd88', '#ffc822', '#cafc13', '#3afa13', '#0ee972', '#58ebeb', '#5052bd'];
startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});
timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) 
    {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        //startGame();
    }
});
typeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('type-btn')) 
    {
        screens[2].classList.add('up');
    if (event.target.classList.contains('light')) {
        type = 1;
    }
    else if (event.target.classList.contains('medium')) {
        type = 2;
    }
    else if (event.target.classList.contains('hard')) {
        type = 3;
    }
    else if (event.target.classList.contains('hardcore')) {
        type = 4;
    }
    //  console.log(type);
        startGame();
    }
});
board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle'))
    {
        score++;
        event.target.remove();
        createRandomCircle();
    }
});

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    // console.log(time);
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    }
    else {
        let current = --time;
        if (current < 10) {
            timeEl.innerHTML = `00:0${current}`;
        }
        else {
            setTime(current);
        }
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
} 

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span><h1>`;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    let interval1, interval2;
    switch (type) {
        case 1:
            interval1 = 50;
            interval2 = 80;
        break;
        case 2: 
            interval1 = 20;
            interval2 = 50;
        break;
        case 3: 
            interval1 = 10;
            interval2 = 20;
        break;
        case 4: 
            interval1 = 5;
            interval2 = 10;
        }
    const size = getNumberRandom(interval1, interval2);
    const {width, height} = board.getBoundingClientRect();
    const x = getNumberRandom(0, width - size); 
    const y = getNumberRandom(0, height - size);
    const color = getRandomColor();
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = `${color}`;
    board.append(circle);
}

function getNumberRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}
/*
function winTheGame() {
    function kill() {
        const circle = document.querySelector('.circle');
        if (circle) {
            circle.click();
        }
        circle.click()
    }
    setInterval(kill, 300);
} 
*/
