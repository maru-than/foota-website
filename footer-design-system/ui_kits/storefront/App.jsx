function App() {
  const data = window.FOOTA_DATA;
  const [active, setActive] = React.useState("All");
  const [sort, setSort] = React.useState("Newest");
  const [navActive, setNavActive] = React.useState("Shop");
  const [pdpJersey, setPdpJersey] = React.useState(null);
  const [bagOpen, setBagOpen] = React.useState(false);
  const [bag, setBag] = React.useState([]);

  const filtered = React.useMemo(() => {
    let list = data.jerseys;
    if (active !== "All") list = list.filter(j => j.league === active);
    if (sort === "Price: low → high") list = [...list].sort((a,b) => a.price - b.price);
    if (sort === "Price: high → low") list = [...list].sort((a,b) => b.price - a.price);
    if (sort === "Newest") list = [...list].sort((a,b) => (b.isNew?1:0) - (a.isNew?1:0));
    return list;
  }, [active, sort]);

  const handleAdd = (j, size, name, num) => {
    setBag(b => [...b, { j, size, name, num, qty: 1 }]);
    setBagOpen(true);
  };
  const handleRemove = (i) => setBag(b => b.filter((_, idx) => idx !== i));

  return (
    <div>
      <Header
        bagCount={bag.length}
        onOpenBag={() => setBagOpen(true)}
        onNav={setNavActive}
        active={navActive}
        onSearch={() => {}}
      />
      <main>
        <Hero data={data.hero} onCta={() => document.querySelector('.fk-grid')?.scrollIntoView()}/>
        <Filters active={active} setActive={setActive} sort={sort} setSort={setSort} count={filtered.length}/>
        <ProductGrid jerseys={filtered} onOpen={setPdpJersey}/>
      </main>
      <Footer/>
      <PDP j={pdpJersey} onClose={() => setPdpJersey(null)} onAdd={handleAdd}/>
      <BagDrawer
        open={bagOpen}
        items={bag}
        onClose={() => setBagOpen(false)}
        onRemove={handleRemove}
        onCheckout={() => { alert("This is a UI kit demo — no real checkout."); }}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
