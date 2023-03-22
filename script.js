// canvas
const canvas = document.getElementById('canvas');

// canvas 2d
const context = canvas.getContext('2d');

// oyin maydomi dagi kataklar olchami
var grid = 16; 
// oyin tezligi
var count = 0;
// oynchi achkosi
var score = 0;
// oynchi max achkosi
var max = 0;

// ilarning parametorlari
const snake = {
    // ilaning turgan joyi
    x: 160,
    y: 160,
    // garizantal yonalish
    dx: grid,
    dy: 0,
    // iloning uzunligi
    maxCells: 1,
    // iloning oshib boruchi tanasi
    cells: [],
}

//  ovqat parametorlari
const food = {
    x: 320,
    y: 320,
}

// ovatni random tarzda paydo bilishi
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// asosiy function 
function loop() {
    requestAnimationFrame(loop);
    // oyini fps ni 15fpsga tushurdik
    if(++count < 2) {
        return;
    }

    // oyin qaytatab boshlarnsa shu parametorlarda boshlanadi
    count = 0;
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    // ilon borderdan tashqariga chiqib ketsa unda garizantal narigi taraftan paydo boladi
    snake.x += snake.dx;
    snake.y += snake.dy;

    // ilon borderdan tashqariga chiqib ilani ochirib qoyamiz
    if(snake.x < 0) { // garizantal
        snake.x = canvas.clientWidth - grid;
    } else if (snake.x >= canvas.clientWidth) {
        snake.x = 0;
    }

    if(snake.y < 0) { // vertikal
        snake.y = canvas.clientHeight - grid;
    } else if (snake.y >= canvas.clientHeight) {
        snake.y = 0;
    }

    snake.cells.unshift({ x: snake.x, y: snake.y });

    //agar biz dasturni yangilasak unda hama achkolarni ochiramiz
    if(snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    // ovqatni rangi
    context.fillStyle = '#fff';
    // ovqatni positioni
    context.fillRect(food.x, food.y, grid -  1, grid - 1)

    // ilani rangi
    context.fillStyle = '#E43F5A';

    snake.cells.forEach(function (cell, index) {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        if(cell.x === food.x && cell.y === food.y){
            // ilonni uzunligi
            snake.maxCells++;
            // ochko
            score += 1;
            document.getElementById('score').innerHTML = score;
            // ovqat
            food.x = getRandomInt(0, 25) * grid;
            food.y = getRandomInt(0, 25) * grid;
        }
        for(var i = index + 1; i < snake.cells.length; i++){
            if(cell.x === snake.cells[i].x && cell.y === snake.cells[i].y){
                if(score > max) {
                    max = score;
                }
                snake.x = 160,
                snake.y = 160,
                snake.cells = [];
                snake.maxCells = 1;
                snake.dx = grid;
                snake.dy = 0;
                score = 0;
                food.x = getRandomInt(0, 25) * grid;
                food.y = getRandomInt(0, 25) * grid;
                document.getElementById('score').innerHTML = max;
            }
        }
    })
}

document.addEventListener('keydown', function(e) {
    if(e.keyCode === 37 && snake.dx === 0) {    // chap tugma uchun
        snake.dx = -grid;
        snake.dy = 0;
    } else if(e.keyCode === 38 && snake.dy === 0) { // tepa tugam
        snake.dy = -grid;
        snake.dx = 0;
    } else if(e.keyCode === 39 && snake.dx === 0){ // o'ng
        snake.dx = grid;
        snake.dy = 0
    } else if(e.keyCode === 40 && snake.dy === 0){ // past
        snake.dy = grid;
        snake.dx = 0
    }

    if(e.keyCode === 87 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    } else if(e.keyCode === 65 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0; 
    } else if(e.keyCode === 68 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0
    } else if(e.keyCode === 83 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0
    }
});

requestAnimationFrame(loop);