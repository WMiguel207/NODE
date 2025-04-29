const listaProdutos = [
    {id: 1, nome: "Espada de aço comum", preco: 240, imagem:"img/arma1.jpg"},
    {id: 2, nome: "Martelo de ferreiro cravado", preco: 120, imagem:"img/arma2.jpg"},
    {id: 3, nome: "Lança simples de arremesso", preco: 190, imagem:"img/arma3.jpg"},
    {id: 4, nome: "Machado de madeira de taiga", preco: 220, imagem:"img/arma4.jpg"},
]
const containerProdutos = document.getElementById("produtos");
const barraPesquisa = document.getElementById("barraPesquisa");
const listaCarrinho = document.getElementById("listaCarrinho");
const botaoCarrinho = document.getElementById("botaoCarrinho");
const botaoLoja = document.getElementById("botaoLoja");
const divCarrinho = document.getElementById("carrinho");
const totalCarrinho = document.getElementById("totalCarrinho");

let carrinho = [];

function mostrarProdutos(lista) {
    containerProdutos.innerHTML = ""
    lista.forEach(produto => {
      const card = document.createElement("div")
      card.className = "card"
      card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <p>${produto.preco}</p>
        <button onclick="adicionarCarrinho(${produto.id})">Adicionar ao Carrinho</button>
      `
      containerProdutos.appendChild(card)
    })
  }

  function adicionarCarrinho(idProduto){
const produtoSelecionado = listaProdutos.find(prod => prod.id === idProduto)
const itemExistente = carrinho.find(item => item.id === idProduto)
if (itemExistente) {
  itemExistente.quantidade += 1
} else {
  carrinho.push({ ...produtoSelecionado, quantidade: 1 })
}
    atualizarCarrinho()
}

function diminuirQuantidade(idProduto) {
    const itemExistente = carrinho.find(item => item.id === idProduto)
    if (itemExistente) {
      itemExistente.quantidade -= 1
      if (itemExistente.quantidade <= 0) {
        removerDoCarrinho(idProduto)
        return
      }
      atualizarCarrinho()
    }
  }

function removerDoCarrinho(idProduto) {
    carrinho = carrinho.filter(item => item.id !== idProduto)
    atualizarCarrinho()
  }
  
  function atualizarCarrinho() {
    listaCarrinho.innerHTML = ""
    carrinho.forEach(item => {
        const li = document.createElement("li")
        li.innerHTML = `
          <span>${item.nome}</span>
          <span>${item.quantidade}</span>
          <span>R$ ${item.preco * item.quantidade},00</span>
          <span>
            <button class="aumentar" onclick="adicionarCarrinho(${item.id})">+</button>
            <button class="diminuir" onclick="diminuirQuantidade(${item.id})">-</button>
            <button class="remover" onclick="removerDoCarrinho(${item.id})">Remover</button>
          </span>
        `
        listaCarrinho.appendChild(li)
        
    })
  }

  function calcularTotal() {
    let total = 0
    carrinho.forEach(item => {
      total += item.preco * item.quantidade
    })
    totalCarrinho.innerHTML = `<strong>Total: R$ ${total},00</strong>`
  }
  
barraPesquisa.addEventListener("input", () => {
  const textoPesquisa = barraPesquisa.value.toLowerCase()
  const produtosFiltrados = listaProdutos.filter(produto =>
    produto.nome.toLowerCase().includes(textoPesquisa)
  )
  mostrarProdutos(produtosFiltrados)
})

botaoCarrinho.addEventListener("click", () => {
    containerProdutos.style.display = "none"
    barraPesquisa.style.display = "none"
    divCarrinho.style.display = "block"
    botaoCarrinho.style.display = "none"
    botaoLoja.style.display = "inline"
  })
  
  botaoLoja.addEventListener("click", () => {
    containerProdutos.style.display = "flex"
    barraPesquisa.style.display = "block"
    divCarrinho.style.display = "none"
    botaoCarrinho.style.display = "inline"
    botaoLoja.style.display = "none"
  })
mostrarProdutos(listaProdutos)