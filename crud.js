document.querySelector("#salvar").addEventListener("click", cadastrar)

function cadastrar() {
    const titulo = document.querySelector("#titulo").value
    const pontos = document.querySelector("#pontos").value
    const categoria = document.querySelector("#categoria").value

    const tarefa = {
        titulo,
        pontos,
        categoria
    }

    document.querySelector("#tarefas")
        .innerHTML += criarCard(tarefa)
}

function apagar(botao){
    botao.parentNode.parentNode.parentNode.remove()
}

function criarCard(tarefa) {
    const card = `
        <div class="col-lg-3 col-md-6 col-sm-12">
        <div class="card">
            <div class="card-header">
                ${tarefa.titulo}
            </div>
            <div class="card-body">
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <p class="card-text">${tarefa.categoria}</p>
                <span class="badge text-bg-warning">${tarefa.pontos}pt</span>
            </div>
            <div class="card-footer">
                <a href="#" class="btn btn-success" title="marcar como concluída">
                    <i class="bi bi-check2"></i>
                </a>
                <a href="#" onClick="apagar(this)" class="btn btn-danger" title="apagar tarefa">
                    <i class="bi bi-trash3"></i>
                </a>
            </div> <!-- card footer -->
        </div> <!-- card -->
    </div> <!-- col -->
    ` 
    return card
}const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sDescrição = document.querySelector('#m-descrição')
const sValor = document.querySelector('#m-valor')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sDescrição.value = itens[index].sDescrição
    sValor.value = itens[index].sValor
    id = index
  } else {
    sNome.value = ''
    sDescrição.value = ''
    sValor.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.Descrição}</td>
    <td>R$ ${item.Valor}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sDescrição.value == '' || sValor.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].Descrição = sDescrição.value
    itens[id].Valor = sValor.value
  } else {
    itens.push({'nome': sNome.value, 'funcao': sDescrição.value, 'salario': sValor.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
