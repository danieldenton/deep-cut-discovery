import { useState } from "react";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  return ( 
    <form>
      <input
        typeof="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      ></input>
      <input typeof="submit">Search</input>
    </form>
  );
}
