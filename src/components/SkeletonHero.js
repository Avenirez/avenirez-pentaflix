export default function SkeletonHero() {
  return (
    <section className="hero">
      <div className="hero__backdrop skeleton" />
      <div className="hero__content">
        <div
          className="skeleton"
          style={{ height: "24px", width: "120px", borderRadius: "20px", marginBottom: "20px" }}
        />
        <div
          className="skeleton"
          style={{ height: "64px", width: "70%", borderRadius: "8px", marginBottom: "16px" }}
        />
        <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
          <div className="skeleton" style={{ height: "20px", width: "60px", borderRadius: "4px" }} />
          <div className="skeleton" style={{ height: "20px", width: "40px", borderRadius: "4px" }} />
          <div className="skeleton" style={{ height: "20px", width: "60px", borderRadius: "4px" }} />
          <div className="skeleton" style={{ height: "20px", width: "100px", borderRadius: "4px" }} />
        </div>
        <div
          className="skeleton"
          style={{ height: "80px", width: "80%", borderRadius: "4px", marginBottom: "28px" }}
        />
        <div style={{ display: "flex", gap: "12px" }}>
          <div className="skeleton" style={{ height: "48px", width: "160px", borderRadius: "10px" }} />
          <div className="skeleton" style={{ height: "48px", width: "160px", borderRadius: "10px" }} />
        </div>
      </div>
    </section>
  );
}
