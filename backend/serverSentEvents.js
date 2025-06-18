const http = require('http');

// Helper function to format dates
function formatDate() {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1, // Months are 0-indexed
    day: now.getDate(),
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
    milliseconds: now.getMilliseconds(),
    isoString: now.toISOString(),
    localeString: now.toLocaleString()
  };
}

const server = http.createServer((req, res) => {
  if (req.url === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });

    res.write(':SSE Stream Open\n\n');

    const interval = setInterval(() => {
      const dateData = formatDate();
      // Send multiple formats in the SSE stream
      res.write(`data: ${JSON.stringify({
        timestamp: Date.now(),
        formatted: dateData,
        readable: dateData.localeString
      })}\n\n`);
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