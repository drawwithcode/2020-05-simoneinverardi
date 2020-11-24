let socket = io();
let myColor = "Crimson";

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);
socket.on("color", setColor);
socket.on("newPlayer", newPlayer);

function newPlayer(newPlayerColor) {
  console.log(newPlayerColor);
  let randomPositionX = random(windowWidth);
  let randomPositionY = random(windowHeight);

  push();
  noStroke();
  fill(255);
  rectMode(CENTER);
  rect(100, 100, 400, 40);
  textSize(30);
  fill(newPlayerColor);
  textAlign(CENTER,CENTER);
  text("New player joined: " + newPlayerColor,randomPositionX, randomPositionY);
  pop();
}

function setColor(assignedColor) {
  myColor = assignedColor;

}

function newConnection (){
  console.log("your id: " + socket.id);
}

function drawOtherMouse(data){

  push();
  fill(data.color);
  noStroke();
  // ellipse(data.x,data.y,10);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  translate(data.x, data.y, data.z);
  box(50);
  pop();

}

function preload(){
  // put preload code here
}

function setup() {
  createCanvas(windowWidth,windowHeight, WEBGL);
  // put setup code here
  // push();

  // textSize(30);
  // textAlign(CENTER,CENTER);
  // fill(myColor);
  // text("welcome " + myColor, width/2, height/2);
  // pop();
}

function draw() {
    background(255, 255, 255, 5);

}

function mouseClicked() {
  push();
  translate(mouseX, mouseY);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  box(50);
  noStroke();
  fill(myColor);
  // ellipse(mouseX, mouseY, 20);
  pop();
  let message = {
    x: mouseX,
    y: mouseY,
    color: myColor,
  };
  //send to the server
  socket.emit("mouse", message);

}
