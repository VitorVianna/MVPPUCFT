let urlAPIConversao = "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL";
let woeIdRJ = "455825";
let keyPrevisao = "20ef7949"
let urlAPIPrevisaoTempo = "https://api.hgbrasil.com/weather?format=json-cors&woeid=" + woeIdRJ + "&key=" + keyPrevisao;


let urlAPINoticias = "https://servicodados.ibge.gov.br/api/v3/noticias/?de";

listarConversoes();
previsaoTempo();
listarNoticias();
setTimeout(atualizarPagina, 300000);

function atualizarPagina(){
    location.reload()
}

function listarConversoes(){
    fetch(urlAPIConversao, {
        method: 'get',
    })
    .then((response) => response.json())
    .then((data) => {
        
        $("#conversaoDolarReal").text(data.USDBRL.high);
        $("#conversaoEuroReal").text(data.EURBRL.high);
        $("#conversaoBitReal").text(data.BTCBRL.high);
        
        preencherSetasConversoes(data.USDBRL.varBid, "setaDolarReal");
        preencherSetasConversoes(data.EURBRL.varBid, "setaEuroReal");
        preencherSetasConversoes(data.BTCBRL.varBid, "setaBitReal");
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}

function preencherSetasConversoes(moeda, campo){
    if(moeda > 0)
        $('#'+campo).html(`<i class='bi bi-graph-up-arrow upcoin'></i>`);
    else if(moeda < 0)
        $('#'+campo).html(`<i class='bi bi-graph-down-arrow downcoin'></i>`);
    else
        $('#'+campo).html(`<i class='bi bi-arrows-collapse'></i>`);
}

function previsaoTempo(){
    var count = 0;
    fetch(urlAPIPrevisaoTempo, {
        method: 'get'
    })
    .then((response) => response.json())
    .then((data) => {
        data.results.forecast.forEach(previsao => {
            if(count < 3)
                $('#tablePrevisaoTempo tbody').append(`<tr><td>`+previsao.date+`</td><td>`+previsao.min+`º</td><td>`+previsao.max+`º</td><td><img src="https://assets.hgbrasil.com/weather/icons/conditions/`+previsao.condition+`.svg" alt="Condição Climática" width="30" height="30"></td></tr>`);
            count++;
        })
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}

function listarNoticias(){
    var horaAtual = new Date().getHours();
    var today = new Date();
    if(horaAtual < 10)
        today = new Date(today.setDate(today.getDate() - 1));

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;


    var count = 0;
    var limit = 5;
    var indicesNoticias = [];
    fetch(urlAPINoticias+today, {
        method: 'get',
    })
    .then((response) => response.json())
    .then((data) => {
        for(var i = 0; i < limit; i++){
            indicesNoticias.push(Math.floor(Math.random() * (parseInt(data.showingTo) - parseInt(data.showingFrom) + 1)) + data.showingFrom);
        }

        $("#txtTituloNoticia1").text(data.items[indicesNoticias[0]].titulo);
        $("#txtNoticia1").text(data.items[indicesNoticias[0]].introducao);
        $("#txtTituloNoticia2").text(data.items[indicesNoticias[1]].titulo);
        $("#txtNoticia2").text(data.items[indicesNoticias[1]].introducao);
        $("#txtTituloNoticia3").text(data.items[indicesNoticias[2]].titulo);
        $("#txtNoticia3").text(data.items[indicesNoticias[2]].introducao);
        $("#txtTituloNoticia4").text(data.items[indicesNoticias[3]].titulo);
        $("#txtNoticia4").text(data.items[indicesNoticias[3]].introducao);
        $("#txtTituloNoticia5").text(data.items[indicesNoticias[4]].titulo);
        $("#txtNoticia5").text(data.items[indicesNoticias[4]].introducao);
        
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}