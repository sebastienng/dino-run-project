//this function 
function gameInit(){
    const canvas = document.querySelector("#canvas-player1");
    ctx = canvas.getContext("2d");
    ctx.webkitImageSmoothingEnabled = false;
    ctx.ImageSmoothingEnabled = false;

    // canvas.height=innerHeight;
    // canvas.width=innerWidth;

    const background = new Image();
    background.src = "../images/temporary-background.jpg";
    background.onload = loadImages;
    // background.onload = () =>{
    //     ctx.drawImage(background,0,0,700,250);
    // }
    
    const dinosaur = new Image();
    dinosaur.src ="../images/dinoCharactersVersion1.1/sheets/DinoSprites - doux.png"
    dinosaur.onload = loadImages; 
    // dinosaur.onload =() =>{
    //     ctx.drawImage(dinosaur,0,0,10 ,30,25,25,10,10);
    // }

    let col = 24;
    let spriteWidth = dinosaur.width/col;
    let spriteHeight = dinosaur.height;

    let frames = 6;
    let currentFrame = 0;

    let srcX =0;
    let srcY = 24;

    let startFrame = 4;

    let framesDrawn =0;
    let frameSpeed =5;
    let floorY=140;
    let posX=0;
    let velocityY=0;
    let velocityX=0;

    function animate(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
       // requestAnimationFrame(animate);
        ctx.drawImage(background,0,0,700,250);

        currentFrame = currentFrame % frames;
        floorY -= velocityY;
        srcX = spriteWidth*(currentFrame+startFrame)
        
        if(floorY<=50) velocityY=-4;
        if(floorY>=140){
           velocityY=0;
        }
        
        posX+=velocityX
        
       
       // ctx.drawImage(dinosaur,98,0,spriteWidth,spriteHeight,150,0,spriteWidth*2,spriteHeight*2);
        ctx.drawImage(dinosaur,srcX,0,spriteWidth,spriteHeight,posX,floorY,spriteWidth*2,spriteHeight*2);
        framesDrawn++;

        if(framesDrawn>=frameSpeed){
            currentFrame++;
            framesDrawn=0;
        }

        document.addEventListener('keydown', (event)=>{
            switch(event.key){
                case 'ArrowUp':
                    startFrame=4;
                    frames = 6;
                    velocityY=4;
                    frameSpeed=5;
                break;
                case 'ArrowDown':
                    frames = 6;
                    startFrame=17;
                    frameSpeed=3;
                break;
                case 'ArrowLeft':
                   velocityX=-3
                break;
                case 'ArrowRight':
                   velocityX=3; 
                break;
                
                
            }
        })
        document.addEventListener('keyup', (event)=>{
            switch(event.key){
                case 'ArrowDown':
                    startFrame=4;
                    frames = 6;
                    frameSpeed=5;
                break;
                case 'ArrowLeft':
                    velocityX=0
                 break;
                 case 'ArrowRight':
                    velocityX=0
                 break;
                 
                
            }
        })
      
    }
    
   
    let numOfImage=2;
    function loadImages(){
        if(--numOfImage > 0) return;

        animate();  
    }
}
   
gameInit();
