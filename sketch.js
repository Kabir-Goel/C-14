var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImage
var score = 0
var obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6
var obstaclesGroup,cloudsGroup
var gameState = 0

function preload() {
    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    trex_collided = loadImage("trex_collided.png");
    groundImage = loadImage("ground2.png");
    cloudImage = loadImage("cloud.png");
    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");
    obstacle4 = loadImage("obstacle4.png");
    obstacle5 = loadImage("obstacle5.png");
    obstacle6 = loadImage("obstacle6.png");
}

function setup() {
    createCanvas(600, 200);

//create a trex sprite
    trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trex_running);
    trex.addAnimation("collided", trex_collided);
    trex.scale = 0.5;

//create a ground sprite
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -4;

//create invisibleGround
    invisibleGround = createSprite(200,190, 400, 20);
    invisibleGround.visible = false;

//create groups
    obstaclesGroup = new Group()
    cloudsGroup = new Group()
}

function draw() {
    background(222);
    fill("black");
    text("Score: "+score, 500, 20);

//gameState
    if(gameState == 0){
        score = score+Math.round(frameCount/100);
        //jump when the space button is pressed
    if (keyDown("space") && trex.y > 140) {
        trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY + 0.8

    if (ground.x < 0) {
        ground.x = ground.width / 2;
    }
        spawnClouds();
        spawnObstacles();
        
        if(obstaclesGroup.isTouching(trex)){
            gameState = 1
        }
        
    }
    else if(gameState == 1){
        trex.changeAnimation("collided");
        cloudsGroup.setVelocityXEach(0);
        obstaclesGroup.setVelocityXEach(0);
        ground.velocityX = 0;
    }

    trex.collide(invisibleGround);
    drawSprites();
}
function spawnClouds() {
    if(frameCount %60 == 0){
        var r = Math.round(random(10,80));
        cloud = createSprite(600, r, 40, 10);
        cloud.scale = 0.25
        cloud.addImage(cloudImage);
        cloud.velocityX = -4;
        trex.depth = cloud.depth + 1 
        cloud.lifetime = 200
        cloudsGroup.add(cloud);
    }
}

function spawnObstacles() {
    if(frameCount %60 == 0){
        var rand = Math.round(random(1,6));
        obstacle = createSprite(600, 170, 40, 10);
        obstacle.scale = 0.09
        obstacle.velocityX = -6
        obstacle.lifetime = 250
        obstaclesGroup.add(obstacle);
        
        switch(rand){
            case 1:obstacle.addImage(obstacle1);
                    break;
            case 2:obstacle.addImage(obstacle2);
                    break;
            case 3:obstacle.addImage(obstacle3);
                    break;
            case 4:obstacle.addImage(obstacle4);
                    obstacle.scale = 0.04;
                    break;
            case 5:obstacle.addImage(obstacle5);
                    obstacle.scale = 0.04;
                    break;
            case 6:obstacle.addImage(obstacle6);
                    default:break;
        }
    }
}
