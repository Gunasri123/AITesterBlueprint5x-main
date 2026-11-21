const { TYPES, loadTemplate, httpError } = require('../utils/templates');

const RULES = `You are a Senior QA Architect with 15 years of experience.
Rules:
- Output ONLY Markdown. No preamble, no code fences around the document.
- Follow the TEMPLATE exactly: keep every section, its numbering and heading names. Do not rename, merge or drop sections.
- Use ONLY facts from the SOURCE. Never invent requirements, names, dates, URLs, tools or numbers.
- Where the source lacks information, write "⚠️ MISSING: <what is needed and why>" in that field.
- End with a section "## Missing Information" listing every MISSING item as a bullet (or "None").
- Status must be DRAFT — Pending Review. Never mark the document approved.`;

const EXTRA = {
  plan: 'Keep exactly the 8 numbered sections plus the HUMAN REVIEW GATE. Include positive, negative and boundary scenarios mapped to ACs/gaps.',
  strategy: 'Cover approach, levels, types, automation, environments, test data, risk-based testing and defect management. Replace template example content with source-based content or MISSING markers.',
  cases: 'Write the document header and sections 1-10, then each concrete test case in the format of the template sample cases (TC_<MODULE>_NNN). Cover positive, negative, boundary, validation and edge cases, no duplicates, each traced to a requirement/AC. Omit the template "Writing Guidelines" and the Login sample cases.',
};

const ollamaUrl = (u) => (u || 'http://localhost:11434').replace(/\/$/, '');

async function chat(c, system, user) {
  return c.LLM_PROVIDER === 'ollama' ? chatOllama(c, system, user) : chatGroq(c, system, user);
}

async function chatOllama(c, system, user) {
  const { OLLAMA_URL, OLLAMA_MODEL } = c;
  if (!OLLAMA_MODEL) throw httpError(400, 'No Ollama model selected. Open Settings.');
  let res;
  try {
    res = await fetch(`${ollamaUrl(OLLAMA_URL)}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        stream: false,
        options: { temperature: 0.2, num_ctx: 16384 }, // templates are long
        messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
      }),
    });
  } catch { throw httpError(502, 'Cannot reach Ollama. Is it running?'); }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw httpError(502, `Ollama error: ${data.error || res.status}`);
  return clean(data.message.content);
}

const clean = (s) => s.replace(/<think>[\s\S]*?<\/think>/g, '').replace(/^```(?:markdown)?\s*\n/, '').replace(/\n```\s*$/, '').trim();

// Returns models available for the given (possibly unsaved) settings; throws if the connection fails.
async function listModels(s) {
  if (s.LLM_PROVIDER === 'ollama') {
    const res = await fetch(`${ollamaUrl(s.OLLAMA_URL)}/api/tags`).catch(() => null);
    if (!res?.ok) throw httpError(502, 'Cannot reach Ollama at ' + ollamaUrl(s.OLLAMA_URL));
    return (await res.json()).models.map((m) => m.name);
  }
  if (!s.GROQ_API_KEY) throw httpError(400, 'Enter a Groq API key.');
  const res = await fetch('https://api.groq.com/openai/v1/models', { headers: { Authorization: `Bearer ${s.GROQ_API_KEY}` } });
  if (!res.ok) throw httpError(401, 'Groq rejected the API key.');
  return (await res.json()).data.map((m) => m.id).filter((id) => !/whisper|guard|orpheus|tts/i.test(id)).sort();
}

async function chatGroq(c, system, user) {
  const { GROQ_API_KEY, GROQ_MODEL } = c;
  if (!GROQ_API_KEY) throw httpError(400, 'AI key key not configured. Open Settings.');
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${GROQ_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: GROQ_MODEL || 'openai/gpt-oss-120b',
      temperature: 0.2,
      max_tokens: 8000,
      ...(!GROQ_MODEL || GROQ_MODEL.includes('gpt-oss') ? { reasoning_effort: 'low' } : {}),
      messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw httpError(502, `AI error: ${data.error?.message || res.status}`);
  return clean(data.choices[0].message.content);
}

const generate = (c, type, source) =>
  chat(c, `${RULES}\n${EXTRA[type]}`, `Generate a ${TYPES[type].name}.\n\nTEMPLATE:\n${loadTemplate(type)}\n\nSOURCE:\n${source}`);

const applyInfo = (c, markdown, info) =>
  chat(c, `${RULES}\nYou are updating an existing document. Map the new information to the right sections, replace only the matching MISSING markers, keep all other content unchanged, and update the Missing Information list.`,
    `CURRENT DOCUMENT:\n${markdown}\n\nNEW INFORMATION FROM QA:\n${info}`);

module.exports = { generate, applyInfo, listModels };
