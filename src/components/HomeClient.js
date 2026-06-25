"use client";

import { useState, useMemo, useEffect } from "react";
import Navbar from "./Navbar";
import HeroBanner from "./HeroBanner";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";
import Footer from "./Footer";
import SkeletonCard from "./SkeletonCard";
import {
  fetchTrending,
  fetchTopRated,
  fetchNowPlaying,
  fetchUpcoming,
  fetchMoviesByGenre,
} from "@/lib/tmdb";

// Maps each row's state key to the function that can fetch more pages of it.
const FETCHERS = {
  trending: fetchTrending,
  topRated: fetchTopRated,
  nowPlaying: fetchNowPlaying,
  upcoming: fetchUpcoming,
};

export default function HomeClient({ trending, topRated, nowPlaying, upcoming, genres }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  // Each home row starts with the page-1 data the server already fetched,
  // and grows as the user clicks "Load More" on that row.
  const [rows, setRows] = useState({
    trending: { movies: trending.movies, page: trending.page, totalPages: trending.totalPages, loading: false },
    topRated: { movies: topRated.movies, page: topRated.page, totalPages: topRated.totalPages, loading: false },
    nowPlaying: { movies: nowPlaying.movies, page: nowPlaying.page, totalPages: nowPlaying.totalPages, loading: false },
    upcoming: { movies: upcoming.movies, page: upcoming.page, totalPages: upcoming.totalPages, loading: false },
  });

  const [activeGenreId, setActiveGenreId] = useState(null); // null = "All Genres"
  const [genreMovies, setGenreMovies] = useState([]);
  const [genrePage, setGenrePage] = useState(1);
  const [genreTotalPages, setGenreTotalPages] = useState(1);
  const [genreLoading, setGenreLoading] = useState(false);

  // Combine every movie currently loaded across all rows so the search box
  // can match against more than just the first page of each row.
  const allMovies = useMemo(() => {
    const map = new Map();
    [
      ...rows.trending.movies,
      ...rows.topRated.movies,
      ...rows.nowPlaying.movies,
      ...rows.upcoming.movies,
    ].forEach((m) => map.set(m.id, m));
    return Array.from(map.values());
  }, [rows]);

  const loadMoreRow = async (key) => {
    const row = rows[key];
    if (row.loading || row.page >= row.totalPages) return;

    setRows((prev) => ({ ...prev, [key]: { ...prev[key], loading: true } }));

    const result = await FETCHERS[key](row.page + 1);

    setRows((prev) => ({
      ...prev,
      [key]: {
        movies: [...prev[key].movies, ...result.movies],
        page: result.page,
        totalPages: result.totalPages,
        loading: false,
      },
    }));
  };

  // Fetch page 1 of the selected genre directly from TMDB whenever it
  // changes, instead of only filtering the handful of movies we already
  // happen to have loaded for the home rows.
  useEffect(() => {
    if (activeGenreId === null) {
      const timer = setTimeout(() => {
        setGenreMovies([]);
      }, 0);
      return () => clearTimeout(timer);
    }

    let cancelled = false;
    const timer = setTimeout(() => {
      setGenreLoading(true);
      fetchMoviesByGenre(activeGenreId, 1).then((result) => {
        if (!cancelled) {
          setGenreMovies(result.movies);
          setGenrePage(result.page);
          setGenreTotalPages(result.totalPages);
          setGenreLoading(false);
        }
      });
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [activeGenreId]);

  const loadMoreGenre = async () => {
    if (genreLoading || genrePage >= genreTotalPages) return;
    setGenreLoading(true);
    const result = await fetchMoviesByGenre(activeGenreId, genrePage + 1);
    setGenreMovies((prev) => [...prev, ...result.movies]);
    setGenrePage(result.page);
    setGenreTotalPages(result.totalPages);
    setGenreLoading(false);
  };

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

  const renderMovieRow = (title, key, id) => {
    const row = rows[key];
    const hasMore = row.page < row.totalPages;

    return (
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
          {row.movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onPlay={openModal} onInfo={null} />
          ))}
        </div>
        {hasMore && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "16px", marginBottom: "8px" }}>
            <button
              className="btn btn--loadmore"
              onClick={() => loadMoreRow(key)}
              disabled={row.loading}
              style={{
                padding: "10px 32px",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "8px",
                background: "transparent",
                color: "inherit",
                cursor: row.loading ? "not-allowed" : "pointer",
                fontSize: "14px",
                opacity: row.loading ? 0.6 : 1,
                transition: "all 0.2s",
              }}
            >
              {row.loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </section>
    );
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />

      <main>
        {searchQuery ? (
          <div className="search-results">
            <h2 className="search-results__title">
              Results for &ldquo;{searchQuery}&rdquo;
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
                     onInfo={null}
                   />
                ))}
              </div>
            ) : (
              <div className="search-results__empty">
                <div className="search-results__empty-icon">🎬</div>
                <p className="search-results__empty-text">
                  We couldn&apos;t find any movies matching your search.
                  <br />
                  Try different keywords or browse our categories.
                </p>
              </div>
            )}
          </div>
        ) : (
          <>
            <HeroBanner
              movies={trending.movies.slice(0, 5)}
              onPlayTrailer={openModal}
              onMoreInfo={openModal}
            />

            {renderMovieRow("Trending Now", "trending", "trending")}
            {renderMovieRow("Top Rated", "topRated", "top-rated")}
            {renderMovieRow("Now Playing", "nowPlaying", "now-playing")}
            {renderMovieRow("Upcoming", "upcoming", "upcoming")}

            <section className="movie-section" id="genres">
              <div className="movie-section__header">
                <h2 className="movie-section__title">Browse by Genre</h2>
              </div>
              <div className="genre-bar">
                <button
                  className={`genre-chip ${activeGenreId === null ? "active" : ""}`}
                  onClick={() => setActiveGenreId(null)}
                >
                  All Genres
                </button>
                {genres.slice(0, 10).map((genre) => (
                  <button
                    key={genre.id}
                    className={`genre-chip ${activeGenreId === genre.id ? "active" : ""}`}
                    onClick={() => setActiveGenreId(genre.id)}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>

              {activeGenreId !== null && (
                <>
                  <div className="search-results__grid" style={{ padding: "0 48px", marginTop: "24px" }}>
                    {genreLoading && genreMovies.length === 0
                      ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
                      : genreMovies.length > 0
                      ? genreMovies.map((movie) => (
                          <MovieCard
                            key={movie.id}
                            movie={movie}
                            onPlay={openModal}
                            onInfo={null}
                          />
                        ))
                      : (
                        <p className="search-results__empty-text">
                          No movies found for this genre.
                        </p>
                      )}
                  </div>

                  {genrePage < genreTotalPages && (
                    <div style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}>
                      <button
                        className="btn btn--loadmore"
                        onClick={loadMoreGenre}
                        disabled={genreLoading}
                        style={{
                          padding: "10px 32px",
                          border: "1px solid rgba(255,255,255,0.3)",
                          borderRadius: "8px",
                          background: "transparent",
                          color: "inherit",
                          cursor: genreLoading ? "not-allowed" : "pointer",
                          fontSize: "14px",
                          opacity: genreLoading ? 0.6 : 1,
                          transition: "all 0.2s",
                        }}
                      >
                        {genreLoading ? "Loading..." : "Load More"}
                      </button>
                    </div>
                  )}
                </>
              )}
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
