let socket = io();

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
  specularMaterial(250, 250, 250, data.val);
  translate(data.x, data.y, -1000);
  rotateX(data.rot);
  rotateY(data.rot);
  rotateZ(data.rot);
  ellipsoid(data.val1, data.val2, 12);
  pop();
}

function preload(){
  // put preload code here
}

function setup() {
  let cnv = createCanvas(1200, 1000, WEBGL);
  let xCnv = (windowWidth - width) / 2;
  let yCnv = (windowHeight - height) / 2;
  cnv.position(xCnv, yCnv);
  background(255);

  slider = createSlider(50, 150, 50);
  slider.position(10, 10);
  slider.style('width', '80px');
  // slider.parent("sliders");

  slider1 = createSlider(45, 255, 45);
  slider1.position(10, 50);
  slider1.style('width', '80px');
  // slider1.parent("sliders");
  slider2 = createSlider(12, 255, 12);
  slider2.position(10, 70);
  slider2.style('width', '80px');
  // slider2.parent("sliders");


  slider3 = createSlider(10, 250, 200);
  slider3.position(10, 110);
  slider3.style('width', '80px');
  // slider3.parent("sliders");
  slider4 = createSlider(10, 255, 50);
  slider4.position(10, 130);
  slider4.style('width', '80px');
  // slider4.parent("sliders");
  slider5 = createSlider(10, 255, 0);
  slider5.position(10, 150);
  slider5.style('width', '80px');
  // slider5.parent("sliders");
}

function draw() {

    let color1 = slider3.value();
    let color2 = slider4.value();
    let color3 = slider5.value();

  // put drawing code here
    pointLight(color1, color2, color3, -width/2, 0, 0);
    // pointLight(0, 50, 200, -width/4, 0, 0);
    pointLight(-color3, color2, -color1, width/2, 0, 0);
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
  let locRot = frameCount * 0.08;

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
    val: val,
    val1: val1,
    val2: val2,
  };
  //send to the server
  socket.emit("mouse", message);

}
