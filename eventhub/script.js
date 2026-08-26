const searchInput = document.querySelector("input");
const eventsContainer = document.querySelector("#events-container");
const eventDetails = document.querySelector("#event-details");
const categoryFilter = document.querySelector("#category-filter");
const eventForm = document.querySelector("#event-form");
const formMessage = document.querySelector("#form-message");
const editFormContainer = document.querySelector("#edit-form-container");
const editForm = document.querySelector("#edit-form");
const cancelEditButton = document.querySelector("#cancel-edit");
const editFormMessage = document.querySelector("#edit-form-message");

let eventBeingEdited = null;

const defaultEvents = [
    {
        title: "Rock Festival",
        city: "Brașov",
        date: "2026-09-25",
        category: "Muzică",
        description: "Un festival de rock cu formații locale și internaționale.",
        price: 150
    },
    {
        title: "Tech Conference",
        city: "Brașov",
        date: "2026-10-10",
        category: "Tehnologie",
        description: "Conferință dedicată tehnologiilor moderne și dezvoltării software.",
        price: 100
    },
    {
        title: "Jazz Night",
        city: "Brașov",
        date: "2026-11-03",
        category: "Muzică",
        description: "O seară de jazz într-o atmosferă relaxată.",
        price: 80
    }
];

let events = JSON.parse(localStorage.getItem("events")) || defaultEvents;

function formatDate(date) {
    const dateObject = new Date(date);

    return dateObject.toLocaleDateString("ro-RO", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

function displayEvents(eventsToDisplay) {
    eventsContainer.innerHTML = "";

    eventsToDisplay.forEach(function (event) {
        const article = document.createElement("article");

        article.classList.add("event");

        article.innerHTML = `
            <h3>${event.title}</h3>
            <p>${event.city}</p>
            <p>${formatDate(event.date)}</p>
            <p>${event.category}</p>
            <p>${event.price} lei</p>
            <button class="details-button">Vezi evenimentul</button>
            <button class="edit-button">Editează</button>
            <button class="delete-button">Șterge</button>
        `;

        const button = article.querySelector(".details-button");

        button.addEventListener("click", function () {
            eventDetails.innerHTML = `
                <h2>${event.title}</h2>
                <p><strong>Locație:</strong> ${event.city}</p>
                <p><strong>Data:</strong> ${event.date}</p>
                <p><strong>Categorie:</strong> ${event.category}</p>
                <p><strong>Preț:</strong> ${event.price} lei</p>
                <p>${event.description}</p>
            `;

            eventDetails.style.display = "block";
        });

        const deleteButton = article.querySelector(".delete-button");

        deleteButton.addEventListener("click", function () {
        const confirmed = confirm(
            `Sigur vrei să ștergi evenimentul "${event.title}"?`
        );

        if (!confirmed) {
            return;
        }

        const eventIndex = events.indexOf(event);

        events.splice(eventIndex, 1);

        localStorage.setItem("events", JSON.stringify(events));

        displayEvents(events);
    });

const editButton = article.querySelector(".edit-button");

editButton.addEventListener("click", function () {
    eventBeingEdited = event;

    document.querySelector("#edit-title").value = event.title;
    document.querySelector("#edit-city").value = event.city;
    document.querySelector("#edit-date").value = event.date;
    document.querySelector("#edit-category").value = event.category;
    document.querySelector("#edit-price").value = event.price;
    document.querySelector("#edit-description").value = event.description;

    editFormContainer.style.display = "block";
});
        eventsContainer.appendChild(article);
    });
}

displayEvents(events);
   
function filterEvents() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredEvents = events.filter(function (event) {
        const matchesSearch =
            event.title.toLowerCase().includes(searchText) ||
            event.city.toLowerCase().includes(searchText) ||
            event.category.toLowerCase().includes(searchText) ||
            event.description.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            event.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayEvents(filteredEvents);
}

searchInput.addEventListener("input", filterEvents);

categoryFilter.addEventListener("change", filterEvents);

eventForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.querySelector("#event-title").value.trim();
    const city = document.querySelector("#event-city").value.trim();
    const date = document.querySelector("#event-date").value.trim();
    const category = document.querySelector("#event-category").value;
    const price = Number(document.querySelector("#event-price").value);
    const description = document.querySelector("#event-description").value.trim();

    if (title.length < 3) {
    formMessage.textContent =
        "Titlul trebuie să aibă cel puțin 3 caractere.";
        return;
    }

    if (city.length < 2) {
        formMessage.textContent = "Introdu un oraș valid.";
        return;
    }

    if (price < 0) {
        formMessage.textContent = "Prețul nu poate fi negativ.";
        return;
    }

    if (description.length < 10) {
        formMessage.textContent =
            "Descrierea trebuie să aibă cel puțin 10 caractere.";
        return;
    }

    formMessage.textContent = "";

    const newEvent = {
        title: title,
        city: city,
        date: date,
        category: category,
        price: price,
        description: description
    };

    events.push(newEvent);

    localStorage.setItem("events", JSON.stringify(events));

    displayEvents(events);

    eventForm.reset();

    formMessage.textContent =
        "Evenimentul a fost adăugat cu succes!";
});

editForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.querySelector("#edit-title").value.trim();
    const city = document.querySelector("#edit-city").value.trim();
    const price = Number(document.querySelector("#edit-price").value);
    const description = document.querySelector("#edit-description").value.trim();

    if (title.length < 3) {
        editFormMessage.textContent =
            "Titlul trebuie să aibă cel puțin 3 caractere.";
        return;
    }

    if (city.length < 2) {
        editFormMessage.textContent =
            "Introdu un oraș valid.";
        return;
    }

    if (price < 0) {
        editFormMessage.textContent =
            "Prețul nu poate fi negativ.";
        return;
    }

    if (description.length < 10) {
        editFormMessage.textContent =
            "Descrierea trebuie să aibă cel puțin 10 caractere.";
        return;
    }

    editFormMessage.textContent = "";

    eventBeingEdited.title =
        document.querySelector("#edit-title").value.trim();

    eventBeingEdited.city =
        document.querySelector("#edit-city").value.trim();

    eventBeingEdited.date =
        document.querySelector("#edit-date").value.trim();

    eventBeingEdited.category =
        document.querySelector("#edit-category").value;

    eventBeingEdited.price =
        Number(document.querySelector("#edit-price").value);

    eventBeingEdited.description =
        document.querySelector("#edit-description").value.trim();

    localStorage.setItem("events", JSON.stringify(events));

    displayEvents(events);

    editForm.reset();
    editFormContainer.style.display = "none";

    eventBeingEdited = null;
});

cancelEditButton.addEventListener("click", function () {
    editForm.reset();

    editFormContainer.style.display = "none";

    eventBeingEdited = null;
});