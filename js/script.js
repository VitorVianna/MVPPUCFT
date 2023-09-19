 let enderecoAPI = "http://192.168.1.8:5000/"
 var idCliente = 0;
 ListarProfissionais();
 ListarAgendaCompleta();
 $("#txtCPFCliente").mask('000.000.000-00', {reverse: true});
 $("#txtRGCliente").mask('00.000.000-0', {reverse: true});
 $("#txtCEP").mask('00.000-000', {reverse: true});
 $("#txtDataNascimento").mask('00/00/0000', {reverse: true});
 $("#txtDataConsulta").mask('00/00/0000', {reverse: true});

function LimparProfissional(){
    $("#txtNovoProfNome").val("");
    $("#txtNovoProfCRM").val("");
}

function CadastrarProfissional(){
    if(ValidarCadastroProfissional()){
        var form = new FormData();
        var nome = $("#txtNovoProfNome").val();
        var crm = $("#txtNovoProfCRM").val();
        form.append("nome", nome);
        form.append("crm", crm);

        let url = enderecoAPI + "add_profissional";
        fetch(url, {
            method: 'post',
            body: form
        })
        .then(function (response) {
            if (response.ok) {
              alert("Cadastrado com sucesso!");
              location.reload(true);
            } else {
                alert("Erro no cadastro!");
            }
          })
          .catch(function (error) {
            console.log(
              "There has been a problem with your fetch operation: " + error.message,
            );
        });
    }
}

function ValidarCadastroProfissional(){
    if($("#txtNovoProfNome").val() == "" || $("#txtNovoProfCRM").val() == ""){
        $("#alertaProfissional").removeClass('alertaInativo');
        $("#alertaProfissional").addClass('alertaAtivo');
        return false;
    } else {
        $("#alertaProfissional").removeClass('alertaAtivo');
        $("#alertaProfissional").addClass('alertaInativo');
        return true;
    }
    
}


function ListarProfissionais(){
    let url = enderecoAPI + "get_profissional";
    fetch(url, {
        method: 'get',
    })
    .then((response) => response.json())
    .then((data) => {
        data.profissionais.forEach(profissional => 
            $('#selectProfissional').append($('<option>', {
                value: profissional.id,
                text: profissional.nome + " - " + profissional.crm
            })))
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}

function ValidarCPF(){
    if(!TestaCPF($("#txtCPFCliente").val())){
        $('#txtCPFCliente').css('border', '1px solid red');
    }
    else {
        $('#txtCPFCliente').css('border', '1px solid black');
    }
}

function TestaCPF(strCPF) {
    strCPF = strCPF.replace("-","").replace(".","").replace(".","");
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

function BuscarCliente(){
    var cpf = $("#txtCPFCliente").val().replace("-","").replace(".","").replace(".","");
    if(TestaCPF(cpf))
    {
        let url = enderecoAPI + "get_cliente_por_cpf/?cpf="+cpf;
        fetch(url, {
            method: 'get',
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.cliente != undefined)
            {
                data.cliente.forEach(cliente => {
                    idCliente = cliente.id
                    $("#txtNomeCliente").val(cliente.nome)
                    $("#txtRGCliente").val(cliente.rg)
                    $("#selectSexo").val(cliente.sexo)
                    $("#txtDataNascimento").val(cliente.data_nascimento)
                    $("#txtCEP").val(cliente.cep)
                    $("#txtRua").val(cliente.rua)
                    $("#txtNumero").val(cliente.numero)
                    $("#txtBairro").val(cliente.bairro)
                    $("#txtMunicipio").val(cliente.cidade)
                    $("#txtUF").val(cliente.estado)
                    $("#txtComplemento").val(cliente.complemento)
                })
            } else {
                idCliente = 0;
                alert("Cliente não cadastrado. \nAo salvar, será realizado o cadastro");
            }
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    } else {
        alert("CPF inválido!");
        $('#txtCPFCliente').css('border', '1px solid red');
    }
}

function BuscarCEP(){
    
    var cep = $("#txtCEP").val().replace(".","").replace("-","");
    fetch("http://viacep.com.br/ws/"+cep+"/json/", {
        method: 'get',
    })
    .then(response => response.text())
    .then((result) => {
        var dados = JSON.parse(result)
        if(dados.erro == undefined){
            $("#txtRua").val(dados.logradouro); 
            $("#txtBairro").val(dados.bairro);
            $("#txtMunicipio").val(dados.localidade);
            $("#txtUF").val(dados.uf);
        } else {
            alert("CEP Não encontrado!");
            LimparCamposEndereco();
        }
    })
    .catch(error => console.log('error', error));
}

function LimparCamposEndereco(){
    $("#txtRua").val(""); 
    $("#txtBairro").val("");
    $("#txtMunicipio").val("");
    $("#txtUF").val("");
    $("#txtNumero").val("");
    $("#txtComplemento").val("");
    $("#txtCEP").val("");
}

function LimparCamposConsulta(){
    LimparCamposEndereco();
    $("#selectProfissional").val(0);
    $("#txtCPFCliente").val("");
    $("#txtNomeCliente").val("");
    $("#txtRGCliente").val("");
    $("#selectSexo").val(0);
    $("#txtDataNascimento").val("");
    $("#txtDataConsulta").val();
}

function CadastrarConsulta(){
    // Se idCliente = 0 - Cadastrar cliente antes
    // Se diferente - Cadastrar apenas consulta
    if(idCliente == 0)
        CadastrarCliente()

    else{
        if(ValidarCadastroAgenda()){
            var form = new FormData();
            var idProfissional = $("#selectProfissional").val();
            var dataConsulta = $("#txtDataConsulta").val();
            form.append("cliente", idCliente);
            form.append("profissional", idProfissional);
            form.append("data_consulta", dataConsulta);
    
            let url = enderecoAPI + "add_agenda";
            fetch(url, {
                method: 'post',
                body: form
            })
            .then(function (response) {
                if (response.ok) {
                    alert("Cadastrado com sucesso!");
                    location.reload(true);
                } else {
                    alert("Erro no cadastro!");
                }
                })
                .catch(function (error) {
                console.log(
                    "There has been a problem with your fetch operation: " + error.message,
                );
            });
        } 
    }
    
}

function CadastrarCliente(){
    if(ValidarCadastroCliente()){
        var formdata = new FormData();
        formdata.append("nome", $("#txtNomeCliente").val());
        formdata.append("cpf", $("#txtCPFCliente").val().replace("-","").replace(".","").replace(".",""));
        formdata.append("rg", $("#txtRGCliente").val().replace("-","").replace(".","").replace(".",""));
        formdata.append("cep", $("#txtCEP").val().replace("-","").replace(".","").replace(".",""));
        formdata.append("rua", $("#txtRua").val());
        formdata.append("bairro", $("#txtBairro").val());
        formdata.append("cidade", $("#txtMunicipio").val());
        formdata.append("estado", $("#txtUF").val());
        formdata.append("numero", $("#txtNumero").val());
        formdata.append("complemento", $("#txtComplemento").val());
        formdata.append("pais", "BR");
        formdata.append("data_nascimento", $("#txtDataNascimento").val());
        formdata.append("sexo", $("#selectSexo").val());

        let url = enderecoAPI + "add_cliente";
        fetch(url, {
            method: 'post',
            body: formdata
        })
        .then(function (response) {
            if (response.ok) {
                BuscarCliente();
                alert("Cliente cadastrado, \nclique novamente para salvar a consulta.")
            } else {
                idCliente = 0;
                alert("Erro no cadastro!");
            }
        })
        .catch(function (error) {
            console.log(
                "There has been a problem with your fetch operation: " + error.message,
            );
        });

    }
}

function ValidarCadastroAgenda(){
    if(idCliente == 0 || $("#selectProfissional").val() == 0 || $("#txtDataConsulta").val() == ""){
        $("#alertaConsulta").removeClass('alertaInativo');
        $("#alertaConsulta").addClass('alertaAtivo');
        return false;
    }

    $("#alertaConsulta").removeClass('alertaAtivo');
    $("#alertaConsulta").addClass('alertaInativo');
    return true;
}

function ValidarCadastroCliente(){
    if($("#txtCPFCliente").val() == "" || $("#txtNomeCliente").val() == "" ||
    $("#txtRGCliente").val() == "" || $("#txtDataNascimento").val() == "" ||
    $("#txtCEP").val() == "" || $("#txtRua").val() == "" ||
    $("#txtNumero").val() == "" || $("#txtBairro").val() == "" ||
    $("#txtMunicipio").val() == "" || $("#txtUF").val() == ""){
        $("#alertaConsulta").removeClass('alertaInativo');
        $("#alertaConsulta").addClass('alertaAtivo');
        return false;
    }

    $("#alertaConsulta").removeClass('alertaAtivo');
    $("#alertaConsulta").addClass('alertaInativo');
    return true;
}

function ListarAgendaCompleta(){
    let url = enderecoAPI + "get_agenda";
    fetch(url, {
        method: 'get',
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.agenda.length > 0)
        {
            data.agenda.forEach(consulta => {
                var newRow = $("<tr>");
                var cols = "";                                  
                cols += '<td>'+consulta.data_consulta+'</td>';
                cols += '<td>'+consulta.profissional+'</td>';
                cols += '<td>'+consulta.cliente+'</td>';
                newRow.append(cols);
                $("#tabelaConsulta").append(newRow);
            })
        } else {
            idCliente = 0;
            alert("Cliente não cadastrado. \nAo salvar, será realizado o cadastro");
        }
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}