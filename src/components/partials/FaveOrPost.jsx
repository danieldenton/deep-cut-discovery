import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function FaveOrPost({ currentUser, selectedRecord }) {
  let navigate = useNavigate();

  const handleSubmitFave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
      const options = {
        headers: {
          Authorization: token,
        },
      };
      console.log(selectedRecord.title);
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/faves`,
        { image: selectedRecord.cover_image, title: selectedRecord.title },
        options
      );
      navigate(`/profile/${currentUser.id}`);
    } catch (err) {
      console.log(err);
    }
  };
  const selection = (
    <div className="post-selection-container">
      <Link className="post-link" to="/post">
        create a post
      </Link>
      <form>
        <button className="fave-btn" type="submit" onClick={handleSubmitFave}>
          add to favorites
        </button>
      </form>
      <img
        className="selection-img"
        src={selectedRecord.cover_image}
        alt={selectedRecord.title}
      />
    </div>
  );
  // Content to show when there's no selection
  const noSelection = (
    <div className="empty-post-container">
      <p className="search-message">
        Search for a record. Then select one of the search results to create a
        post with.
      </p>
    </div>
  );

  let selected = selectedRecord.cover_image ? selection : noSelection;

  return (
    <div>
      <div className="post-container">{selected}</div>
    </div>
  );
}
