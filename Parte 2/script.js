document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('results.html')) {
        processResults();
    }
});

function processResults() {
    const urlParams = new URLSearchParams(window.location.search);
    const A = parseFloat(urlParams.get('A')) || 0; 
    const K = parseFloat(urlParams.get('K')) || 0; 
    const Xp = parseFloat(urlParams.get('Xp')) || 0; 

    const hbar = 1.055e-34; // Joule segundo
    const m = 9.109e-31; // Massa do elétron em kg
    const h = 6.626e-34; // Constante de Planck
    const eV = 1.602e-19; // Joule por electron volt
    const c = 3e8; // Velocidade da luz em m/s

    function Largura(A) {
        return ((2 / (A ** 2)) * 1e9).toFixed(2); // Mostra apenas 3 números após a vírgula
    }

    function NumeroAtomico(K,A) { 
        let result = (K * (Largura(A))*1e-9)/Math.PI;
        return result.toFixed(0); // Arredonda para 2 casas decimais
    }

    function Probabilidade(Xp) {
        return Math.floor(A**2 * Math.sin(K * Xp * (Largura(A) * 1e-9))**2); // Remove qualquer coisa após a vírgula
    }

    const results = document.getElementById('results');
    if (results) { // Verifica se results é válido
        results.innerHTML = `
            <h3>Função de Onda Quântica</h3>
            <p>Largura da Caixa: (${Largura(A)}) nm</p>
            <p>Número Atómico: (${NumeroAtomico(K,A)})</p>
            <p>Probabilidade de encontrar a partícula na posição 𝑥_P : (${Probabilidade(Xp)})-dx</p>
            
        `;
    }
}


document.getElementById('inputForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;
    const A = parseFloat(form.elements['A'].value) || 0; // Se não houver valor, define como 0
    const K = parseFloat(form.elements['K'].value) || 0; // Se não houver valor, define como 0
    const Xp = parseFloat(form.elements['Xp'].value) || 0; // Se não houver valor, define como 0
    
    const params = new URLSearchParams({
        A: A,
        K: K,
        Xp: Xp,
    }).toString();

    window.location.href = `results.html?${params}`;
});
