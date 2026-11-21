const mammoth = require('mammoth');
const jira = require('../services/jiraService');
const ai = require('../services/aiService');
const { buildDocx } = require('../services/docxService');
const { TYPES, httpError } = require('../utils/templates');

// req.cfg = credentials the user entered in Settings (see utils/config.js)

exports.generate = async (req, res) => {
  const { type, jiraId } = req.body;
  if (!TYPES[type]) throw httpError(400, 'Unknown document type.');
  const parts = [];
  let source = '';
  if (jiraId?.trim()) {
    const issue = await jira.getIssue(jiraId.trim(), req.cfg);
    parts.push(issue.text);
    source = `Jira ${issue.key} — ${issue.title}`;
  }
  if (req.file) {
    if (!req.file.originalname.toLowerCase().endsWith('.docx')) throw httpError(400, 'Only .docx files are supported.');
    const { value } = await mammoth.extractRawText({ buffer: req.file.buffer });
    if (!value.trim()) throw httpError(400, 'The uploaded document has no readable text.');
    parts.push(`Requirement document (${req.file.originalname}):\n${value.slice(0, 20000)}`);
    source = source ? `${source} + ${req.file.originalname}` : req.file.originalname;
  }
  if (!parts.length) throw httpError(400, 'Enter a Jira ID or attach a .docx requirement file.');
  const markdown = await ai.generate(req.cfg, type, parts.join('\n\n---\n\n'));
  res.json({ markdown, source });
};

exports.update = async (req, res) => {
  const { markdown, info } = req.body;
  if (!markdown || !info?.trim()) throw httpError(400, 'Document and new information are required.');
  res.json({ markdown: await ai.applyInfo(req.cfg, markdown, info) });
};

exports.download = async (req, res) => {
  const { type, markdown, source, status, version } = req.body;
  if (!TYPES[type] || !markdown) throw httpError(400, 'Nothing to download.');
  const buf = await buildDocx({ title: TYPES[type].name, source, status, version, markdown });
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.setHeader('Content-Disposition', `attachment; filename="${TYPES[type].name.replace(/ /g, '_')}.docx"`);
  res.send(buf);
};

exports.testJira = async (req, res) => {
  if (!(await jira.testConnection(req.cfg))) throw httpError(401, 'Jira connection failed. Check URL, email and API token.');
  res.json({ ok: true });
};

exports.testLlm = async (req, res) => res.json({ models: await ai.listModels(req.cfg) });
