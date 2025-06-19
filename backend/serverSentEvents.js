const http = require('http');

// Helper function to format dates
function formatDate() {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
    milliseconds: now.getMilliseconds(),
    isoString: now.toISOString(),
    localeString: now.toLocaleString()
  };
}

let eventId = 0; // Track event IDs

const server = http.createServer((req, res) => {
  // Handle SSE endpoint
  if (req.url === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });

    res.write(':SSE Stream Open\n\n');

    // Send events every 2 seconds
    const interval = setInterval(() => {
      const dateData = formatDate();
      res.write(`id: ${++eventId}\n`);
      res.write(`retry: 5000\n`); // Retry connection after 5 seconds if disconnected
      res.write(`data: ${JSON.stringify({
        timestamp: Date.now(),
        formatted: dateData,
        readable: dateData.localeString
      })}\n\n`);
    }, 2000);

    // Clean up on client disconnect
    req.on('close', () => {
      clearInterval(interval);
      console.log('Client disconnected');
    });
  } else {
    // Default endpoint
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('SSE server is up and running!!');
  }
});

server.listen(3002, () => {
  console.log('SSE server running on http://localhost:3002');
});