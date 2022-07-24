import axios from "axios";
import Tile from "./Tile";

export default function Search({
  searchResults,
  setSearchResults,
  setSelectedRecord,
  value,
  setValue,
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
        `https://api.discogs.com/database/search?q=${value}&key=tuREWmtEZJcsMebejslm&secret=${process.env.aGqHHNSrjltjRctqxaaqwNyiqTTThHfD}`,
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
        record={{
          image: searchResult.cover_image,
          title: searchResult.title,
        }}
      />
    );
  });

  return (
    <div className="search">
      <div className="search-form-container">
        <div>
          <p className="search-message">Search Discogs for your record here:</p>
        </div>
        <form className="search-form" onSubmit={handleSubmit}>
          <div>
            <input
              className="search-input"
              type="text"
              autoComplete="off"
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div>
            <button className="search-btn" type="submit">
              search
            </button>
          </div>
        </form>
      </div>
      <div className="search-results-container">
        <div className="search-result-tiles">{images}</div>
      </div>
    </div>
  );
}
