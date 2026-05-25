function BagDrawer({ open, items, onClose, onRemove, onCheckout }) {
  const total = items.reduce((s, it) => s + it.j.price * it.qty + (it.name || it.num ? 5 * it.qty : 0), 0);
  return (
    <>
      <div className={`fk-drawer-back ${open ? "open" : ""}`} onClick={onClose}/>
      <aside className={`fk-drawer ${open ? "open" : ""}`}>
        <div className="fk-drawer-head">
          <span className="fk-label">Your bag</span>
          <button className="fk-icon-btn" onClick={onClose}><Icon name="close"/></button>
        </div>
        {items.length === 0 ? (
          <div className="fk-drawer-empty">
            <Icon name="bag" size={32}/>
            <p>Your bag is empty.</p>
            <span className="fk-mute">Add a jersey to get started.</span>
          </div>
        ) : (
          <>
            <div className="fk-drawer-items">
              {items.map((it, i) => (
                <div className="fk-drawer-item" key={i}>
                  <div className="fk-drawer-img">
                    <Jersey color1={it.j.color1} color2={it.j.color2} number={it.num || "10"} name={it.name?.toUpperCase()}/>
                  </div>
                  <div className="fk-drawer-info">
                    <span className="fk-card-kicker" style={{fontSize: 18}}>{it.j.country}</span>
                    <span className="fk-mute">{it.j.kit} · Size {it.size}{it.name ? ` · ${it.name.toUpperCase()}` : ""}{it.num ? ` #${it.num}` : ""}</span>
                    <div className="fk-drawer-row">
                      <div className="fk-qty">
                        <button>−</button><span>{it.qty}</span><button>+</button>
                      </div>
                      <span className="fk-price">{(it.j.price + (it.name || it.num ? 5 : 0)).toFixed(2).replace(".", "'")} $</span>
                    </div>
                  </div>
                  <button className="fk-drawer-rm" onClick={() => onRemove(i)} aria-label="Remove"><Icon name="close" size={16}/></button>
                </div>
              ))}
            </div>
            <div className="fk-drawer-foot">
              <div className="fk-drawer-totals">
                <div><span className="fk-mute">Subtotal</span><span>{total.toFixed(2).replace(".", "'")} $</span></div>
                <div><span className="fk-mute">Shipping</span><span>{total >= 60 ? "Free" : "5'00 $"}</span></div>
                <div className="fk-drawer-total"><b>Total</b><b>{(total + (total >= 60 ? 0 : 5)).toFixed(2).replace(".", "'")} $</b></div>
              </div>
              <button className="fk-btn fk-btn-primary fk-btn-block" onClick={onCheckout}>
                Checkout <Icon name="arrow" size={16}/>
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
window.BagDrawer = BagDrawer;
