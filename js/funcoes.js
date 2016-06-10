/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*  
 * Faculdade Estácio de SA de Campo Grande MS
 * Programação para Internet Rica
 * Professor: Marcelo Terenciani
 * Acadêmico: Luiz Felipe Guilherme de Lacerda
 */
 
$(function () {
    $(document).ready(function () {
        validadorCPF();
        verificarSenha();
        maximoChars();
        cadastrarMascaras();
        apenasLetras();
        msgCheckBox();
        enviar();
    });
});

// Função que válida o CPF
function validadorCPF() {
// Chamando evento
    $("#cpf").on("change", function () {
        var cpf = $("#cpf").val();
        var filtro = /^\d{3}.\d{3}.\d{3}-\d{2}$/i;
        if (!filtro.test(cpf)) {
            window.alert("CPF inv\u00e1lido.");
            $("#cpf").focus();
            $("#cpf").val("");
            return false;
        }
        cpf = remove(cpf, ".");
        cpf = remove(cpf, "-");
        if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444"
                || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999") {
            window.alert("CPF inv\u00e1lido.");
            $("#cpf").focus();
            $("#cpf").val("");
            return false;
        }
// Verifica o primeiro digito do CPF
        soma = 0;
        for (i = 0; i < 9; i++)
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        resto = 11 - (soma % 11);
        if (resto == 10 || resto == 11)
            resto = 0;
        if (resto != parseInt(cpf.charAt(9))) {
            window.alert("CPF inv\u00e1lido.");
            $("#cpf").focus();
            $("#cpf").val("");
            return false;
        }
// Verifica o primeiro digito - segundo digito
        soma = 0;
        for (i = 0; i < 10; i ++)
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        resto = 11 - (soma % 11);
        if (resto == 10 || resto == 11)
            resto = 0;
        if (resto != parseInt(cpf.charAt(10))) {
            window.alert("CPF inv\u00e1lido.");
            $("#cpf").focus();
            $("#cpf").val("");
            return false;
        }
        return true;
    });
// Deixa somente os números antes de verificar, remove o resto
    function remove(str, sub) {
        i = str.indexOf(sub);
        r = "";
        if (i == -1)
            return str;
        r += str.substring(0, i) + remove(str.substring(i + sub.length), sub);
        return r;
    }
}

// Função que verifica a senha
function verificarSenha() {
    $("#senha").keypress(function (event) {
// Recebe valor 
        var tecla = event.keyCode || event.which;
// Somente letras minusculas, maiusculas e números.
        if ((tecla >= 65 && tecla <= 90 || tecla >= 97 && tecla <= 122 || tecla >= 48 && tecla <= 57))
            return true;
        else {
// Apagar e ESC liberado
            if (tecla == 8 || tecla == 0)
                return true;
            else
                return false;
        }
    });
}

// Função que define o máximo de caracteres
function maximoChars() {
// Evento Keypress do campo OBS
    $("#obs").keypress(function (event) {
// Faz a verificação para saber se tem mais de 200 caracteres
        if (cadastroCliente.obs.value.length == 200) {
            alert("A observa\u00e7\u00e3o deve conter no m\u00e1ximo 200 caracteres.");
// Não permite mais que 200 caracteres
            event.preventDefault();
            cadastroCliente.obs.focus();
            return false;
        }
    });
}

// Função que cadastra as mascaras
function cadastrarMascaras() {
    $("#telefone").mask('(00) 0000-0000');
    $("#cpf").mask('000.000.000-00');
    $("#cep").mask('00000-000');
}

// Função que define apenas letras
function apenasLetras() {
    $("#nome").keypress(function (event) {

        var tecla = event.keyCode || event.which;
// Somente letras minusculas, maiusculas e espaço.
        if ((tecla >= 65 && tecla <= 90 || tecla >= 97 && tecla <= 122 || tecla == 32))
            return true;
        else {
// Apagar e ESC liberado
            if (tecla == 8 || tecla == 0)
                return true;
            else
                return false;
        }
    });
}

// Função mensagem check box
function msgCheckBox() {
// Evento click no checkbox
    $("#promocao").on("change", function () {
        verificaCheck();
    });
}

function verificaCheck() {
    if ($("#promocao").is(":checked")) {
        $("#mensagem").show();
    } else
        $("#mensagem").hide();
}

function enviar() {
    var operacao = "A";
    var posicao = -1;
    var tabelaBanco = localStorage.getItem("Dados");
    tabelaBanco = JSON.parse(tabelaBanco);
    if (tabelaBanco == null)
        tabelaBanco = [];
    $("#cadastroCliente").on("submit", function () {
        if (operacao == "A")
            adicionarElemento();
        else
            editarElemento();
    });
    $("#tabelaBanco").on("click", "#btnEditar", function () {
        $("#enviar").attr('value', "Alterar");
        operacao = "E";
        posicao = parseInt($(this).attr("alt"));

        var cli = JSON.parse(tabelaBanco[posicao]);
        $("#cpf").val(cli.cpf);
        $("#nome").val(cli.nome);
        $("#estadoCivil").val(cli.estadoCivil);
        $("#sexo").val(cli.sexo);
        $("#telefone").val(cli.telefone);
        $("#cep").val(cli.cep);
        $("#endereco").val(cli.endereco);
        $("#bairro").val(cli.bairro);
        $("#estado").val(cli.estado);
        $("#cidade").val(cli.cidade);
        $("#email").val(cli.email);
        $("#senha").val(cli.senha);
        $("#obs").val(cli.obs);
        $('#promocao').attr('checked', cli.promocao);
        $("#nome").focus();
        verificaCheck();
    });
    $("#tabelaBanco").on("click", "#btnExcluir", function () {
        posicao = parseInt($(this).attr("alt"));
        excluir();
        listar();
    });
	
    function adicionarElemento() {
        var cliente = JSON.stringify({
            cpf: $("#cpf").val(),
            nome: $("#nome").val(),
            estadoCivil: $("#estadoCivil").val(),
            sexo: $("#sexo").val(),
            telefone: $("#telefone").val(),
            cep: $("#cep").val(),
            endereco: $("#endereco").val(),
            bairro: $("#bairro").val(),
            estado: $("#estado").val(),
            cidade: $("#cidade").val(),
            email: $("#email").val(),
            senha: $("#senha").val(),
            obs: $("#obs").val(),
            promocao: $("#promocao").is(":checked")
        });
        tabelaBanco.push(cliente);
        localStorage.setItem("Dados", JSON.stringify(tabelaBanco));
        alert("Registro adicionado com sucesso");
        return true;
    }
	
    function editarElemento() {
        tabelaBanco[posicao] = JSON.stringify({
            cpf: $("#cpf").val(),
            nome: $("#nome").val(),
            estadoCivil: $("#estadoCivil").val(),
            sexo: $("#sexo").val(),
            telefone: $("#telefone").val(),
            cep: $("#cep").val(),
            endereco: $("#endereco").val(),
            bairro: $("#bairro").val(),
            estado: $("#estado").val(),
            cidade: $("#cidade").val(),
            email: $("#email").val(),
            senha: $("#senha").val(),
            obs: $("#obs").val(),
            promocao: $("#promocao").is(":checked")
        });
        localStorage.setItem("Dados", JSON.stringify(tabelaBanco));
        alert("Registro editado com sucesso");
        operacao = "A";
        return true;
    }
	
    function excluir() {
        tabelaBanco.splice(posicao, 1);
        localStorage.setItem("Dados", JSON.stringify(tabelaBanco));
        alert("Registro Exluido com Sucesso");
        return true;
    }
	
    function listar() {
        $("#corpoTabela").html("");
        for (var i in tabelaBanco) {
            var cli = JSON.parse(tabelaBanco[i]);
            $('#tabelaBanco').find('tbody').append('<tr>' +
                    '<td><b>' + cli.cpf + '</b></td>' +
                    '<td><b>' + cli.nome + '</b></td>' +
                    '<td><input type = "button" id = "btnEditar" class = "btn btn-danger" alt = " ' + i + ' " value = "Editar"/></td>' +
                    '<td><input type = "button" id = "btnExcluir" class = "btn btn-danger" alt = " ' + i + ' " value = "Remover"/></td>' +
                    '</tr>');
            destacarLinha();
            limpar();
        }
    }

    $("#cancelar").click(function () {
        operacao = "A";
        $("#enviar").attr('value', "Enviar");
        limpar();
    });
    listar();
    $("#enviar").attr('value', "Enviar");
}

// Função limpar tela
function limpar() {
    $('#cpf').val('');
    $('#nome').val('');
    $('#estadoCivil').val('');
    $('#sexo').val('');
    $('#telefone').val('');
    $('#cep').val('');
    $('#endereco').val('');
    $('#bairro').val('');
    $('#estado').val('');
    $('#cidade').val('');
    $('#email').val('');
    $('#senha').val('');
    $('#obs').val('');
    $('#promocao').val('');
}

// Função que destaca a linha
function destacarLinha() {
    $('table#tabelaBanco tbody tr').hover(
            function () {
                $(this).addClass('destaque');
            },
            function () {
                $(this).removeClass('destaque');
            }
    );
}