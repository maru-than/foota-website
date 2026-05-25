// Product card — recreated from Figma frame 1:10
// 300×500 dark frame · image upper · meta lower with kicker + price + sizes
function ProductCard({ j, onClick }) {
  const visible = j.sizes.slice(0, 4);
  const extra = j.sizes.length - visible.length;
  return (
    <article className="fk-card" onClick={() => onClick(j)}>
      <div className="fk-card-img">
        {j.badge && (
          <span className={`fk-badge ${j.badge.startsWith("−") ? "fk-badge-sale" : j.isNew ? "fk-badge-new" : "fk-badge-limited"}`}>
            {j.badge}
          </span>
        )}
        <button className="fk-card-wish" aria-label="Wishlist" onClick={e => { e.stopPropagation(); e.currentTarget.classList.toggle("on"); }}>
          <Icon name="heart" size={18}/>
        </button>
        <Jersey color1={j.color1} color2={j.color2} number={j.id === "esp-h" ? "9" : j.id === "fra-h" ? "10" : j.id === "ger-a" ? "7" : "10"}/>
        <span className="fk-card-kit">{j.kit}</span>
      </div>
      <div className="fk-card-body">
        <div className="fk-card-meta">
          <span className="fk-card-kicker">{j.country}</span>
          <span className="fk-card-price">{j.price.toFixed(2).replace(".", "'")} $</span>
        </div>
        <div className="fk-card-sizes">
          {visible.map(s => <span key={s} className="fk-size">{s}</span>)}
          {extra > 0 && <span className="fk-size fk-size-more">+{extra}</span>}
        </div>
      </div>
    </article>
  );
}
window.ProductCard = ProductCard;
