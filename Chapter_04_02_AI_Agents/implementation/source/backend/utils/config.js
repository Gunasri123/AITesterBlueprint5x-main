// Credentials are entered by each user on the Settings page, kept in their browser,
// and sent per request in the X-QA-Config header (base64 JSON). Nothing is stored on the server.
module.exports = function config(req, res, next) {
  try {
    const raw = req.get('x-qa-config');
    req.cfg = raw ? JSON.parse(Buffer.from(raw, 'base64').toString('utf8')) : {};
  } catch {
    req.cfg = {};
  }
  next();
};
