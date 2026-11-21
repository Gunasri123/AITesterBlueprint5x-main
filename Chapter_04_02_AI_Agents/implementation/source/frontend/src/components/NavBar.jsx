export default function NavBar({ page, go }) {
  const tab = (id, label) => (
    <button className={`nav-link ${page === id || (id === 'home' && page !== 'settings') ? 'active' : ''}`} onClick={() => go(id)}>{label}</button>
  );
  return (
    <header className="nav">
      <div className="brand" onClick={() => go('home')}><span className="logo">✓</span> QA Practice</div>
      <nav>{tab('home', 'Home')}{tab('settings', '⚙ Settings')}</nav>
    </header>
  );
}
