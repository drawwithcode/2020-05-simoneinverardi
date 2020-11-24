console.log("node is running");

let express = require("express");

let socket = require("socket.io");

let app = express();

let port = process.env.PORT || 3000;

let server = app.listen(port);

app.use(express.static("public"));

let io = socket(server);

io.on("connection", newConnection);

function newConnection(socket){
  console.log("newConnection: " + socket.client.id);

  let clientColor = getRandomColor();

  socket.emit("color", clientColor);

  socket.broadcast.emit("newPlayer", clientColor);

socket.on("mouse", mouseMessage);

function mouseMessage(dataReceived) {
  console.log(socket.client.id, dataReceived);
  socket.broadcast.emit("mouseBroadcast", dataReceived);
}
}

function getRandomColor() {
  let myColors = ["Coral", "Crimson", "CornflowerBlue"];
  color = Math.floor[Math.random(myColors.length)];
  color.toFixed(0);
  // let letters = "0123456789ABCDEF";
  // let color = "#";
  // for ( let i = 0; i < 6; i++) {
  // color += letters[Math.floor(Math.random() * 16)];
// }
return color;
}
