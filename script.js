var NUMERO_WHATSAPP = "5534988974838";

var capas = document.getElementById("capas");
var linhas = document.querySelectorAll(".categoria");               
var linhasAbriveis = document.querySelectorAll(".categoria:not(.categoria-fixa)"); 
var fixas = document.querySelectorAll(".categoria-fixa");           

document.querySelectorAll(".capa").forEach(function (capa) {
  var linha = document.getElementById(capa.dataset.alvo);
  var qtd = linha.querySelectorAll(".card").length;
  capa.querySelector(".capa-qtd").textContent =
    qtd + (qtd === 1 ? " modelo" : " modelos");

  capa.addEventListener("click", function () {
    abrirLinha(linha);
  });
});

document.querySelectorAll(".voltar").forEach(function (btn) {
  btn.addEventListener("click", fecharLinhas);
});

function abrirLinha(linha) {
  capas.hidden = true;
  fixas.forEach(function (f) { f.hidden = true; });
  linhasAbriveis.forEach(function (l) { l.hidden = true; });
  linha.hidden = false;
  document.getElementById("tenis").scrollIntoView({ behavior: "smooth" });
}

function fecharLinhas() {
  linhasAbriveis.forEach(function (l) { l.hidden = true; });
  capas.hidden = false;
  fixas.forEach(function (f) { f.hidden = false; });
  document.getElementById("tenis").scrollIntoView({ behavior: "smooth" });
}

var TAMANHOS = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
var MAX_ITENS = 10;

var LINHAS = Array.prototype.map.call(linhas, function (sec) {
  return {
    nome: sec.querySelector(".categoria-titulo h2").textContent.trim(),
    modelos: Array.prototype.map.call(
      sec.querySelectorAll(".card .info h3"),
      function (h3) { return h3.textContent.trim(); }
    )
  };
});

var itens = document.getElementById("itens");
var btnAdd = document.getElementById("btnAdd");

function preencherSelect(select, rotulo, opcoes) {
  select.innerHTML = "";

  var primeira = document.createElement("option");
  primeira.value = "";
  primeira.disabled = true;
  primeira.selected = true;
  primeira.textContent = rotulo;
  select.appendChild(primeira);

  opcoes.forEach(function (texto) {
    var op = document.createElement("option");
    op.textContent = texto;
    select.appendChild(op);
  });
}

function criarSelect(classe) {
  var select = document.createElement("select");
  select.className = classe;
  select.required = true;
  return select;
}

function criarCampo(rotulo, select, classeExtra) {
  var campo = document.createElement("div");
  campo.className = "campo" + (classeExtra ? " " + classeExtra : "");
  var label = document.createElement("label");
  label.textContent = rotulo;
  campo.appendChild(label);
  campo.appendChild(select);
  return campo;
}

function adicionarItem() {
  if (itens.children.length >= MAX_ITENS) return;

  var item = document.createElement("div");
  item.className = "item-pedido";

  var topo = document.createElement("div");
  topo.className = "item-topo";
  var titulo = document.createElement("span");
  titulo.className = "item-titulo";
  var remover = document.createElement("button");
  remover.type = "button";
  remover.className = "btn-remover";
  remover.textContent = "Remover";
  remover.addEventListener("click", function () {
    item.remove();
    atualizarItens();
  });
  topo.appendChild(titulo);
  topo.appendChild(remover);

  var selLinha = criarSelect("sel-linha");
  var selModelo = criarSelect("sel-modelo");
  var selTamanho = criarSelect("sel-tamanho");

  preencherSelect(selLinha, "Selecione a linha",
    LINHAS.map(function (l) { return l.nome; }));
  preencherSelect(selModelo, "Escolha a linha primeiro", []);
  selModelo.disabled = true;
  preencherSelect(selTamanho, "Selecione o tamanho", TAMANHOS);

  selLinha.addEventListener("change", function () {
    var linha = LINHAS.filter(function (l) { return l.nome === selLinha.value; })[0];
    preencherSelect(selModelo, "Selecione o modelo", linha ? linha.modelos : []);
    selModelo.disabled = false;
  });

  var campos = document.createElement("div");
  campos.className = "campos";
  campos.appendChild(criarCampo("Linha", selLinha));
  campos.appendChild(criarCampo("Modelo", selModelo));
  campos.appendChild(criarCampo("Tamanho", selTamanho, "campo-tamanho"));

  item.appendChild(topo);
  item.appendChild(campos);
  itens.appendChild(item);
  atualizarItens();
}

function atualizarItens() {
  var lista = itens.children;
  for (var i = 0; i < lista.length; i++) {
    lista[i].querySelector(".item-titulo").textContent = "Tênis " + (i + 1);
    lista[i].querySelector(".btn-remover").hidden = lista.length === 1;
  }
  btnAdd.disabled = lista.length >= MAX_ITENS;
}

btnAdd.addEventListener("click", adicionarItem);
adicionarItem(); 

document.getElementById("formPedido").addEventListener("submit", function (e) {
  e.preventDefault();

  var linhasPedido = [];
  Array.prototype.forEach.call(itens.children, function (item, i) {
    var modelo = item.querySelector(".sel-modelo").value;
    var tamanho = item.querySelector(".sel-tamanho").value;
    linhasPedido.push((i + 1) + ") " + modelo + " - Tamanho " + tamanho);
  });

  var mensagem =
    "Olá! Tenho interesse nos seguintes tênis da GV Imports:\n" +
    linhasPedido.join("\n") + "\n" +
    "Pode me passar mais informações?";

  var url = "https://wa.me/" + NUMERO_WHATSAPP + "?text=" + encodeURIComponent(mensagem);
  window.open(url, "_blank", "noopener");
});
