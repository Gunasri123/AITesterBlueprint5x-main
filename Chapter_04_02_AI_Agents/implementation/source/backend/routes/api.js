const router = require('express').Router();
const multer = require('multer');
const c = require('../controllers/docController');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 4 * 1024 * 1024 } });
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res)).catch(next);

router.post('/generate', upload.single('file'), wrap(c.generate));
router.post('/update', wrap(c.update));
router.post('/download', wrap(c.download));
router.post('/settings/test-jira', wrap(c.testJira));
router.post('/settings/test-llm', wrap(c.testLlm));

module.exports = router;
