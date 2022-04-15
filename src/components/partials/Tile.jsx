export default function Tile({
  selection,
  handleDelete,
  showEdit,
  onClick,
  width,
}) {
  return (
    <div
      onClick={onClick}
      className={
        showEdit
          ? "polaroid animate__animated animate__infinite animate__pulse"
          : "polaroid animate__animated animate__fadeIn"
      }
    >
      {/* <Link to={`/pictures/${photo._id}`}> */}

      <div className="tiles" style={{ width }}>
        <img src={selection.image} alt={selection.title} />
      </div>
      {/* </Link> */}
      {showEdit && (
        <button onClick={() => handleDelete(selection._id)} className="btn-dlt">
          Delete
        </button>
      )}
    </div>
  );
}
