import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from './components/Home/HomePage';
import CategoryPage from './components/Category/CategoryPage'; 
import GenreMoviesPage from "./components/Category/ShowFilmByGenre";
import BookmarkedMovies from "./components/Bookmark/BookMark";
import FilmReview from "./components/FilmReview/FilmReview";
import React from "react";
import './App.css'

function App() {
  const router =createBrowserRouter([
    {
      path:"/",
      element:<HomePage/>,
    },
    {
      path:"/category",
      element: <CategoryPage/>
    },
    {
      path:"/category/:genre",
      element: <GenreMoviesPage/>
    },
    {
      path: "/bookmark",
      element: <BookmarkedMovies />
    }, 
    {
      path: "/filmreview/:movieTitle",
      element: <FilmReview/>
    }
  ]);
  return (
    <div>
     <RouterProvider router={router}/>
    </div>
  );
}

export default App;
