import { TYPES } from '../App.jsx';

export default function Home({ go, docs }) {
  return (
    <section className="page">
      <p className="eyebrow">GET STARTED</p>
      <h1>Select your choice</h1>
      <p className="sub">Pick the QA document you want to generate. Add a Jira ID or attach a requirement (.docx), and the generator does the rest.</p>
      <div className="cards">
        {Object.entries(TYPES).map(([id, t]) => (
          <button key={id} className="card" onClick={() => go(id)}>
            <span className={`icon icon-${id}`}>{t.icon}</span>
            <h3>{t.name}</h3>
            <p>{t.desc}</p>
            <span className="link">{docs[id] ? `Open (${docs[id].status}) →` : 'Open generator →'}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
