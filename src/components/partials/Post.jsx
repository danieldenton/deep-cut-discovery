import { Link } from "react-router-dom";
import Tile from "./Tile";

export default function Post({ post }) {
  return (
    <div className="post">
      <div className="post-title">
        <h6>{post.title}</h6>
      </div>
      <div className="tile-text">
        <div className="post-tile">
          <a href={post.link} target="_blank">
            <Tile record={{ image: post.image, title: post.title }} />
          </a>
        </div>
        <div className="creator-and-post">
          <div className="post-text">
            <p>{post.text}</p>
            <p>{post.date}</p>
          </div>
          <Link to={`/profile/${post.creatorId}`} className="post-creator">
            {post.creator}
          </Link>
        </div>
      </div>
    </div>
  );
}
