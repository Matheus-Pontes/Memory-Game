const card = document.querySelectorAll('.memory-card');
const modalWin = document.querySelector('.modal-win');

const youWinSound = new Audio();
youWinSound.src = "../audio/you-win.mp3";

const getStorageUserName = () => localStorage.getItem('user');
document.querySelector('#userName').innerHTML = getStorageUserName();

let scoreGame = document.querySelector('#pontos');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let points = 0;

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
        // Mostrar um modal falando que venceu 
    } else {
        unflipCards();
    }
   
    // isMatch ? desableCards() : unflipCards(); 
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

(function shuffle() {
    card.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos; 
    })
})(); 

card.forEach(card => card.addEventListener('click', flipCard));

// function score
function score(){
    points += 1;
    scoreGame.innerHTML = points;
    
    if(points === 6){
        modalWinner();
    }
}

// function create children to open modal in HTML 
function modalWinner(){
    modalWin.classList.add('active');
    youWinSound.play();
}