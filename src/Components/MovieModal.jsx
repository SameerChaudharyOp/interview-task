import React from "react";

const MovieModal = ({ movie, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">{movie.Title}</h2>
        <img src={movie.Poster} alt={movie.Title} className="w-full mb-4" />
        <p className="text-gray-700">
          <strong>Year:</strong> {movie.Year}
        </p>
        <p className="text-gray-700">
          <strong>Genre:</strong> {movie.Genre}
        </p>
        <p className="text-gray-700">
          <strong>Plot:</strong> {movie.Plot}
        </p>
        <p className="text-gray-700">
          <strong>Rating:</strong> {movie.imdbRating}
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MovieModal;
