var PLAY = 1
var END =0
var gameState = 1
var monkey , monkey_running,ground,invisibleGround
var banana ,bananaImg, obstacle, obstacleImg
var bananaGroup, obstacleGroup
var score = 0
var gameOver,gameOverImg
var s = 0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("obstacle.png");
  
  groundImg = loadImage("ground1.jpg");
 
  gameOverImg = loadImage("gameover.jpg") 
}



function setup() {
  createCanvas(600,400);
  
 
  
  ground = createSprite(0,0);
  ground.addImage(groundImg);
  ground.x = ground.width / 2;
  ground.scale = 2
  
  monkey = createSprite(50,330);
  monkey.addAnimation("running",monkey_running)
  monkey.scale = 0.20
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  invisibleGround = createSprite(300,390,600,10)
  invisibleGround.visible = false
  
  
    

}


function draw() {
background("white")
  
  if(gameState===PLAY){
    if(monkey.isTouching(bananaGroup)){
  s = s+1
  }
     if (ground.x < 0){
  ground.x = ground.width /2;
  }
  
  if(keyDown("space")&& monkey.y >= 100){
    monkey.velocityY = -15
  }
  monkey.velocityY = monkey.velocityY + 0.8

  
   ground.velocityX = -(4 + 3* score/100)
    score = score + Math.round(getFrameRate()/60);
    if(monkey.isTouching(obstacleGroup)){
    gameState=END
    gameOver.scale = 0.6
    gameOver.visible = true
      bananaGroup.setVelocityEach = 0
      //bananaGroup.velocityY = 0
      obstacleGroup.setVelocityEach = 0
      //obstacleGroup.velocityY = 0
    }
   gameOver = createSprite(300,200)
    gameOver.addImage(gameOverImg)
  gameOver.visible = false
  }
 
  if(gameState===END){
        obstacleGroup.destroyEach();
      bananaGroup.destroyEach();
    //gameState = PLAY
  }
  
    
 
      
  monkey.collide(invisibleGround);
  
  ground.velocityX = -6
  drawSprites();
  text("Score : "+ s,200,50)
  text("Survival Time: "+ score, 450,50);
  spawnObstacles();
  spawnbananas();
}

function spawnObstacles(){
   if(frameCount % 100 === 0){
    obstacle = createSprite(600,350);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.2
    obstacle.velocityX = -8
    obstacleGroup.add(obstacle);
  }
}

function spawnbananas(){
   if(frameCount % 75 === 0){
    banana = createSprite(700,100);
    banana.y = Math.round(random(50,200));
    banana.addImage(bananaImg);
    banana.scale = 0.1
    banana.velocityX = -7
    bananaGroup.add(banana);
  }
}

   //
  //gameOver.visibile = false
  //score = 0
 // gameOver.addImage(gameOverImg)
  //gameOver.scale = 0.6
  //