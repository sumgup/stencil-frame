// BrandPill — top-center, cycles through brands every 5s.
// Clicking opens the brand example overlay.
export default function BrandPill({ brand, focused, onClick }) {
  return (
    <div
      className={`brand-pill fl ${focused ? "receded" : ""}`}
      onClick={onClick}
      style={{ zIndex: 10 }}
    >
      <div className="pill-inner">
        <div className="pill-dot" style={{ background: brand.colour }} />
        <span>See how {brand.name} answered all of this</span>
      </div>
    </div>
  );
}
