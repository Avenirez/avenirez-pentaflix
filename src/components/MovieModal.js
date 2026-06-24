"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useWatchlist } from "@/context/WatchlistContext";

export default function MovieModal({ movie, isOpen, onClose }) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!movie) return null;

  const isSaved = isInWatchlist(movie.id);

  const toggleWatchlist = () => {
    if (isSaved) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={`modal-overlay ${isOpen ? "active" : ""}`}
      onClick={handleOverlayClick}
      id="movie-modal"
    >
      <div className="modal">
        <div className="modal__video-container">
          {isOpen && movie.trailer && (
            <iframe
              src={`https://www.youtube.com/embed/${movie.trailer}?autoplay=1&rel=0&modestbranding=1`}
              title={`${movie.title} Trailer`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          )}
          {!movie.trailer && (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#111", color: "#666" }}>
              No trailer available
            </div>
          )}
          <button
            className="modal__close"
            onClick={onClose}
            aria-label="Close modal"
            id="modal-close-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="modal__body">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
            <h2 className="modal__title" style={{ marginBottom: 0 }}>{movie.title}</h2>
            <button
              className="btn btn--icon"
              onClick={toggleWatchlist}
              aria-label={isSaved ? "Remove from watchlist" : "Add to watchlist"}
              style={{ color: isSaved ? "var(--accent)" : "inherit", borderColor: isSaved ? "var(--accent)" : "var(--border-medium)", flexShrink: 0, width: "36px", height: "36px" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>

          <div className="modal__meta">
            <span className="modal__meta-item" style={{ color: "#fbbf24", fontWeight: 600 }}>
              ★ {movie.rating}
            </span>
            <span className="modal__meta-item">{movie.year}</span>
            <span className="modal__meta-item">{movie.duration}</span>
          </div>

          <div className="modal__genres">
            {movie.genre.map((g) => (
              <span key={g} className="modal__genre-tag">
                {g}
              </span>
            ))}
          </div>

          <p className="modal__synopsis">{movie.synopsis}</p>

          <div className="modal__detail-row">
            <span className="modal__detail-label">Director</span>
            <span className="modal__detail-value">{movie.director}</span>
          </div>
          <div className="modal__detail-row">
            <span className="modal__detail-label">Cast</span>
            <span className="modal__detail-value">
              {movie.cast.join(", ")}
            </span>
          </div>
          
          <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid var(--border-subtle)" }}>
            <Link href={`/movie/${movie.id}`} className="btn btn--ghost" style={{ width: "100%" }}>
              View Full Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
