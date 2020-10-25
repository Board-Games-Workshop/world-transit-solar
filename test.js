const http = require('http');
const fs = require("fs");

// Create an HTTP server
http
.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  contents = fs.readFileSync('./public/index.html');
  if (url == "/public/index.html") {
    res.write(contents);
    res.end();
  } else {
    res.write('okay');
    res.end();
  }
})
.listen(3000);

console.log('Server listening at 3000');