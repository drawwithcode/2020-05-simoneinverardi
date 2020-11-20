let socket = io();

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);

function newConnection (){
  console.log("your id: " + socket.id);
}

function drawOtherMouse(data){
  fill(255,0,0);
  noStroke();
  ellipse(data.x,data.y,10);

}

function preload(){
  // put preload code here
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  // put setup code here
  background("purple");
}

function draw() {
  // put drawing code here
}

function mouseMoved() {
  push();
  noStroke();
  fill(0);
  ellipse(mouseX, mouseY, 20);
  let message = {
    x: mouseX,
    y: mouseY,
  };
  //send to the server
  socket.emit("mouse", message);
  pop();
}
