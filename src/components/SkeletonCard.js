export default function SkeletonCard() {
  return (
    <div className="movie-card skeleton-container">
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
