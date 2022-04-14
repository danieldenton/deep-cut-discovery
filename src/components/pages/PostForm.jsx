export default function PostForm({ currentUser, selectedRecord }) {
  return (
    <div>
      <form>
        <input
          type="image"
          src={selectedRecord.cover_image}
          alt={selectedRecord.title}
        />
        {/* <input
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
        /> */}
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
