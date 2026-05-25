// Top ticker + main nav header.
function Ticker() {
  const items = ["New drop · Real Madrid 24/25", "Free shipping over 60 €", "Imported · Dispatched in 48h", "Custom names available"];
  return (
    <div className="fk-ticker">
      <div className="fk-ticker-track">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="fk-ticker-item">{t}<span className="fk-ticker-dot"/></span>
        ))}
      </div>
    </div>
  );
}

function Header({ bagCount, onOpenBag, onNav, active, onSearch }) {
  const links = ["Shop", "National", "Clubs", "Retro", "Custom"];
  return (
    <header className="fk-header">
      <Ticker/>
      <div className="fk-nav">
        <a className="fk-logo" onClick={() => onNav("home")}>Foota</a>
        <nav className="fk-links">
          {links.map(l => (
            <a key={l} className={active === l ? "active" : ""} onClick={() => onNav(l)}>{l}</a>
          ))}
        </nav>
        <div className="fk-nav-right">
          <button className="fk-icon-btn" onClick={onSearch} aria-label="Search"><Icon name="search"/></button>
          <button className="fk-icon-btn" aria-label="Account"><Icon name="user"/></button>
          <button className="fk-bag" onClick={onOpenBag}>
            <Icon name="bag" size={16}/>
            <span>Bag</span>
            <b>{bagCount}</b>
          </button>
        </div>
      </div>
    </header>
  );
}
window.Header = Header;
