export default function Tile({ record, handleDeleteFave, showEdit, onClick }) {
  return (
    <div onClick={onClick} className="tiles">
      <img src={record.image} alt={record.title} />{" "}
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
