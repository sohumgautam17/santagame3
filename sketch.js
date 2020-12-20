const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var backimg, santa, santaBody;
var engine, world;
var snow = [];
var maxSnowFlakes = 100; 
var ground; 
var santaImg;
var cookieImg, presentImg, cadyCaneImg, grinchImg;
var obstaclesGroup, grinchGroup;
var score=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
backimg = loadImage("bg1.jpg");
santaImg = loadImage("santa.jpg")
cookieImg = loadImage("cookie.jpg")
candyCaneImg = loadImage("candyCane.jpg")
presentImg = loadImage("present.jpg")
grinchImg = loadImage("grinch.png")

}

function setup() {
 engine = Engine.create();
 world = engine.world;
 createCanvas(900, 600);

 
 
 
  back1=createSprite(450,300,900,600);
  back1.addImage(backimg);
  back1.x=back1.width/2;
  back1.velocityX=-4;
  back1.scale = 1.6 
  

 santa = createSprite(200, 300, 90, 70);
 santa.addImage(santaImg);
 santa.scale = .4;

 ground = createSprite(450, 500, 1800, 20);
 ground.x = ground.width /2;

 


    for (var j = 0; j < maxSnowFlakes; j++) 
    {
     snow.push(new Snow(random(0,900), random(0,900)));
    }
    
    obstaclesGroup = new Group();
    grinchGroup = new Group();

}

  
function draw() {
  Engine.update(engine);
  background(255);
  text(mouseX+","+mouseY,mouseX,mouseY);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY)
  {
        ground.velocityX = -2

        if (ground.x < 0)
        {
          ground.x = ground.width/2;
        }
        if(keyDown("space"))
        {
          // console.log("hi")
          santa.velocityY = -10;
        }
        santa.velocityY = santa.velocityY + 0.8;


      if(back1.x<100)
      {
        back1.x=back1.width/2;
      }

      santa.display();
      santa.collide(ground);
      drawSprites();
      for (var i = 0; i < maxSnowFlakes; i++)
      {
        
        snow[i].display();
        snow[i].updateY();      
      }
      spawnCookies();

      spawnGrinches();

     if(grinchGroup.isTouching(santa))
      {
        gameState = END;
    }
  }
  if(gameState===END)
  {
    santa.velocityY = 0;

    back1.velocityX = 0; 

    obstaclesGroup.setVelocityXEach(0);
    grinchGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
  }
   
  
   
    
}
function spawnCookies() {
  var randY = random(50, 500);
  

  if(frameCount % 100 === 0) {
    var obstacle = createSprite(900 , randY,10,40);
    obstacle.velocityX = -4;

    console.log(obstacle);
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(cookieImg);
              break;
      case 2: obstacle.addImage(candyCaneImg);
              break;
      case 3: obstacle.addImage(presentImg);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.17;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnGrinches() {
  //write code here to spawn the grinchs
  if (frameCount % 200 === 0) {
    var grinch = createSprite(900,120,40,10);
    grinch.y = Math.round(random(120,500));
    grinch.addImage(grinchImg);
    grinch.scale = 1.5;
    grinch.velocityX = -4;
    
     //assign lifetime to the variable
    grinch.lifetime = 200;
    
    
    //add each grinch to the group
    grinchGroup.add(grinch);
  }
  
}