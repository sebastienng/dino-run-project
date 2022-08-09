

class Player {

    constructor(ctx, cvs) {
        this.lives = 3;
        this.score = 0;
        this.scoreLayout = document.querySelector('.display-player-info>span');
        this.posX = 0;
        this.posY = 140;
        this.velocityY = 0;
        this.velocityX = 0;
        this.isJumping = false;
        this.dinoImage = "../images/dinoCharactersVersion1.1/sheets/DinoSprites - doux.png";
        this.shadowImage = "../images/dinoCharactersVersion1.1/misc/shadow_2.png"
        this.spriteSize = 24;
        this.aniframes = 6;
        this.currentFrame = 0;
        this.srcX = 0;
        this.startFrame = 4;
        this.framesDrawn = 0;
        this.initCanvasImage = '';
        this.shadowImageCanvas = ''
        this.context = ctx;
        this.canvas = cvs;
        this.init();
        this.spriteWidth = this.initCanvasImage.width / 24;
        this.spriteHeight = this.initCanvasImage.height;
        this.isTouched = false
        this.frameSpeed = 5;


    }

    init() {

        const dinosaur = new Image();
        const shadow = new Image();
        dinosaur.src = this.dinoImage;

        shadow.src = this.shadowImage;
        this.initCanvasImage = dinosaur;
        this.shadowImageCanvas = shadow;
        this.initLives();
        // this.context.drawImage(this.initCanvasImage,0,0,this.spriteWidth,this.spriteHeight,0,0,this.spriteWidth*2,this.spriteHeight*2);
    }
    initLives() {
        const livesDiv = document.querySelector("#lives-display")
        for (let i = 0; i < this.lives; i++) {
            const newDiv = document.createElement('div')
            newDiv.classList.add('lives')
            livesDiv.appendChild(newDiv)
        }
    }

    addLife() {
        const livesDiv = document.querySelector("#lives-display")
        const newDiv = document.createElement('div')
        newDiv.classList.add('lives')
        livesDiv.appendChild(newDiv)
    }
    removeLife() {
        const livesDiv = document.querySelector("#lives-display")
        const life = document.querySelector('.lives')
        console.log(life);
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

            this.posX += this.velocityX


            // ctx.drawImage(dinosaur,98,0,spriteWidth,spriteHeight,150,0,spriteWidth*2,spriteHeight*2);
            this.context.drawImage(this.initCanvasImage, this.srcX, 0, this.spriteWidth, this.spriteHeight, this.posX, this.posY, this.spriteWidth * 2, this.spriteHeight * 2);

            this.framesDrawn++;

            if (this.framesDrawn >= this.frameSpeed) {
                this.currentFrame++;

                this.score++;
                this.scoreLayout.textContent = this.score;
                this.framesDrawn = 0;
            }
            //this.setScore()

        }
    }

    //  setScore(){
    //     if(this.score<10){
    //         this.score = `000${this.score}`;
    //     }else if (this.score<100){
    //         this.score= `00${this.score}`;
    //     }else if (this.score<1000){
    //         this.score = `0${this.score}`;
    //     }
    //     console.log(this.score);
    //  }
    moveUp() {
        this.velocityY = 5;
        this.isJumping = true;
    }

    moveRight() {
        this.velocityX = 3;
    }

    moveLeft() {
        this.velocityX = -3
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
        return this.posX + this.spriteWidth;
    }
    top() {
        return this.posY;
    }
    bottom() {
        return this.posY + this.spriteHeight;
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
    constructor() {
        this.context = '';
        this.isStarted = false;
        this.canvas = '';
        this.background = '';
        this.enn = 0;
        this.maxEnnemies = 1;
        this.nbrEnnemies = 0;
        this.gameInit();
        this.velocityFactor = 0.2;
        this.ennemiesOnScreen = [];
        this.playerOne = new Player(this.context, this.canvas);
        //this.element1 = new Ennemy('../images/ennemies sprites/Shardsoul Slayer Sprite Sheet.png', 8, 5, 8,false, this.context, this.canvas)
        this.arrayEnnemies = [
            new Ennemy('../images/ennemies sprites/Akaname Sprite Sheet.png', 8, 4, 5, false, this.context, this.canvas),
            new Ennemy('../images/ennemies sprites/Brain Mole Monarch Sprite Sheet.png', 7, 4, 4, true, this.context, this.canvas),
            new Ennemy('../images/ennemies sprites/Dragonfly Sprite Sheet.png', 7, 4, 4, true, this.context, this.canvas),
            new Ennemy('../images/ennemies sprites/Intellect Devourer Sprites.png', 8, 6, 4, false, this.context, this.canvas),
            new Ennemy('../images/ennemies sprites/Jellyfish Sprite Sheet.png', 7, 5, 5, true, this.context, this.canvas),
            new Ennemy('../images/ennemies sprites/Porcupine Sprite Sheet.png', 5, 5, 5, false, this.context, this.canvas)];
        // this.playerTwo = new Player();
    }
    //this function 
    gameInit() {
        const can = document.querySelector("#canvas-player1");

        const ctx = can.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        this.canvas = can;
        this.context = ctx;


        const background = new Image();
        background.src = "../images/temporary-background.jpg";


        this.background = background;
        background.onload = () => {
            this.keyboardListner(this.playerOne)
            this.update();
        }



    }
    keyboardListner(player) {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'o':
                    if (!player.isJumping) player.moveUp();
                    break;
                case 'l':
                    player.moveDown();
                    break;
                case 'k':
                    player.moveLeft();
                    break;
                case 'm':
                    player.moveRight();
                    break;


            }
            //  console.log(event.key);
        })
        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'l':
                    player.startFrame = 4;
                    player.aniframes = 6;
                    player.frameSpeed = 5;
                    break;
                case 'k':
                    player.velocityX = 0
                    break;
                case 'm':
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
            if (this.playerOne.score % 1000 === 0 && this.playerOne.score >1) {
                this.velocityFactor*=1.2;
               
           }
            if (this.playerOne.score % 100 === 0 && this.playerOne.score >1) {
                this.arrayEnnemies.forEach((e)=>{
                    e.velocityX -= this.velocityFactor;
                    
                })
                
                
            }
           

                
            if (this.arrayEnnemies[this.enn].isOutofCanvas()) {
                    this.arrayEnnemies[this.enn].posX = this.canvas.width;
                    this.enn = Math.floor(Math.random() * this.arrayEnnemies.length);
                    this.arrayEnnemies[this.enn].posY = this.arrayEnnemies[this.enn].setPosY();


                }


            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.drawImage(this.background, 0, 0, 700, 250);
            this.playerOne.animate();
          
            this.arrayEnnemies[this.enn].drawPosition();
            // requestAnimationFrame(() => this.update());
        } else {
            console.log("lost");
        }

    }


}

class GameElement {
    constructor(ctx, canvas, fly) {
        this.height = 25;
        this.width = 35
        this.velocityY = 0;
        this.velocityX = -1.8;
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
        this.frameSpeed = 5;
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
        //if (this.posX < -25) this.posX = this.canvas.width;

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
            return 70+Math.floor(Math.random()*60);
        } else {
            return 120;
        }
    }
}

class Ennemy extends GameElement {

    constructor(src, col, row, frames, fly, ctx, canv) {
        super(ctx, canv, fly);
        this.ennemiSrc = src;
        this.init()
        this.posY = Math.floor(this.setPosY());
        this.startFrame = 0;
        this.spriteHeight = this.initCanvasImage.height / row;
        this.spriteWidth = this.initCanvasImage.width / col;
        this.aniframes = frames;

    }

    init() {
        const myImage = new Image();

        myImage.src = this.ennemiSrc;

        this.initCanvasImage = myImage;

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
            // Save the current context  
            //   this.context.save();
            // // Perform the "flip" horizontal  
            //  this.context.scale(-1, 1);
            // Finally we draw the image
            this.context.drawImage(
                this.initCanvasImage,
                this.srcX,
                0,
                this.spriteWidth,
                this.spriteHeight,
                // flipping x-coordinates
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
let game = '';

startBtn.addEventListener('click', () => {

    const allHidenElements = document.querySelectorAll(".hidden-elements")
    startBtn.classList.toggle("hidden-elements")
    settingsBtn.classList.toggle("hidden-elements")
    leaderboardBtn.classList.toggle("hidden-elements")
    allHidenElements.forEach((element) => {
        element.classList.toggle("hidden-elements")
    })
    game = new Game();
})
replayBtn.addEventListener('click', () => {
    game = new Game();
})