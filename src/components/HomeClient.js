"use client";

import { useState, useMemo } from "react";
import Navbar from "./Navbar";
import HeroBanner from "./HeroBanner";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";
import Footer from "./Footer";

export default function HomeClient({ trending, topRated, nowPlaying, upcoming, genreLists, genres }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  // Combine all movies for local searching if needed, but we should probably use TMDB search API
  // For simplicity, we'll search locally within the fetched data first, 
  // or you could implement an API call for search here.
  const allMovies = useMemo(() => {
    const map = new Map();
    [...trending, ...topRated, ...nowPlaying, ...upcoming].forEach(m => {
      map.set(m.id, m);
    });
    return Array.from(map.values());
  }, [trending, topRated, nowPlaying, upcoming]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query) {
      setSearchResults(null);
      return;
    }
    
    // Fallback to local search for immediate feedback
    const lowerQuery = query.toLowerCase();
    const results = allMovies.filter(
      (m) =>
        m.title.toLowerCase().includes(lowerQuery) ||
        m.director.toLowerCase().includes(lowerQuery) ||
        m.cast.some((c) => c.toLowerCase().includes(lowerQuery)) ||
        m.genre.some((g) => g.toLowerCase().includes(lowerQuery))
    );
    setSearchResults(results);
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const scrollRow = (id, direction) => {
    const row = document.getElementById(id);
    if (row) {
      const scrollAmount = direction === "left" ? -row.offsetWidth : row.offsetWidth;
      row.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const renderMovieRow = (title, id, moviesData) => (
    <section className="movie-section" id={id}>
      <div className="movie-section__header">
        <h2 className="movie-section__title">{title}</h2>
        <div className="movie-section__arrows">
          <button
            className="movie-section__arrow"
            onClick={() => scrollRow(`row-${id}`, "left")}
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            className="movie-section__arrow"
            onClick={() => scrollRow(`row-${id}`, "right")}
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>
      <div className="movie-slider" id={`row-${id}`}>
        {moviesData.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onPlay={openModal}
            onInfo={openModal}
          />
        ))}
      </div>
    </section>
  );

  return (
    <>
      <Navbar onSearch={handleSearch} />

      <main>
        {searchQuery ? (
          <div className="search-results">
            <h2 className="search-results__title">
              Results for "{searchQuery}"
            </h2>
            <p className="search-results__subtitle">
              Found {searchResults?.length || 0} movies
            </p>
            {searchResults?.length > 0 ? (
              <div className="search-results__grid">
                {searchResults.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onPlay={openModal}
                    onInfo={openModal}
                  />
                ))}
              </div>
            ) : (
              <div className="search-results__empty">
                <div className="search-results__empty-icon">🎬</div>
                <p className="search-results__empty-text">
                  We couldn't find any movies matching your search.
                  <br />
                  Try different keywords or browse our categories.
                </p>
              </div>
            )}
          </div>
        ) : (
          <>
            <HeroBanner
              movies={trending.slice(0, 5)}
              onPlayTrailer={openModal}
              onMoreInfo={openModal}
            />

            {renderMovieRow("Trending Now", "trending", trending)}
            {renderMovieRow("Top Rated", "top-rated", topRated)}
            {renderMovieRow("Now Playing", "now-playing", nowPlaying)}
            {renderMovieRow("Upcoming", "upcoming", upcoming)}

            <section className="movie-section" id="genres">
              <div className="movie-section__header">
                <h2 className="movie-section__title">Browse by Genre</h2>
              </div>
              <div className="genre-bar">
                <button
                  className={`genre-btn ${activeGenre === "All" ? "active" : ""}`}
                  onClick={() => setActiveGenre("All")}
                >
                  All Genres
                </button>
                {genres.slice(0, 10).map((genre) => (
                  <button
                    key={genre.id}
                    className={`genre-btn ${activeGenre === genre.name ? "active" : ""}`}
                    onClick={() => setActiveGenre(genre.name)}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
              
              {/* If a specific genre is selected, filter the combined list. For better results, this should be an API call */}
              <div className="search-results__grid" style={{ padding: "0 48px", marginTop: "24px" }}>
                {activeGenre !== "All" 
                  ? allMovies.filter(m => m.genre.includes(activeGenre)).map(movie => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onPlay={openModal}
                      onInfo={openModal}
                    />
                  ))
                  : null}
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />

      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
