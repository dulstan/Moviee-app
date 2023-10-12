import { useEffect, useState } from "react";
import React from "react";
import { Movie } from "../../modules/interfaces";
import "./BookMark.css";
function BookmarkedMovies() {
  const [bookmarkedMovies, setBookmarkedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Hämta bokmärkta filmer från localStorage när komponenten mountas
    const storedBookmarkedMovies = JSON.parse(
      localStorage.getItem("bookmarkedMovies") || "[]"
    );
    setBookmarkedMovies(storedBookmarkedMovies);
  }, []);
  // Funktion för att ta bort en film från bokmärken
  const removeBookmark = (movieToRemove: Movie) => {
    const updatedBookmarks = bookmarkedMovies.filter(
      (movie) => movie.title !== movieToRemove.title
    );
    setBookmarkedMovies(updatedBookmarks);
    localStorage.setItem("bookmarkedMovies", JSON.stringify(updatedBookmarks));
    setBookmarkedMovies(updatedBookmarks);
  };

  return (
    <div className="bookmark-container">
      <h2>Bookmarked Movies</h2>
      <div className="bookmarked-movies">
        {bookmarkedMovies.map((movie) => (
          <div key={movie.title} className="movie-card">
            <img src={movie.thumbnail} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.synopsis}</p>

            <button onClick={() => removeBookmark(movie)}>
              Remove Bookmark
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookmarkedMovies;
