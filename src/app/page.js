"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import MovieRow from "@/components/MovieRow";
import MovieCard from "@/components/MovieCard";
import MovieModal from "@/components/MovieModal";
import Footer from "@/components/Footer";
import {
  getFeaturedMovies,
  movieCategories,
  searchMovies,
  GENRES,
} from "@/data/movies";

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");

  const featuredMovies = getFeaturedMovies();

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    return searchMovies(searchQuery);
  }, [searchQuery]);

  const filteredCategories = useMemo(() => {
    if (activeGenre === "All") return movieCategories;
    return movieCategories.filter((cat) =>
      cat.movies.some((m) => m.genre.includes(activeGenre))
    );
  }, [activeGenre]);

  const handlePlayTrailer = (movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  const handleMoreInfo = (movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedMovie(null), 350);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const isSearching = searchQuery.trim().length > 0;

  return (
    <>
      <Navbar onSearch={handleSearch} />

      {!isSearching && (
        <>
          <HeroBanner
            movies={featuredMovies}
            onPlayTrailer={handlePlayTrailer}
            onMoreInfo={handleMoreInfo}
          />

          {/* Genre Filter */}
          <div id="genres" style={{ paddingTop: "16px" }}>
            <div className="genre-bar">
              {GENRES.map((genre) => (
                <button
                  key={genre}
                  className={`genre-chip ${
                    activeGenre === genre ? "active" : ""
                  }`}
                  onClick={() => setActiveGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Movie Rows */}
          {filteredCategories.map((category, index) => (
            <MovieRow
              key={category.title}
              title={category.title}
              movies={category.movies}
              onPlay={handlePlayTrailer}
              onInfo={handleMoreInfo}
              id={
                index === 0
                  ? "trending"
                  : index === 1
                  ? "top-rated"
                  : undefined
              }
            />
          ))}
        </>
      )}

      {/* Search Results */}
      {isSearching && (
        <div className="search-results fade-in">
          <h2 className="search-results__title">
            Search Results
          </h2>
          <p className="search-results__subtitle">
            {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}{" "}
            for &ldquo;{searchQuery}&rdquo;
          </p>

          {searchResults.length > 0 ? (
            <div className="search-results__grid">
              {searchResults.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onPlay={handlePlayTrailer}
                  onInfo={handleMoreInfo}
                />
              ))}
            </div>
          ) : (
            <div className="search-results__empty">
              <div className="search-results__empty-icon">🎬</div>
              <p className="search-results__empty-text">
                No movies found. Try a different search term.
              </p>
            </div>
          )}
        </div>
      )}

      <Footer />

      <MovieModal
        movie={selectedMovie}
        isOpen={modalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
