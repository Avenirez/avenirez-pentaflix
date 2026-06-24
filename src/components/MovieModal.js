"use client";

import { useEffect } from "react";

export default function MovieModal({ movie, isOpen, onClose }) {
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
          <button
            className="modal__close"
            onClick={onClose}
            aria-label="Close modal"
            id="modal-close-btn"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="modal__body">
          <h2 className="modal__title">{movie.title}</h2>

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
        </div>
      </div>
    </div>
  );
}
