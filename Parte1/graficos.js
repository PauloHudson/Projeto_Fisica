// Obtém uma referência para o elemento canvas
var ctx = document.getElementById('meuGrafico').getContext('2d');


import { L, ni } from 'script.js';

// Gera os pontos da função seno
var labels = [];
var data = [];

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
        label: 'sen(1)',
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


