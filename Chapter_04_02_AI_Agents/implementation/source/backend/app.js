const express = require('express');

const app = express();
app.use(express.json({ limit: '5mb' }));
app.use('/api', require('./utils/config'), require('./routes/api'));

app.use((err, req, res, next) => {
  if (!err.status) console.error(err.message); // never log secrets / request bodies
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

module.exports = app;
