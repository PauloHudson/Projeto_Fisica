document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('results.html')) {
        processResults();
    }
});

function processResults() {
    const urlParams = new URLSearchParams(window.location.search);
    const A = parseFloat(urlParams.get('A'));
    //const K = parseInt(urlParams.get('K'));
    //const Xp = parseInt(urlParams.get('Xp'));
    

    const hbar = 1.055e-34; // Joule segundo
    const m = 9.109e-31; // Massa do elétron em kg
    const h = 6.626e-34; // Constante de Planck
    const eV = 1.602e-19; // Joule por electron volt
    const c = 3e8; // Velocidade da luz em m/s

    function Largura(A) {
        return (2 / (A ** 2)) * 1e9;
    }

    function energy(n, L) { // Adicionando L como parâmetro
        return n * n * Math.PI * Math.PI * hbar * hbar / (2 * m * L * L); // Usando L
    }

    function deBroglieWavelength(n) {
        const En = energy(n, Largura(A)); // Usando Largura(A) como argumento
        return h / Math.sqrt(2 * m * En);
    }

    const results = document.getElementById('results');
    if (results) { // Verifica se results é válido
        results.innerHTML = `
            <h3>Função de Onda Quântica</h3>
            <p>Largura da Caixa: (${Largura(A)})</p>
            <h3>Energias</h3>
        `;
    }
}

// If the page is the input form, handle the form submission
document.getElementById('inputForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;
    const A = parseFloat(form.A.value);
    //const K = parseInt(form.K.value);
    //const Xp = parseInt(form.Xp.value);
    

    const params = new URLSearchParams({
        A: A,
        //K: K,
        //Xp: Xp,
    }).toString();

    window.location.href = `results.html?${params}`;
});
