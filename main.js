
const Setting = {
    display: {
        width: 1000,
        height: 560
    },
    players: {
        p1: { x: 969, y: 245, score: 0, name: 'PLAYER 1' },
        p2: { x: 0, y: 245, score: 0 ,name: 'PLAYER 2'},
        model: { width: 90, height: 30 }
    }
}

let { display: { width, height }, players: { p1, p2, model } }
    = Setting;


const canvas = document.querySelector('#juegos')
canvas.width = width;
canvas.height = height;

const lapiz = canvas.getContext('2d');

// manejador 

let upW = false, downS = false;
let upArrow = false, downArrow = false;
let speedplayer = 10;

// ball

let ballX = width / 2;
let ballY = height / 2;
let speedBallX = 10, speedBallY = 10;
let anchoBall = 20;
let player1 = true;
// scores
let win = true
let max_score = 5;

function juego() {
    if (win) {
        refresFrame()

        textRender(`score: ${p2.score}`, 100, 30, 100);
        textRender(`score: ${p1.score}`, 800, 30, 100);

        rect(p2.x, p2.y, model.height, model.width);
        rect(p1.x, p1.y, model.height, model.width);

        ball(ballX, ballY, anchoBall, player1);

        if (upArrow && p1.y > 0) {
            p1.y -= speedplayer;
        }
        if (downArrow && p1.y + model.width < height) {
            p1.y += speedplayer;
        }
        if (upW && p2.y > 0) {
            p2.y -= speedplayer;
        }
        if (downS && p2.y + model.width < height) {
            p2.y += speedplayer;
        }
        // colicion paddle
        // player 1
        if (ballX + anchoBall >= p1.x && ballY + anchoBall >= p1.y && ballY - anchoBall <= p1.y + model.width) {
            speedBallX = -speedBallX;
            player1 = false
        }
        // player 2
        if (ballX - anchoBall <= p2.x + model.height && ballY + anchoBall >= p2.y && ballY - anchoBall <= p2.y + model.width) {
            speedBallX = -speedBallX;
            player1 = true
        }

        // ball coalicion

        if (ballX + anchoBall >= width) {
            speedBallX = -speedBallX

            p2.score++
        }
        if (ballX <= anchoBall) {
            speedBallX = -speedBallX

            p1.score++
        }

        if (ballY + anchoBall >= height) {
            speedBallY = -speedBallY

        }

        if (ballY - anchoBall <= 0) {
            speedBallY = -speedBallY
        }

        console.log(ballY)
        ballX += speedBallX;
        ballY += speedBallY;

        if(p1.score == max_score){
            textRender(`${p1.name} GANO`,width /3 + 20,height/2,50)
            textRender(`presione Q para reiniciar`,width /3 -20 ,height -60,50)

            win = false
        }
        if(p2.score == max_score){
            textRender(`${p2.name} GANO`,width /3 + 20,height/2,50)
            textRender(`presione Q para reiniciar`,width /3 -20,height -60,50)

            win = false
        }

    }
    requestAnimationFrame(juego);
}

document.addEventListener('keyup', up);
document.addEventListener('keydown', down);

// manejador de teclados 

function up(event) {
    if (event.key == 'w') {
        upW = false
    }
    if (event.key == 's') {
        downS = false
    }
    if (event.key == 'ArrowUp') {
        upArrow = false;
    }
    if (event.key == 'ArrowDown') {
        downArrow = false;
    }
    if (event.key == 'q') {
        document.location.reload()
    }

}

function down(event) {
    if (event.key == 'w') {
        upW = true
    }
    if (event.key == 's') {
        downS = true
    }
    if (event.key == 'ArrowUp') {

        upArrow = true;
    }
    if (event.key == 'ArrowDown') {
        downArrow = true;
    }
}
// =============

function textRender(msj, x, y, ancho, istrued = true) {
    lapiz.font = `35px arial`
    lapiz.beginPath()
    istrued ? lapiz.fillText(msj, x, y) : lapiz.strokeText(msj, x, y)
    lapiz.closePath()
}


function ball(x, y, anchor, player = true) {
    // if(x < width / 2) {
    //     player = false
    // }
    lapiz.beginPath()
    lapiz.arc(x, y, anchor, 0, 13, false);
    player ? lapiz.fill() : lapiz.stroke();
    lapiz.closePath()
}

function rect(x, y, ancho, alto, istrued = true) {
    if (x > width / 2) {
        istrued = false;
    }
    lapiz.lineWidth = 3;
    lapiz.beginPath()
    lapiz.rect(x, y, ancho, alto);
    istrued ? lapiz.fill() : lapiz.stroke();
    lapiz.closePath()
}

function refresFrame() {
    lapiz.beginPath()
    lapiz.clearRect(0, 0, width, height)
    lapiz.closePath()
}


juego()//setInterval(juego,50) //