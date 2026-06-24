"use client";

import { useState, useEffect, useRef } from "react";

export default function Navbar({ onSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

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
    onSearch(value);
  };

  const toggleSearch = () => {
    if (searchOpen) {
      setQuery("");
      onSearch("");
    }
    setSearchOpen(!searchOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setQuery("");
      onSearch("");
      setSearchOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
      <div className="navbar__logo">
        Penta<span>flix</span>
      </div>

      <div className="navbar__nav">
        <a href="#" className="navbar__link active">
          Home
        </a>
        <a href="#trending" className="navbar__link">
          Trending
        </a>
        <a href="#top-rated" className="navbar__link">
          Top Rated
        </a>
        <a href="#genres" className="navbar__link">
          Genres
        </a>
      </div>

      <div className="navbar__actions">
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
