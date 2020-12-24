var player,playerimg
var enemy,enemyimg,enemyGroup
var bullet,bulletimg,bulletGroup

var bgimg
var edge
var enemyDeaths=0
var gameState="Level 1"

function preload(){
    playerimg=loadImage("man.png")
    enemyimg = loadImage("enemy.jpeg")
    bulletimg=loadImage("bullet.jpeg")
    //bgimg=loadImage("bg.png")
    

}
function setup(){
    createCanvas(1200,700)
    
    player=createSprite(50,100)
    player.addImage(playerimg)
    enemyGroup = new Group()
    bulletGroup=new Group()
   
    edge=createEdgeSprites()
    

}
function draw(){
    background(255)
    player.scale=0.3
    player.collide(edge)
    if(gameState==="Level 1"){
        if(keyDown("up")){
        player.y=player.y-10
    }
    if(keyDown("down")){
        player.y=player.y+10
    }

    if(keyDown("space")){
        spawnbullet()
    }
    if(bulletGroup.isTouching(enemyGroup)){
        bulletGroup.destroyEach()
        enemyGroup.destroyEach()
        enemyDeaths+=1
    }
      spawnenemy()
      if(enemyGroup.isTouching(player)||enemyGroup.isTouching(edge[0])){
        
        gameState="end"
    }

   
}
    fill("black")
    textSize(20)
    text(gameState,100,50)
    text("Score : "+enemyDeaths,600,100)
    
    if(gameState==="end"){
        fill("red")
        textSize(20)
        text("GameOver",600,350)
        player.destroy()
        enemyGroup.setVelocityYEach(0)
    }
   
  

  drawSprites()
}
function spawnbullet(){
    bullet=createSprite(player.x+54,player.y-40)
    bullet.addImage(bulletimg)
    bullet.scale=0.04
    bullet.velocityX=10
    bulletGroup.add(bullet)
    
}
function spawnenemy(){
    if(frameCount%170===0){
    enemy=createSprite(1200,random(50,650))
    enemy.addImage(enemyimg)
    
    enemy.scale=0.4
    enemy.velocityX=-5
    enemyGroup.add(enemy)
  
    enemy.collide(edge[3])
}
}
