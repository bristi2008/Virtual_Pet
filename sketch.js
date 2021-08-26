//Create variables here
var dog, happyDog;
var database, foodStock, FoodS
var fedTime, lastFed;
var foodObj;

function preload()
{
	//load images here
  dogImg = loadImage("Dog.png")
  dog1Img = loadImage("happydog.png")
}

function setup() {
	createCanvas(500, 500);

  dog = createSprite(250,250,30,30);
  dog.addImage(dogImg);

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  food = new Food(200,200)
  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  
  addFood = createButton("Add Food");
  addFood.position(800,95)
  addFood.mousePressed(addFoods)

  fedTime = database.ref('FeedTime')
  fedTime.on("value", function(data){
    lastFed = data.val();
  })
}


function draw() {  
  background(46,139,87)

  fill(255,255,254);
  textSize(15)
  if(lastFed>=12){
    text("Last Feed:" + lastFed%12 + "PM", 350, 30)
  }else if(lastFed==0){
    text("Last Feed: 12 AM", 350, 30)
  }else{
    text("Last Feed:" + lastFed + "AM", 350, 30)
  }

  drawSprites();
  //add styles here
  text("",250,300);

}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

  if(x<=0){
    x=0
  } else {
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
  
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })

  dog.velocityY = 3;
}

function feedDog(){
  dog.addImage(dog1Img);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}



