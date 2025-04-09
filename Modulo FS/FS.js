const fs = require("fs")

fs.writeFileSync("mensagem.xlsx", "Oi, criei este arquivo pelo NODE")

console.log("Arquivo criado")