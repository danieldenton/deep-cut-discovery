export default function Tile({
  record,
  handleDeleteFave,
  showEdit,
  onClick,
  width,
}) {
  return (
    <div onClick={onClick} className={showEdit}>
      <div style={{ width }}>
        <img className="tiles" src={record.image} alt={record.title} />
      </div>
      {showEdit && (
        <button
          onClick={() => handleDeleteFave(record._id)}
          className="btn-dlt"
        >
          remove
        </button>
      )}
    </div>
  );
}
