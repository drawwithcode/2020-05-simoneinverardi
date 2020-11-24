let socket = io();
let myColor = "white";

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
  // let locX = data.x - width / 2;
  // let locY = data.y - height / 2;
  pointLight(0, 0, 250, data.x, data.y, 0);
  noStroke();
  // fill(data.color);
  // noStroke();
  // ellipse(data.x,data.y,10);
  pop();

}

function preload(){
  // put preload code here
}

function setup() {
  createCanvas(windowWidth,windowHeight, WEBGL)
  background(255);
  // put setup code here
  push();
  translate(0,0,-110);
  noStroke();
  fill(50);
  sphere(100);
  // background("purple");
  // textSize(30);
  // textAlign(CENTER,CENTER);
  // fill(myColor);
  // text("welcome" + myColor, width/2, height/2);
  pop();
}

function draw() {
  // put drawing code here
}

function mouseMoved() {
  push();
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  // myBlue = 250;
  // myGreen =
  // myRed =
  pointLight(250, 0, 0, locX, locY, 0);
  noStroke();

  // noStroke();
  // fill(myColor);
  // ellipse(mouseX, mouseY, 20);
  pop();
  let message = {
    x: locX,
    y: locY,
    // red: myRed,
    // green: myGreen,
    // blue: myBlue,
  };
  //send to the server
  socket.emit("mouse", message);

}
