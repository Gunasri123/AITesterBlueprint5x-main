import { useState } from 'react';
import { api, loadSettings, saveSettings } from '../api.js';

const PROVIDERS = [
  ['ollama', 'Ollama', 'Runs models locally. No API key needed.'],
  ['groq', 'Groq', 'Cloud API. Needs a Groq API key.'],
];

function Field({ label, hint, children }) {
  return <label className="field">{label}{children}{hint && <small>{hint}</small>}</label>;
}

export default function Settings({ back, backLabel }) {
  const [f, setF] = useState(loadSettings);
  const [models, setModels] = useState([]);
  const [msg, setMsg] = useState({}); // { jira: {err,text}, llm: {err,text} }
  const [busy, setBusy] = useState('');

  const provider = f.LLM_PROVIDER === 'ollama' ? 'ollama' : 'groq';
  const modelKey = provider === 'ollama' ? 'OLLAMA_MODEL' : 'GROQ_MODEL';
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const note = (card, err, text) => setMsg((m) => ({ ...m, [card]: { err, text } }));

  const call = (card, label, fn) => async () => {
    setBusy(label); note(card, false, '');
    try { await fn(); } catch (e) { note(card, true, e.message); } finally { setBusy(''); }
  };

  const testJira = call('jira', 'jira-test', async () => {
    await api('/api/settings/test-jira', { method: 'POST' }, false, f);
    note('jira', false, 'Connected to Jira ✓');
  });

  const testLlm = call('llm', 'llm-test', async () => {
    const r = await api('/api/settings/test-llm', { method: 'POST' }, false, { ...f, LLM_PROVIDER: provider });
    setModels(r.models);
    note('llm', !r.models.length, r.models.length ? `Connected ✓ ${r.models.length} models available.` : 'Connected, but no models found.');
  });

  const save = (card) => call(card, card + '-save', async () => {
    if (card === 'jira') {
      if (f.JIRA_BASE_URL && !/^https:\/\//.test(f.JIRA_BASE_URL)) throw new Error('Jira URL must start with https://');
      if (f.JIRA_EMAIL && !/^\S+@\S+\.\S+$/.test(f.JIRA_EMAIL)) throw new Error('Enter a valid email.');
    }
    if (card === 'llm' && !f[modelKey]) throw new Error('Test the connection and select a model first.');
    saveSettings({ ...loadSettings(), ...f, LLM_PROVIDER: provider });
    note(card, false, 'Saved in this browser ✓');
  });

  const modelOptions = [...new Set([f[modelKey], ...models].filter(Boolean))];
  const Msg = ({ m }) => (m?.text ? <div className={m.err ? 'error' : 'ok'}>{m.text}</div> : null);

  return (
    <section className="page narrow">
      <button className="back" onClick={back}>← Back to {backLabel}</button>
      <h1>Settings</h1>
      <p className="sub">Connect Jira and choose the model that powers the generators. Your credentials are saved only in this browser and sent securely with each request — they are never stored on the server.</p>

      <div className="box">
        <h2>Jira credentials</h2>
        <p className="muted">Used to fetch issue details when you enter a Jira ID.</p>
        <div className="grid2">
          <Field label="Jira URL"><input placeholder="https://your-company.atlassian.net" value={f.JIRA_BASE_URL || ''} onChange={set('JIRA_BASE_URL')} /></Field>
          <Field label="Email"><input placeholder="you@company.com" value={f.JIRA_EMAIL || ''} onChange={set('JIRA_EMAIL')} /></Field>
        </div>
        <Field label="API token" hint="Create one in your Atlassian account under Security › API tokens.">
          <input type="password" placeholder="Paste your Jira API token" value={f.JIRA_TOKEN || ''} onChange={set('JIRA_TOKEN')} />
        </Field>
        <Msg m={msg.jira} />
        <div className="box-actions">
          <button onClick={testJira} disabled={!!busy}>🔌 {busy === 'jira-test' ? 'Testing…' : 'Test connection'}</button>
          <button className="primary" onClick={save('jira')} disabled={!!busy}>Save</button>
        </div>
      </div>

      <div className="box">
        <h2>LLM configuration</h2>
        <p className="muted">Choose which model provider generates your test plans, strategies and cases.</p>
        <div className="field">Provider</div>
        <div className="grid2">
          {PROVIDERS.map(([id, name, desc]) => (
            <label key={id} className={`radio-card ${provider === id ? 'on' : ''}`}>
              <input type="radio" name="provider" checked={provider === id} onChange={() => { setF({ ...f, LLM_PROVIDER: id }); setModels([]); note('llm', false, ''); }} />
              <span><b>{name}</b><small>{desc}</small></span>
            </label>
          ))}
        </div>
        <div className="grid2">
          {provider === 'groq' ? (
            <Field label="Groq API key" hint="Get a key from the Groq console.">
              <input type="password" placeholder="Paste your Groq API key" value={f.GROQ_API_KEY || ''} onChange={set('GROQ_API_KEY')} />
            </Field>
          ) : (
            <Field label="Ollama URL" hint="On the hosted app, use a public URL to your Ollama (e.g. via ngrok); localhost works only when running locally.">
              <input placeholder="http://localhost:11434" value={f.OLLAMA_URL || ''} onChange={set('OLLAMA_URL')} />
            </Field>
          )}
          <Field label="Model" hint="Models load after a successful connection test.">
            <select value={f[modelKey] || ''} onChange={set(modelKey)}>
              <option value="">Select a model</option>
              {modelOptions.map((m) => <option key={m}>{m}</option>)}
            </select>
          </Field>
        </div>
        <Msg m={msg.llm} />
        <div className="box-actions">
          <button onClick={testLlm} disabled={!!busy}>🔌 {busy === 'llm-test' ? 'Testing…' : 'Test connection'}</button>
          <button className="primary" onClick={save('llm')} disabled={!!busy}>Save</button>
        </div>
      </div>
    </section>
  );
}
