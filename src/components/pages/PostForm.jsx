import BigTile from "../partials/BigTile";

export default function PostForm({
  currentUser,
  selectedRecord,
  searchValue,
  setSearchValue,
}) {
  return (
    <div>
      <h1>Post</h1>
      <form>
        <BigTile
          selection={{
            image: selectedRecord.cover_image,
            title: selectedRecord.title,
          }}
        />
        <input
          type="text"
          autoComplete="off"
          placeholder="Tell us about this record"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <input
          type="text"
          autoComplete="off"
          placeholder="Share a link where this record can be heard"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
