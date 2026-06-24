"use client";

export default function MovieCard({ movie, onPlay, onInfo }) {
  return (
    <div className="movie-card" onClick={() => onInfo(movie)}>
      <div className="movie-card__poster-wrap">
        <img
          className="movie-card__poster"
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
        />
        <div className="movie-card__overlay">
          <button
            className="movie-card__play"
            onClick={(e) => {
              e.stopPropagation();
              onPlay(movie);
            }}
            aria-label={`Play trailer for ${movie.title}`}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </button>
        </div>
      </div>
      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.title}</h3>
        <div className="movie-card__meta">
          <span className="movie-card__rating">★ {movie.rating}</span>
          <span>{movie.year}</span>
        </div>
      </div>
    </div>
  );
}
