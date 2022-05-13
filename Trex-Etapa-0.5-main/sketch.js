      var trex, trex_running, edges;
var groundImage;
var Pisoinvisivel
var PLAY=1
var END=0
var gameState=PLAY
var score=0
var largura
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  nuven = loadImage( "cloud.png")
  groundImage = loadImage("ground2.png")
  obstacle_1 = loadImage("obstacle1.png")
  obstacle_2 = loadImage("obstacle2.png")
  obstacle_3 = loadImage("obstacle3.png")
  obstacle_4 = loadImage("obstacle4.png")
  obstacle_5 = loadImage("obstacle5.png")
  obstacle_6 = loadImage("obstacle6.png")
  trex_colided = loadAnimation("trex_collided.png")
  gameover = loadImage("gameOver.png")
  restart = loadImage("restart.png")
  chekpoit = loadSound("checkpoint.mp3")
  diee = loadSound("die.mp3")
  jumpp = loadSound("jump.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  //criando o trex
  trex = createSprite(50,100,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("colides", trex_colided)
  trex.debug=true
  trex.setCollider("circle", 0,-20,40)
  edges = createEdgeSprites();
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  largura = width
  Piso = createSprite(width/2,180,600,5)
  Piso.scale=largura/1000
  Piso.addImage(groundImage)
  trex.x = 50
  
  Pisoinvisivel = createSprite(300,180,600,5)
  Pisoinvisivel.visible=false

  obstaculosdano=new Group()
  nuvenss=new Group()
  Restart = createSprite(width/2,100)
  Restart.addImage(restart)
  Restart.scale=0.50
  gameOver =createSprite(width/2,60)
  gameOver.addImage(gameover)
  gameOver.scale=1.5
}


function draw(){
  //definir a cor do plano de fundo 
  background("white");
  text("score: "+score,500,15)
  //registrando a posição y do trex
  console.log(trex.y)
 
  //pular quando tecla de espaço for pressionada
  
  
  trex.velocityY = trex.velocityY + 0.7;
     
 //impedir que o trex caia
  trex.collide(Pisoinvisivel)
  drawSprites();
  if(gameState===PLAY){
    score=score+Math.round(getFrameRate()/60)
    spawnnuvem()
    spawnobstacle()
    Piso.velocityX=-(10+score/100)
    Restart.visible=false
    gameOver.visible=false
    if(Piso.x<0) {
      Piso.x=width/2  
    }
    if(score>0&&score%500===0){
      chekpoit.play()
    }
    if(keyWentDown("space")&&trex.isTouching(Piso) ){
    jumpp.play()
      trex.velocityY = -10;
    }
    if(trex.isTouching(obstaculosdano)){
      diee.play()
      gameState=END
    }
  }
  else if(gameState===END){
  Piso.velocityX=0 
  obstaculosdano.setVelocityXEach(0) 
  nuvenss.setVelocityXEach(0)
  obstaculosdano.setLifetimeEach(-1)
  nuvenss.setLifetimeEach(-1)
  trex.changeAnimation("colides", trex_colided)
  Restart.visible=true
  gameOver.visible=true
  if(mousePressedOver(Restart)){
    reset()
  }
  }      
}

function spawnnuvem(){
   if(frameCount%20===0){
    var nuvens=createSprite(width,20,15,20)
    nuvens.addImage(nuven)
    nuvens.scale=0.6
    nuvens.velocityX = -(5+score/60) 
    nuvens.y=Math.round(random (20,100))
    nuvens.lifetime=width/nuvens.velocityX
    nuvens.depth=trex.depth-1
    nuvenss.add(nuvens)
  }

  }

function spawnobstacle(){
  if(frameCount%60===0){
    var obstaculos=createSprite(width,170)
    var round=Math.round(random (1,6))
    switch(round){
      case 1:obstaculos.addImage(obstacle_1);
      break;
      case 2:obstaculos.addImage(obstacle_2);
      break;
      case 3:obstaculos.addImage(obstacle_3);
      break;
      case 4:obstaculos.addImage(obstacle_4);
      break;
      case 5:obstaculos.addImage(obstacle_5);
      break;
      case 6:obstaculos.addImage(obstacle_6);
      break;
    }
    obstaculos.velocityX = -(7+score/100)
    obstaculos.lifetime=width/obstaculos.velocityX
    obstaculos.scale=0.5  
    obstaculosdano.add(obstaculos)
  }
}
function reset(){
  gameState=PLAY
  obstaculosdano.destroyEach()
  nuvenss.destroyEach()
  trex.changeAnimation("running", trex_running)
  score=0
}