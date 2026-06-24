import { fetchMovieDetails } from "@/lib/tmdb";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const movie = await fetchMovieDetails(id);
  if (!movie) return { title: "Movie Not Found" };
  return {
    title: `${movie.title} — Pentaflix`,
    description: movie.synopsis,
  };
}

export default async function MoviePage({ params }) {
  const { id } = await params;
  const movie = await fetchMovieDetails(id);

  if (!movie) {
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        <h2>Movie Not Found</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="movie-detail-page">
        {/* Backdrop Hero */}
        <div
          className="detail-hero"
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        >
          <div className="detail-hero__overlay" />
        </div>

        <div className="detail-content">
          <div className="detail-main">
            <div className="detail-poster-wrap">
              <img src={movie.poster} alt={movie.title} className="detail-poster" />
            </div>

            <div className="detail-info">
              <h1 className="detail-title">{movie.title}</h1>

              <div className="detail-meta">
                <span className="detail-rating">★ {movie.rating}</span>
                <span className="detail-meta-dot" />
                <span>{movie.year}</span>
                <span className="detail-meta-dot" />
                <span>{movie.duration}</span>
              </div>

              <div className="detail-genres">
                {movie.genre.map((g) => (
                  <span key={g} className="detail-genre-tag">
                    {g}
                  </span>
                ))}
              </div>

              <div className="detail-synopsis">
                <h3>Synopsis</h3>
                <p>{movie.synopsis}</p>
              </div>

              <div className="detail-crew">
                {movie.director && movie.director !== "Unknown" && (
                  <div className="detail-crew-item">
                    <strong>Director:</strong> {movie.director}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cast Section */}
          {movie.fullCast && movie.fullCast.length > 0 && (
            <section className="detail-section">
              <h2 className="detail-section-title">Top Cast</h2>
              <div className="cast-grid">
                {movie.fullCast.map((actor) => (
                  <div key={actor.id} className="cast-card">
                    {actor.profile ? (
                      <img src={actor.profile} alt={actor.name} className="cast-photo" />
                    ) : (
                      <div className="cast-photo-placeholder">No Photo</div>
                    )}
                    <div className="cast-info">
                      <p className="cast-name">{actor.name}</p>
                      <p className="cast-character">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Trailer Section */}
          {movie.trailer && (
            <section className="detail-section">
              <h2 className="detail-section-title">Official Trailer</h2>
              <div className="detail-trailer">
                <iframe
                  src={`https://www.youtube.com/embed/${movie.trailer}`}
                  title={`${movie.title} Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </section>
          )}

          {/* Similar Movies Section */}
          {movie.similar && movie.similar.length > 0 && (
            <section className="detail-section">
              <h2 className="detail-section-title">Similar Movies</h2>
              <div className="movie-slider">
                {movie.similar.map((m) => (
                  <MovieCard key={m.id} movie={m} onPlay={() => {}} onInfo={() => {}} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
