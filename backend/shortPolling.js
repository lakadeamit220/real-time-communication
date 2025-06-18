const http = require('http');

const server = http.createServer((req, res) => {
  // Handle short polling endpoint
  if (req.url === '/poll') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({
      message: `Hello: ${new Date().toISOString()}`
    }));
  } else {
    // Default endpoint
    res.writeHead(200);
    res.end('Server is up and running!!');
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});