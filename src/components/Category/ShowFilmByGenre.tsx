import { useParams } from "react-router-dom"; // Importera useParams för att hämta genren från URL-parametern
import allMovies from "../../../movies.json";
import "./ShowfilmByGenre.css";
import React from "react";

function GenreMoviesPage() {
  const { genre } = useParams(); // Hämta genren från URL-parametern
  if (!genre) {
    return <div>Genre saknas</div>;
  }
  // Filtrera filmerna baserat på den valda genren
  const genreMovies = allMovies.filter((movie) => movie.genre.includes(genre));

  return (
    <div className="genre-movie">
      <h1>{genre} Movies</h1>
      <div className="genreMovies-container">
        {genreMovies.map((movie, index) => (
          <article className="movie-card" key={index}>
            <img src={movie.thumbnail} alt={movie.title} />

            <h2>{movie.title}</h2>
            <p>År: {movie.year}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default GenreMoviesPage;
