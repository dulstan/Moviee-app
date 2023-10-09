import { Link } from "react-router-dom";
import allMovies from "../../../movies.json";
import React from "react";
// const uniqueCategories = Array.from(
//   new Set(
//     allMovies.map((movie) =>
//       movie.genre.split(", ").map((genre) => genre.trim())
//     )
//   )
// ).flat();

function CategoryPage() {
  const allGenres = allMovies
    .map((movie) => movie.genre.split(", ").map((genre) => genre.trim()))
    .flat();
  const uniqueGenres = [...new Set(allGenres)];

  return (
    <div>
      <h1>Välj en kategori</h1>
      <ul>
        {uniqueGenres.map((genre, index) => (
          <li key={index}>
                        <Link to={`/category/${encodeURIComponent(genre)}`}>{genre}</Link>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryPage;
