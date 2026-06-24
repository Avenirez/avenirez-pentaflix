import "./globals.css";

export const metadata = {
  title: "Pentaflix — Discover Your Next Favorite Film",
  description:
    "Pentaflix is a premium movie discovery platform. Browse trending films, top-rated classics, and hidden gems across every genre.",
  keywords: "movies, films, cinema, streaming, trailers, reviews",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
