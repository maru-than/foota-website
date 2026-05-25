function Footer() {
  return (
    <footer className="fk-footer">
      <div className="fk-footer-top">
        <div className="fk-footer-brand">
          <span className="fk-footer-logo">Foota</span>
          <p className="fk-footer-tag">The home of soccer jerseys.</p>
          <div className="fk-footer-news">
            <span className="fk-label">Get the drop</span>
            <div className="fk-newsletter">
              <input placeholder="you@inbox.com"/>
              <button><Icon name="arrow" size={16}/></button>
            </div>
          </div>
        </div>
        <div className="fk-footer-cols">
          <div>
            <span className="fk-label">Shop</span>
            <a>National</a><a>Clubs</a><a>Retro</a><a>Custom</a><a>Sale</a>
          </div>
          <div>
            <span className="fk-label">Help</span>
            <a>Size guide</a><a>Shipping</a><a>Returns</a><a>Contact</a><a>FAQ</a>
          </div>
          <div>
            <span className="fk-label">Foota</span>
            <a>Story</a><a>Athletes</a><a>Stockists</a><a>Press</a><a>Careers</a>
          </div>
        </div>
      </div>
      <div className="fk-footer-bottom">
        <span>© 2025 Foota Jerseys</span>
        <span className="fk-mute">Imported from Madrid · Dispatched worldwide</span>
        <div className="fk-footer-lang"><Icon name="globe" size={14}/> EN · USD</div>
      </div>
    </footer>
  );
}
window.Footer = Footer;
