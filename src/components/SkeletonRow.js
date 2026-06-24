import SkeletonCard from "./SkeletonCard";

export default function SkeletonRow({ count = 5 }) {
  return (
    <section className="movie-section">
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
          <SkeletonCard key={i} />
        ))}
      </div>
    </section>
  );
}
