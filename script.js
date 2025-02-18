const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = 150;

let snake = [{ x: 50, y: 75 }];
let direction = { x: 5, y: 0 };
let snakeLength = 10;
let colorIndex = 0;
const colors = ["#35DFE6", "#3570E6", "#25BFE6", "#258FE6", "#359FE6"];

function updateSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (snake.length > snakeLength) {
        snake.pop();
    }

    if (head.x > canvas.width || head.x < 0) {
        direction.x *= -1;
    }
    if (head.y > canvas.height || head.y < 0) {
        direction.y *= -1;
    }

    colorIndex = (colorIndex + 1) % colors.length;
}

function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";

    for (let i = 0; i < snake.length - 1; i++) {
        ctx.strokeStyle = colors[(colorIndex + i) % colors.length];
        ctx.beginPath();
        ctx.moveTo(snake[i].x, snake[i].y);
        ctx.lineTo(snake[i + 1].x, snake[i + 1].y);
        ctx.stroke();
    }
}

function animate() {
    updateSnake();
    drawSnake();
    setTimeout(() => requestAnimationFrame(animate), 50); // Más lento
}

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = 150;
});
