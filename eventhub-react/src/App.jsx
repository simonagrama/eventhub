import { useState, useEffect } from "react"
import Header from "./components/Header"
import EventCard from "./components/EventCard"
import EventForm from "./components/EventForm"
import "./App.css"

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

function App() {
  const [events, setEvents] = useState(function () {
    const savedEvents = localStorage.getItem("events")

    if (savedEvents) {
      return JSON.parse(savedEvents)
    }

    return [
    {
      id: 1,
      title: "Rock Festival",
      city: "Brașov",
      date: "2026-09-25",
      category: "Muzică",
      price: 150
    },
    {
      id: 2, 
      title: "Tech Conference",
      city: "Brașov",
      date: "2026-10-10",
      category: "Tehnologie",
      price: 100
    },
    {
      id: 3,
      title: "Jazz Night",
      city: "Brașov",
      date: "2026-11-03",
      category: "Muzică",
      price: 80
    }
  ]
  })

  const [eventBeingEdited, setEventBeingEdited] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)

  useEffect(function () {
    localStorage.setItem("events", JSON.stringify(events))
  }, [events])

  function deleteEvent(titleToDelete) {
    const updatedEvents = events.filter(function (event) {
      return event.title !== titleToDelete
    })

    setEvents(updatedEvents)
  }

function addEvent(newEvent) {
  setEvents(function (currentEvents) {
    return [...currentEvents, newEvent]
  })
}

function updateEvent(updatedEvent) {
  setEvents(function (currentEvents) {
    return currentEvents.map(function (event) {
      if (event.id === eventBeingEdited.id) {
        return updatedEvent
      }

      return event
    })
  })

  setEventBeingEdited(null)
}

  function editEvent(event) {
    setEventBeingEdited(event)
}

  return (
    <>
      <Header />

      <main>
        <h2>Descoperă evenimente</h2>

        {selectedEvent && (
          <div className="event-details">
            <h2>{selectedEvent.title}</h2>

            <p><strong>Locație:</strong> {selectedEvent.city}</p>
            <p><strong>Data:</strong> {formatDate(selectedEvent.date)}</p>
            <p><strong>Categorie:</strong> {selectedEvent.category}</p>
            <p><strong>Preț:</strong> {selectedEvent.price} lei</p>
            <p><strong>Descriere:</strong> {selectedEvent.description}</p>

            <button onClick={() => setSelectedEvent(null)}>
              Închide
            </button>
          </div>
        )}

        <EventForm
          onAddEvent={addEvent}
          onUpdateEvent={updateEvent}
          eventToEdit={eventBeingEdited}
          onCancelEdit={() => setEventBeingEdited(null)}
        />

        {events.map(function (event) {
          return (
            <EventCard
              key={event.id}
              title={event.title}
              city={event.city}
              date={event.date}
              category={event.category}
              price={event.price}
              onDelete={() => deleteEvent(event.title)}
              onEdit={() => editEvent(event)}
              onDetails={() => setSelectedEvent(event)}
            />
          )
        })}
      </main>
    </>
  )
}

export default App