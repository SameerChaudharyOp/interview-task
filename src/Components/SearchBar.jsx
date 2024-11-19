import React, { useState } from "react";

const SearchBar = ({ onSearch, searchTerm, setSearchTerm }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mb-8">
      <input
        type="text"
        className="border rounded-lg px-4 py-2 w-1/2"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
