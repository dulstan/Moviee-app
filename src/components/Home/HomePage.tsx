import React from "react";
import './HomePage.css'
import RecommendedMovies from './RecommendedMovies';
import TrendigMovies from './Trendig';
import { useState, useEffect } from 'react';
import allMovies from '../../../movies.json';
import { Link } from 'react-router-dom';
import { Movie } from '../../modules/interfaces';

function HomePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    useEffect(() => {
        
        // Kontrollera om söktermen innehåller minst två tecken innan du utför sökningen
        if (searchTerm.length >= 2) {
          // Exempel på hur du kan filtrera filmer baserat på de två första orden av titeln
          const filteredMovies = allMovies.filter((movie) =>
            movie.title.toLowerCase().startsWith(searchTerm.toLowerCase())
          );
    
          setSearchResults(filteredMovies); // Uppdatera searchResults med resultaten av sökningen
        } else {
          // Återställ sökresultaten om söktermen är för kort
          setSearchResults([]);
        }
      }, [searchTerm]); 
    

  return (
    <div>
        <Link to="/category">Gå till kategorisidan</Link>
        <Link to="/bookmark">Go to Bookmarked Movies</Link>

 {/* Sökfält */}
 <input
        type="text"
        placeholder="Sök filmer..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Visa sökresultaten endast om det finns minst två tecken i söktermen */}
      {searchTerm.length >= 2 && (
        <>
          <h2>Sökresultat</h2>
          <div className="search-results">
            {searchResults.map((movie) => (
              <div key={movie.title} className="movie-card">
                <img src={movie.thumbnail} alt={movie.title} />
                <h3>{movie.title}</h3>
                
              </div>
            ))}
          </div>
        </>
      )}


      <TrendigMovies/>
      <RecommendedMovies/>

    </div>
  );
}

export default HomePage;
