import React from "react";

const MovieCard = ({ movie, onClick }) => {
  const placeholderPoster =
    "https://via.placeholder.com/300x450?text=No+Image+Available";

  return (
    <div
      onClick={onClick}
      className="cursor-pointer border rounded-lg p-4 hover:bg-gray-100"
    >
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : placeholderPoster}
        alt={movie.Title}
        className="w-full h-64 object-cover mb-4"
      />
      <h2 className="text-lg font-bold">{movie.Title}</h2>
      <p className="text-gray-600">{movie.Year}</p>
    </div>
  );
};

export default MovieCard;
