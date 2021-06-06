var Dog , HungryDogImage , ContentDogImage;
var Food;
var FoodStock;
var database;
function preload(){
	ContentDogImage = loadImage("Sprites/ContentDog.png");
	HungryDogImage = loadImage("Sprites/HungryDog.png");
}
function setup(){
	database = firebase.database();
	createCanvas(500,500);
	Dog = createSprite(250,250,200,200);
	Dog.addImage(HungryDogImage);
	Dog.scale = 0.25;
	FoodStock = database.ref('Food');
	FoodStock.on("value",readFoodStock/*,showError*/);
}
function draw(){
	background(46,139,87);
	drawSprites();
	noStroke();
	textSize(25);
	fill("BLACK");
	text("Click to Feed Dragon",160,50);
	text("Food: "+FoodStock,160,400);
}
function mouseClicked(){
	FoodStock = FoodStock-1;
	Dog.addImage(ContentDogImage);
}
function readFoodStock(data){
	FoodStock = data.val();
}
function writeFoodStock(x){
	if(x<=0){
		x=0;
	}
	else{
		x+x-1;
	}
	database.ref('/').update({
		'Food': x
	})
}
function showError(){
	console.log("Error in writing the Database");
}