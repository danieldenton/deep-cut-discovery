import { useState } from "react";
import axios from "axios";
import Tile from "./Tile";

export default function Search({
  currentUser,
  searchResults,
  setSearchResults,
  setSelectedRecord,
  searchValue,
  setSearchValue,
}) {
  // FUNCTIONS
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
      const options = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.get(
        `https://api.discogs.com/database/search?q=${searchValue}&key=tuREWmtEZJcsMebejslm&secret=${process.env.REACT_APP_API_SECRET}`,
        options
      );
      console.log(response.data.results);
      setSearchResults(response.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectionClick = (searchResult) => {
    setSelectedRecord(searchResult);
  };

  const images = searchResults.map((searchResult, idx) => {
    return (
      <Tile
        onClick={() => handleSelectionClick(searchResult)}
        selection={{
          image: searchResult.cover_image,
          title: searchResult.title,
        }}
      />
    );
  });

  return (
    <div className="search">
      <h1>Search</h1>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Search"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className="btn" type="submit">
          Search
        </button>
      </form>
      <div className="search-results-container">{images}</div>
    </div>
  );
}
