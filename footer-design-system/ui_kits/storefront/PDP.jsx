function PDP({ j, onClose, onAdd }) {
  const [size, setSize] = React.useState(null);
  const [name, setName] = React.useState("");
  const [num, setNum] = React.useState("");
  const allSizes = ["S","M","L","XL","XXL","XXXL"];
  if (!j) return null;
  return (
    <div className="fk-pdp-back" onClick={onClose}>
      <div className="fk-pdp" onClick={e => e.stopPropagation()}>
        <button className="fk-pdp-close" onClick={onClose} aria-label="Close"><Icon name="close"/></button>
        <div className="fk-pdp-image">
          <Jersey color1={j.color1} color2={j.color2} number={num || "10"} name={name.toUpperCase()}/>
          <div className="fk-pdp-thumbs">
            <div className="fk-pdp-thumb active"><Jersey color1={j.color1} color2={j.color2} number={num || "10"}/></div>
            <div className="fk-pdp-thumb"><Jersey color1={j.color2} color2={j.color1} number={num || "10"}/></div>
            <div className="fk-pdp-thumb"><Jersey color1="#222" color2={j.color1} number={num || "10"}/></div>
          </div>
        </div>
        <div className="fk-pdp-body">
          <span className="fk-label">{j.league} · {j.year}</span>
          <h2 className="fk-pdp-title">{j.country}</h2>
          <div className="fk-pdp-sub">{j.kit} kit · official replica</div>
          <div className="fk-pdp-price">{j.price.toFixed(2).replace(".", "'")} $</div>

          <div className="fk-pdp-section">
            <div className="fk-pdp-section-head">
              <span className="fk-label">Size</span>
              <a className="fk-link">Size guide →</a>
            </div>
            <div className="fk-sizes-row">
              {allSizes.map(s => {
                const avail = j.sizes.includes(s);
                return (
                  <button key={s}
                    className={`fk-size ${size === s ? "selected" : ""} ${!avail ? "sold" : ""}`}
                    disabled={!avail}
                    onClick={() => setSize(s)}>{s}</button>
                );
              })}
            </div>
          </div>

          <div className="fk-pdp-section">
            <span className="fk-label">Customise <span className="fk-mute">(optional · +5 $)</span></span>
            <div className="fk-custom-row">
              <div className="fk-field">
                <span className="fk-field-l">Name</span>
                <input value={name} onChange={e => setName(e.target.value.slice(0, 12))} placeholder="MORATA" maxLength={12}/>
              </div>
              <div className="fk-field" style={{maxWidth: 88}}>
                <span className="fk-field-l">No.</span>
                <input value={num} onChange={e => setNum(e.target.value.replace(/[^0-9]/g, "").slice(0, 2))} placeholder="9"/>
              </div>
            </div>
          </div>

          <div className="fk-pdp-actions">
            <button className="fk-btn fk-btn-primary fk-btn-block"
                    disabled={!size}
                    onClick={() => { onAdd(j, size, name, num); onClose(); }}>
              {size ? <>Add to bag — {j.price.toFixed(2).replace(".", "'")} $</> : "Pick a size"}
              <Icon name="arrow" size={16}/>
            </button>
            <button className="fk-btn fk-btn-ghost" aria-label="Wishlist"><Icon name="heart" size={16}/></button>
          </div>

          <div className="fk-pdp-info">
            <div><Icon name="truck" size={18}/><div><b>Ships in 48h</b><span>Free over 60 $</span></div></div>
            <div><Icon name="shield" size={18}/><div><b>Authentic</b><span>Sourced direct</span></div></div>
            <div><Icon name="spark" size={18}/><div><b>Printed in-house</b><span>Custom in 3 days</span></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
window.PDP = PDP;
