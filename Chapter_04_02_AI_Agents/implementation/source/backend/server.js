// Local run: API + built React app on one port. (On Vercel, api/index.js is used instead.)
const path = require('path');
const express = require('express');
const app = require('./app');

const dist = path.join(__dirname, '../frontend/dist');
app.use(express.static(dist));
app.get(/^\/(?!api).*/, (req, res) => res.sendFile(path.join(dist, 'index.html')));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`QA Practice running at http://localhost:${port}`));
