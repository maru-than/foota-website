function Hero({ data, onCta }) {
  return (
    <section className="fk-hero">
      <div className="fk-hero-grid">
        <div className="fk-hero-left">
          <div className="fk-hero-eyebrow">
            <span className="fk-hero-dot"/>{data.eyebrow}
          </div>
          <h1 className="fk-hero-display">{data.title}</h1>
          <p className="fk-hero-sub">{data.subtitle}</p>
          <div className="fk-hero-actions">
            <button className="fk-btn fk-btn-primary" onClick={onCta}>
              {data.cta} <Icon name="arrow" size={16}/>
            </button>
            <a className="fk-hero-link">View lookbook →</a>
          </div>
          <div className="fk-hero-stats">
            <div><b>120+</b><span>Clubs &amp; nations</span></div>
            <div><b>48h</b><span>Ship time</span></div>
            <div><b>24/25</b><span>Live season</span></div>
          </div>
        </div>
        <div className="fk-hero-right">
          <div className="fk-hero-jersey">
            <Jersey color1="#C8102E" color2="#FFC400" number="9" name="MORATA"/>
          </div>
          <div className="fk-hero-tag fk-hero-tag-1">
            <span className="fk-label">Featured</span>
            <span className="fk-hero-tag-title">Spain · Home</span>
            <span className="fk-hero-tag-price">29'99 $</span>
          </div>
          <div className="fk-hero-tag fk-hero-tag-2">
            <span className="fk-label">In stock</span>
            <span className="fk-hero-tag-title">All sizes S–XXXL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;
