
   
class Player {

    constructor(ctx,cvs){
        this.lives=3;
        this.score=0;
        this.scoreLayout = document.querySelector('.display-player-info>span');
        this.posX=0;
        this.posY=140;
        this.velocityY=0;
        this.velocityX=0;
        this.isJumping=false;
        this.dinoImage = "../images/dinoCharactersVersion1.1/sheets/DinoSprites - doux.png";
        this.shadowImage= "../images/dinoCharactersVersion1.1/misc/shadow_2.png"
        this.spriteSize = 24;
        this.aniframes = 6;
        this.currentFrame = 0;
        this.srcX =0;
        this.startFrame = 4;
        this.framesDrawn =0;
        this.initCanvasImage ='';
        this.shadowImageCanvas = ''
        this.context = ctx;
        this.canvas=cvs;
        this.init();
        this.spriteWidth = this.initCanvasImage.width/24;
        this.spriteHeight = this.initCanvasImage.height;
        this.isTouched=false
        this.frameSpeed=5;
    

    }

    init() {
        const dinosaur = new Image();
        const shadow = new Image();
        dinosaur.src = this.dinoImage;
       
        shadow.src= this.shadowImage;
        this.initCanvasImage = dinosaur;
        this.shadowImageCanvas= shadow;
       // this.context.drawImage(this.initCanvasImage,0,0,this.spriteWidth,this.spriteHeight,0,0,this.spriteWidth*2,this.spriteHeight*2);
    }

    basicRun(){
        this.startFrame=4;
        this.aniframes = 6;
        this.frameSpeed=5;
    }

    getHit(){
        this.startFrame = 13;
        this.aniframes = 4;
        this.currentFrame = 0;
        this.framesDrawn =0;
    }

    setDinoImage(path){
        this.dinoImage=path;
    }

    animate(){
        //  this.context.drawImage(this.background,0,0,700,250);
     
       if(this.initCanvasImage) {
   
           this.currentFrame = this.currentFrame % this.aniframes;
           this.posY -= this.velocityY;
           this.srcX = this.spriteWidth*(this.currentFrame+this.startFrame)
           
           if(this.posY<=50) this.velocityY=-4;
           if(this.posY>140){
            this.velocityY=0;
            this.posY=140;
            this.isJumping=false;
           }
           
           this.posX+=this.velocityX
           
   
       // ctx.drawImage(dinosaur,98,0,spriteWidth,spriteHeight,150,0,spriteWidth*2,spriteHeight*2);
           this.context.drawImage(this.initCanvasImage,this.srcX,0,this.spriteWidth,this.spriteHeight,this.posX,this.posY,this.spriteWidth*2,this.spriteHeight*2);
         
           this.framesDrawn++;
   
           if(this.framesDrawn>=this.frameSpeed){
               this.currentFrame++;
               
               this.score++;
               this.scoreLayout.textContent=this.score;
               this.framesDrawn=0;
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
     moveUp(){
        this.velocityY=4;
        this.isJumping=true;
     }

     moveRight(){
        this.velocityX=3; 
     }

     moveLeft(){
        this.velocityX=-3
     }

     moveDown(){
        this.aniframes = 6;
        this.startFrame=17;
        this.frameSpeed=3;
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
        return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.right());
      }
}


class Game{
    constructor(){
        this.context = '';
        this.isStarted = false;
        this.canvas = '';
        this.background = '';
        this.gameInit();
        this.playerOne = new Player(this.context,this.canvas);
        this.element1 = new GameElement(25,35,this.context,this.canvas)
        
       // this.playerTwo = new Player();
    }
//this function 
    gameInit(){
        const can = document.querySelector("#canvas-player1");
        const ctx = can.getContext("2d");

        this.canvas=can;
        this.context=ctx;
        
        ctx.ImageSmoothingEnabled = false;
   
        const background = new Image();
        background.src = "../images/temporary-background.jpg";


        this.background=background;
        background.onload = () =>{
        this.keyboardListner(this.playerOne)
        this.update();
        }
        
        

    }
    keyboardListner(player){
        document.addEventListener('keydown', (event)=>{
            switch(event.key){
                case 'o':
                    if(!player.isJumping) player.moveUp();
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
        document.addEventListener('keyup', (event)=>{
            switch(event.key){
                case 'l':
                    player.startFrame=4;
                    player.aniframes  = 6;
                    player.frameSpeed=5;
                break;
                case 'k':
                    player.velocityX=0
                break;
                case 'm':
                    player.velocityX=0
                    
                break;
                
                
            }
        })
    }

    update(){

        if(this.playerOne.lives>0){
            if(this.playerOne.crashWith(this.element1) && !this.playerOne.isTouched){
                console.log("touché");
                this.playerOne.getHit()
                setTimeout(() => {
                    this.playerOne.lives--;
                    this.playerOne.isTouched=false;
                    this.playerOne.basicRun();
                },800)
                 this.playerOne.isTouched=true;
               
            }
            
            if(this.playerOne.score%100===0){
                // console.log(`element fast went from ${this.element1.velocityX}`);
                this.element1.velocityX-=0.2;
                console.log("multiple de 100");
                // console.log(`to ${this.element1.velocityX} ` );
            }
            this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.context.drawImage(this.background,0,0,700,250);
            this.playerOne.animate();
            this.element1.drawPosition(); 
            requestAnimationFrame(() => this.update());
        }else{
            console.log("lost");
        }
       



    }
}

class GameElement {
    constructor(height, width,ctx,canvas){
        this.height=height;
        this.width=width
        this.posY= 145;
        this.velocityY = 0;
        this.velocityX = -1.8;
        this.aniframes = 6;
        this.currentFrame = 0;
        this.srcX = 0;
        this.startFrame = 4;
        this.framesDrawn = 0;
        this.initCanvasImage = '';
        this.context = ctx;
        this.canvas = canvas;
        this.posX=this.canvas.width;

    }

    isOutofCanvas(){
        if(this.posX<0)
        return true
    }
    drawPosition(){
        this.context.fillStyle = 'red';
        this.context.fillRect(this.posX, this.posY, this.height, this.width);
        this.posX+=this.velocityX
        if(this.posX<-25) this.posX=this.canvas.width;
    
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
        return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.right());
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

startBtn.addEventListener('click', ()=>{
    console.log("Need to hide stuff and start the game");
    const allHidenElements = document.querySelectorAll(".hidden-elements")
    startBtn.classList.toggle("hidden-elements")
    settingsBtn.classList.toggle("hidden-elements")
    leaderboardBtn.classList.toggle("hidden-elements")
    allHidenElements.forEach((element)=>{
        element.classList.toggle("hidden-elements")
    })
    const game = new Game();
})
