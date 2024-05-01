document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('results.html')) {
        processResults();
    }
});

function processResults() {
    const urlParams = new URLSearchParams(window.location.search);
    const A = parseFloat(urlParams.get('A'));
    const K = parseFloat(urlParams.get('K'));
    const Xp = parseFloat(urlParams.get('Xp'));
    

    const hbar = 1.055e-34; // Joule segundo
    const m = 9.109e-31; // Massa do elétron em kg
    const h = 6.626e-34; // Constante de Planck
    const eV = 1.602e-19; // Joule por electron volt
    const c = 3e8; // Velocidade da luz em m/s

    function Largura(A) {
        return (2 / (A ** 2)) * 1e9;
    }

    function NumeroAtomico(K,A) { 
        let result = (K * (Largura(A))*1e-9)/Math.PI;
        return result.toFixed(0); // Arredonda para 2 casas decimais
    }

    function Probabilidade(Xp) {
        return A**2 * Math.sin(K * Xp * (Largura(A) * 1e-9))**2;
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

// If the page is the input form, handle the form submission
document.getElementById('inputForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;
    const A = parseFloat(form.elements['A'].value); // Acesso ao valor do campo A
    const K = parseFloat(form.elements['K'].value); // Acesso ao valor do campo K
    const Xp = parseFloat(form.elements['Xp'].value); // Acesso ao valor do campo Xp (se necessário)
    
    const params = new URLSearchParams({
        A: A,
        K: K,
        Xp: Xp,
    }).toString();

    window.location.href = `results.html?${params}`;
});
