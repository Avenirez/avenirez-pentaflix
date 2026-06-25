"use client";

import Link from "next/link";
import { useWatchlist } from "@/context/WatchlistContext";

export default function MovieCard({ movie, onPlay, onInfo }) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const isSaved = isInWatchlist(movie.id);

  const toggleWatchlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <Link href={`/movie/${movie.id}`} className="movie-card">
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
              e.preventDefault();
              e.stopPropagation();
              if(onPlay) onPlay(movie);
            }}
            aria-label={`Play trailer for ${movie.title}`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </button>
        </div>
        <button
          className={`movie-card__bookmark ${isSaved ? "saved" : ""}`}
          onClick={toggleWatchlist}
          aria-label={isSaved ? "Remove from watchlist" : "Add to watchlist"}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      </div>
      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.title}</h3>
        <div className="movie-card__meta">
          <span className="movie-card__rating">★ {movie.rating}</span>
          <span className="movie-card__meta-dot" />
          <span>{movie.year}</span>
        </div>
      </div>
    </Link>
  );
}
