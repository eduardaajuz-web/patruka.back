const express = require("express")
const app = express()
const port = 3000
app.use(express.json())
const fs = require('fs')


const arquivoID = JSON.parse(fs.readFileSync("id.json", "utf8"))
let id = arquivoID.id

function atualizarID() {
    id = id + 1
    fs.writeFileSync("id.json", JSON.stringify({id: id}), "utf8")
}

app.post("/aulas", (req, res) => {
    const aula = req.body
    try {
            
        const aulas = JSON.parse(fs.readFileSync("aulas.json", "utf8"))
            atualizarID()
         aula.id = id
         aulas.push(aula)
            fs.writeFileSync("aulas.json", JSON.stringify(aulas), "utf8")
        res.status(201).json({resposta: "Aula cadastrada!"})
    } catch (erro) {
        res.status(500).json({erro: erro.message})
    }
})


app.get("/aulas", (req, res) => {
    try {
        const aulas = JSON.parse(fs.readFileSync("aulas.json", "utf8"))
        res.status(200).json({resposta: aulas})
    } catch (erro) {
        res.status(500).json({erro: erro.message})
    }
})


app.get("/aulas/:id", (req, res) => {
    const id = req.params.id
    try {
        const aulas = JSON.parse(fs.readFileSync("aulas.json", "utf8"))
        const aula = aulas.find((aula) => aula.id == id)
        if(!aula) {
            return res.status(404).json({erro: "Aula não existe no BD!"})
        }
        res.status(200).json({resposta: aula})
    } catch (erro) {
        res.status(500).json({erro: erro.message})
    }
})

app.delete("/aulas/:id", (req, res) => {
    // pegar o cpf da rota
    const id = req.params.id
    try {
        // abrir o banco de dados
        const aulas = JSON.parse(fs.readFileSync("aulas.json", "utf8"))
        // encontrar o índice do cliente a ser excluido
        const indiceAulas = aulas.findIndex((aula) => aula.id == id)
        // remover o indice da lista
        if (indiceAulas == -1) {
            return res.status(404).json({erro: " A aula não existe"})
        }
        bd.splice(indiceAulas, 1)
        // atualizar o arquivo
        fs.writeFileSync("aulas.json", JSON.stringify(aula), "utf8")
        // dar uma resposta para o cliente
        res.status(200).json({resposta: "Aula excluída com sucesso!"})
    } catch (error){
        res.status(500).json({erro: erro.message})
    }
})

app.listen(port, ()=>{
    console.log("API rodando na porta" + port)
})