import "./globals.css";

export const metadata = {
  title: "Pentaflix — Discover Your Next Favorite Film",
  description:
    "Pentaflix is a premium movie discovery platform. Browse trending films, top-rated classics, and hidden gems across every genre.",
  keywords: "movies, films, cinema, streaming, trailers, reviews",
};

import { WatchlistProvider } from "@/context/WatchlistContext";
import { ThemeProvider } from "@/context/ThemeContext";

// Runs before paint (inline, synchronous) so the saved theme is applied
// to <html data-theme="..."> before React even hydrates. Without this,
// users would see a flash of the wrong theme on every page load.
const themeInitScript = `
(function () {
  try {
    var saved = localStorage.getItem("pentaflix_theme");
    var theme =
      saved || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <WatchlistProvider>{children}</WatchlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
