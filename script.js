let fields = [];
let gameOver = false;
let gameDraw = 0;
let currentShape = 'cross';
let Audio_Win = new Audio('sound/win.mp3');
let Audio_Lose = new Audio('sound/lose.mp3');

function fillShape(id) {
    if (!fields[id] && !gameOver) {
        if(currentShape == 'cross') {
            currentShape = 'circle';
            inactivePlayer2();
        } else {
            currentShape = 'cross';
            inactivePlayer1();
        }
        fields[id] = currentShape;
        console.log(fields);
        draw();
        checkForWin();
    }
}

function inactivePlayer1() {
    document.getElementById('player-1').classList.remove('player-inactive')
    document.getElementById('player-2').classList.add('player-inactive')
}

function inactivePlayer2() {
    document.getElementById('player-2').classList.remove('player-inactive')
    document.getElementById('player-1').classList.add('player-inactive')
}

function draw() {
    for (let i = 0; i < fields.length; i++) {
        if(fields[i] == 'circle') {
            document.getElementById(`circle-${i}`).classList.remove('d-none');
        }
        if(fields[i] == 'cross') {
            document.getElementById(`cross-${i}`).classList.remove('d-none');
        }
    }
}

function checkForWin() {
    let winner; 
    //waagrechte Reihen
    if(fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-0').style.transform = 'scaleX(1.0)';
    }
    if(fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
        document.getElementById('line-1').style.transform = 'scaleX(1.0)';
    }
    if(fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        winner = fields[6];
        document.getElementById('line-2').style.transform = 'scaleX(1.0)';
    }
    //senkrechte Reihen
    if(fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-3').style.transform = 'rotate(90deg) scaleX(1.0)';
    }
    if(fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
        document.getElementById('line-4').style.transform = 'rotate(90deg) scaleX(1.0)';
    }
    if(fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-5').style.transform = 'rotate(90deg) scaleX(1.0)';
    }
    //diagonale Reihen
    if(fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-6').style.transform = 'rotate(45deg) scaleX(1.15)';
    }
    if(fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-7').style.transform = 'rotate(-45deg) scaleX(1.15)';
    }
    if(winner) {
        gameDone();
        winnerDinner();
    } else {
        checkDraw();
    }
}

function restart() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(`circle-${i}`).classList.add('d-none');
        document.getElementById(`cross-${i}`).classList.add('d-none');
    }
    for (let j = 0; j < 8; j++) {
        document.getElementById(`line-${j}`).style.transform = 'scaleX(0.0)';
    }
    document.getElementById('game-over').classList.add('d-none');
    document.getElementById('restart-btn').classList.add('d-none');
    document.getElementById('player-one').classList.add('d-none');
    document.getElementById('player-two').classList.add('d-none');
    document.getElementById('megadraw').classList.add('d-none');
    fields = [];
    gameOver = false;
    currentShape = 'cross';
    gameDraw = 0;
    inactivePlayer1();
}

function checkDraw() {
    gameDraw++
    if(gameDraw == 9) {
        setDraw();
        gameDone();
    }
}

function gameDone() {
    gameOver = true;
    setTimeout(function() {
        document.getElementById('game-over').classList.remove('d-none');
        document.getElementById('restart-btn').classList.remove('d-none')
    }, 500);
}

function winnerDinner() {
    if(currentShape == 'circle'){
        setTimeout(function() {
            document.getElementById('player-one').classList.remove('d-none');
            Audio_Win.volume = 0.2;
            Audio_Win.play();
    }, 500);}
    if(currentShape == 'cross'){
        setTimeout(function() {
            document.getElementById('player-two').classList.remove('d-none');
            Audio_Win.volume = 0.2;
            Audio_Win.play();
    }, 500);}
}

function setDraw() {
    setTimeout(function() {
        document.getElementById('megadraw').classList.remove('d-none');
        Audio_Lose.volume = 0.3;
        Audio_Lose.play();
    }, 500);
}