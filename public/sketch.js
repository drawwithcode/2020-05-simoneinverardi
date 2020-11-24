let socket = io();
// let myColor = "white";

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);
socket.on("color", setColor);
socket.on("newPlayer", newPlayer);



function newPlayer(newPlayerColor) {
  console.log(newPlayerColor);
  // push();
  // noStroke();
  // // fill("purple");
  // rectMode(CENTER);
  // rect(width / 2, height / 2, 400, 40);
  // textSize(30);
  // fill(newPlayerColor);
  // textAlign(CENTER,CENTER);
  // text("New player joined: " + newPlayerColor, width / 2, height / 2);
  // pop();
}

function setColor(assignedColor) {
  myColor = assignedColor;

}

function newConnection (){
  console.log("your id: " + socket.id);
}

function drawOtherMouse(data){
  push();
  noStroke();
  specularMaterial(250, 250, 250, 80);
  translate(data.x, data.y, -1000);
  rotateX(data.rot);
  rotateY(data.rot);
  rotateZ(data.rot);
  ellipsoid(30, 8, 8);

  pop();
}

function preload(){
  // put preload code here
}

function setup() {
  createCanvas(windowWidth,windowHeight, WEBGL)
  background(255);

}

function draw() {
  // put drawing code here
    pointLight(200, 50, 0, -width/2, 0, 0);
    // pointLight(0, 50, 200, -width/4, 0, 0);
    pointLight(0, 50, 200, width/2, 0, 0);
}

function mouseMoved() {
  push();
  // background(255,10);
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  let locRot = frameCount*0.1;

  noStroke();
  specularMaterial(250, 250, 250, 50);
  translate(locX, locY, -1000);
  rotateX(locRot);
  rotateY(locRot);
  rotateZ(locRot);
  // ambientMaterial(250);
  // fill(255);
  ellipsoid(150, 40, 40);

  pop();
  let message = {
    x: locX,
    y: locY,
    rot: locRot,
  };
  //send to the server
  socket.emit("mouse", message);

}
