let canvas = document.getElementById("myCanvas")
let ctx = canvas.getContext("2d")
let ballRadius = 10
let x = canvas.width/2
let y = canvas.height-30
let dx = 2
let dy = -2
let paddleHeight = 10
let paddleWidth = 75
let paddleX = (canvas.width-paddleWidth)/2
let rightPressed = false
let leftPressed = false
let brickRowCount = 5
let brickColumnCount = 3
let brickWidth = 75
let brickHeight = 20
let brickPadding = 10
let brickOffsetTop = 30
let brickOffsetLeft = 30
let score = 0
let lives = 3

let bricks = []
for(let c = 0; c < brickColumnCount; c++) {
  	bricks[c] = []
  	for(let r = 0; r < brickRowCount; r++) {
    	bricks[c][r] = { x: 0, y: 0, status: 1 }
  	}
}

document.addEventListener("keydown", keyDownHandler)
document.addEventListener("keyup", keyUpHandler)
document.addEventListener("mousemove", mouseMoveHandler)

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
    	rightPressed = true
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
      	leftPressed = true
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
      	rightPressed = false
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
      	leftPressed = false
    }
}

function mouseMoveHandler(e) {
  	let relativeX = e.clientX - canvas.offsetLeft
  	if(relativeX > 0 && relativeX < canvas.width) {
    	paddleX = relativeX - paddleWidth/2
  }
}
const collisionDetection = () =>  {
  	for(let c = 0; c < brickColumnCount; c++) {
    	for(let r = 0; r < brickRowCount; r++) {
      		let b = bricks[c][r]
      		if(b.status == 1) {
        		if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          			dy = -dy
          			b.status = 0
          			score++
          		if(score == brickRowCount*brickColumnCount) {
            		alert("Wygrałeś, gratulacje!")
            		document.location.reload()
          			}
        		}
      		}
    	}
  	}
}


const drawBall = () => {
  	ctx.beginPath()
  	ctx.arc(x, y, ballRadius, 0, Math.PI*2)
  	ctx.fillStyle = "purple"
  	ctx.fill()
  	ctx.closePath()
}


const drawPaddle = () => {
  	ctx.beginPath()
  	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight)
  	ctx.fillStyle = "#69e508"
  	ctx.fill()
  	ctx.closePath()
}


const drawBricks = () => {
  	for(let c = 0; c < brickColumnCount; c++) {
    	for(let r = 0; r < brickRowCount; r++) {
      		if(bricks[c][r].status == 1) {
        		let brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft
        		let brickY = (c*(brickHeight+brickPadding))+brickOffsetTop
        		bricks[c][r].x = brickX
        		bricks[c][r].y = brickY
        		ctx.beginPath()
        		ctx.rect(brickX, brickY, brickWidth, brickHeight)
        		ctx.strokeStyle = "#0095DD"
        		ctx.stroke()
        		ctx.closePath()
      		}
    	}
  	}
}


const drawScore = () => {
  	ctx.font = "14pt Oswald"
  	ctx.fillStyle = "darkorange"
  	ctx.fillText("Wynik: "+score, 8, 20)
}


const drawLives = () => {
  	ctx.font = "14pt Oswald"
  	ctx.fillStyle = "darkorange"
  	ctx.fillText("Życie: "+lives, canvas.width-75, 20)
}

const draw = () => {
  	ctx.clearRect(0, 0, canvas.width, canvas.height)
  	drawBricks()
  	drawBall()
  	drawPaddle()
  	drawScore()
  	drawLives()
  	collisionDetection()

  	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    	dx = -dx
  	}
  	if(y + dy < ballRadius) {
    	dy = -dy
  	}
  	else if(y + dy > canvas.height-ballRadius) {
    	if(x > paddleX && x < paddleX + paddleWidth) {
      		dy = -dy
    	}
		else {
			lives--
			if(!lives) {
				alert("GAME OVER")
				document.location.reload()
			}
			else {
				x = canvas.width/2
				y = canvas.height-30
				dx = 3
				dy = -3
				paddleX = (canvas.width-paddleWidth)/2
			}
		}
  	}

  	if(rightPressed && paddleX < canvas.width-paddleWidth) {
    	paddleX += 7
  	}
  	else if(leftPressed && paddleX > 0) {
    	paddleX -= 7
  	}

  	x += dx
  	y += dy
  	requestAnimationFrame(draw)
}

draw()