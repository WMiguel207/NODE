const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let resolvidos = {
    grampeador: false,
    papeis: false,
    almofada: false,
    livro: false,
    abajur: false,
    vaso: false
}

function menuPrincipal() {
    console.log("\n🔒 Você está preso em uma sala antiga e silenciosa...")
    console.log("🪑 Ao seu redor, você vê:")
    console.log("1️ - Um grampeador enferrujado")
    console.log("2️ - Um monte de papéis amassados")
    console.log("3️ - Uma almofada fora do lugar")
    console.log("4️ - Um livro empoeirado sobre a cadeira")
    console.log("5️ - Um abajur com formato estranho")
    console.log("6️ - Um vaso com flores mortas")
    console.log("7️- A porta trancada")

    rl.question("\n🕵️‍♂️ O que você deseja investigar? ", (resposta) => {
        switch (resposta.trim()) {
            case "1":
                investigarGrampeador()
                break
            case "2":
                investigarPapeis()
                break
            case "3":
                investigarAlmofada()
                break
            case "4":
                investigarLivro()
                break
            case "5":
                investigarAbajur()
                break
            case "6":
                investigarVaso()
                break
            case "7":
                verificarPorta()
                break
            default:
                console.log("❌ Escolha inválida.")
                menuPrincipal()
        }
    })
}

function investigarGrampeador() {
    if (resolvidos.grampeador) {
        console.log("📎 Você já resolveu esse enigma.")
        console.log("✅ O segundo número é: 3")
        return menuPrincipal()
    } else {
        rl.question("\n📎 Dentro do grampeador tem um bilhete: 'Sou cheio de buracos, mas seguro a água. O que sou?' ", (resposta) => {
            if (resposta.trim().toLowerCase() === "esponja") {
                console.log("✅ Correto... o segundo número é: 3")
                resolvidos.grampeador = true
            } else {
                console.log("❌ Resposta errada...")
            }
            menuPrincipal()
        })
    }
}

function investigarPapeis() {

    console.log("📄 No topo da página há um número '1°'.")
    console.log("Você encontra 3 números escritos em azul: 5, 7, 10")
    console.log("E 2 números em vermelho no rodapé: 6, 9")
    console.log("💡 Dica: o primeiro número é o único azul que também é um dígito único.")
    menuPrincipal()
}

function investigarAlmofada() {
        console.log ("🛏️ Ao levantar a almofada, você encontra um bilhete com a história:\n" +
        "“Fui dormir às 22h. O despertador estava programado para 9 horas depois.\n" +
        "Mas meu gato me acordou 2 horas antes, e consegui dormir mais 1 hora antes de levantar.”\n" +
        "🤔 Por quanto tempo eu dormi? ")
        menuPrincipal()
}

function investigarLivro() {
    if (resolvidos.livro) {
        console.log("📘 Você já resolveu o mistério do livro.")
        console.log("✅ O quarto número é: 4")
        return menuPrincipal()
    }

    rl.question(
        "\n📘 Dentro do livro empoeirado, há uma frase sublinhada: “O quanto vale 3.”\n" +
        "🧠 Que número é esse? ",
        (resposta) => {
            if (resposta.trim() === "4") {
                console.log("✅ Correto... o quarto número é: 4")
                resolvidos.livro = true
            } else {
                console.log("❌ Errado... pense na palavra 'três'.")
            }
            menuPrincipal()
        }
    )
}

function investigarAbajur() {
    console.log("💡 Você liga o abajur e vê números se formando na sombra projetada na parede: 1, 3, 5, 7, ?")
    console.log("🧩 Qual o próximo número da sequência? ")
    menuPrincipal()
    }

function investigarVaso() {
        console.log("🏺 Dentro do vaso, sob as flores secas, há um papel molhado que diz:")
        console.log("“Sou o fim... A raiz de 25, e o dobro depois.”")
            menuPrincipal()
        }

function verificarPorta() {
    rl.question(
        "\n🔢 A porta brilha e revela um teclado. Digite os números da sequência correta:")
        if (resposta.trim() === "7384910") {
            console.log("\n🔓 Você ouve um *clique*... A porta se abre lentamente.")
            console.log("🎉 Parabéns! Você escapou da sala!\n")
            rl.close()
        } else {
            console.log("❌ Código incorreto. A porta continua trancada.")
            menuPrincipal()
        }
    }
menuPrincipal()
