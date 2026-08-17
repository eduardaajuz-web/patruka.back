const express = require("express")
const app = express()
const port = 3000
app.use(express.json()) 
const fs = require('fs')  

app.post("/aulas", (req, res) => {
    const aula = req.body
    try {
            const bd = JSON.parse(fs.readFileSync("aulas.json", "utf8"))
        bd.push(aula)
         fs.writeFileSync("aulas.json", JSON.stringify(bd), "utf8")
        res.status(201).json({resposta: "Aula cadastrada!"})
    } catch (erro) {
        res.status(500).json({erro: erro.message})
    }
})

app.listen(port, ()=>{
    console.log("API rodando na porta " + port)
})