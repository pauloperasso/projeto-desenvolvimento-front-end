const express = require('express')
const app = express()
app.use(express.json())

app.listen(3000, () => console.log("Servidor Up and Running"))

//Requisição GET no endereço http://localhost:3000/oi
app.get("/oi", (req, res) => {
    res.send("Oi")
})

let filmes = [
    {
        titulo: "Forrest Gump - O Contador de Histórias",
        sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump(Tom Hanks) um rapaz com QI abaixo da média e boas intenções"
    },
    {
        titulo: "Um Sonho de Liberdade", sinopse: "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela"
    }
]

//Requisição GET para obter a lista de filmes no endereço http://localhost:3000/filmes


//requisição GET para obter a lista de filmes: http://localhost:3000/filmes
app.get("/filmes", (req, res) => {
    res.json(filmes)
})


//Requisição para cadastrar um novo filme na memória do navegador
//Requisição POST no http://localhost:3000/filmes

app.post("/filmes", (req, res) => {
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    const filme = {titulo: titulo, sinopse: sinopse}
    filmes.push(filme)
    res.send(filmes)
    })