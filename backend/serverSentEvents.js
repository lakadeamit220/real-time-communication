const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*' // Important for Postman
    });

    // Send initial comment to establish connection
    res.write(':SSE Stream Open\n\n');

    const interval = setInterval(() => {
      res.write(`data: ${Date.now()}\n\n`);
    }, 2000);

    req.on('close', () => {
      clearInterval(interval);
      console.log('Client disconnected');
    });
  } else {
    res.writeHead(200);
    res.end("Regular HTTP endpoint");
  }
});

server.listen(3000, () => {
  console.log("SSE Server running on port 3000");
});