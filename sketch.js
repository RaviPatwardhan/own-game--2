var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bird, person, car, score, ground, carsGroup, birdsGroup, restart, restartImg;


var birdImg, personImg, carImg, backgroundImg;

function preload(){
  birdImg = loadImage("bird1.png");
  carImg = loadImage("car.png");
  personImg = loadImage("person1.png","person2.png");
  backgroundImg = loadImage("background.jpg")
  restartImg = loadImage("reset.jpg");

}
function setup(){
  score = 0;
  createCanvas(600,600);
  person = createSprite(50,500,20, 50)
  person.scale =0.3;
  person.addImage(personImg);
  ground = createSprite(300,550,600,100)
  ground.visible = false;
  restart = createSprite(300,300);
  restart.addImage(restartImg);
  restart.scale = 0.3;
  restart.visible = false;


 carsGroup = new Group();
 birdsGroup = new Group();
 person.setCollider("rectangle", 0,0, 50,50)
 //person.debug = true;
}

function draw(){
background(backgroundImg);
person.collide(ground);
fill("black");
text("Score:" + score, 500, 50 );




if( gameState === PLAY){
    score = score+ Math.round(getFrameRate()/60);

    ground.x = ground.width/2;
  




  spawnCars();
  spawnBirds();


  if(keyDown("Space")&&person.y>= 350){
    person.velocityY= -12
    console.log(person.y)
    
  }
  
  person.velocityY = person.velocityY +0.8


  if(carsGroup.isTouching(person)){
    gameState = END
    }

}else if(gameState === END){
  restart.visible = true;

  birdsGroup.setVelocityXEach(0);
  carsGroup.setVelocityXEach(0);

  if(mousePressedOver(restart)){
    reset();
  }
}



drawSprites();

}

function spawnCars(){
  if(frameCount% 120 === 0){
    var car = createSprite(600, 530, 10, 40);
    
    car.velocityX = -(3 + score/100);
    car.addImage(carImg);
    car.scale = 0.1
    carsGroup.add(car)
  }
  
}


function spawnBirds(){
  if(frameCount% 200 === 0){
    var bird = createSprite(600, 120, 40, 10);
    bird.y = Math.round(random(80,120));
    bird.addImage(birdImg);
    bird.velocityX = -3;
    bird.scale = 0.1;
    birdsGroup.add(bird);
  }

}
function reset(){
    gameState = PLAY;
    score = 0;
    restart.visible = false;
    carsGroup.destroyEach();
    birdsGroup.destroyEach();

}