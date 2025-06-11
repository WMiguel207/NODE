const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let resolvidos = {
    grampeador: false,
}

function menuPrincipal(){
    console.log("\nVocê está em uma sala trancada")
    console.log("Ao seu redor você vê:")
    console.log("1- Grampeador")
    console.log("2- Um monte de papéis amassados")
    console.log("3- Uma almofada fora do lugar")
    console.log("4- A porta trancada")

    rl.question("\nO que você deseja fazer?", (resposta) =>{
        switch (resposta.trim()){
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
                verificarPorta()
                break
            default:
                console.log("Escolha invalida")
                menuPrincipal()
        }
    })
}

function investigarGrampeador(){
    if(resolvidos.grampeador){
        console.log("Você já resolveu este desafio")
        return menuPrincipal()
    }else{
        rl.question("\n dentro do grmapeador tem um bilhete: 'Sou cheio de buracos, mas seguro a água. O que sou?'", (resposta)=>{
            if(resposta.trim().toLocaleLowerCase() == "esponja"){
                console.log("Correto... O segundo numero é: 3")
                resolvidos.grampeador = true
            } else{
                console.log("Resposta errada...")
            }
            menuPrincipal()
        })
    }
}

function investigarPapeis(){
        console.log("no topo da pagina há um numero '1°'")
        console.log("Por entre os papéis você encontra 3 numeros em azul")
        console.log("5")
        console.log("7")
        console.log("10")
        console.log("No rodapé da folha há 2 numeros em vermelho:")
        console.log("6")
        console.log("9")
    menuPrincipal()
}

function investigarAlmofada() {
        console.log("\nAo levantar a almofada, você encontra um bilhete dobrado com uma pequena história escrita à mão:\n")
        console.log("“Ontem fui dormir às 22h. Esqueci de ajustar meu despertador, que estava programado para tocar 9 horas depois.")
        console.log("Mas meu gato, como sempre, pulou na cama duas horas antes do alarme tocar.")
        console.log("Ainda assim, consegui dormir mais uma hora antes de finalmente levantar.”\n")
        console.log("Por quanto tempo eu dormi?")
        menuPrincipal()
}

function verificarPorta() {
    rl.question("\nA porta tem um teclado numérico. Digite os 3 números que você descobriu, na ordem correta: ", (resposta) => {
        if (resposta.trim() === "738") {
            console.log("\nVocê ouve um *clique*... a porta se destranca.")
            console.log("Parabéns! Você escapou da sala!\n")
            rl.close()
        } else {
            console.log("\nCódigo incorreto. A porta permanece trancada.")
            menuPrincipal()
        }
    })
}
menuPrincipal()