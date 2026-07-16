const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  let url = req.url === '/' ? '/index.html' : req.url;
  let fp = path.join(__dirname, url);
  let ext = path.extname(fp);
  let ct = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml'
  }[ext] || 'text/plain';

  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': ct, 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache', 'Expires': '0' });
    res.end(data);
  });
}).listen(8090, () => console.log('Server running at http://localhost:8090'));
