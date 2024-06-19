let contenDetails = document.getElementById("details")
let idDetails = window.location.href
idDetails = new URL(idDetails).searchParams.get("value")

const urlData = "https://aulamindhub.github.io/amazing-api/events.json"

fetch(urlData).then(response => response.json())
    .then(data => {
        pintarDetalles(data.events, idDetails, contenDetails)
        
        function pintarDetalles(events, id, contenDetails) {
            for (let event of events) {
                if (event._id == id) {
                    let card = events.filter(evento => evento._id == idDetails)
                    card.forEach(evento => {
                        let contenedorDetails = document.createElement("div")
                        contenedorDetails.className = "row g-0"
                        contenedorDetails.innerHTML = `
                        <div class="row g-0">
                            <div class="col-md-8">
                                <img src="${evento.image}" class="img-fluid" alt="${evento.category}">
                            </div>
                            <div class="col-md-4 d-flex">
                                <div class="card-body d-flex flex-column justify-content-around">
                                    <h3 class="card-title">${evento.name}</h3>
                                    <p class="card-text">${evento.description}</p>
                                    <p>Date: ${evento.date < data.currentDate ? "This event has already passed" : evento.date}</p>
                                    <p>Category: ${evento.category}</p>
                                    <p>Place: ${evento.place}</p>
                                    <p>Capacity: ${evento.capacity}</p>
                                    <p>${evento.date < data.currentDate ? "Assistance: " : "Estimate: "}${evento.assistance || evento.estimate}</p>
                                    <p>Price: ${evento.price}</p>
                                </div>
                            </div>
                        </div>`
                        contenDetails.appendChild(contenedorDetails)
                    })
                }
            }
        }
    })