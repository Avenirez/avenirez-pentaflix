const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const fetchOptions = {
  next: { revalidate: 3600 }, // Cache for 1 hour
};

// --- Helper: Get API URL with Auth ---
function getUrl(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  return url.toString();
}

// --- Helper: Format Movie Data ---
// Formats TMDB raw movie data into the structure our components expect
export function formatMovie(movie, genresMap = {}) {
  // Extract year from release_date
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  // Map genre IDs to names (if genresMap is provided, else use existing genres if full details)
  let genreNames = [];
  if (movie.genres) {
    genreNames = movie.genres.map((g) => g.name);
  } else if (movie.genre_ids && Object.keys(genresMap).length > 0) {
    genreNames = movie.genre_ids
      .map((id) => genresMap[id])
      .filter(Boolean);
  }

  // Handle trailer from appended videos (if available)
  let trailerKey = null;
  if (movie.videos && movie.videos.results) {
    const trailer = movie.videos.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    );
    if (trailer) trailerKey = trailer.key;
  }

  // Extract director and cast (if credits appended)
  let director = "Unknown";
  let cast = [];
  if (movie.credits) {
    const directorObj = movie.credits.crew.find((c) => c.job === "Director");
    if (directorObj) director = directorObj.name;
    cast = movie.credits.cast.slice(0, 3).map((c) => c.name); // Top 3 cast
  }

  // Format duration (runtime is in minutes for full details)
  let duration = "N/A";
  if (movie.runtime) {
    const hours = Math.floor(movie.runtime / 60);
    const minutes = movie.runtime % 60;
    duration = `${hours}h ${minutes}m`;
  }

  return {
    id: movie.id,
    title: movie.title || movie.name,
    year,
    rating: movie.vote_average ? movie.vote_average.toFixed(1) : "N/A",
    genre: genreNames,
    duration,
    director,
    cast,
    synopsis: movie.overview || "No synopsis available.",
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "/placeholder-poster.jpg",
    backdrop: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : "/placeholder-backdrop.jpg",
    trailer: trailerKey,
    raw: movie, // Keep raw data just in case
  };
}

// --- API Calls ---

export async function fetchGenresMap() {
  try {
    const res = await fetch(getUrl("/genre/movie/list"), fetchOptions);
    if (!res.ok) throw new Error("Failed to fetch genres");
    const data = await res.json();
    const map = {};
    data.genres.forEach((g) => {
      map[g.id] = g.name;
    });
    return map;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return {};
  }
}

export async function fetchMovies(endpoint, params = {}, page = 1) {
  try {
    const res = await fetch(getUrl(endpoint, { ...params, page }), fetchOptions);
    if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
    const data = await res.json();
    const genresMap = await fetchGenresMap();
    return {
      movies: data.results.map((m) => formatMovie(m, genresMap)),
      page: data.page,
      totalPages: data.total_pages,
    };
  } catch (error) {
    console.error(`Error fetching movies from ${endpoint}:`, error);
    // Treat a failed fetch as "no more pages" so a Load More button
    // simply disappears instead of retrying forever in a broken state.
    return { movies: [], page, totalPages: page };
  }
}

export async function fetchTrending(page = 1) {
  return fetchMovies("/trending/movie/week", {}, page);
}

export async function fetchTopRated(page = 1) {
  return fetchMovies("/movie/top_rated", {}, page);
}

export async function fetchNowPlaying(page = 1) {
  return fetchMovies("/movie/now_playing", {}, page);
}

export async function fetchUpcoming(page = 1) {
  return fetchMovies("/movie/upcoming", {}, page);
}

export async function fetchMoviesByGenre(genreId, page = 1) {
  return fetchMovies("/discover/movie", { with_genres: genreId }, page);
}

export async function searchMovies(query, page = 1) {
  if (!query) return { movies: [], page: 1, totalPages: 1 };
  return fetchMovies("/search/movie", { query }, page);
}

export async function fetchMovieDetails(id) {
  try {
    const res = await fetch(
      getUrl(`/movie/${id}`, { append_to_response: "credits,videos,similar" }),
      fetchOptions
    );
    if (!res.ok) throw new Error("Failed to fetch movie details");
    const data = await res.json();
    
    const formatted = formatMovie(data);
    
    // Add similar movies using the already existing formatMovie (since similar are basic objects, they need genres map, but let's just fetch it)
    const genresMap = await fetchGenresMap();
    formatted.similar = data.similar?.results
      ?.slice(0, 10)
      .map((m) => formatMovie(m, genresMap)) || [];
      
    // Full cast for detail page
    if (data.credits) {
        formatted.fullCast = data.credits.cast.slice(0, 10).map(c => ({
            id: c.id,
            name: c.name,
            character: c.character,
            profile: c.profile_path ? `https://image.tmdb.org/t/p/w185${c.profile_path}` : null
        }));
    }

    return formatted;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
}
