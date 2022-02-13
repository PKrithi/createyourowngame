
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var bg_img;
var alienImg,alien;
var astronaut,happyAstronaut,displayAstro;
var ufo,ufo_img;
var engine,world;
var ground;


function preload(){
  bg_img = loadImage('spaceBackground.webp');
  alien_img = loadImage('alien.png');
  astronaut = loadImage('astronaut.png');
  ufo_img = loadImage('emptyUfo.png');
}

function setup() {
  engine = Engine.create();
  world = engine.world;

  createCanvas(900,400);

  var options = {
    isStatic: true
  }
  

  ground = Bodies.rectangle(450,390,900,20,options)
  World.add(engine.world, ground)

  alien = Bodies.rectangle(600,150,40,40,options);
  World.add(engine.world,alien)
  //alien.isStatic = true;

  astronaut = createImg('astronaut.png');
  astronaut.position(40,245);
  astronaut.size(115,140);
  //astronaut.isStatic = true;
  astronaut.mouseClicked(airblower)

  ufo = Bodies.rectangle(750,200,400,400);
  World.add(engine.world,ufo)
  //ufo.isStatic = true;
}


function draw() 
{
  background(51);

  Engine.update(engine);
  image(bg_img,0,0,width,height);

  image(alien_img,alien.position.x,alien.position.y,50,245)
  image(ufo_img,ufo.position.x,ufo.position.y,50,245)

  push();

  rectMode(CENTER)
  fill('gray')
  rect(ground.position.x,ground.position.y,900,20);

  pop();
   if(collide(alien,ufo) == true){
    alien.visible = false;

  }

  drawSprites();
}

  
  



function airblower(){
  Matter.Body.applyForce(alien,{x:0,y:0},{x:0.002,y:0});
  alien.isStatic = false;

      
  fill(0);
  stroke("white");
  textSize(25);
  text("The Alien has been defeated!",450,200);
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,alien);
              alien = null;
              return true; 
            }
            else{
              return false;
            }
         }
}

