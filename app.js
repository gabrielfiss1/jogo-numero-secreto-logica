let listaNumerosSorteados = [];
let numeroMax = 50
let numeroSecreto = gerarNumeroAleatorio()
console.log(numeroSecreto)

let tentativas = 1;

function exibirTextoNaTela(tag, texto){ // apenas parametro
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um numero entre 1 e ${numeroMax}`);
}

exibirMensagemInicial();

function verificarChute(){ //sem parametro e retorno
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas =  `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        habilitarBotao();
    } else 
        if (chute > numeroSecreto){
                exibirTextoNaTela('p', 'O número é menor!');
                chute.reset;
    } else {
        exibirTextoNaTela('p', 'O número é maior!');
    }
    tentativas++;
    limparCampo();
}


function gerarNumeroAleatorio() { // n tem parametro e retorna valor pelo return
    let numeroEscolhido = parseInt(Math.random() * numeroMax + 1);
    let quantidadeDeElementosNaLista = listaNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroMax){
        listaNumerosSorteados = []
    }


    if (listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio(); // gerar um novo numero aleatorio caso o msm esteja na lista
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados)
        return numeroEscolhido;
    }
}


function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function habilitarBotao(){
    let botao = document.getElementById('reiniciar').removeAttribute('disabled')
}

function reiniciarJogo(){
    //location.reload()
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}
