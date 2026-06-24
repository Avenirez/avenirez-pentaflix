"use client";

import { useState, useEffect } from "react";

export default function HeroBanner({ movies, onPlayTrailer, onMoreInfo }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const featured = movies;

  useEffect(() => {
    if (featured.length <= 1) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % featured.length);
        setIsTransitioning(false);
      }, 500);
    }, 8000);
    return () => clearInterval(interval);
  }, [featured.length]);

  if (!featured.length) return null;

  const movie = featured[currentIndex];

  return (
    <section className="hero" id="hero">
      <div
        className="hero__backdrop"
        style={{
          backgroundImage: `url(${movie.backdrop})`,
          opacity: isTransitioning ? 0 : 1,
        }}
      />

      <div className="hero__content">
        <div className="hero__badge">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Featured Film
        </div>

        <h1 className="hero__title">{movie.title}</h1>

        <div className="hero__meta">
          <span className="hero__meta-item hero__meta-rating">
            ★ {movie.rating}
          </span>
          <span className="hero__meta-dot" />
          <span className="hero__meta-item">{movie.year}</span>
          <span className="hero__meta-dot" />
          <span className="hero__meta-item">{movie.duration}</span>
          <span className="hero__meta-dot" />
          <span className="hero__meta-item">{movie.genre.join(", ")}</span>
        </div>

        <p className="hero__synopsis">{movie.synopsis}</p>

        <div className="hero__actions">
          <button
            className="btn btn--primary"
            onClick={() => onPlayTrailer(movie)}
            id="hero-play-btn"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Play Trailer
          </button>
          <button
            className="btn btn--ghost"
            onClick={() => onMoreInfo(movie)}
            id="hero-info-btn"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            More Info
          </button>
        </div>

        {featured.length > 1 && (
          <div
            style={{
              display: "flex",
              gap: "6px",
              marginTop: "24px",
            }}
          >
            {featured.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentIndex(idx);
                    setIsTransitioning(false);
                  }, 300);
                }}
                style={{
                  width: idx === currentIndex ? "28px" : "8px",
                  height: "4px",
                  borderRadius: "2px",
                  background:
                    idx === currentIndex
                      ? "var(--accent)"
                      : "rgba(255,255,255,0.25)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  border: "none",
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
