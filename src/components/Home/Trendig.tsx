import { useEffect, useState } from "react";
import "./Trendig.css";
import { Movie } from "../../modules/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import React from "react";

function TrendigMovies() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [bookmarkedMovies, setBookmarkedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Hämta trending-filmer från JSON-filen
    fetch("movies.json")
      .then((response) => response.json())
      .then((data) => {
        // Filtrera ut trending-filmer
        const trending = data.filter((movie: Movie) => movie.isTrending);
        setTrendingMovies(trending);
      })
      .catch((error) => console.error("Error fetching data:", error));

    const storedBookmarkedMovies = JSON.parse(
      localStorage.getItem("bookmarkedMovies") || "[]"
    );
    setBookmarkedMovies(storedBookmarkedMovies);
  }, []);

  const isBookmarked = (movie: Movie) => {
    return bookmarkedMovies.some((bm) => bm.title === movie.title);
  };

  const toggleBookmark = (movie: Movie) => {
    if (isBookmarked(movie)) {
      const updatedBookmarks = bookmarkedMovies.filter(
        (bm) => bm.title !== movie.title
      );
      localStorage.setItem(
        "bookmarkedMovies",
        JSON.stringify(updatedBookmarks)
      );
      setBookmarkedMovies(updatedBookmarks);
    } else {
      const updatedBookmarks = [...bookmarkedMovies, movie];
      localStorage.setItem(
        "bookmarkedMovies",
        JSON.stringify(updatedBookmarks)
      );
      setBookmarkedMovies(updatedBookmarks);
    }
  };

  return (
    <div>
      <h2>Trending Movies</h2>
      <div className="trending-movies">
        {trendingMovies.map((movie) => (
          <div key={movie.title} className="movie-card">
            <Link to={`/filmreview/${movie.title}`} className="thumbnail-link">
              <img src={movie.thumbnail} alt={movie.title} />
            </Link>

            <h3>{movie.title}</h3>
            <p>{movie.synopsis}</p>
            <button onClick={() => toggleBookmark(movie)}>
              {isBookmarked(movie) ? (
                <FontAwesomeIcon icon={faStar} className="bookmarked" />
              ) : (
                <FontAwesomeIcon icon={faStarOutline} />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default TrendigMovies;
