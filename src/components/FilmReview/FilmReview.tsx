import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import React from "react";
import { Movie } from '../../modules/interfaces';
import './FilmReview.css'
import allMovies from "../../../movies.json";

function FilmReview() {
    const { movieTitle } = useParams<{ movieTitle: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [bookmarkedMovies, setBookmarkedMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const storedBookmarkedMovies = JSON.parse(localStorage.getItem('bookmarkedMovies') || '[]');
        setBookmarkedMovies(storedBookmarkedMovies);
        
        const foundMovie = allMovies.find((m: Movie) => m.title === movieTitle);
            if (foundMovie) {
              setMovie(foundMovie);
            } else {
              console.error(`Movie not found: ${movieTitle}`);
            }

        // fetch("../../../movies.json")
        //   .then((response) => response.json())
        //   .then((data) => {

        //     const foundMovie = data.find((m: Movie) => m.title === movieTitle);
        //     if (foundMovie) {
        //       setMovie(foundMovie);
        //     } else {
        //       console.error(`Movie not found: ${movieTitle}`);
        //     }
        //   })
        //   .catch((error) => console.error('Error fetching data:', error));
      }, [movieTitle]);
      if (!movie) {
        
        return <div>Loading...</div>;
      }

      const isBookmarked = () => {
        return bookmarkedMovies.some((bm) => bm.title === movie.title);
      };
      
      const toggleBookmark = () => {
        if (isBookmarked()) {
          // Ta bort filmen från bokmärken
          const updatedBookmarks = bookmarkedMovies.filter((bm) => bm.title !== movie.title);
          setBookmarkedMovies(updatedBookmarks);
          localStorage.setItem('bookmarkedMovies', JSON.stringify(updatedBookmarks));
        } else {
          // Lägg till filmen i bokmärken
          const updatedBookmarks = [...bookmarkedMovies, movie];
          setBookmarkedMovies(updatedBookmarks);
          localStorage.setItem('bookmarkedMovies', JSON.stringify(updatedBookmarks));
        }
      };
  return (
    <div className='filmReview-container'>
      <h2> {movie.title}</h2>
      <article className='filmReview-card centered-card'>
      <img src={movie.thumbnail} alt={movie.title} />
      <p>Year: {movie.year}</p>
      <p>Rating: {movie.rating}</p>
      <p>Genre: {movie.genre}</p>
      <p> {movie.synopsis}</p>
      <h3>Actors:</h3>
      <ul>
        {movie.actors.map((actor, index) => (
          <li key={index}>{actor}</li>
        ))}
      </ul>
      {isBookmarked() ? (
    <button onClick={toggleBookmark}>Remove from Bookmark</button>
  ) : (
    <button onClick={toggleBookmark}>Add to Bookmark</button>
  )}
      </article>
      
    </div>
  );
}

export default FilmReview;
