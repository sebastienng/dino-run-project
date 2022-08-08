
   
class Player {

    constructor(ctx,cvs){
        this.lives=3;
        this.posX=0;
        this.posY=140;
        this.velocityY=0;
        this.velocityX=0;
        this.isJumping=false;
        this.dinoImage = "../images/dinoCharactersVersion1.1/sheets/DinoSprites - doux.png";
        this.spriteSize = 24;
        this.aniframes = 6;
        this.currentFrame = 0;
        this.srcX =0;
        this.startFrame = 4;
        this.framesDrawn =0;
        this.initCanvasImage ='';
        this.context = ctx;
        this.canvas=cvs;
        this.init();
    }

    init() {
        const dinosaur = new Image();
        dinosaur.src = this.dinoImage;
        this.initCanvasImage = dinosaur;
    }

    setDinoImage(path){
        this.dinoImage=path;
    }

    animate(){
        //  this.context.drawImage(this.background,0,0,700,250);
     
       if(this.initCanvasImage) {
           let spriteWidth = this.initCanvasImage.width/24;
           let spriteHeight = this.initCanvasImage.height;
   
           this.currentFrame = this.currentFrame % this.aniframes;
           this.posY -= this.velocityY;
           this.srcX = spriteWidth*(this.currentFrame+this.startFrame)
           
           if(this.posY<=50) this.velocityY=-4;
           if(this.posY>140){
           this.velocityY=0;
           this.velocityX=0
           }
           
           this.posX+=this.velocityX
           
   
       // ctx.drawImage(dinosaur,98,0,spriteWidth,spriteHeight,150,0,spriteWidth*2,spriteHeight*2);
           this.context.drawImage(this.initCanvasImage,this.srcX,0,spriteWidth,spriteHeight,this.posX,this.posY,spriteWidth*2,spriteHeight*2);
           this.framesDrawn++;
   
           if(this.framesDrawn>=this.frameSpeed){
               this.currentFrame++;
               this.framesDrawn=0;
           }
           
       

       }
     }
}


class Game{
    constructor(){
        this.context = '';
        this.isStarted = false;
        this.canvas = '';
        this.background='';
        this.gameInit();
        this.playerOne = new Player(this.context,this.canvas);
        this.element1 = new GameElement(this.context,this.canvas)
        
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
                case 'ArrowUp':
                    player.startFrame=4;
                    player.aniframes = 6;
                    player.velocityY=4;
                    player.frameSpeed=5;
                    console.log(event.key);
                break;
                case 'ArrowDown':
                    player.aniframes = 6;
                    player.startFrame=17;
                    player.frameSpeed=3;
                    console.log(event.key);
                break;
                case 'ArrowLeft':
                player.velocityX=-3
                console.log(event.key);
                break;
                case 'ArrowRight':
                player.velocityX=3; 
                console.log(event.key);
                break;
                
                
            }
        })
        document.addEventListener('keyup', (event)=>{
            switch(event.key){
                case 'ArrowDown':
                    player.startFrame=4;
                    player.aniframes  = 6;
                    player.frameSpeed=5;
                    console.log(event.key);
                break;
                case 'ArrowLeft':
                   
                    // while(player.posY<140){
                    //     player.velocityX-=0,7
                    // }
                    player.velocityX=0
                    console.log(event.key);
                break;
                case 'ArrowRight':
                    // while(player.posY<140){
                    //     player.velocityX+=0,7
                    // }
                    player.velocityX=0
                    
                    console.log(event.key);
                break;
                
                
            }
        })
    }

    update(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.context.drawImage(this.background,0,0,700,250);
        this.playerOne.animate();
        this.element1.drawPosition(); 
        requestAnimationFrame(() => this.update());
    }


}

class GameElement {
    constructor(ctx,canvas){
        this.posY= 145;
        this.velocityY = 0;
        this.velocityX = -2;
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

    drawPosition(){
        this.context.fillStyle = 'red';
        this.context.fillRect(this.posX, this.posY, 25, 25);
        
        // this.framesDrawn++;
        this.posX+=this.velocityX
        if(this.posX<-25) this.posX=this.canvas.width;
        // if(this.framesDrawn>=this.frameSpeed){
        //     this.currentFrame++;
        //     this.framesDrawn=0;
        // }
    }

    
}

const game = new Game();

