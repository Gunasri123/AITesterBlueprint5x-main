import { useRef, useState } from 'react';
import { marked } from 'marked';
import { TYPES } from '../App.jsx';
import { api } from '../api.js';

const highlight = (html) => html.replace(/(⚠️\s*MISSING:[^<]*)/g, '<mark class="missing">$1</mark>');

export default function Generator({ type, go, doc, setDoc, docs }) {
  const t = TYPES[type];
  const [jiraId, setJiraId] = useState(doc?.jiraId || '');
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [info, setInfo] = useState('');
  const fileRef = useRef();

  const run = async (label, fn) => {
    setBusy(label); setError('');
    try { await fn(); } catch (e) { setError(e.message); } finally { setBusy(''); }
  };

  const generate = () => run('Generating…', async () => {
    if (doc && !confirm('Replace the current document with a newly generated one?')) return;
    const fd = new FormData();
    fd.append('type', type);
    fd.append('jiraId', jiraId);
    if (file) fd.append('file', file);
    const r = await api('/api/generate', { method: 'POST', body: fd });
    setDoc({ markdown: r.markdown, source: r.source, jiraId, status: 'Draft', version: '1.0' });
    setEditing(false);
  });

  const bump = (v) => (parseFloat(v) + 0.1).toFixed(1);
  const save = () => { setDoc({ ...doc, markdown: draft, status: 'Draft', version: bump(doc.version) }); setEditing(false); };

  const applyInfo = () => run('Updating document…', async () => {
    const r = await api('/api/update', { method: 'POST', body: JSON.stringify({ markdown: doc.markdown, info }) });
    if (!confirm('AI updated the document with your information. Apply the changes?')) return;
    setDoc({ ...doc, markdown: r.markdown, status: 'Draft', version: bump(doc.version) });
    setInfo('');
  });

  const downloadDocx = () => run('Preparing DOCX…', async () => {
    const blob = await api('/api/download', { method: 'POST', body: JSON.stringify({ type, ...doc }) }, true);
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: `${t.name.replace(/ /g, '_')}.docx` });
    a.click();
  });

  const downloadPdf = () => {
    const w = window.open('', '_blank');
    w.document.write(`<html><head><title>${t.name}</title><style>
      body{font-family:Calibri,Arial,sans-serif;font-size:11pt;margin:0;color:#111}
      @page{margin:18mm} table{border-collapse:collapse;width:100%;margin:8px 0;page-break-inside:auto}
      tr{page-break-inside:avoid} th,td{border:1px solid #bbb;padding:4px 6px;text-align:left;vertical-align:top}
      th{background:#e8eaf6} h1,h2,h3{page-break-after:avoid} mark{background:#fef3c7}
      .meta{color:#555;border-bottom:1px solid #ccc;padding-bottom:6px;margin-bottom:12px}</style></head><body>
      <h1>${t.name}</h1><div class="meta">Source: ${doc.source} · Version ${doc.version} · Status: ${doc.status}</div>
      ${highlight(marked.parse(doc.markdown))}</body></html>`);
    w.document.close();
    setTimeout(() => w.print(), 400); // user picks "Save as PDF"
  };

  const clear = () => { if (confirm('Clear this document and start over?')) { setDoc(undefined); setJiraId(''); setFile(null); setEditing(false); } };
  const hasMissing = doc?.markdown.includes('MISSING');

  return (
    <section className="page gen">
      <div className="gen-head">
        <div>
          <button className="back" onClick={() => go('home')}>← Back to choices</button>
          <h1>Intelligent {t.name} Generator</h1>
          <p className="sub">{doc ? `Your ${t.name.toLowerCase()} is ready. Review, edit, approve and download it.` : 'Enter a Jira ID or attach a requirements file, then generate.'}</p>
        </div>
        <div className="switcher">
          {Object.entries(TYPES).map(([id, x]) => (
            <button key={id} className={id === type ? 'on' : ''} onClick={() => go(id)}>{x.name}{docs[id] && <i className="dot" />}</button>
          ))}
        </div>
      </div>

      <div className="panel">
        {doc && (
          <div className="toolbar">
            <span className={`status s-${doc.status.replace(' ', '')}`}>{doc.status}</span>
            <span className="src">{doc.source} · v{doc.version}</span>
            <div className="actions">
              {editing ? (
                <><button onClick={save}>Save</button><button onClick={() => setEditing(false)}>Cancel</button></>
              ) : (
                <button onClick={() => { setDraft(doc.markdown); setEditing(true); }}>✎ Edit</button>
              )}
              {doc.status === 'Draft' && !editing && <button onClick={() => setDoc({ ...doc, status: 'Pending Review' })}>Submit for review</button>}
              {doc.status === 'Pending Review' && <button className="primary" onClick={() => setDoc({ ...doc, status: 'Approved' })}>✓ Approve</button>}
              <button onClick={() => navigator.clipboard.writeText(doc.markdown)}>Copy</button>
              <button onClick={downloadDocx} disabled={editing}>⬇ DOCX</button>
              <button onClick={downloadPdf} disabled={editing}>⬇ PDF</button>
              <button className="danger" onClick={clear}>Clear</button>
            </div>
          </div>
        )}
        <div className="preview">
          {busy && <div className="busy">{busy}</div>}
          {!doc && !busy && (
            <div className="empty"><div className="big">📄</div><b>Your {t.name.toLowerCase()} will appear here</b><p>Enter a Jira ID or attach a file below, then press Generate.</p></div>
          )}
          {doc && editing && <textarea className="editor" value={draft} onChange={(e) => setDraft(e.target.value)} />}
          {doc && !editing && <article className="md" dangerouslySetInnerHTML={{ __html: highlight(marked.parse(doc.markdown)) }} />}
        </div>
        {doc && hasMissing && !editing && (
          <div className="missing-box">
            <b>⚠️ Some information is missing.</b> Provide it here and the AI will update only the relevant sections.
            <div className="row">
              <textarea rows={2} placeholder="e.g. Test environment is QA (https://qa.example.com), Chrome 120, 2 QA engineers, Sprint 14 (01–14 Dec)" value={info} onChange={(e) => setInfo(e.target.value)} />
              <button className="primary" disabled={!info.trim() || !!busy} onClick={applyInfo}>Update document</button>
            </div>
          </div>
        )}
      </div>

      {error && <div className="error">{error}</div>}

      <div className="inputbar">
        <input placeholder="Enter Jira ID, e.g. PROJ-123" value={jiraId} onChange={(e) => setJiraId(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && generate()} />
        <input ref={fileRef} type="file" accept=".docx" hidden onChange={(e) => setFile(e.target.files[0] || null)} />
        <button onClick={() => fileRef.current.click()}>📎 {file ? file.name : 'Attach .docx'}</button>
        {file && <button onClick={() => { setFile(null); fileRef.current.value = ''; }}>✕</button>}
        <button className="primary" disabled={!!busy || (!jiraId.trim() && !file)} onClick={generate}>✦ {doc ? 'Regenerate' : 'Generate'}</button>
      </div>
    </section>
  );
}
