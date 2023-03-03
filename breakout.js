// Initialize canvas
var canvas = document.createElement("canvas");
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");

// Set up game variables
var ballX = canvas.width/2;
var ballY = canvas.height-30;
var ballDX = 2;
var ballDY = -2;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];

for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// Set up event listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

// Draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Draw paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Draw bricks
function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Detect collision with bricks
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(ballX > b.x && ballX < b.x+brickWidth && ballY > b.y && ballY < b.y+brickHeight) {
                    ballDY = -ballDY;
                    b.status = 0;
                }
            }
        }
    }
}

// Draw the score
function drawScore() {
   
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
    }
    
    // Update the game state
    function update() {
    // Move the paddle
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
    }
    // Move the ball
ballX += ballDX;
ballY += ballDY;

// Check for collision with walls
if(ballX + ballDX > canvas.width-ballRadius || ballX + ballDX < ballRadius) {
    ballDX = -ballDX;
}
if(ballY + ballDY < ballRadius) {
    ballDY = -ballDY;
}
else if(ballY + ballDY > canvas.height-ballRadius) {
    // Check for collision with paddle
    if(ballX > paddleX && ballX < paddleX + paddleWidth) {
        ballDY = -ballDY;
    }
    else {
        // Game over
        alert("GAME OVER");
        document.location.reload();
    }
}

// Check for collision with bricks
collisionDetection();

// Redraw the canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);
drawBall();
drawPaddle();
drawBricks();
drawScore();
}

// Set up the game loop
setInterval(update, 10);