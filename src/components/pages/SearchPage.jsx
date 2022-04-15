import Post from "../partials/Post";
import Search from "../partials/Search";
import { useState } from "react";

export default function SearchPage({
  currentUser,
  setSelectedRecord,
  selectedRecord,
  searchValue,
  setSearchValue,
}) {
  // STATE
  // searchResults for the handleSubmit search funcution in the search component
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="search-and-post-container">
      <Search
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        setSelectedRecord={setSelectedRecord}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <Post currentUser={currentUser} selectedRecord={selectedRecord} />
    </div>
  );
}