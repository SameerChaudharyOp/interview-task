import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./Components/SearchBar";
import MovieList from "./Components/MovieList";
import MovieModal from "./Components/MovieModal";

const API_KEY = "77b1e52a";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const MOVIE_RESULTS_PER_PAGE = 20;

  const shuffleMovies = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  useEffect(() => {
    axios
      .get(
        `https://www.omdbapi.com/?s=star&apikey=${API_KEY}&page=${currentPage}`
      )
      .then((response) => {
        if (response.data.Response === "True") {
          const allMovies = [...response.data.Search];

          axios
            .get(
              `https://www.omdbapi.com/?s=star&apikey=${API_KEY}&page=${
                currentPage + 1
              }`
            )
            .then((nextPageResponse) => {
              if (nextPageResponse.data.Response === "True") {
                allMovies.push(...nextPageResponse.data.Search);
                setMovies(
                  shuffleMovies(allMovies.slice(0, MOVIE_RESULTS_PER_PAGE))
                );
              }
            })
            .catch((error) => {
              console.error("Error fetching next page of movie data:", error);
            });
        } else {
          setMovies([]);
          setErrorMessage("No Movies Found");
        }
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
        setErrorMessage("Error fetching movie data. Please try again.");
      });
  }, [currentPage]);

  const handleSearch = (term) => {
    setErrorMessage("");
    if (term.trim()) {
      axios
        .get(`https://www.omdbapi.com/?s=${term}&apikey=${API_KEY}&page=1`)
        .then((response) => {
          if (response.data.Response === "True") {
            const allMovies = [...response.data.Search];

            axios
              .get(
                `https://www.omdbapi.com/?s=${term}&apikey=${API_KEY}&page=2`
              )
              .then((nextPageResponse) => {
                if (nextPageResponse.data.Response === "True") {
                  allMovies.push(...nextPageResponse.data.Search);
                  setMovies(
                    shuffleMovies(allMovies.slice(0, MOVIE_RESULTS_PER_PAGE))
                  );
                }
              })
              .catch((error) => {
                console.error("Error fetching next page of movie data:", error);
              });
          } else {
            setMovies([]);
            setErrorMessage("No Movies Found");
          }
        })
        .catch((error) => {
          console.error("Error fetching movie data:", error);
          setErrorMessage("Error fetching movie data. Please try again.");
        });
    } else {
      setMovies([]);
      setErrorMessage("Please enter a movie name to search.");
    }
  };

  const handleMovieSelect = (movie) => {
    axios
      .get(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`)
      .then((response) => {
        if (response.data) {
          setSelectedMovie(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Movie Search App</h1>
      <SearchBar
        onSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {errorMessage && (
        <p className="text-center text-red-500 font-semibold">{errorMessage}</p>
      )}

      <MovieList movies={movies} onSelectMovie={handleMovieSelect} />

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage <= 1}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
