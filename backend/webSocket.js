const WebSocket = require('ws');

// Create a WebSocket server on port 3003
const server = new WebSocket.Server({ port: 3003 });

// Handle new client connections
server.on('connection', (socket, req) => {
  const clientIp = req.socket.remoteAddress;
  console.log(`Client connected from ${clientIp}`);

  // Send a welcome message to the client
  socket.send('Welcome to the WebSocket server!');

  // Handle incoming messages
  socket.on('message', (message) => {
    try {
      const received = message.toString(); // Convert buffer to string
      console.log(`Received from ${clientIp}: ${received}`);
      // Echo back the message with a prefix
      socket.send(`Server echo: ${received}`);
    } catch (err) {
      console.error(`Error processing message: ${err.message}`);
    }
  });

  // Handle client disconnection
  socket.on('close', () => {
    console.log(`Client ${clientIp} disconnected`);
  });

  // Handle errors
  socket.on('error', (err) => {
    console.error(`WebSocket error: ${err.message}`);
  });
});

console.log('WebSocket server started at ws://localhost:3003');