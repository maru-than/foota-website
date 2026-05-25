function Filters({ active, setActive, sort, setSort, count }) {
  const { leagues, sortOptions } = window.FOOTA_DATA;
  return (
    <div className="fk-filters">
      <div className="fk-filters-left">
        <span className="fk-label">Browse</span>
        <div className="fk-pills">
          {leagues.map(l => (
            <button key={l} className={`fk-pill ${active === l ? "active" : ""}`} onClick={() => setActive(l)}>
              {active === l && <span className="fk-pill-dot"/>}
              {l}
            </button>
          ))}
        </div>
      </div>
      <div className="fk-filters-right">
        <span className="fk-filters-count"><b>{count}</b> jerseys</span>
        <div className="fk-select">
          <Icon name="filter" size={16}/>
          <select value={sort} onChange={e => setSort(e.target.value)}>
            {sortOptions.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
window.Filters = Filters;

function ProductGrid({ jerseys, onOpen }) {
  return (
    <div className="fk-grid">
      {jerseys.map(j => <ProductCard key={j.id} j={j} onClick={onOpen}/>)}
    </div>
  );
}
window.ProductGrid = ProductGrid;
