 // Troque pelo número da loja: 55 + DDD + número (somente dígitos). Ex.: 5534999999999
  var NUMERO_WHATSAPP = "55DDDNUMERO";

  document.getElementById("formPedido").addEventListener("submit", function (e) {
    e.preventDefault();

    var modelo  = document.getElementById("modelo").value;
    var tamanho = document.getElementById("tamanho").value;

    var mensagem =
      "Olá! Tenho interesse em um tênis da GV imports.\n\n" +
      "Modelo: " + modelo + "\n" +
      "Tamanho: " + tamanho + "\n" +
      "Pode me passar mais informações?";

    var url = "https://wa.me/" + 5534996398705 + "?text=" + encodeURIComponent(mensagem);
    window.open(url, "_blank", "noopener");
  });