let towerImg, tower;
let doorImg, door, doorsGroup;
let climberImg, climber, climbersGroup;
let ghost;
let ghostJump1Img, ghostJump2Img, ghostStand1Img, ghostStand2Img;
let invisibleBlock1Group, invisibleBlock2Group, invisibleBlock1, invisibleBlock2;
let gameState = "serve";
let lifes = 3;
let title, playBotton, restartBotton, quitBotton;
let titleImg, playBottonImg, restartBottonImg, quitBottonImg;
let topEdge, bottonEdge, leftEdge, rightEdge;
let lifeIcon1, lifeIcon2, lifeIcon3;
let lifeIconImg;
let lifeUp, lifeUpGroup;
let jumpSound, tucSound, dropSound;

function preload(){
  ///IMAGES///
  titleImg = loadImage("DeathGame.png");
  playBottonImg = loadImage("PlayBottonDeathGame.png");
  restartBottonImg = loadImage("RestartBottonDeathGame.png");
  quitBottonImg = loadImage("QuitBottonDeathGame.png");
  lifeIconImg = loadImage("Heart.png");
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostJump1Img = loadImage("DeathJump1.png");
  ghostJump2Img = loadImage("DeathJump2.png");
  ghostStand1Img = loadImage("DeathStand1.png");
  ghostStand2Img = loadImage("DeathStand2.png");
  ///SOUNDS///
  //spookySound = loadSound("spooky.wav");
  jumpSound = loadSound("Jump.mp3");
  tucSound = loadSound("Tuc.mp3");
  dropSound = loadSound("Drop.mp3");
}

function setup() {
  createCanvas(600, 650);
  tower = createSprite(300, 300);
  tower.addImage("tower",towerImg);
  lifeIcon1 = createSprite(30, 280, 50, 50);
  lifeIcon1.addImage(lifeIconImg);
  lifeIcon1.scale = 0.025;
  lifeIcon1.visible = false;
  lifeIcon2 = createSprite(30, 325, 50, 50);
  lifeIcon2.addImage(lifeIconImg);
  lifeIcon2.scale = 0.025;
  lifeIcon2.visible = false;
  lifeIcon3 = createSprite(30, 370, 50, 50);
  lifeIcon3.addImage(lifeIconImg);
  lifeIcon3.scale = 0.025;
  lifeIcon3.visible = false;
  topEdge = createSprite(300, 0, 600, 5);
  topEdge.visible = false;
  //topEdge.debug = true;
  bottonEdge = createSprite(300, 650, 600, 5);
  bottonEdge.visible = false;
  //bottonEdge.debug = true;
  leftEdge = createSprite(600, 325, 5, 650);
  leftEdge.visible = false;
  //lefEdge.debug = true;
  rightEdge = createSprite(0, 325, 5, 650);
  rightEdge.visible = false;
  //rightEdge.debug = true;
  title = createSprite(300, 35);
  title.addImage(titleImg);
  title.scale = 0.5;
  title.visible = false;
  playBotton = createSprite(300, 525);
  playBotton.addImage(playBottonImg);
  playBotton.scale = 0.5;
  playBotton.visible = false;
  restartBotton = createSprite(300, 485);
  restartBotton.addImage(restartBottonImg);
  restartBotton.scale = 0.8553;
  restartBotton.visible = false;
  quitBotton = createSprite(300, 575);
  quitBotton.addImage(quitBottonImg);
  quitBotton.scale = 0.485;
  quitBotton.visible = false;
  ghost = createSprite(300, 350);
  ghost.addImage(ghostStand1Img);
  ghost.scale = 0.04;
  ghost.visible = false;
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlock1Group = new Group();
  invisibleBlock2Group = new Group();
  lifeUpGroup = new Group();
}

function draw() {

  background(200);
  if(tower.y > 400){
    tower.y = 300;
  }

  if(gameState == "serve"){
    tower.velocityY = 1;
    ghost.velocityY = 0;
    gameStop();
    iconsRemove();
    title.visible = true;
    playBotton.visible = true;
    if(mousePressedOver(playBotton)){
      gameState = "wait";
      title.visible = false;
      playBotton.visible = false;
    }
  }
  
  if(gameState == "wait"){
    tower.velocityY = 0;
    ghost.velocityY = 0;
    ghost.visible = true;
    ghost.addImage(ghostStand1Img);
    gameStop();
    iconsRemove();
    if(keyDown("SPACE")){
      gameState = "play";
    }
  }
  
  if(gameState == "play"){
    spawnDoor();
    base();
    tower.velocityY = 1;
    ghost.collide(invisibleBlock1Group);
  }
  if(ghost.collide(invisibleBlock2Group)){
    lifes = lifes - 1;
    gameState = "end";
    tucSound.play();
  }
  if(ghost.x < 70 || ghost.x > 535){
    tower.velocityY = 0;
    ghost.velocityY += 1.5;
    gameStop();
    if(ghost.collide(bottonEdge)){
      gameState = "end";
    }
  }
  
  if(gameState == "end"){
    restartBotton.visible = true;
    quitBotton.visible = true;
    tower.velocityY = 0;
    ghost.velocityY = 0;
    doorsGroup.setLifetimeEach(-1);
    climbersGroup.setLifetimeEach(-1);
    invisibleBlock1Group.setLifetimeEach(-1);
    invisibleBlock2Group.setLifetimeEach(-1);
    gameStop();
    lifesIcons();
    if(mousePressedOver(restartBotton)){
      gameState = "wait";
      restartBotton.visible = false;
      quitBotton.visible = false;
      reset();
    }
    if(mousePressedOver(quitBotton)){
      gameState = "serve";
      lifes = 3;
      restartBotton.visible = false;
      quitBotton.visible = false;
      ghost.visible = false;
      reset();
    }
  }
  if(lifes <= 0){
    gameState = "gameOver";
  }

  if(gameState == "gameOver"){
    gameStop();
    iconsRemove();
    restartBotton.visible = false;
    quitBotton.visible = true;
    if(mousePressedOver(quitBotton)){
      gameState = "serve";
      lifes = 3;
      quitBotton.visible = false;
      ghost.visible = false;
      reset();
    }
  }

  //console.log(gameState);
  //console.log(lifes);
  drawSprites();

  ///TEXT///
  if(gameState == "wait"){
    textSize(30);
    fill("BLACK");
    text("Press SPACE to play and don't let Mr. Death hit your head or fall!", 125, 500, 400);
    fill("BLACK");
    text("Press SPACE to play and don't let Mr. Death hit your head or fall!", 125, 500, 400);
    fill("BLACK");
    text("Press SPACE to play and don't let Mr. Death hit your head or fall!", 125, 500, 400);
  }
  if(gameState == "end"){
    textSize(35);
    fill("RED");
    text("YOU DIED...", 210, 350);
  }
  if(gameState == "gameOver"){
    textSize(35);
    fill("RED");
    text("GameOver", 220, 350);
    fill("RED");
    text("GameOver", 220, 350);
    textSize(30);
    fill("WHITE");
    text("Mr. Deaht died...", 200, 390);
  }
}

function spawnDoor(){
  if(frameCount % 250 === 0){
    door = createSprite(200, -50);
    door.addImage(doorImg);
    door.x = Math.round(random(120, 400));
    door.velocityY = 1;
    door.lifetime = 800;
    ghost.depth = door.depth;
    ghost.depth += 1;
    restartBotton.depth = door.depth;
    restartBotton.depth += 1;
    quitBotton.depth = door.depth;
    quitBotton.depth += 1;
    doorsGroup.add(door);
    climber = createSprite(200, 10);
    climber.addImage(climberImg);
    climber.x = door.x;
    climber.velocityY = door.velocityY;
    climber.lifetime = door.lifetime;
    ghost.depth = climber.depth;
    ghost.depth += 1;
    restartBotton.depth = climber.depth;
    restartBotton.depth += 1;
    quitBotton.depth = climber.depth;
    quitBotton.depth += 1;
    climbersGroup.add(climber);
    invisibleBlock1 = createSprite(climber.x, climber.y - 8);
    invisibleBlock1.x = door.x;
    invisibleBlock1.velocityY = door.velocityY;
    invisibleBlock1.debug = true;
    invisibleBlock1.height = 2;
    invisibleBlock1.width = climber.width;
    invisibleBlock1Group.add(invisibleBlock1);
    //invisibleBlock.visible = false;
    invisibleBlock2 = createSprite(climber.x, climber.y - 5); //-5
    invisibleBlock2.x = door.x;
    invisibleBlock2.velocityY = door.velocityY;
    invisibleBlock2.debug = true;
    invisibleBlock2.height = 2;
    invisibleBlock2.width = climber.width - 20;
    invisibleBlock2Group.add(invisibleBlock2);
    //invisibleBlock.visible = false;
  }
}

function base(){
  spawnLifesUp();
  ghost.visible = true;
  ghost.velocityY += 0.8;
  if(ghost.isTouching(lifeUpGroup)){
    lifes = lifes + 1;
    if(lifes > 3){
      lifes = lifes - 1;
    }
  }
  if(ghost.collide(topEdge)){
    lifes = lifes - 1;
    gameState = "end";
    gameStop();
    tucSound.play();
  }
  if(ghost.collide(bottonEdge)){
    lifes = lifes - 1;
    gameState = "end";
    gameStop();
  }
  ghost.collide(leftEdge);
  ghost.collide(rightEdge);
  if(keyDown("SPACE")){
    ghost.velocityY = -10;
    //jumpSound.play();
  }
  if(keyDown("A")){
    ghost.x = ghost.x - 5;
    ghost.addImage(ghostStand1Img);
    ghost.scale = 0.04;
  }
  if(keyDown("D")){
    ghost.x = ghost.x + 5;
    ghost.addImage(ghostStand2Img);
    ghost.scale = 0.04;
  }
  if(keyDown("SPACE") && keyDown("A")){
    ghost.addImage(ghostJump1Img);
    ghost.scale = 0.05;
  }
  if(keyDown("SPACE") && keyDown("D")){
    ghost.addImage(ghostJump2Img);
    ghost.scale = 0.05;
  }
  lifesIcons();
  lifeUpGroup.bounceOff(ghost,destroyLifeUp);
}

function lifesIcons(){
  if(lifes == 0){
    lifeIcon1.visible = false;
  }
  if(lifes == 1){
    lifeIcon1.visible = true;
    lifeIcon2.visible = false;
  }
  if(lifes == 2){
    lifeIcon1.visible = true;
    lifeIcon2.visible = true;
    lifeIcon3.visible = false;
  }
  if(lifes == 3){
    lifeIcon1.visible = true;
    lifeIcon2.visible = true;
    lifeIcon3.visible = true;
  }
}
function spawnLifesUp(){
  if(frameCount % 405 === 0){
    lifeUp = createSprite(200, -50, 50, 50);
    lifeUp.addImage(lifeIconImg);
    lifeUp.scale = 0.025;
    lifeUp.x = Math.round(random(70, 525));
    lifeUp.velocityY = 2;
    lifeUp.lifetime = 300;
    lifeUpGroup.add(lifeUp); 
  }
}

function destroyLifeUp(lifesUp){
  dropSound.play();
  lifesUp.remove();
}

function iconsRemove(){
  lifeIcon1.visible = false;
  lifeIcon2.visible = false;
  lifeIcon3.visible = false;
}

function gameStop(){
  doorsGroup.setVelocityYEach(0);
  climbersGroup.setVelocityYEach(0);
  invisibleBlock1Group.setVelocityYEach(0);
  invisibleBlock2Group.setVelocityYEach(0);
  lifeUpGroup.setVelocityYEach(0);
}

function reset(){
  ghost.x = 300;
  ghost.y = 350;
  doorsGroup.destroyEach();
  climbersGroup.destroyEach();
  invisibleBlock1Group.destroyEach();
  invisibleBlock2Group.destroyEach();
  lifeUpGroup.destroyEach();
}
