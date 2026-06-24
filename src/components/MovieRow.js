"use client";

import { useRef } from "react";
import MovieCard from "./MovieCard";

export default function MovieRow({ title, movies, onPlay, onInfo, id }) {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.clientWidth * 0.75;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section className="movie-section" id={id}>
      <div className="movie-section__header">
        <h2 className="movie-section__title">{title}</h2>
        <div className="movie-section__arrows">
          <button
            className="scroll-arrow"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className="scroll-arrow"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
      <div className="movie-slider" ref={sliderRef}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onPlay={onPlay}
            onInfo={onInfo}
          />
        ))}
      </div>
    </section>
  );
}
