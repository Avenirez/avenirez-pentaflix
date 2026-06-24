// Mock movie data for CineSlate
// Using TMDB image paths as placeholder posters

const POSTER_BASE = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";

export const GENRES = [
  "All",
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Sci-Fi",
  "Thriller",
  "Animation",
  "Romance",
];

export const movies = [
  {
    id: 1,
    title: "Dune: Part Two",
    year: 2024,
    rating: 8.5,
    genre: ["Action", "Sci-Fi", "Drama"],
    duration: "2h 46m",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Austin Butler"],
    synopsis:
      "Paul Atreides unites with the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe.",
    poster: `${POSTER_BASE}/8b8R8l88Qje9dn9OE8PY05Nez7.jpg`,
    backdrop: `${BACKDROP_BASE}/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg`,
    trailer: "Way9Dexny3w",
    featured: true,
  },
  {
    id: 2,
    title: "Oppenheimer",
    year: 2023,
    rating: 8.4,
    genre: ["Drama", "Thriller"],
    duration: "3h 0m",
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Robert Downey Jr."],
    synopsis:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
    poster: `${POSTER_BASE}/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg`,
    backdrop: `${BACKDROP_BASE}/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg`,
    trailer: "uYPbbksJxIg",
    featured: false,
  },
  {
    id: 3,
    title: "Spider-Man: Across the Spider-Verse",
    year: 2023,
    rating: 8.7,
    genre: ["Animation", "Action", "Sci-Fi"],
    duration: "2h 20m",
    director: "Joaquim Dos Santos",
    cast: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac"],
    synopsis:
      "Miles Morales catapults across the multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    poster: `${POSTER_BASE}/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg`,
    backdrop: `${BACKDROP_BASE}/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg`,
    trailer: "cqGjhVJWtEg",
    featured: false,
  },
  {
    id: 4,
    title: "The Batman",
    year: 2022,
    rating: 7.8,
    genre: ["Action", "Thriller", "Drama"],
    duration: "2h 56m",
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"],
    synopsis:
      "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.",
    poster: `${POSTER_BASE}/74xTEgt7R36Fpooo50r9T25onhq.jpg`,
    backdrop: `${BACKDROP_BASE}/b0PlSFdDwbyFAJlMTkHeFjmFpfd.jpg`,
    trailer: "mqqft2x_Aa4",
    featured: false,
  },
  {
    id: 5,
    title: "Everything Everywhere All at Once",
    year: 2022,
    rating: 8.0,
    genre: ["Action", "Comedy", "Sci-Fi"],
    duration: "2h 19m",
    director: "Daniel Kwan, Daniel Scheinert",
    cast: ["Michelle Yeoh", "Ke Huy Quan", "Stephanie Hsu"],
    synopsis:
      "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save the world by exploring other universes.",
    poster: `${POSTER_BASE}/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg`,
    backdrop: `${BACKDROP_BASE}/fgw0Jtq6JOSfPGklAkKEDJR1vcf.jpg`,
    trailer: "wxN1T1qdQ6k",
    featured: false,
  },
  {
    id: 6,
    title: "Interstellar",
    year: 2014,
    rating: 8.7,
    genre: ["Sci-Fi", "Drama"],
    duration: "2h 49m",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    synopsis:
      "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot is tasked to pilot a spacecraft to find a new planet for humans.",
    poster: `${POSTER_BASE}/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg`,
    backdrop: `${BACKDROP_BASE}/xJHokMbljvjADYdit5fK1DVfjko.jpg`,
    trailer: "zSWdZVtXT7E",
    featured: true,
  },
  {
    id: 7,
    title: "Parasite",
    year: 2019,
    rating: 8.5,
    genre: ["Drama", "Thriller", "Comedy"],
    duration: "2h 12m",
    director: "Bong Joon-ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    synopsis:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    poster: `${POSTER_BASE}/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg`,
    backdrop: `${BACKDROP_BASE}/TU9HIoTjI8kMbL0XZnWOUiMJsZB.jpg`,
    trailer: "5xH0HfJHsaY",
    featured: false,
  },
  {
    id: 8,
    title: "John Wick: Chapter 4",
    year: 2023,
    rating: 7.7,
    genre: ["Action", "Thriller"],
    duration: "2h 49m",
    director: "Chad Stahelski",
    cast: ["Keanu Reeves", "Donnie Yen", "Bill Skarsgård"],
    synopsis:
      "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy.",
    poster: `${POSTER_BASE}/vZloFAK7NmvMGKE7LsEBQh4AOkc.jpg`,
    backdrop: `${BACKDROP_BASE}/7I6VUdPj6tQECNHdviJkn1I0Eo7.jpg`,
    trailer: "qEVUtrk8_B4",
    featured: false,
  },
  {
    id: 9,
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    genre: ["Drama"],
    duration: "2h 22m",
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    synopsis:
      "Over the course of several years, two convicts form a friendship, seeking consolation and eventual redemption through basic compassion.",
    poster: `${POSTER_BASE}/9cjIGRQL3sGGBvCJsRFfJRhSOiJ.jpg`,
    backdrop: `${BACKDROP_BASE}/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg`,
    trailer: "PLl99DlL6b4",
    featured: false,
  },
  {
    id: 10,
    title: "Get Out",
    year: 2017,
    rating: 7.7,
    genre: ["Horror", "Thriller"],
    duration: "1h 44m",
    director: "Jordan Peele",
    cast: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford"],
    synopsis:
      "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
    poster: `${POSTER_BASE}/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg`,
    backdrop: `${BACKDROP_BASE}/sGfVFc1FhfE3WcBsABwBxo6MQFl.jpg`,
    trailer: "DzfpyUB60YY",
    featured: false,
  },
  {
    id: 11,
    title: "La La Land",
    year: 2016,
    rating: 8.0,
    genre: ["Romance", "Drama", "Comedy"],
    duration: "2h 8m",
    director: "Damien Chazelle",
    cast: ["Ryan Gosling", "Emma Stone"],
    synopsis:
      "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
    poster: `${POSTER_BASE}/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg`,
    backdrop: `${BACKDROP_BASE}/dUv4nQ0m1cUQ88MjPKjRSqTwRhW.jpg`,
    trailer: "0pdqf4P9MB8",
    featured: false,
  },
  {
    id: 12,
    title: "Spirited Away",
    year: 2001,
    rating: 8.6,
    genre: ["Animation", "Drama"],
    duration: "2h 5m",
    director: "Hayao Miyazaki",
    cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"],
    synopsis:
      "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, where humans are changed into beasts.",
    poster: `${POSTER_BASE}/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg`,
    backdrop: `${BACKDROP_BASE}/6oaL4DP75yABrd0SO1eSqrBfpQN.jpg`,
    trailer: "ByXuk9QqQkk",
    featured: false,
  },
  {
    id: 13,
    title: "The Conjuring",
    year: 2013,
    rating: 7.5,
    genre: ["Horror", "Thriller"],
    duration: "1h 52m",
    director: "James Wan",
    cast: ["Vera Farmiga", "Patrick Wilson", "Lili Taylor"],
    synopsis:
      "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
    poster: `${POSTER_BASE}/wVYREutTvI2tmxr6ujrHT704wGF.jpg`,
    backdrop: `${BACKDROP_BASE}/u0mpUMGUqLYSMoJx5vXHP7wBEMd.jpg`,
    trailer: "k10ETZ41q5o",
    featured: false,
  },
  {
    id: 14,
    title: "Guardians of the Galaxy Vol. 3",
    year: 2023,
    rating: 7.9,
    genre: ["Action", "Comedy", "Sci-Fi"],
    duration: "2h 30m",
    director: "James Gunn",
    cast: ["Chris Pratt", "Zoe Saldana", "Dave Bautista"],
    synopsis:
      "Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own.",
    poster: `${POSTER_BASE}/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg`,
    backdrop: `${BACKDROP_BASE}/nGxUxi3PfXDRm7Vg95VBNgKEMoC.jpg`,
    trailer: "u3V5KDHRQvk",
    featured: false,
  },
  {
    id: 15,
    title: "Whiplash",
    year: 2014,
    rating: 8.5,
    genre: ["Drama"],
    duration: "1h 47m",
    director: "Damien Chazelle",
    cast: ["Miles Teller", "J.K. Simmons"],
    synopsis:
      "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
    poster: `${POSTER_BASE}/7fn624j5lj3xTme2SgiLCeuedmO.jpg`,
    backdrop: `${BACKDROP_BASE}/6bbZ6XlDzJkSBvphmKLAiiGn7lY.jpg`,
    trailer: "7d_jQycdQGo",
    featured: false,
  },
  {
    id: 16,
    title: "A Quiet Place",
    year: 2018,
    rating: 7.5,
    genre: ["Horror", "Thriller", "Sci-Fi"],
    duration: "1h 30m",
    director: "John Krasinski",
    cast: ["Emily Blunt", "John Krasinski", "Millicent Simmonds"],
    synopsis:
      "In a post-apocalyptic world, a family is forced to live in silence while hiding from monsters with ultra-sensitive hearing.",
    poster: `${POSTER_BASE}/nAU74GmpUk7t5iklEp3bufwDq4n.jpg`,
    backdrop: `${BACKDROP_BASE}/roYyLiEXsqVMBVm9sSByrHaG8yR.jpg`,
    trailer: "WR7cc5t7tv8",
    featured: false,
  },
  {
    id: 17,
    title: "The Grand Budapest Hotel",
    year: 2014,
    rating: 8.1,
    genre: ["Comedy", "Drama"],
    duration: "1h 39m",
    director: "Wes Anderson",
    cast: ["Ralph Fiennes", "Tony Revolori", "F. Murray Abraham"],
    synopsis:
      "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
    poster: `${POSTER_BASE}/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg`,
    backdrop: `${BACKDROP_BASE}/nX5XotM9yprCKarRH4fzOq1VM1J.jpg`,
    trailer: "1Fg5iWmQjwk",
    featured: false,
  },
  {
    id: 18,
    title: "Mad Max: Fury Road",
    year: 2015,
    rating: 8.1,
    genre: ["Action", "Sci-Fi", "Thriller"],
    duration: "2h 0m",
    director: "George Miller",
    cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult"],
    synopsis:
      "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search of her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.",
    poster: `${POSTER_BASE}/8tZYtuWezp8JbcsvHYO0O46tFBO.jpg`,
    backdrop: `${BACKDROP_BASE}/nlCHUWjY9XWbuEUQSCDyMNMfsYb.jpg`,
    trailer: "hEJnMQG9ev8",
    featured: false,
  },
  {
    id: 19,
    title: "Your Name",
    year: 2016,
    rating: 8.4,
    genre: ["Animation", "Romance", "Drama"],
    duration: "1h 46m",
    director: "Makoto Shinkai",
    cast: ["Ryunosuke Kamiki", "Mone Kamishiraishi"],
    synopsis:
      "Two teenagers share a profound, magical connection upon discovering they are swapping bodies. Things manage to become even more complicated when they try to meet in person.",
    poster: `${POSTER_BASE}/q719jXXEzOoYaps6babgKnONONX.jpg`,
    backdrop: `${BACKDROP_BASE}/dIWwZW7dJJtqC6CgWzYkNVKIUm2.jpg`,
    trailer: "xU47nhruN-Q",
    featured: false,
  },
  {
    id: 20,
    title: "Inception",
    year: 2010,
    rating: 8.8,
    genre: ["Action", "Sci-Fi", "Thriller"],
    duration: "2h 28m",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    synopsis:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster: `${POSTER_BASE}/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg`,
    backdrop: `${BACKDROP_BASE}/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg`,
    trailer: "YoHD9XEInc0",
    featured: true,
  },
];

// Helper functions
export function getMoviesByGenre(genre) {
  if (genre === "All") return movies;
  return movies.filter((movie) => movie.genre.includes(genre));
}

export function getFeaturedMovies() {
  return movies.filter((movie) => movie.featured);
}

export function getTopRated() {
  return [...movies].sort((a, b) => b.rating - a.rating).slice(0, 10);
}

export function getRecentMovies() {
  return [...movies].sort((a, b) => b.year - a.year).slice(0, 10);
}

export function searchMovies(query) {
  const lower = query.toLowerCase();
  return movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(lower) ||
      movie.director.toLowerCase().includes(lower) ||
      movie.cast.some((actor) => actor.toLowerCase().includes(lower))
  );
}

export function getMovieById(id) {
  return movies.find((movie) => movie.id === id);
}

// Category rows for homepage
export const movieCategories = [
  { title: "🔥 Trending Now", movies: getRecentMovies() },
  { title: "⭐ Top Rated", movies: getTopRated() },
  {
    title: "🎬 Action & Adventure",
    movies: getMoviesByGenre("Action"),
  },
  { title: "😂 Comedy", movies: getMoviesByGenre("Comedy") },
  { title: "🎭 Drama", movies: getMoviesByGenre("Drama") },
  { title: "👻 Horror & Thriller", movies: getMoviesByGenre("Horror") },
  { title: "🚀 Sci-Fi", movies: getMoviesByGenre("Sci-Fi") },
  { title: "✨ Animation", movies: getMoviesByGenre("Animation") },
  { title: "💕 Romance", movies: getMoviesByGenre("Romance") },
];
