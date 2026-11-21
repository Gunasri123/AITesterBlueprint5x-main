const { httpError } = require('../utils/templates');

const auth = (c) => 'Basic ' + Buffer.from(`${c.JIRA_EMAIL}:${c.JIRA_TOKEN}`).toString('base64');
const base = (c) => (c.JIRA_BASE_URL || '').replace(/\/$/, '');
const configured = (c) => c.JIRA_BASE_URL && c.JIRA_EMAIL && c.JIRA_TOKEN;

// Fetch a Jira issue via REST v2 (plain-text description) and flatten it for the AI.
async function getIssue(key, c) {
  if (!configured(c)) throw httpError(400, 'Jira is not configured. Open Settings.');
  if (!/^[A-Z][A-Z0-9_]*-\d+$/i.test(key)) throw httpError(400, 'Invalid Jira ID format (e.g. PROJ-123).');

  const res = await fetch(`${base(c)}/rest/api/2/issue/${encodeURIComponent(key.toUpperCase())}`, {
    headers: { Authorization: auth(c), Accept: 'application/json' },
  }).catch(() => { throw httpError(502, 'Cannot reach Jira. Check the Jira URL.'); });
  if (res.status === 404) throw httpError(404, `Jira ticket ${key} not found.`);
  if (res.status === 401 || res.status === 403) throw httpError(401, 'Jira authentication failed. Check Settings.');
  if (!res.ok) throw httpError(502, `Jira error (${res.status}).`);

  const { key: k, fields: f } = await res.json();
  const custom = Object.entries(f)
    .filter(([n, v]) => n.startsWith('customfield_') && typeof v === 'string' && v.trim().length > 3)
    .map(([, v]) => v);
  const text = [
    `Ticket: ${k}`,
    `Summary: ${f.summary}`,
    `Type: ${f.issuetype?.name} | Priority: ${f.priority?.name} | Status: ${f.status?.name}`,
    `Labels: ${(f.labels || []).join(', ') || 'none'} | Components: ${(f.components || []).map((x) => x.name).join(', ') || 'none'}`,
    `Description:\n${f.description || '(empty)'}`,
    custom.length ? `Other fields (may include acceptance criteria):\n${custom.join('\n')}` : '',
    f.attachment?.length ? `Attachments: ${f.attachment.map((a) => a.filename).join(', ')}` : '',
    f.comment?.comments?.length ? `Comments:\n${f.comment.comments.slice(-5).map((x) => '- ' + x.body).join('\n')}` : '',
  ].filter(Boolean).join('\n\n');
  return { key: k, title: f.summary, text };
}

async function testConnection(c) {
  if (!configured(c)) return false;
  const res = await fetch(`${base(c)}/rest/api/2/myself`, { headers: { Authorization: auth(c) } }).catch(() => null);
  return !!res?.ok;
}

module.exports = { getIssue, testConnection };
