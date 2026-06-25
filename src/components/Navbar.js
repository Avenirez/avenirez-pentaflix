"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useWatchlist } from "@/context/WatchlistContext";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar({ onSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const { watchlist, mounted } = useWatchlist();
  const { theme, toggleTheme, mounted: themeMounted } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) onSearch(value);
  };

  const toggleSearch = () => {
    if (searchOpen) {
      setQuery("");
      if (onSearch) onSearch("");
    }
    setSearchOpen(!searchOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setQuery("");
      if (onSearch) onSearch("");
      setSearchOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
      <Link href="/" className="navbar__logo">
        Penta<span>flix</span>
      </Link>

      <div className="navbar__nav">
        <Link href="/" className="navbar__link active">
          Home
        </Link>
        <Link href="/#trending" className="navbar__link">
          Trending
        </Link>
        <Link href="/#top-rated" className="navbar__link">
          Top Rated
        </Link>
        <Link href="/#genres" className="navbar__link">
          Genres
        </Link>
        <Link href="/watchlist" className="navbar__link">
          Watchlist
          {mounted && watchlist.length > 0 && (
            <span className="watchlist-badge">{watchlist.length}</span>
          )}
        </Link>
      </div>

      <div className="navbar__actions">
        <button
          className="search-toggle"
          onClick={toggleTheme}
          id="theme-toggle"
          aria-label={
            themeMounted && theme === "light"
              ? "Switch to dark mode"
              : "Switch to light mode"
          }
        >
          {themeMounted && theme === "light" ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>

        <div className="search-container">
          <div className={`search-input-wrapper ${searchOpen ? "open" : ""}`}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search movies, actors, directors..."
              value={query}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              id="search-input"
            />
            <button className="search-close" onClick={toggleSearch}>
              ✕
            </button>
          </div>
          {!searchOpen && (
            <button
              className="search-toggle"
              onClick={toggleSearch}
              id="search-toggle"
              aria-label="Open search"
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
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
