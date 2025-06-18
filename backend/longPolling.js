const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/poll') {
    setTimeout(() => {
      res.writeHead(200, {
        "content-type": "application/json",
      })
      res.end(JSON.stringify({
        message: `Hello: ${new Date().toISOString()}`
      }))
    }, 3000)
  } else {
    res.writeHead(200);
    res.end("server is up and running!!")
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");

});