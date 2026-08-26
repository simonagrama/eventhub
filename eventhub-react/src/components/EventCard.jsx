function formatDate(date) {
  if (!date) {
    return ""
  }

  const dateObject = new Date(date)

  if (isNaN(dateObject.getTime())) {
    return date
  }

  return dateObject.toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric"
  })
}

function EventCard({
  title,
  city,
  date,
  category,
  price,
  onDelete,
  onEdit,
  onDetails
}) {
  return (
  <article className="event">
    <div className="event-header">
      <h3>{title}</h3>
      <span className="event-category">{category}</span>
    </div>

    <div className="event-info">
      <p>📍 {city}</p>
      <p>📅 {formatDate(date)}</p>
      <p>💰 {price} lei</p>
    </div>

    <div className="event-actions">
      <button onClick={onDetails}>Vezi evenimentul</button>
      <button onClick={onEdit}>Editează</button>
      <button onClick={onDelete}>Șterge</button>
    </div>
  </article>
)
}

export default EventCard