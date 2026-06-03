const http = require('http');
const fs = require('fs');
const path = require('path');
const products = require('./config/products'); // Dynamic consulting data layer

const PORT = 5000;

// Explicit, strict MIME type map to ensure browser security compliance
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', // Added crucial support for your celebration penguin GIF
  '.ico': 'image/x-icon',
  '.svg': 'images/svg+xml'
};

const server = http.createServer((req, res) => {
  // 1. REST API Endpoint for the Jeopardy Game Engine
  if (req.url === '/api/products') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(products));
  }

  // 2. Main Entry Point (Serves the presentation view layout)
  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile(path.join(__dirname, 'views', 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Internal Server Error: Missing index.html view template.');
      }
      res.writeHead(200, { 'Content-Type': MIME['.html'] });
      res.end(data);
    });
    return;
  }

  // 3. Secure, Fallback Static Asset Router
  // Normalizes paths and cuts out directory traversal vulnerabilities (e.g., ../)
  const safeSuffix = path.normalize(req.url).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(__dirname, 'public', safeSuffix);

  // Verification step: Ensure the requested file actually lives inside the public directory
  const publicDir = path.join(__dirname, 'public');
  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Forbidden: Access Denied.');
  }

  // Read and stream the file asset over the network pipeline
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Resource Not Found');
    }
    const ext = path.extname(filePath).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('======================================================');
  console.log(`🚀 ADOBE JEOPARDY SUMMIT ENGINE ONLINE`);
  console.log(`🎯 URL: http://localhost:${PORT}`);
  console.log('======================================================');
});