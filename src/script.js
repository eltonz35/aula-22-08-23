const modal = document.querySelector(".modal-container");
const tbody = document.querySelector("tbody");
const aNome = document.querySelector("#m-nome");
const btAdicionar = document.querySelector("#botao2");

let itens;
let id;

const getItensBD = () => JSON.parse(localStorage.getItem("dbfunc")) ?? [];
const setItensBD = () => localStorage.setItem("dbfunc", JSON.stringify(itens));

function carregarItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        adicionarItem(item, index)
    });
}

carregarItens();

function adicionarItem(item, index) {
    let tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${item.nome}</td>
        <td class="acao">
            <button onclick="deleteItem(${index})"><i class="bx bx-trash"></i></button>
        </td>    
    `
    tbody.appendChild(tr);
}

function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    carregarItens()
}

function openModal(index = 0) {
    modal.classList.add("active");

    modal.onclick = e => {
        if (e.target.className.indexOf("modal-container") !== -1) {
            modal.classList.remove("active")
        }
    }
}

btAdicionar.onclick = e => {
    if (aNome.value == "") {
        return
    }

    e.preventDefault();

    if (id !== undefined) {
        itens[id].nome = aNome.value;
    } else {
        itens.push({"nome": aNome.value});
    }

    setItensBD();

    modal.classList.remove("active");
    carregarItens();
    id = undefined;
}