import { useEffect, useState } from 'react';
import './RecommendedMovies.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';
import React from "react";
import { Movie } from '../../modules/interfaces';
import { Link } from "react-router-dom";
import '../../../movies.json';


function RecommendedMovies() {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [bookmarkedMovies, setBookmarkedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Hämta alla filmer från JSON-filen
    fetch('movies.json')
      .then((response) => response.json())
      .then((data) => {
        // Hämta trending-filmer från JSON-filen
        const trending = data.filter((movie: Movie) => movie.isTrending);

        // Slumpa fram rekommenderade filmer (4-10 filmer)
        const recommended = getRandomRecommendedMovies(data, trending, Math.floor(Math.random() * 7) + 4);

        setRecommendedMovies(recommended);
      })
      .catch((error) => console.error('Error fetching data:', error));
      const storedBookmarkedMovies=JSON.parse(localStorage.getItem('bookmarkedMovies')|| '[]');
        setBookmarkedMovies(storedBookmarkedMovies);
  }, []);

  // Skapa en funktion för att slumpa fram rekommenderade filmer
  function getRandomRecommendedMovies(allMovies: Movie[], trendingMovies: Movie[], count: number): Movie[] {
    const uniqueMovies: Movie[] = [];

    while (uniqueMovies.length < count) {
      // Slumpa en film från alla filmer
      const randomIndex = Math.floor(Math.random() * allMovies.length);
      const randomMovie = allMovies[randomIndex];

      // Kontrollera om filmen redan är i listan över rekommenderade filmer eller trendflödet
      if (
        !uniqueMovies.some((movie) => movie.title === randomMovie.title) &&
        !trendingMovies.some((movie) => movie.title === randomMovie.title)
      ) {
        uniqueMovies.push(randomMovie);
      }
    }

    return uniqueMovies;
  }

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
      <h2>Recommended for You</h2>
      <div className="recommended-movies">
        {recommendedMovies.map((movie) => (
          <div key={movie.title} className="thumbnail-container">
            <Link to={`/filmreview/${movie.title}`} className="thumbnail-link">
              <img
                className="thumbnail"
                src={movie.thumbnail}
                alt={movie.title}
              />
            </Link>
            <article className='movie-info'>
            <h3>{movie.title}</h3>
            <button onClick={() => toggleBookmark(movie)}>
              {isBookmarked(movie) ? (
                <FontAwesomeIcon icon={faStar} className="bookmarked" />
              ) : (
                <FontAwesomeIcon icon={faStarOutline} />
              )}
            </button>
            <p>Year: {movie.year}</p>
            <p>Rated: {movie.rating}</p>
            </article>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedMovies;
