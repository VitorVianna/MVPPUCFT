let urlAPIConversao = "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL";
let woeIdRJ = "455825";
let keyPrevisao = "20ef7949"
let urlAPIPrevisaoTempo = "https://api.hgbrasil.com/weather?format=json-cors&woeid=" + woeIdRJ + "&key=" + keyPrevisao;
let urlAPINoticias = "";
listarConversoes();
previsaoTempo();
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