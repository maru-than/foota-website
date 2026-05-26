/** Shared shipping & returns body. Used by route page and in-product modal. */

export function ShippingReturnsContent() {
  return (
    <div className="space-y-8 text-pretty leading-relaxed text-fg-2 [&_h3]:text-fg-1">
      <section className="space-y-3">
        <h3 className="text-lg font-bold tracking-[-0.02em]">Shipping</h3>
        <p>
          Worldwide shipping with tracking on every order. Costs and delivery
          estimates are calculated at checkout by destination. Most orders are
          dispatched within 48 hours.
        </p>
      </section>
      <section className="space-y-3">
        <h3 className="text-lg font-bold tracking-[-0.02em]">Returns</h3>
        <p>
          Returns within 30 days of delivery on unworn shirts with original
          tags. Retro and rare shirts are eligible unless noted on the product
          page.
        </p>
        <p>
          To start a return, contact us with your order number and we&apos;ll
          guide you through it.
        </p>
      </section>
      <section className="space-y-3">
        <h3 className="text-lg font-bold tracking-[-0.02em]">Customised items</h3>
        <p>
          Shirts with a custom name or number on the back are heat-pressed to
          order and dispatched in 5–7 days. Because every custom is unique to
          the buyer, customs are{" "}
          <b className="text-fg-1">non-returnable and non-exchangeable</b>{" "}
          — please double-check spelling and number before adding to the bag.
        </p>
        <p>
          If a custom shirt arrives damaged or with a print error on our side,
          we&apos;ll replace it. Contact us within 7 days of delivery with a
          photo and the order number.
        </p>
      </section>
      <section className="space-y-3">
        <h3 className="text-lg font-bold tracking-[-0.02em]">Order tracking</h3>
        <p>
          Once your order ships, you&apos;ll get a confirmation email with
          tracking from our Shopify-powered checkout.
        </p>
      </section>
    </div>
  );
}
