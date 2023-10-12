import { Link } from "react-router-dom";
import allMovies from "../../../movies.json";
import React from "react";
import'./CategoryPage.css'

function CategoryPage() {
  const allGenres = allMovies
    .map((movie) => movie.genre.split(", ").map((genre) => genre.trim()))
    .flat();
  const uniqueGenres = [...new Set(allGenres)];

  return (
    <div className="category-selector">
      <h1>Pick your category</h1>
      <ul className="category-list">
        {uniqueGenres.map((genre, index) => (
          <li key={index} className="category-item">
                        <Link to={`/category/${encodeURIComponent(genre)}`} className="category-link">{genre} </Link>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryPage;
