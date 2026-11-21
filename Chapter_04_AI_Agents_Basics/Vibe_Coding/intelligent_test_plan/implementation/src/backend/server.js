// Local server: serves the page and the API. Values in implementation/.env act as defaults for you only.
const http = require('http');
const fs = require('fs');
const path = require('path');

try { process.loadEnvFile(path.join(__dirname, '..', '..', '.env')); } catch { console.warn('No .env found. Enter credentials in Settings.'); }
const api = require('./app');
const INDEX = path.join(__dirname, '..', 'frontend', 'index.html');

http.createServer((req, res) => {
  if (req.url.startsWith('/api/')) return api(req, res);
  res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(fs.readFileSync(INDEX));
}).listen(process.env.PORT || 3000, () => console.log(`Running on http://localhost:${process.env.PORT || 3000}`));
