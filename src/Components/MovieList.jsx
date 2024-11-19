import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, onSelectMovie }) => { 
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onClick={() => onSelectMovie(movie)}
        />
      ))}
    </div>
  );
};

export default MovieList;
