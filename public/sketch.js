let socket = io();
let myColor = "white";

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);
socket.on("color", setColor);
socket.on("newPlayer", newPlayer);

let locX = mouseX - width / 2;
let locY = mouseY - height / 2;

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
  //move your mouse to change light position
  // let locX = mouseX - width / 2;
  // let locY = mouseY - height / 2;
  // to set the light position,
  // think of the world's coordinate as:
  // -width/2,-height/2 -------- width/2,-height/2
  //                |            |
  //                |     0,0    |
  //                |            |
  // -width/2,height/2--------width/2,height/2
  pointLight(0, 0, 250, data.x, data.y, 50);
  noStroke();
  translate(0,0,-500)
  sphere(500);
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
  // translate(0,0,-110);

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
  //move your mouse to change light position
  // to set the light position,
  // think of the world's coordinate as:
  // -width/2,-height/2 -------- width/2,-height/2
  //                |            |
  //                |     0,0    |
  //                |            |
  // -width/2,height/2--------width/2,height/2
  pointLight(250, 0, 0, locX, locY, 50);
  noStroke();
  translate(0,0,-500)
  sphere(500);
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
