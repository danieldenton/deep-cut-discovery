import { useState, useEffect } from "react";
import axios from "axios";

export default function Discover({ currentUser }) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  const images = searchResults.map((searchResult, idx) => {
    return <div key={`searchResult-link${idx}`}></div>;
  });

  return (
    <div className="discover">
      <h1>Discover</h1>

      <form className="discover-form" onSubmit={handleSubmit}>
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
    </div>
  );
}
