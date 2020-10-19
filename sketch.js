var jungle,jungleimg,invisibleground;
var monkey,monkeyimg,monkeycollide;
var obstaclegroup,obstacle,obstacleimg;
var foodgroup,food,foodimg;
var jumpsound,eatingsound,oversound;
var score=0;
var END = 0;
var PLAY = 1;
var gameState = PLAY;
var restart,restartimg;

function preload(){
  
  soundFormats('mp3')
  
  //load image for jungle
  jungleimg=loadImage("jungle.jpg") 
  //loadimg for monkey
  monkeyimg=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  monkeycollide=loadAnimation("Monkey_05.png");
  
  //load image for obstacle
  obstacleimg=loadImage("stone.png")
  
  //load image for food
  foodimg=loadImage("banana.png");
  
  //load sound when jump
  jumpsound = loadSound("jump (2) (mp3cut.net).mp3");
  
  //load sound for eating
  eatingsound=loadSound("eating.mp3");
  
  //load sound for gameover
  oversound=loadSound("die.mp3");
  
  //load img for restart
  restartimg=loadImage("restart.png")
  
  
  obstaclegroup=new Group();
  foodgroup=new Group()
  
}

function setup(){
  createCanvas(600,400);
  
  //createSprite for jungle
  jungle=createSprite(200,200,600,400);
  jungle.addImage("ju",jungleimg)
  jungle.scale=0.86
  
  //createSprite and addAnimation for monkey
  monkey=createSprite(70,370);
  monkey.addAnimation("mo",monkeyimg);
  monkey.addAnimation("mon",monkeycollide)
  monkey.scale=0.24
  
  //createSprite for invisiblegrund
  invisibleground=createSprite(300,405,600,10);
  invisibleground.visible=false
  
//monkey.debug=true;
  monkey.setCollider("rectangle",0,0,10,monkey.height)
// monkey.setCollider("circle",5,0,20);
  
  restart=createSprite(270,250);
  restart.addImage("r",restartimg);
  restart.visible=false;
  restart.scale=0.7
  
  
}

function draw(){

  background(220);
  
  if (gameState===PLAY){
  jungle.velocityX=-8
  
  if(jungle.x<200){
    jungle.x=390
  }
  
  if(keyDown("space")&&monkey.y>300) {
    monkey.velocityY=-17
    jumpsound.play();
   
  } 
  
  //gravity for monkey
  monkey.velocityY=monkey.velocityY+0.7
  
  monkey.collide(invisibleground)
  
  spawnobstacle()
  spawnfood();
  
  
  
  if(foodgroup.isTouching(monkey)){
    foodgroup.destroyEach();
    eatingsound.play();
    score=score+10;
     monkey.scale = monkey.scale + 0.03;
    
    

    } 
  
  if(obstaclegroup.isTouching(monkey)){
     monkey.scale=0.24;
    gameState=END;
    }
    
    if(monkey.scale>=0.3600000000000001){
      if(keyDown("space")&&monkey.y>250) {
    monkey.velocityY=-17
    jumpsound.play();
      }
    }
    if(monkey.scale>=0.3600000000000001){
      obstacle.VelocityX=-10
    }
    
  console.log(monkey.scale)
     drawSprites();
    fill("yellow");
  stroke("red");
  textFont("algerian");
  textSize(35);
  text("Score: " + score, 250, 40);
    
    }else if (gameState===END){
      jungle.velocityX=0;
      monkey.changeAnimation("mon",monkeycollide);
      foodgroup.setVelocityXEach(0)
      obstaclegroup.setVelocityXEach(0);
      monkey.velocityY=0;
  restart.visible=true;
    
      if(mousePressedOver(restart)){
        reset()
      }
      
      
      
      drawSprites();
    
  
      fill("yellow");
      stroke("black");
      textSize(45);
  text("GAME OVER", 150, 200);
    
    
  }
 
}

function spawnobstacle(){
  
  if(frameCount%100==0){
    obstacle=createSprite(600,364);
    obstacle.addImage(obstacleimg);
    obstacle.scale=0.3
    obstacle.velocityX=-8
    
    obstaclegroup.add(obstacle);
    //obstacle.debug=true
     obstacle.setCollider("rectangle",0,0,10,obstacle.height)
    
  }
  }

function spawnfood(){
  
  if(frameCount%90==0){
    food=createSprite(600,Math.round(random(200,300)))
    food.addImage(foodimg)
    food.scale=0.07
  food.velocityX=-15
    
    foodgroup.add(food)  
  }
}

function reset(){
  score=0
  gameState=PLAY;
  monkey.changeAnimation("mo",monkeyimg);
   obstaclegroup.destroyEach();
  restart.visible=false
  
  
  
}


