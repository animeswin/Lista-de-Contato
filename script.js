const form = document.querySelector("#form")
const nome = document.querySelector("#nome")
const numero = document.querySelector("#numero")
const email = document.querySelector("#email")
const botao = document.querySelector("#cadastrar")
const resultado = document.querySelector("#resultado")

let contador = parseInt(localStorage.getItem("contador")) || 1

function atualizarContador() {
  localStorage.setItem("contador", contador)
}

function buscarUsuario() {
  const listaDeContatos = JSON.parse(localStorage.getItem("lista")) || []
  resultado.innerHTML = ""
  listaDeContatos.forEach((usuarioDaVez) => {
    criarElemento(usuarioDaVez)
  })
}

function criarElemento(contato) {
  const novoElemento = document.createElement("div")

  const novoNome = document.createElement("h2")
  novoNome.textContent = `Nome: ${contato.nome}`

  const novoNumero = document.createElement("p")
  novoNumero.textContent = `Número: ${contato.numero}`

  const novoEmail = document.createElement("p")
  novoEmail.textContent = `E-mail: ${contato.email}`

  const editar = document.createElement("button")
  editar.textContent = "Editar"
  editar.addEventListener("click", () => editarContato(contato))

  const excluir = document.createElement("button")
  excluir.textContent = "Excluir"
  excluir.addEventListener("click", () => excluirContato(contato.id))

  novoElemento.append(novoNome, novoNumero, novoEmail, editar, excluir)
  resultado.appendChild(novoElemento);
}

function adicionarOuEditarContato(evento) {
  evento.preventDefault()
  const listaDeContatos = JSON.parse(localStorage.getItem("lista")) || []
  const idEditado = localStorage.getItem("id_editado")

  if (botao.textContent === "Editar") {
    listaDeContatos.forEach((elemento) => {
      if (idEditado === elemento.id.toString()) {
        elemento.nome = nome.value
        elemento.numero = numero.value
        elemento.email = email.value
        localStorage.setItem("lista", JSON.stringify(listaDeContatos))
        atualizarContador()
        botao.textContent = "Cadastrar"
        limparCampos()
        buscarUsuario()
      }
    })
  } else {
    const novoContato = {
      id: contador,
      nome: nome.value,
      numero: numero.value,
      email: email.value,
    }
    contador++;
    atualizarContador()

    listaDeContatos.push(novoContato)
    localStorage.setItem("lista", JSON.stringify(listaDeContatos))
    criarElemento(novoContato)
    limparCampos()
  }
}

function limparCampos() {
  nome.value = ""
  numero.value = ""
  email.value = ""
  nome.focus()
}

function editarContato(contato) {
  nome.value = contato.nome
  numero.value = contato.numero
  email.value = contato.email
  botao.textContent = "Editar"
  localStorage.setItem("id_editado", contato.id)
}

function excluirContato(id) {
  const listaDeContatos = JSON.parse(localStorage.getItem("lista")) || []
  const novosContatos = listaDeContatos.filter((contato) => contato.id !== id)
  localStorage.setItem("lista", JSON.stringify(novosContatos))
  buscarUsuario()
}

form.addEventListener("submit", adicionarOuEditarContato)

buscarUsuario()