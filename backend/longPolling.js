const http = require('http');

let messageId = 0; // Track messages for uniqueness

const server = http.createServer((req, res) => {
  // Handle long polling endpoint
  if (req.url === '/long') {
    setTimeout(() => {
      try {
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' // Enable CORS for testing
        });
        res.end(JSON.stringify({
          id: ++messageId,
          message: `Hello: ${new Date().toISOString()}`,
          timestamp: Date.now()
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error' }));
      }
    }, 3000); // Simulate delay for long polling
  } else {
    // Default endpoint
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Long polling server is up and running!!');
  }
});

server.listen(3001, () => {
  console.log('Long polling server running on http://localhost:3001');
});