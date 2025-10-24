const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require("cors")
app.use(express.json())
app.use(cors())
const stringConexao = process.env.CONEXAO_BD

const Filme = mongoose.model("Filme", mongoose.Schema(
    {
        titulo: { type: String },
        sinopse: { type: String }

    }
))


async function conectarAoMongoDB() {
    await mongoose.connect(stringConexao)
}
// requis~ição app no endereço http://localhost:3000/oi
app.get('/oi', (req, res) => {
    res.send('oi')
})

let filmes = [
    {
        titulo: "Forrest Gump - O Contador de Histórias",
        sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump(Tom Hanks),um rapaz com QI abaixo da média e boas intenções."
    },
    {
        titulo: "Um Sonho de Liberdade",
        sinopse: "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime quenunca cometeu, o homicídio de sua esposa e do amante dela"
    }
]

// requisição get para obter a lista de filmes http://localhost:3000/filmes
app.get("/filmes", async (req, res) => {
    const filmes = await Filme.find()
    res.json(filmes)
})

// requisição para cadastrar um novo filme na memória do navegador (ou seja, é volátil)
// app.post("/filmes", (req, res) => {
//     // primeiro capturar o que chega até mim
//     // obtem as informaçõe sque chegam
//     const titulo = req.body.titulo
//     const sinopse = req.body.sinopse
//     // monta objeto json
//     const filme = { titulo: titulo, sinopse: sinopse }
//     filmes.push(filme)
//     // esse comando push adiciona o filme no novo array
//     // só para verificar 
//     res.send(filmes)

// })
// agora mudaremos para uma no banco
app.post("/filmes", async (req, res) => {
    // primeiro capturar o que chega até mim
    // obtem as informaçõe sque chegam
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    // monta objeto json de acordo com o model filme (classe)
    const filme = new Filme({ titulo: titulo, sinopse: sinopse });

    // mandar o filme para o banco
    await filme.save()
    // buscar a lista d efiomes atualizada do banco  
    const filmes = await Filme.find()
    res.json(filmes)
})
// post: http://localhost:3000/filmes


app.listen(3000, () => {
    try {
        conectarAoMongoDB()
        console.log("Conectado ao banco")
    } catch (e) {
        console.log("erro " + e)
    }
    console.log("Servidor Up and Running & Banco Conectado")
})
