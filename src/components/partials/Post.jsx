import { Link } from "react-router-dom";

export default function Post({ currentUser, selectedRecord }) {
  const selection = (
    <div className="post-selection-container">
      <img src={selectedRecord.cover_image} alt={selectedRecord.title} />
      <Link to="/post">Create a post</Link>
      <form>
        <button className="btn" type="submit">
          Add to favorites
        </button>
      </form>
    </div>
  );
  // Content to show when there's no selection
  const noSelection = (
    <div className="empty-post-container">
      <p>Select a record from your search results</p>
    </div>
  );

  let selected = selectedRecord.cover_image ? selection : noSelection;

  return (
    <div>
      <h1>Post</h1>
      <div className="post-container">{selected}</div>
    </div>
  );
}
