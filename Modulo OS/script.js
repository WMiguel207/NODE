const os = require("os")

console.log("Sistema Operacional:", os.platform())
console.log("Arquitetura:", os.arch())
console.log("Memória Livre:", os.freemem(), "bytes")
console.log("Memória Total:", os.totalmem(), "bytes")