var canvas = document.getElementById('jogo');
var ctx = canvas.getContext('2d');
var img = new Image();
img.src = './img/bola_vermelha_edit.png';

var particula = {
    x: Math.floor(Math.random() * 761),
    y: n = [15, 235, 405, 528, 600],
    img: img,
    speed: 0,
    direcao: 0
}

// gera um numero aleatorio entre 0 e 4 para definir a posição inicial da bolinha
var currentPositionIndex = Math.floor(Math.random() * 5);
console.log(currentPositionIndex);

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

// atualiza a posição da bolinha movendo ela para a direita e para esquerda
function AtualizaPosicao() {
    // verifica a posição y da particula


    // altera a velocidade da particula de acordo com o numero quantico dela
    if(particula.y[currentPositionIndex] == 15){
        particula.speed = 50;
    }
    else if(particula.y[currentPositionIndex] == 235){
        particula.speed = 35;
    }
    else if(particula.y[currentPositionIndex] == 405){
        particula.speed = 22;
    }
    else if(particula.y[currentPositionIndex] == 528){
        particula.speed = 15;
    }
    else if(particula.y[currentPositionIndex] == 600){
        particula.speed = 8;
    }
    
    // limita o movimento da particula para ficar dentro do canvas
    if(particula.direcao == 0){
        particula.x += particula.speed;
    }
    if(particula.x >= 760){
        particula.direcao = 1;
    }
    if(particula.direcao == 1){
        particula.x -= particula.speed;
    }
    if(particula.x <= 0){
        particula.direcao = 0;
    }

    
}

//Essa é a função responsavel pelo jogo em si. Exibe e esconte as capivaras e conta os acertos e erro
async function desenhaParticula() {
    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    AtualizaPosicao();
    // Desenha a particula	
    ctx.drawImage(particula.img, particula.x, particula.y[currentPositionIndex]);
    // Anima a particula
    requestAnimationFrame(desenhaParticula);
}


// Maior parte da Logica do jogo, com os cliques e chamada da capivara
// async function handleCanvasClick(event) {
//     var currentPosition = positions[currentPositionIndex];
//     var clickX = event.clientX - canvas.getBoundingClientRect().left;
//     var clickY = event.clientY - canvas.getBoundingClientRect().top;

//         // Verifica se o clique ocorreu dentro da área da capivara
//         if (
//             clickX >= currentPosition.x &&
//             clickX <= currentPosition.x + img.width &&
//             clickY >= currentPosition.y &&
//             clickY <= currentPosition.y + img.height
//         ) {
//             // Aumenta o contador de cliques
//             ctx.clearRect(0, 0, canvas.width, canvas.height);

//             // Atualiza o índice da posição e exibe uma nova Capivara
//             currentPositionIndex = numeroAleatorio();

//             //Espera 0.1 sec para mostrar uma nova Capivara
//             await sleep(100)
//             showBolinha();

//         }   //Caso clique fora da capivara
// }


//A controladora do jogo, chamando a função principal e dizendo a duração da partida
function init() {
    console.log('Jogo iniciado');
    // Adiciona o evento de clique ao canvas
    // canvas.addEventListener('click', handleCanvasClick);
    desenhaParticula();
 
}

init();