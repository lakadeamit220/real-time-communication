const WebSocket = require('ws');

// Create a WebSocket server on port 3000
const server = new WebSocket.Server({ port: 3000 });

// Handle new client connections
server.on('connection', (socket) => {
  console.log('Client connected');

  // Send a welcome message to the client
  socket.send('Welcome to the WebSocket server!');

  // Handle incoming messages
  socket.on('message', (message) => {
    const received = message.toString(); // Convert buffer to string
    console.log(`Received: ${received}`);
    // Echo back the message with a prefix
    socket.send(`Server echo: ${received}`);
  });

  // Handle client disconnection
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server started at ws://localhost:3000');