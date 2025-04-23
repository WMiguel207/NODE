const guias = document.querySelectorAll(".guia-btn")
const conteudos = document.querySelectorAll(".conteudo-guia")

guias.forEach(guia => {
    guia.addEventListener("click", () => {
      guias.forEach(g => g.classList.remove("ativo"))
      guia.classList.add("ativo")
  
      conteudos.forEach(conteudo => conteudo.style.display = "none")
  
      const guiaID = guia.getAttribute("data-guia")
      document.getElementById(`guia-${guiaID}`).style.display = "block"
    })
  })

  let intervaloCronometro
  let segundosCronometro = 0
  let cronometroRodando = false

  const displayCronometro = document.getElementById("cronometro")
  const botaoIniciarCronometro = document.getElementById("iniciarCronometro")
  const botaoPausarCronometro = document.getElementById("pausarCronometro")
  const botaoResetarCronometro = document.getElementById("resetarCronometro")

  function atualizarDisplayCronometro() {
    const horas = Math. floor (segundosCronometro / 3600)
    const minutos = Math.floor((segundosCronometro % 3600) / 60)
    const segundos = Math. floor((segundosCronometro % 60))

    displayCronometro.textContent = `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`
}

function iniciarCronometro() {
    if(!cronometroRodando){
    cronometroRodando = true
    intervaloCronometro = setInterval(() => {
        segundosCronometro++
        atualizarDisplayCronometro()
    }, 1000)    
}
}

function pausarCronometro(){
    if(cronometroRodando){
        cronometroRodando=false
        clearInterval(intervaloCronometro)
    }
}

function resetarCronometro(){
    pausarCronometro()
    segundosCronometro = 0
    atualizarDisplayCronometro()
}

let intervaloContagem
let segundoContagem=0
let contagemRodando=0

const displayContagem = document.getElementById ( "contagem")
const entradaHoras = document. getElementById("horas")
const entradaMinutos = document.getElementById("minutos")
const entradaSegundos = document.getElementById("segundos")
const botaoIniciarContagem = document.getElementById("iniciarContagem")
const botaoPausarContagem = document.getElementById("pausarContagem")
const botaoResetarContagem = document.getElementById("resetarContagem")

function atualizarDisplayCronometro(){
    const horas = Math.floor(segundoContagem/3600)
    const minutos = Math.floor((segundoContagem%3600)/60)
    const segundos = Math.floor(segundoContagem%60)

    displayContagem.textContent=`${String(horas).padStart(2,"0")}:${String(minutos).padStart(2,"0")}:${String(segundos).padStart(2,"0")}`
}

function iniciarContagem(){
    if(!contagemRodando){
        contagemRodando=true
        if(segundoContagem == 0){
            const horas = parseInt(entradaHoras.value)||0
            const minutos = parseInt(entradaMinutos.value)||0
            const segundos = parseInt(entradaSegundos).value||0

            if(horas == 0 && minutos == 0 && segundos == 0){
                alert("Informe um tempo")
            }
                segundoContagem = (horas*3600)+(minutos*60)+segundos
            }
            contagemRodando=true
            intervaloContagem = setInterval(() => {
                if(segundoContagem>0){
                    segundoContagem--
                    atualizarDisplayCronometro()
                }else{
                    pausarContagem()
                    alert("Fim da contagem")
                }
            }, 1000);
        }
    }
function pausarContagem(){
    if(contagemRodando){
        contagemRodando=false
        clearInterval(iniciarContagem)
    }
}
function resetarContagem(){
    pausarContagem()
    segundoContagem = 0
    entradaHoras.value=""
    entradaMinutos.value=""
    entradaSegundos.value=""
    atualizarDisplayContagem()
}
botaoIniciarContagem.addEventListener("click", iniciarContagem)
botaoPausarContagem.addEventListener("click", pausarContagem)
botaoResetarContagem.addEventListener("click", resetarContagem)
botaoIniciarCronometro.addEventListener("click", iniciarCronometro)
botaoPausarCronometro.addEventListener("click", pausarCronometro)
botaoResetarCronometro.addEventListener("click", resetarCronometro)