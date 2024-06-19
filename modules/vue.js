const urlData = "https://aulamindhub.github.io/amazing-api/events.json"
const { createApp } = Vue

const app = createApp({

    data() {
        return {
            eventos: [],
            eventosBK: [],
            categorias: [],
            textoBuscar: "",
            categoriasSeleccionadas: []
        }
    },
    created() {
        this.traerData(urlData)
    },
    methods: {
        traerData(url) {
            fetch(url).then(response => response.json()).then(data => {
                if (window.location.pathname === "/" || window.location.pathname === "/home.html") {
                    this.eventos = data.events
                    this.eventosBK = data.events
                    this.categorias = Array.from(new Set(this.eventos.map((event) => event.category)))
                } else if (window.location.pathname === "/pastEvents.html") {
                    this.eventos = data.events.filter(event => event.date < data.currentDate)
                    this.eventosBK = data.events.filter(event => event.date < data.currentDate)
                    this.categorias = Array.from(new Set(this.eventos.map(event => event.category)))
                } else if (window.location.pathname === "/upcomingEvents.html") {
                    this.eventos = data.events.filter(event => event.date > data.currentDate)
                    this.eventosBK = data.events.filter(event => event.date > data.currentDate)
                    this.categorias = Array.from(new Set(this.eventos.map(event => event.category)))
                }
            })
        }
    },
    computed: {
        filtroCombinado() {
            let filtroTexto = this.eventosBK.filter(info => info.name.toLowerCase().includes(this.textoBuscar.toLowerCase()))
            if (this.categoriasSeleccionadas.length > 0) {
                this.eventos = filtroTexto.filter((evento) => this.categoriasSeleccionadas.includes(evento.category))
            } else {
                this.eventos = filtroTexto
            }
        }
    }

}).mount('#main')