const card = document.querySelectorAll('.memory-card');
const modalWin = document.querySelector('.modal-win');
const scoreGame = document.querySelector('#pontos');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let points = 0;
let count = 0;
let timeSeconds;

const youWinSound = new Audio();
youWinSound.src = "../assets/audio/you-win.mp3";

document.querySelector('#userName').innerHTML = localStorage.getItem('user');

let recordTimeSecond = localStorage.getItem("recordTimeSeconds") != null ? localStorage.getItem("recordTimeSeconds") : 0;

if(recordTimeSecond != 0){
    document.querySelector(".record").style.display = "block";
    document.querySelector("#recordTime").innerHTML = convertSecondsInMinutes(recordTimeSecond);
}

function startCount() {
    timeSeconds = setInterval(() => {
        count += 1;
        document.querySelector('#timerGame').innerHTML = convertSecondsInMinutes(count);
    }, 1000);
}

startCount();

function flipCard() {
    if(lockBoard) return;

    if(this === firstCard) return;  

    this.classList.toggle('flip');
    
    if(!hasFlippedCard){
        // first click
        hasFlippedCard = true;
        firstCard = this;
        
        return;
    } 
    //second click
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    // do cards match?
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    
    if(isMatch){
        desableCards();
        score()
    } else {
        unflipCards();
    }
}

function desableCards() {
    // it's a match
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    // not a match
    setTimeout(() =>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null]
}

/*
    function shuffle() there're every execute in program
*/

function shuffle() {
    card.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos; 
    })
};

shuffle();

card.forEach(card => card.addEventListener('click', flipCard));

// function score
function score(){
    points += 1;
    scoreGame.innerHTML = points;
    
    if(points === 6){
        modalWinner();
    }
}
   
function duasCasas(numero){
    if (numero <= 9){
      numero = "0" + numero;
    }
    return numero;
}

function convertSecondsInMinutes(totalSeconds) {
    let time = "";

    if(totalSeconds >= 60) {
        if(totalSeconds >= 3600) {
            let hours = duasCasas(Math.floor(totalSeconds / 3600));
            let minutes = duasCasas(Math.floor((totalSeconds % 3600) / 60));
            let secondsRest = duasCasas((totalSeconds % 3600) % 60);
            time = `${hours}:${minutes}:${secondsRest}s`;

        } else  {
            let minutes = duasCasas(Math.floor(totalSeconds / 60));
            let secondsRest = duasCasas(totalSeconds % 60);
            time = `00:${minutes}:${secondsRest}s`;
        }
    }
    else {
        time = `00:00:${duasCasas(totalSeconds)}s`;
    }

    return time;   
}

function createTimeRecord(recordTimeSecond) {
    recordTimeSecond = localStorage.getItem("recordTimeSeconds");

    if(recordTimeSecond == null) 
        localStorage.setItem("recordTimeSeconds", count);
    else {
        let isNewRecord = count < Number(recordTimeSecond) ? true : false;
        
        if(isNewRecord) {
            localStorage.setItem("recordTimeSeconds", count);
            document.querySelector(".record").style.display = "block";
            document.querySelector("#recordTime").innerHTML = convertSecondsInMinutes(count);
        }
    }
}

// function create children to open modal in HTML 
function modalWinner(){
    modalWin.classList.add('active');

    createTimeRecord(recordTimeSecond);
    clearInterval(timeSeconds);
    
    document.querySelector("#timerModalWinner").innerHTML = convertSecondsInMinutes(count);
    count = 0;
    
    document.querySelector("#restartGame").addEventListener("click", function() {
        restartGame();
    });    
}

function restartGame() {
    modalWin.classList.remove('active');
    shuffle();
    card.forEach(item => item.classList.remove('flip'));
    card.forEach(card => card.addEventListener('click', flipCard));
    points = 0;
    scoreGame.innerHTML = points;
    count = 0;
    startCount();
}