import * as functions from "../modules/functions.js"

const urlData = "https://aulamindhub.github.io/amazing-api/events.json"

let pastEvents = []
let upcomingEvents = []
let tabla1 = document.getElementById("tabla1")
let tabla2 = document.getElementById("tabla2")
let tabla3 = document.getElementById("tabla3")

fetch(urlData).then(response => response.json())
    .then(data => {
        let highestAssistance = []
        let porcentajeHighest = []
        pastEvents = functions.filtrarPastEvents(data.events, data.currentDate)
        pastEvents.forEach(element => {
            porcentajeHighest.push((element.assistance * 100) / element.capacity)
            porcentajeHighest.sort((a, b) => b - a).forEach(filtrar => {
                porcentajeHighest.push(filtrar)
            })
        })
        pastEvents.sort((a, b) => ((b.assistance * 100) / b.capacity) - ((a.assistance * 100) / a.capacity)).forEach(filtrar => highestAssistance.push(filtrar))

        let lowestAssistance = []
        let porcentajeLowest = []
        pastEvents = functions.filtrarPastEvents(data.events, data.currentDate)
        pastEvents.forEach(element => {
            porcentajeLowest.push((element.assistance * 100) / element.capacity)
            porcentajeLowest.sort((a, b) => a - b).forEach(filtrar => {
                porcentajeLowest.push(filtrar)
            })
        })
        pastEvents.sort((a, b) => ((a.assistance * 100) / a.capacity) - ((b.assistance * 100) / b.capacity)).forEach(filtrar => lowestAssistance.push(filtrar))

        let highestCapacity = []
        data.events.sort((a, b) => b.capacity - a.capacity).forEach(filtrar => {
            highestCapacity.push(filtrar)
        })

        let nuevaFila = document.createElement("tr")
        nuevaFila.innerHTML = `
            <tr>
                <td>${highestAssistance[0].name} with ${porcentajeHighest[0].toFixed(2)}%</td>
                <td>${lowestAssistance[0].name} with ${porcentajeLowest[0].toFixed(2)}%</td>
                <td>${highestCapacity[0].name} with ${highestCapacity[0].capacity.toLocaleString()}!!</td>
            </tr>
            `
        tabla1.appendChild(nuevaFila)

        upcomingEvents = functions.filtrarUpcoming(data.events, data.currentDate)
        let datosPorCategoriaUpcoming = {}
        upcomingEvents.forEach(event => {
            let ganancias = event.estimate * event.price

            if (!datosPorCategoriaUpcoming[event.category]) {
                datosPorCategoriaUpcoming[event.category] = {
                    totalGanancias: 0,
                    totalCapacidad: 0,
                    totalEstimado: 0
                }
            }
            datosPorCategoriaUpcoming[event.category].totalGanancias += ganancias
            datosPorCategoriaUpcoming[event.category].totalCapacidad += event.capacity
            datosPorCategoriaUpcoming[event.category].totalEstimado += event.estimate
        })

        for (let category in datosPorCategoriaUpcoming) {
            let datosPorCategoriaUpcoming2 = datosPorCategoriaUpcoming[category]
            let gananciasPorcategoriaUpcoming = datosPorCategoriaUpcoming2.totalGanancias
            let porcentajeEstimado = (datosPorCategoriaUpcoming2.totalEstimado / datosPorCategoriaUpcoming2.totalCapacidad) * 100
            let nuevaFila2 = document.createElement("tr")
            nuevaFila2.innerHTML = `
                <tr>
                    <td>${category}</td>
                    <td>$${gananciasPorcategoriaUpcoming.toLocaleString()}</td>
                    <td>${porcentajeEstimado.toFixed(2)}%</td>
                </tr>
                `
            tabla2.appendChild(nuevaFila2)
        }

        let datosPorCategoriaPast = {}
        pastEvents.forEach(event => {
            let ganancias = event.assistance * event.price

            if (!datosPorCategoriaPast[event.category]) {
                datosPorCategoriaPast[event.category] = {
                    totalGanancias: 0,
                    totalCapacidad: 0,
                    totalAsistencia: 0
                }
            }
            datosPorCategoriaPast[event.category].totalGanancias += ganancias
            datosPorCategoriaPast[event.category].totalCapacidad += event.capacity
            datosPorCategoriaPast[event.category].totalAsistencia += event.assistance
        })

        for (let category in datosPorCategoriaPast) {
            let datosPorCategoriaPast2 = datosPorCategoriaPast[category]
            let gananciasPorcategoriaPast = datosPorCategoriaPast2.totalGanancias
            let porcentajeAsistencia = (datosPorCategoriaPast2.totalAsistencia / datosPorCategoriaPast2.totalCapacidad) * 100
            let nuevaFila3 = document.createElement("tr")
            nuevaFila3.innerHTML = `
                <tr>
                    <td>${category}</td>
                    <td>$${gananciasPorcategoriaPast.toLocaleString()}</td>
                    <td>${porcentajeAsistencia.toFixed(2)}%</td>
                </tr>
                `
            tabla3.appendChild(nuevaFila3)
        }
    })