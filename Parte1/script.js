document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('results.html')) {
        processResults();
    }
});

let urlParams = new URLSearchParams(window.location.search);
let L = parseFloat(urlParams.get('L')) || 0;
let ni = parseInt(urlParams.get('ni')) || 0;
let nf = parseInt(urlParams.get('nf')) || 0;
let a = parseFloat(urlParams.get('a')) || 0;
let b = parseFloat(urlParams.get('b')) || 0;
let m = parseFloat(urlParams.get('m')) || 0; // Obtém a massa da URL

let variaveis = [L, ni, nf, a, b, m];

const hbar = 1.055e-34; // Joule segundo
const h = 6.626e-34; // Constante de Planck
const h2 = 4.136e-15; // Constante de Planck em eV
const eV = 1.602e-19; // Joule por electron volt
const c = 3e8; // Velocidade da luz em m/s

function processResults() {
    
    
    function psiA(L) {
        return Math.sqrt(2/L);
    }
    function psiK(ni) {
        return ((ni) * Math.PI) / L;
    }
//-------------------------------------------------------------------------------------------------------------------------------------------//
    function energy(ni) {
        if (nf!==0) {
        E1= ((ni**2) * (h**2)) / ((8 * m) * (L**2));
        E2=((nf ** 2) * (h ** 2) )/ ((8 * m) * (L**2));
        EfotonAbs= ((Math.abs(E2 - E1)))/eV;
        return EfotonAbs;}
        else {
            E1= ((ni**2) * (h**2)) / ((8 * m) * (L**2));
            return E1;
        }
    }
    function energy2(ni) {
        if (nf!==0) {
        E1= ((ni**2) * (h**2)) / ((8 * m) * (L**2));
        E2=((nf ** 2) * (h ** 2) )/ ((8 * m) * (L**2));
        EfotonAbs= ((Math.abs(E2 - E1)))/eV;
        return EfotonAbs;}
        else {
            E1= ((ni**2) * (h**2)) / ((8 * m) * (L**2));
            return E1/eV;
        }
    }

    function frequency(ni) {
        return energy(ni) / h2; // Frequência do fóton
    }

    function velocidade(ni){
        return Math.sqrt((2*energy(ni))/m); // Velocidade do fóton
    }

    function comprimentoOnda(ni){
        return (h2 * c) / energy(ni); // Comprimento de onda do fó
    }

    function comprimentoBroglie(ni){
        return h / Math.sqrt(2 * m * energy(ni)); // Comprimento de onda de Broglie
    }
    
    function calculateProbability(L, ni, a, b) {
        const A = Math.sqrt(2 / L);
        const ki = (ni * Math.PI) / L;
        const integral = (b - a - (1 / (2 * ki)) * (Math.sin(2 * ki * b) - Math.sin(2 * ki * a)));
        const probability = Math.pow(A, 2) * integral;
        return (probability * 100)/2; 
    }
    
 
    
    
    
    const results = document.getElementById('results');
    results.innerHTML = `
        <h3>Função de Onda Quântica</h3>
        <p>ψ_${ni}(x) = ${Math.floor(psiA(L))} sin(${Math.floor(psiK(ni))} * X)</p>
        <h3>Transição de Energia</h3>
        <p>Efoton = ${(energy(ni)*eV).toExponential(2)} J</p>
        <p>Efoton = ${(energy(ni)).toExponential(2)} eV</p>
        <p>Efoton = ${(energy2(ni)).toExponential(2)} E1/eV</p>
        <p>f = ${frequency(ni).toExponential(2)} Hz</p>
        <p>v = ${velocidade(ni).toExponential(2)} m/s</p>
        <p>λ = ${comprimentoOnda(ni).toExponential(2)} m</p>
        <p>λ de Broglie = ${comprimentoBroglie(ni).toExponential(2)} m</p>
    `;

// Obtém uma referência para o elemento canvas
var ctx = document.getElementById('meuGrafico').getContext('2d');

// Gera os pontos da função seno
var labels = [];
var data = [];

console.log("teste");
console.log("L:", variaveis[0]);
console.log("ni:", variaveis[1]);

for (var x = 0; x <= L; x = x + L/1000) {
    var psi = ((2 * Math.PI * x) / L); // Converte graus para radianos
    var y = Math.sqrt(ni / L) * Math.sin(psi); // Função seno de x
    labels.push(x);
    data.push(y);
}

// Define os dados do gráfico
var chartData = {
    labels: labels,
    datasets: [{
        label: 'Função de Onda Quântica (ψ(x))',
        data: data,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }]
};

// Configurações do gráfico
var options = {
    scales: {
        xAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Ângulo (graus)'
            }
        }],
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Valor de sen(1)'
            }
        }]
    }
};

// Cria o gráfico de linha
var myChart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: options
});
}



/////////////////////////////////




document.getElementById('inputForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    form = event.target;
    L = parseFloat(form.L.value);
    ni = parseInt(form.ni.value);
    nf = parseInt(form.nf.value);
    a = parseFloat(form.a.value);
    b = parseFloat(form.b.value);

    const params = new URLSearchParams({
        L: L,
        ni: ni,
        nf: nf,
        a: a,
        b: b
    }).toString();
    console.log(m)
    window.location.href = `results.html?${params}`;
});