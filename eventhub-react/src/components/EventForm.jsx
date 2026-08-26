import { useState, useEffect } from "react"

function EventForm({
  onAddEvent,
  onUpdateEvent,
  eventToEdit,
  onCancelEdit
}) {
  const [title, setTitle] = useState("")
  const [city, setCity] = useState("")
  const [date, setDate] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (eventToEdit) {
        setTitle(eventToEdit.title)
        setCity(eventToEdit.city)
        setDate(eventToEdit.date)
        setCategory(eventToEdit.category)
        setPrice(eventToEdit.price)
        setDescription(eventToEdit.description)
    }
}, [eventToEdit])

    function handleSubmit(event) {
        event.preventDefault()

        if (title.trim().length < 3) {
        alert("Titlul trebuie să aibă cel puțin 3 caractere.")
        return
        }

        if (city.trim().length < 2) {
        alert("Introdu un oraș valid.")
        return
        }

        if (!category) {
        alert("Alege o categorie.")
        return
        }

        if (!price || Number(price) < 0) {
        alert("Introdu un preț valid.")
        return
        }

        if (description.trim().length < 10) {
        alert("Descrierea trebuie să aibă cel puțin 10 caractere.")
        return
        }

        if (eventToEdit) {
        const updatedEvent = {
            ...eventToEdit,
            title: title,
            city: city,
            date: date,
            category: category,
            price: Number(price),
            description: description
        }

        onUpdateEvent(updatedEvent)
        onCancelEdit()
        } else {
        const newEvent = {
            title: title,
            city: city,
            date: date,
            category: category,
            price: Number(price),
            description: description
        }

        onAddEvent(newEvent)
        }

        setTitle("")
        setCity("")
        setDate("")
        setCategory("")
        setPrice("")
        setDescription("")
    }

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        {eventToEdit ? "Editează evenimentul" : "Adaugă un eveniment"}
      </h2>

      <input
        type="text"
        placeholder="Titlul evenimentului"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        />

      <input
        type="text"
        placeholder="Oraș"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        />

      <input
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
        />

      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        >
        <option value="">Alege categoria</option>
        <option value="Muzică">Muzică</option>
        <option value="Tehnologie">Tehnologie</option>
        </select>

      <input
        type="number"
        placeholder="Preț"
        min="0"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        />

      <textarea
        placeholder="Descriere"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        ></textarea>

      <button type="submit">
        {eventToEdit ? "Salvează modificările" : "Adaugă eveniment"}
      </button>
    </form>
  )
}

export default EventForm