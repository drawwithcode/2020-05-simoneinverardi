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
  // rectMode(CENTER);
  // rect(randomPositionX, randomPositionY, 400, 40);
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


function mouseMoved() {
  push();
  noStroke();
  fill(myColor);
  ellipse(mouseX, mouseY, 20);
  pop();
  let message = {
    x: mouseX,
    y: mouseY,
    color: myColor,
  };
  //send to the server
  socket.emit("mouse", message);

}

function drawOtherMouse(data){
  push();
  beginShape(TRIANGLES);
  fill(data.color);
  // noStroke();
  // ellipse(data.x,data.y,10);
  vertex(data.x, data.y);
  endShape(OPEN);
  pop();
}

function preload(){
  // put preload code here
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  // put setup code here
  push();

  textSize(30);
  textAlign(CENTER,CENTER);
  fill(myColor);
  text("welcome " + myColor, width/2, height/2);
  pop();
}

function draw() {
    background(255, 255, 255, 5);

}
