import { Suspense } from "react";
import HomeClient from "@/components/HomeClient";
import Skeleton from "@/components/Skeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  fetchTrending,
  fetchTopRated,
  fetchNowPlaying,
  fetchUpcoming,
} from "@/lib/tmdb";

// API URL for genres
const getGenres = async () => {
  const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
  if (!res.ok) return { genres: [] };
  return res.json();
};

function LoadingSkeleton() {
  return (
    <>
      <Navbar />
      <main>
        <Skeleton type="hero" />
        <Skeleton type="row" count={5} />
        <Skeleton type="row" count={5} />
      </main>
      <Footer />
    </>
  );
}

async function HomeData() {
  const [trending, topRated, nowPlaying, upcoming, genresData] = await Promise.all([
    fetchTrending(),
    fetchTopRated(),
    fetchNowPlaying(),
    fetchUpcoming(),
    getGenres(),
  ]);

  return (
    <HomeClient
      trending={trending}
      topRated={topRated}
      nowPlaying={nowPlaying}
      upcoming={upcoming}
      genres={genresData.genres}
    />
  );
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <HomeData />
    </Suspense>
  );
}
