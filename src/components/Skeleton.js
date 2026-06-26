export default function Skeleton({ type = "card", count = 5, ...props }) {
  if (type === "hero") {
    return (
      <section className="hero" {...props}>
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

  if (type === "row") {
    return (
      <section className="movie-section" {...props}>
        <div className="movie-section__header">
          <div
            className="skeleton"
            style={{ height: "24px", width: "200px", borderRadius: "4px" }}
          />
          <div className="movie-section__arrows">
            <div
              className="skeleton"
              style={{ width: "36px", height: "36px", borderRadius: "50%" }}
            />
            <div
              className="skeleton"
              style={{ width: "36px", height: "36px", borderRadius: "50%" }}
            />
          </div>
        </div>
        <div className="movie-slider">
          {Array.from({ length: count }).map((_, i) => (
            <Skeleton key={i} type="card" />
          ))}
        </div>
      </section>
    );
  }

  // Default: card
  return (
    <div className="movie-card skeleton-container" {...props}>
      <div className="movie-card__poster-wrap skeleton" />
      <div className="movie-card__info">
        <div
          className="skeleton"
          style={{ height: "14px", width: "80%", marginBottom: "8px", borderRadius: "4px" }}
        />
        <div
          className="skeleton"
          style={{ height: "12px", width: "50%", borderRadius: "4px" }}
        />
      </div>
    </div>
  );
}
