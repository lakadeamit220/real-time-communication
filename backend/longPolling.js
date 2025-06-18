const http = require('http');

const server = http.createServer((req, res) => {
  // Handle long polling endpoint
  if (req.url === '/poll') {
    setTimeout(() => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify({
        message: `Hello: ${new Date().toISOString()}`
      }));
    }, 3000); // Simulate delay for long polling
  } else {
    // Default endpoint
    res.writeHead(200);
    res.end('Server is up and running!!');
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});