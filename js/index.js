//const game = new Game();
// 
//
// 
// EVENT LISTENER FOR THE MENU
// 
// 
// 

const startBtn = document.querySelector('#start');
const settingsBtn = document.querySelector('#settings');
const leaderboardBtn = document.querySelector('#leaderboard');
const replayBtn = document.querySelector('#replay');
const getlbDiv = document.querySelector(".leaderboard-display");
const getCharacMenu = document.querySelector('#select-character');
const children = getCharacMenu.querySelectorAll('.hidden-elements');
const dinoBtns = document.querySelectorAll(".start-game")
const canvas = document.querySelector('canvas')

const preLoadDino = [new Image(),
new Image(),
new Image(),
new Image()]


preLoadDino[0].src = 'images/dinoCharactersVersion1.1/sheets/DinoSprites - doux.png';
preLoadDino[1].src = 'images/dinoCharactersVersion1.1/sheets/DinoSprites - tard.png';
preLoadDino[2].src = 'images/dinoCharactersVersion1.1/sheets/DinoSprites - mort.png';
preLoadDino[3].src = 'images/dinoCharactersVersion1.1/sheets/DinoSprites - vita.png';

const preLoadEnnemies = [new Image(),
new Image(),
new Image(),
new Image(),
new Image(),
new Image()]


preLoadEnnemies[0].src = 'images/ennemies sprites/Akaname Sprite Sheet.png';
preLoadEnnemies[1].src = 'images/ennemies sprites/Brain Mole Monarch Sprite Sheet.png';
preLoadEnnemies[2].src = 'images/ennemies sprites/Dragonfly Sprite Sheet.png';
preLoadEnnemies[3].src = 'images/ennemies sprites/Intellect Devourer Sprites.png';
preLoadEnnemies[4].src = 'images/ennemies sprites/Jellyfish Sprite Sheet.png';
preLoadEnnemies[5].src = 'images/ennemies sprites/Porcupine Sprite Sheet.png'


console.log(preLoadDino);
let game = '';

dinoBtns.forEach((e) => {
    e.addEventListener('click', () => {

        children.forEach((e) => {
            e.classList.toggle('hidden-elements')

        })
        document.querySelector('.display-player-info').classList.toggle('hidden-elements')
        // document.querySelector('#')
        canvas.classList.toggle('hidden-elements')
        //console.log(preLoadDino[3]);
        game = new Game(e.classList[1])


    })
})
startBtn.addEventListener('click', () => {
    startBtn.classList.toggle("hidden-elements")
    settingsBtn.classList.toggle("hidden-elements")

    leaderboardBtn.classList.toggle("hidden-elements")
    getCharacMenu.classList.toggle('hidden-elements');
    getlbDiv.innerHTML = ''

    children.forEach((e) => {
        e.classList.toggle('hidden-elements')

    })

})



// startBtn.addEventListener('click', () => {

//     const allHidenElements = document.querySelectorAll(".hidden-elements.game")
//     startBtn.classList.toggle("hidden-elements")
//     settingsBtn.classList.toggle("hidden-elements")
//     leaderboardBtn.classList.toggle("hidden-elements")
//     allHidenElements.forEach((element) => {
//         element.classList.toggle("hidden-elements")
//     })
//     game = new Game();
// })
replayBtn.addEventListener('click', () => {
    game.resetGame();
    game = new Game(game.playerOne.dinoName);
})

leaderboardBtn.addEventListener('click', () => {


    if (leaderboardBtn.textContent === "Hide") {
        leaderboardBtn.textContent = "LeaderBoard"
        getlbDiv.innerHTML = ''
    } else {
        leaderboardBtn.textContent = "Hide";
        getlbDiv.innerHTML = ''
    }
    getlbDiv.classList.toggle("hidden-elements")
    // console.log(localStorage);
    if (localStorage.length !== 0) {


        const arrayofcookie = localStorage;
        const arrayofScore = [];

        for (theplayer in arrayofcookie) {
            // if(typeof theplayer === 'number') {
            arrayofScore.push(localStorage.getItem(theplayer));

            // }


        }

        arrayofScore.sort((a, b) => b - a);

        let i = 1;

        for (score of arrayofScore) {
            //console.log(score);
            if (i <= 10 && score != null) {
                getlbDiv.innerHTML += `TOP ${i} = ${score}pts<br>`;
                i++;
            }
        }


    } else {
        getlbDiv.textContent = "No data here. Try to play a bit lol."
    }

})





















class Player {

    constructor(dinoName, dino, ctx, cvs) {
        this.dinoName = dinoName;
        this.lives = 3;
        this.score = 0;
        this.scoreLayout = document.querySelector('.display-player-info>span');
        this.posX = 3;
        this.posY = 140;
        this.velocityY = 0;
        this.velocityX = 0;
        this.isJumping = false;
        this.dinoImage = dino;
        this.shadowImage = "images/dinoCharactersVersion1.1/misc/shadow_2.png"
        this.spriteSize = 24;
        this.aniframes = 6;
        this.currentFrame = 0;
        this.srcX = 0;
        this.startFrame = 4;
        this.framesDrawn = 0;
        this.initCanvasImage = dino;
        this.shadowImageCanvas = ''
        this.context = ctx;
        this.canvas = cvs;
        this.init();
        this.spriteWidth = this.initCanvasImage.width / 24;
        this.spriteHeight = this.initCanvasImage.height;
        this.isTouched = false
        this.isMoving = false;
        this.isSprinting = false;
        this.frameSpeed = 6;



    }

    init() {

        // const dinosaur = new Image();
        // const shadow = new Image();
        // dinosaur.src = this.dinoImage;

        // shadow.src = this.shadowImage;
        // this.initCanvasImage = dino;
        // this.shadowImageCanvas = shadow;
        this.addLife(this.lives);
        // this.context.drawImage(this.initCanvasImage,0,0,this.spriteWidth,this.spriteHeight,0,0,this.spriteWidth*2,this.spriteHeight*2);
    }

    addLife(life) {
        const livesDiv = document.querySelector("#lives-display")
        for (let i = 0; i < life; i++) {
            const newDiv = document.createElement('div')
            newDiv.classList.add('lives')
            newDiv.classList.add(`${this.dinoName}`)
            livesDiv.appendChild(newDiv)
        }

    }
    removeLife() {
        const livesDiv = document.querySelector("#lives-display")
        const life = document.querySelector('.lives')
        livesDiv.removeChild(life)
    }

    basicRun() {
        this.startFrame = 4;
        this.aniframes = 6;
        this.frameSpeed = 5;
    }

    getHit() {
        this.startFrame = 13;
        this.aniframes = 4;
        this.currentFrame = 0;
        this.framesDrawn = 0;
    }

    setDinoImage(path) {
        this.dinoImage = path;
    }

    animate() {
        //  this.context.drawImage(this.background,0,0,700,250);

        if (this.initCanvasImage) {

            this.currentFrame = this.currentFrame % this.aniframes;
            this.posY -= this.velocityY;
            this.srcX = this.spriteWidth * (this.currentFrame + this.startFrame)

            if (this.posY <= 50) this.velocityY = -4;
            if (this.posY > 140) {
                this.velocityY = 0;
                this.posY = 140;
                this.isJumping = false;
            }




            const nextX = this.posX + this.velocityX
            if (nextX > 0 && nextX < this.canvas.width - 50) {
                this.posX = nextX
            }



            // ctx.drawImage(dinosaur,98,0,spriteWidth,spriteHeight,150,0,spriteWidth*2,spriteHeight*2);
            this.context.drawImage(this.initCanvasImage, this.srcX, 0, this.spriteWidth, this.spriteHeight, this.posX, this.posY, this.spriteWidth * 2, this.spriteHeight * 2);

            this.framesDrawn++;

            if (this.framesDrawn >= this.frameSpeed) {
                this.currentFrame++;

                this.updateScore();
                this.scoreLayout.textContent = this.score;
                this.framesDrawn = 0;
            }
            //this.setScore()

        }
    }

    updateScore() {
        this.score++;

        // if (this.isSprinting) this.score++;

        if (this.score % 1000 === 0 && this.score > 1) {
            this.lives++;
            this.addLife(1);
        }
    }

    moveUp() {
        this.velocityY = 7;
        this.isJumping = true;
    }

    moveRight() {

        this.velocityX = 2;


    }

    moveLeft() {

        this.velocityX = -4;


    }

    moveDown() {
        this.aniframes = 6;
        this.startFrame = 17;
        this.frameSpeed = 3;
    }

    left() {
        return this.posX;
    }
    right() {
        return this.posX + this.spriteWidth - 5;
    }
    top() {
        return this.posY;
    }
    bottom() {
        return this.posY + this.spriteHeight - 5;
    }

    crashWith(obstacle) {

        //  return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.right());

        if (
            this.right() > obstacle.left() && this.right() < obstacle.right()
            ||
            this.left() > obstacle.left() && this.left() < obstacle.right()
        ) {
            if (
                this.top() > obstacle.top() && this.top() < obstacle.bottom()
                ||
                this.bottom() > obstacle.top() && this.bottom() < obstacle.bottom()
            ) {

                return true;
            }
        }
        return false
    }
}


class Game {
    constructor(dino) {
        this.pickedDino = this.getDinoImage(dino)
        this.dinoSource = ''
        this.context = '';
        this.isStarted = false;
        this.canvas = '';
        this.background = '';
        this.enn = 0;
        this.maxEnnemies = 1;
        this.nbrEnnemies = 0;
        this.playerOne = null;

        this.velocityFactor = 0.2;
        this.splitBackground = 0;
        this.backgroundSpeed = 2;
        this.arrayEnnemies = [];
        this.elementSpeed = 3;
        // console.log(dino, this.pickedDino);
        this.gameInit(dino);
        //this.element1 = new Ennemy('../images/ennemies sprites/Shardsoul Slayer Sprite Sheet.png', 8, 5, 8,false, this.context, this.canvas)

        // this.playerTwo = new Player();
    }
    //this function
    getDinoImage(dino) {
        let src = '';

        switch (dino) {
            case 'douxy':
                src = preLoadDino[0];
                break;
            case 'tardy':
                src = preLoadDino[1];
                break;
            case 'morty':
                src = preLoadDino[2];
                break;
            case 'vity':
                src = preLoadDino[3];

            default:

                break;
        }


        return src;
    }
    gameInit(dino) {
        const can = document.querySelector("#canvas-player1");

        const ctx = can.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        this.canvas = can;
        this.context = ctx;


        const background = new Image();
        // this.initCanvasImage = dinosaur;

        background.src = "images/temporary-background.jpg";
        //console.log(this.pickedDino);

        this.background = background;


        this.playerOne = new Player(dino, this.pickedDino, this.context, this.canvas);
        this.keyboardListner(this.playerOne)
        // this.arrayEnnemies = [
        //     new Ennemy('images/ennemies sprites/Akaname Sprite Sheet.png', 8, 4, 8, 1, false, this.context, this.canvas),
        //     new Ennemy('images/ennemies sprites/Brain Mole Monarch Sprite Sheet.png', 7, 4, 4, 0, true, this.context, this.canvas),
        //     new Ennemy('images/ennemies sprites/Dragonfly Sprite Sheet.png', 7, 4, 4, 0, true, this.context, this.canvas),
        //     new Ennemy('images/ennemies sprites/Intellect Devourer Sprites.png', 8, 6, 8, 1, false, this.context, this.canvas),
        //     new Ennemy('images/ennemies sprites/Jellyfish Sprite Sheet.png', 7, 5, 5, 1, true, this.context, this.canvas),
        //     new Ennemy('images/ennemies sprites/Porcupine Sprite Sheet.png', 5, 5, 5, 3, false, this.context, this.canvas)];
        this.arrayEnnemies = [
            new Ennemy(preLoadEnnemies[0], 8, 4, 8, 1, false, this.context, this.canvas),
            new Ennemy(preLoadEnnemies[1], 7, 4, 4, 0, true, this.context, this.canvas),
            new Ennemy(preLoadEnnemies[2], 7, 4, 4, 0, true, this.context, this.canvas),
            new Ennemy(preLoadEnnemies[3], 8, 6, 8, 1, false, this.context, this.canvas),
            new Ennemy(preLoadEnnemies[4], 7, 5, 5, 1, true, this.context, this.canvas),
            new Ennemy(preLoadEnnemies[5], 5, 5, 5, 3, false, this.context, this.canvas)];
        this.update()





    }



    getEndGameMenu() {
        const getElements = document.querySelectorAll(".hidden-elements.end-game");

        const getinfo = document.querySelector(".display-player-info>span");
        const scoreFinal = getinfo.textContent;
        getinfo.classList.toggle("hidden-elements")
        localStorage.setItem(`${Date.now()}`, ` ${scoreFinal}`)
        getElements.forEach((e) => {
            e.classList.toggle("hidden-elements")
        })
        const showScore = document.querySelector(".game-ending-screen>div>span")
        showScore.innerHTML = ` Sad but you lost. Your Score is : ${scoreFinal}. <br><br>Wanna play again ?`
        //const getEndgame = document.querySelectorAll(".hidden-elements.")
    }
    resetGame() {
        const getinfo = document.querySelector(".display-player-info>span");
        getinfo.classList.toggle("hidden-elements")
        this.canvas.classList.toggle("hidden-elements")

        const getElements = document.querySelectorAll(".end-game");
        getElements.forEach((e) => {
            e.classList.toggle("hidden-elements")
        })
    }
    getVelocityFactor() {
        return Math.floor(this.playerOne.score / 100)
    }
    increaseSpeed() {
        this.elementSpeed += 0.2;
    }
    keyboardListner(player) {
        document.addEventListener('keydown', (event) => {

            switch (event.key) {
                case 'i':
                    if (!player.isJumping) player.moveUp();
                    break;
                case 'k':
                    player.moveDown();
                    if (!player.isSprinting) {
                        this.setVelocityElement(2);
                        player.isSprinting = true;
                    }
                    break;
                case 'j':

                    //if(player.posX>0 && player.isMoving){
                    player.moveLeft();


                    //   }
                    break;
                case 'l':
                    player.moveRight();

                    break;


            }

        })
        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'k':

                    player.startFrame = 4;
                    player.aniframes = 6;
                    player.frameSpeed = 6;
                    player.isSprinting = false;

                    this.setVelocityElement();

                    break;
                case 'j':
                    player.isMoving = false;
                    player.velocityX = 0
                    break;
                case 'l':
                    player.isMoving = false;
                    player.velocityX = 0

                    break;


            }
        })
    }

    update() {


        if (this.playerOne.lives > 0) {
            if (this.playerOne.crashWith(this.arrayEnnemies[this.enn]) && !this.playerOne.isTouched) {

                this.playerOne.getHit()
                setTimeout(() => {
                    this.playerOne.lives--;
                    this.playerOne.isTouched = false;

                    this.playerOne.basicRun();
                }, 1000)
                this.playerOne.isTouched = true;
                this.playerOne.removeLife();

            }

            //console.log(this.playerOne.lives);


            if (this.playerOne.score % 100 === 0 && this.playerOne.score > 1) {
                this.setVelocityElement();
            }
            if (this.playerOne.score % 1000 === 0) {
                this.increaseSpeed();
            }


            if (this.arrayEnnemies[this.enn].isOutofCanvas()) {
                this.arrayEnnemies[this.enn].posX = this.canvas.width;
                this.enn = Math.floor(Math.random() * this.arrayEnnemies.length);
                this.arrayEnnemies[this.enn].posY = this.arrayEnnemies[this.enn].setPosY();


            }

            // console.log(`${this.arrayEnnemies[0].velocityX} for ${this.getVelocityFactor()} @ ${this.playerOne.score}`);
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            //this.context.drawImage(this.background, 0, 0, 700, 250);
            this.backgroundDraw();
            if (0 < this.playerOne.posX < this.canvas.width) this.playerOne.animate();

            this.arrayEnnemies[this.enn].drawPosition();
            requestAnimationFrame(() => this.update());
        } else {

            this.canvas.classList.toggle("hidden-elements")
            this.getEndGameMenu();


        }

    }
    setVelocityElement(factor = 1) {
        this.arrayEnnemies.forEach((e) => {
            e.velocityX = -this.elementSpeed * factor - (this.getVelocityFactor() * this.velocityFactor);
            e.frameSpeed = this.elementSpeed * 2 / factor;
        })
        this.backgroundSpeed = this.elementSpeed * factor + (this.getVelocityFactor() * this.velocityFactor);

    }

    backgroundDraw() {
        //console.log(this.background.width);
        this.context.drawImage(this.background, this.splitBackground, 0, 700, 250);

        // draw image 2
        this.context.drawImage(this.background, this.splitBackground - 700, 0, 700, 250);

        // update image height

        this.splitBackground -= this.backgroundSpeed;

        if (this.splitBackground < 0) {
            this.splitBackground += this.canvas.width;
        }


    }


}

class GameElement {
    constructor(ctx, canvas, fly) {
        this.height = 25;
        this.width = 35
        this.velocityY = 0;
        this.velocityX = -3;
        this.aniframes = 6;
        this.currentFrame = 0;
        this.srcX = 0;
        this.srcY = 0;
        this.startFrame = 4;
        this.framesDrawn = 0;
        this.initCanvasImage = '';
        this.context = ctx;
        this.canvas = canvas;
        this.posX = this.canvas.width;
        this.canFly = fly;
        this.context = ctx;
        this.canvas = canvas;
        this.spriteWidth = '';
        this.spriteHeight = '';
        this.frameSpeed = 6;
        this.posY = Math.floor(this.setPosY());

    }

    isOutofCanvas() {
        if (this.right() < 0) return true

        return false;

    }
    drawPosition() {
        this.context.fillStyle = 'red';
        this.context.fillRect(this.posX, this.posY, this.height, this.width);
        this.posX += this.velocityX

    }

    left() {
        return this.posX;
    }
    right() {
        return this.posX + this.width;
    }
    top() {
        return this.posY;
    }
    bottom() {
        return this.posY + this.height;
    }

    crashWith(obstacle) {
        return !(this.bottom() < obstacle.top() || this.top() < obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.right());
    }
    setPosY() {
        if (this.canFly) {
            return 70 + Math.floor(Math.random() * 60);
        } else {
            return 120;
        }
    }
}

class Ennemy extends GameElement {

    constructor(src, col, row, frames, spRow = 0, fly, ctx, canv) {
        super(ctx, canv, fly);
        this.ennemiSrc = src;
        this.init(src)

        this.posY = Math.floor(this.setPosY());
        this.startFrame = 0;
        this.spriteHeight = this.initCanvasImage.height / row;
        this.spriteWidth = this.initCanvasImage.width / col;
        this.aniframes = frames;
        this.srcY = this.spriteHeight * spRow;

    }

    init(src) {

        this.initCanvasImage = src;

        // this.context.drawImage(this.initCanvasImage,0,0,this.spriteWidth,this.spriteHeight,0,0,this.spriteWidth*2,this.spriteHeight*2);
    }

    left() {
        return this.posX;
    }
    right() {
        return this.posX + this.spriteWidth;
    }
    top() {
        return this.posY;
    }
    bottom() {
        return this.posY + this.spriteHeight;
    }


    drawPosition() {
        if (this.initCanvasImage) {

            this.currentFrame = this.currentFrame % this.aniframes;
            this.srcX = this.initCanvasImage.width - this.spriteWidth * (this.currentFrame + this.startFrame + 1)


            this.posX += this.velocityX

            this.context.drawImage(
                this.initCanvasImage,
                this.srcX,
                this.srcY,
                this.spriteWidth,
                this.spriteHeight,
                this.posX,
                this.posY,
                this.spriteWidth * 2,
                this.spriteHeight * 2
            )
            // And restore the context ready for the next loop  
            //   this.context.restore();

            this.framesDrawn++;

            if (this.framesDrawn >= this.frameSpeed) {

                this.currentFrame++;
                this.framesDrawn = 0;
            }
            //this.setScore()
            // if (this.posX < -25) this.posX = this.canvas.width;
        }


    }


}

