const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 3000 });

server.on("connection", (socket) => {
  console.log("Client Connected!!");

  socket.send('Web Socket Demo!!');

  socket.on("message", (message) => {
    console.log(message);
    socket.send("Hello from Server!!")
  })
});

console.log('WebSocket server started at ws://localhost:3000');
