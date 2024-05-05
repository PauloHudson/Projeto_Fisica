var canvas = document.getElementById('jogo');
var ctx = canvas.getContext('2d');
var img = new Image();
img.src = './img/bola_vermelha_edit.png';

//Posições possiveis da capivara
var positions = [
    { x: 350, y: 15 },
    { x: 350, y: 235 },
    { x: 350, y: 405 },
    { x: 350, y: 528 },
    { x: 350, y: 600 },
];

// Cada buraco tem um incice. Aqui vai ser definido qual desses buracos tem a capivara.
var currentPositionIndex = 0;


//Cria a função Sleep, para definir o tempo de espera
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

//Gera um numero inteiro aleatorio entre 0 e 6 (index das CAPIVARAS)
function numeroAleatorio() {
    var numeroDecimal = Math.random();
    var numeroInteiro = Math.floor(numeroDecimal * 5);

    return numeroInteiro;
}


//Essa é a função responsavel pelo jogo em si. Exibe e esconte as capivaras e conta os acertos e erro
async function showBolinha() {
    //Pega a posição da CAPIVARA, limpa o camvas e desenha a capivara
    var currentPosition = positions[currentPositionIndex];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, currentPosition.x, currentPosition.y);

}


//Maior parte da Logica do jogo, com os cliques e chamada da capivara
async function handleCanvasClick(event) {
    var currentPosition = positions[currentPositionIndex];
    var clickX = event.clientX - canvas.getBoundingClientRect().left;
    var clickY = event.clientY - canvas.getBoundingClientRect().top;

        // Verifica se o clique ocorreu dentro da área da capivara
        if (
            clickX >= currentPosition.x &&
            clickX <= currentPosition.x + img.width &&
            clickY >= currentPosition.y &&
            clickY <= currentPosition.y + img.height
        ) {
            // Aumenta o contador de cliques
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Atualiza o índice da posição e exibe uma nova Capivara
            currentPositionIndex = numeroAleatorio();

            //Espera 0.1 sec para mostrar uma nova Capivara
            await sleep(100)
            showBolinha();

        }   //Caso clique fora da capivara
}


//A controladora do jogo, chamando a função principal e dizendo a duração da partida
function jogo() {
    // Adiciona o evento de clique ao canvas
    canvas.addEventListener('click', handleCanvasClick);
    showBolinha();    
}

