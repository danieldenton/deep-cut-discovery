import FaveOrPost from "../partials/FaveOrPost";
import Search from "../partials/Search";
import "../../css/SearchPage.css";
import { useState } from "react";

export default function SearchPage({
  currentUser,
  setSelectedRecord,
  selectedRecord,
  value,
  setValue,
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
        value={value}
        setValue={setValue}
      />

      <FaveOrPost
        currentUser={currentUser}
        selectedRecord={selectedRecord}
        setSelectedRecord={setSelectedRecord}
      />
    </div>
  );
}
