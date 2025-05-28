const express = require('express')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const path = require('path')   

const app = express()  
const porta = 3000   

const API_KEY = 'a4cdabe252b429cfe4924898c8fdcc86'

app.use(express.static("public"))

app.get("/converter", async (req, res) => { 
    try{
    const {valor, de, para} = req.query

    if (!valor || !de || !para) {
        return res.status(400).json({ error: "Parâmetros inválidos" })
    }
    console.log(`Fazendo requisição para a API: ${de} -> ${para}, valor:${valor}`)
    const url = `http://api.exchangerate.host/convert?access_key=${API_KEY}&from=${de}&to=${para}&amount=${valor}`
    console.log("URL da API:", url)
    const resposta = await fetch(url)
    const dados = await resposta.json()
    console.log("Resposta da API:", dados)
    if (!dados.success) {
        throw new Error(`Erro na API: ${dados.error?.info || "Erro desconhecido"}`)
    }
    res.json({
        valorConvertido: dados.result
    })
}catch (error) {
    console.error("Erro detalhado:", error)
    res.status(500).json({ 
        error: "Erro ao converter moeda",
        detalhes: error.message 
    })
}
})
app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`)
})