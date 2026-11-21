import { useEffect, useState } from 'react';
import NavBar from './components/NavBar.jsx';
import Home from './components/Home.jsx';
import Generator from './components/Generator.jsx';
import Settings from './components/Settings.jsx';

export const TYPES = {
  plan: { name: 'Test Plan', desc: 'Scope, scenarios, risks, resources and timelines for a release.', icon: '📄' },
  strategy: { name: 'Test Strategy', desc: 'Testing levels, types, tools and risk approach for the project.', icon: '🎯' },
  cases: { name: 'Test Case', desc: 'Step-by-step cases with preconditions and expected results.', icon: '✅' },
};

const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };

export default function App() {
  const [page, setPage] = useState(() => load('qf_page', 'home'));
  const [docs, setDocs] = useState(() => load('qf_docs', {})); // { plan: {markdown, source, status, version}, ... }

  useEffect(() => { try { localStorage.setItem('qf_page', JSON.stringify(page)); } catch {} }, [page]);
  useEffect(() => { try { localStorage.setItem('qf_docs', JSON.stringify(docs)); } catch {} }, [docs]);
  useEffect(() => {
    document.title = `QA Practice – ${page === 'home' ? 'Home' : page === 'settings' ? 'Settings' : TYPES[page].name + ' Generator'}`;
  }, [page]);

  const setDoc = (type, doc) => setDocs((d) => ({ ...d, [type]: doc }));
  const [prev, setPrev] = useState(() => load('qf_prev', 'home'));
  const go = (p) => {
    if (p === 'settings' && page !== 'settings') { setPrev(page); try { localStorage.setItem('qf_prev', JSON.stringify(page)); } catch {} }
    setPage(p);
  };
  const backLabel = prev === 'home' ? 'Home' : `${TYPES[prev]?.name} Generator`;

  return (
    <>
      <NavBar page={page} go={go} />
      <main>
        {page === 'home' && <Home go={go} docs={docs} />}
        {page === 'settings' && <Settings back={() => go(TYPES[prev] ? prev : 'home')} backLabel={backLabel} />}
        {TYPES[page] && <Generator key={page} type={page} go={go} doc={docs[page]} setDoc={(d) => setDoc(page, d)} docs={docs} />}
      </main>
    </>
  );
}
