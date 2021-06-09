var bg;
var Invisible1,Invisible2,Invisible3;

var run; 
var stop;
var end;

var gamestate = run;

var Racer;

var score = 0;
var life = 5;
var Life;


function preload(){

  bgImage = loadImage("Ground.png")
  groundImage = loadImage("floor.png")
  
  runnerImage = loadAnimation("Racer1.png","Racer2.png")
  runnerRImage = loadAnimation("Rider right1.png","Rider right2.png")
  runnerLImage = loadAnimation("Rider left1.png","Rider left2.png")

  racerCollided = loadImage("Racercollided.png")
  
  coinImage = loadAnimation("Coin1.png","Coin2.png","Coin3.png","Coin4.png","Coin5.png","Coin6.png","Coin7.png","Coin8.png","Coin9.png","Coin10.png");
  
  obstacle1 = loadImage("Obstacle1.png")
  obstacle2 = loadImage("Obstacle2.png")
  obstacle3 = loadImage("Obstacle3.png")
  
  reset = loadImage("Reset button.png")
  gameover = loadImage("Gameover.png")

  lives = loadImage("heart.png");
}

function setup() {
 
  createCanvas(windowWidth, windowHeight);
  
  //Invisible1 = shape(190,0,80,470,90,470,200,0,190,0)
  //Invisible1.visible = false
  
  Invisible2 = createSprite(248,235,10,470)
  Invisible2.visible = false
  
  //Invisible3 = shape(298,0,428,470,438,470,308,0,298,0)
  //Invisible3.visible = false
  
  Racer = createSprite(770,480,10,10)
  Racer.addAnimation("run",runnerImage)
  Racer.scale = 1
  Racer.addAnimation("fall",racerCollided)
  
  gameOver = createSprite(254,170,600,600)
  gameOver.addImage(gameover)
  gameOver.scale = 1
  gameOver.visible = false
  
  Reset = createSprite(254,235,600,600)
  Reset.addImage(reset)
  Reset.scale = 0.2
  Reset.visible = false
  
  obstaclesGroup = new Group();
  coinsGroup = new Group();

  Life = createSprite(1260,-70, 0, 0);
  Life.addImage(lives);
  Life.scale = 0.35;

  Life1 = createSprite(1310,-70, 0, 0);
  Life1.addImage(lives);
  Life1.scale = 0.35;

  Life2 = createSprite(1360,-70, 0, 0);
  Life2.addImage(lives);
  Life2.scale = 0.35;

  Life3 = createSprite(1410,-70, 0, 0);
  Life3.addImage(lives);
  Life3.scale = 0.35;

  Life4 = createSprite(1460,-70, 0, 0);
  Life4.addImage(lives);
  Life4.scale = 0.35;
}

function draw() {
  
  background(bgImage)
  
  if(gamestate === run){
  
  if(keyDown("Right") && Racer.x < 1100){
    Racer.x = Racer.x + 400
  }
  
  if(keyDown("Left") && Racer.x > 380){
    Racer.x = Racer.x - 400
  }

  if(life === 4){
    Life4.visible = false;
  }

  if(life === 3){
    Life4.visible = false;
    Life3.visible = false;
  }

  if(life === 2){
    Life4.visible = false;
    Life3.visible = false;
    Life2.visible = false;
  }

  if(life === 1){
    Life4.visible = false;
    Life3.visible = false;
    Life2.visible = false;
    Life1.visible = false;
  }

  if(life === 0){
    Life4.visible = false;
    Life3.visible = false;
    Life2.visible = false;
    Life1.visible = false;
    Life.visible = false;
    if(mousePressedOver(Reset)){
      Reverse();
    Life4.visible = true;
    Life3.visible = true;
    Life2.visible = true;
    Life1.visible = true;
    Life.visible = true;
    }
  }

  spawnObstacles();
  
  spawnCoins();
}
 

  
  if(Racer.isTouching(obstaclesGroup)){
    gamestate = stop;
    life = life-1
  }
  
  if(Racer.isTouching(coinsGroup)){
    coinsGroup[0].destroy();
    score = score+1
  }
  
  if(gamestate === stop){
    
    Racer.changeAnimation("fall",racerCollided);
    
    obstaclesGroup.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);
    
    obstaclesGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0); 
    
    obstaclesGroup.setVelocityYEach(0);
    coinsGroup.setVelocityYEach(0);
    
    obstaclesGroup.destroyEach();
    coinsGroup.destroyEach();
    
    gameOver.visible = true
    Reset.visible = true

    if(mousePressedOver(Reset)){
      Restart();
      gamestate = run;
    }

    if(keyDown("Space")){
      Restart();
      gamestate = run;
    }
  }

  
  
  camera.position.x = width/2;
  camera.position.y = height/2 - 150;

  drawSprites();
  
  fill("black");
  textSize(42);
  text("Score: "+score,1150,- 100);
  text("Life: ",1150,-60);
}

function spawnObstacles(){
  
  if(frameCount % 200 === 0){
    var obstacle = createSprite(254,0,10,10);
    obstacle.x = Math.round(random(1,3));
    
    switch(obstacle.x){
          
      case 1: obstacle.x = width/2 - 220;
              obstacle.velocityX = -4.5
              obstacle.velocityY = 10.7
        break;
        
      case 2: obstacle.x = width/2;
              obstacle.velocityY = 10.7
        break;
        
      case 3: obstacle.x = width/2 + 220;
              obstacle.velocityX = 4.5
              obstacle.velocityY = 10.7
        break;
        
        default: break;
    }
    
    var rand = Math.round(random(1,3));
    
    switch(rand){
        
      case 1: obstacle.addImage(obstacle1)
        break;
        
      case 2: obstacle.addImage(obstacle2)
        break;
        
      case 3: obstacle.addImage(obstacle3)
        break;
        
        default: break;
    }
    
    obstacle.scale = 0.3
    
    obstaclesGroup.add(obstacle);
  }
}

function spawnCoins(){
  
  if(frameCount % 110 === 0){
    
 var coin = createSprite(308,0,20,20)
     coin.addAnimation("coin",coinImage)
     coin.scale = 0.5
     coin.velocityY = 6
     
  
     coin.x = Math.round(random(1,3))
    
     switch(coin.x){
         
       case 1: coin.x = width/2 - 215
               coin.velocityY = 9
               coin.velocityX = -5
         break;
       
       case 2: coin.x = width/2
               coin.velocityY = 9
         break;
       
       case 3: coin.x = width/2 + 215
               coin.velocityY = 9
               coin.velocityX = 5
     }
    
    if(frameCount % 10 === 0){
      coin.scale = coin.scale + 0.2
    }
    
    coinsGroup.add(coin)
  }
}

function Restart(){
  Racer.changeAnimation("run",runnerImage)
  gameOver.visible = false
  Reset.visible = false
}

function Reverse(){
  
  gamestate = run;
  obstaclesGroup.destroyEach();
  coinsGroup.destroyEach();
  Racer.changeAnimation("run",runnerImage)
  score = 0
  life = 5
  gameOver.visible = false
  Reset.visible = false
}