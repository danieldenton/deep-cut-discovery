export default function Tile({
  record,
  handleDeleteFave,
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
      <div className="tiles" style={{ width }}>
        <img src={record.image} alt={record.title} />
      </div>
      {showEdit && (
        <button
          onClick={() => handleDeleteFave(record._id)}
          className="btn-dlt"
        >
          Delete
        </button>
      )}
    </div>
  );
}
