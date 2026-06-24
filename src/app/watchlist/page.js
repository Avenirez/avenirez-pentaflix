"use client";

import { useWatchlist } from "@/context/WatchlistContext";
import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import Footer from "@/components/Footer";

export default function WatchlistPage() {
  const { watchlist, mounted } = useWatchlist();

  if (!mounted) return null;

  return (
    <>
      <Navbar onSearch={() => {}} />
      <main className="watchlist-page">
        <div className="watchlist-header">
          <h1 className="watchlist-title">My Watchlist</h1>
          <p className="watchlist-subtitle">
            {watchlist.length} {watchlist.length === 1 ? "movie" : "movies"} saved
          </p>
        </div>

        {watchlist.length > 0 ? (
          <div className="search-results__grid" style={{ padding: "0 48px", minHeight: "50vh" }}>
            {watchlist.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onPlay={() => {}}
                onInfo={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="search-results__empty">
            <div className="search-results__empty-icon">🔖</div>
            <p className="search-results__empty-text">
              Your watchlist is empty. Browse movies and click the bookmark icon to add them here.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
