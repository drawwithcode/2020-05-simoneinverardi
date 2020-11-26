let socket = io();
// let myColor = "white";

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);
socket.on("color", setColor);
socket.on("newPlayer", newPlayer);

let slider;

let slider1;
let slider2;
let slider3;

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

  slider = createSlider(50, 200, 50);
  slider.position(10, 10);
  slider.style('width', '80px');

  slider1 = createSlider(45, 255, 45);
  slider1.position(10, 30);
  slider1.style('width', '80px');
  slider2 = createSlider(12, 255, 12);
  slider2.position(10, 50);
  slider2.style('width', '80px');
  // slider3 = createSlider(12, 255, 12);
  // slider3.position(10, 70);
  // slider3.style('width', '80px');

}

function draw() {
  // put drawing code here
    pointLight(200, 50, 0, -width/2, 0, 0);
    // pointLight(0, 50, 200, -width/4, 0, 0);
    pointLight(0, 50, 200, width/2, 0, 0);
}

function mouseMoved() {
  push();
  let val = slider.value();

  let val1 = slider1.value();
  let val2 = slider2.value();
  // let val3 = slider3.value();
  // background(255,10);
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  let locRot = frameCount*0.1;

  noStroke();
  specularMaterial(250, 250, 250, val);
  translate(locX, locY, -1000);
  rotateX(locRot);
  rotateY(locRot);
  rotateZ(locRot);
  // ambientMaterial(250);
  // fill(255);
  ellipsoid(val1, val2, 12);

  pop();
  let message = {
    x: locX,
    y: locY,
    rot: locRot,
  };
  //send to the server
  socket.emit("mouse", message);

}
