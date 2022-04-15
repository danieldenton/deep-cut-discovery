import Post from "../partials/Post";
import Search from "../partials/Search";
import { useState } from "react";

export default function SearchPage({ currentUser }) {
  // STATE
  // searchResults for the handleSubmit search funcution in the search component
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState({});

  return (
    <div className="search-and-post-container">
      <Search
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        setSelectedRecord={setSelectedRecord}
      />

      <Post currentUser={currentUser} selectedRecord={selectedRecord} />
    </div>
  );
}
