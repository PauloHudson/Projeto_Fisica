document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('results.html')) {
        processResults();
    }
});

function processResults() {
    const urlParams = new URLSearchParams(window.location.search);
    const L = parseFloat(urlParams.get('L')) || 0;
    const ni = parseInt(urlParams.get('ni')) || 0;
    const nf = parseInt(urlParams.get('nf')) || 0;
    const a = parseFloat(urlParams.get('a')) || 0;
    const b = parseFloat(urlParams.get('b')) || 0;

    const hbar = 1.055e-34; // Joule segundo
    let m = 9.109e-31; // Massa do elétron em kg ou massa do próton em kg
    const h = 6.626e-34; // Constante de Planck
    const eV = 1.602e-19; // Joule por electron volt
    const c = 3e8; // Velocidade da luz em m/s

    
    
    function psiA(L) {
        return Math.sqrt(2/L);
    }
    function psiK(ni) {
        return ((ni+1) * Math.PI) / L;
    }
//-------------------------------------------------------------------------------------------------------------------------------------------//
    function energy(n) {
        return n * n * Math.PI * Math.PI * hbar * hbar / (2 * m * L * L);
    }

    function deBroglieWavelength(n) {
        const En = energy(n);
        return h / Math.sqrt(2 * m * En);
    }

    function photonEnergy(Ei, Ef) {
        return Math.abs(Ef - Ei); // Energia do fóton
    }

    function frequency(E_photon) {
        return E_photon / h; // Frequência do fóton
    }

    function wavelengthPhoton(f) {
        return c / f; // Comprimento de onda do fóton
    }

    function particleVelocity(E) {
        return Math.sqrt(2 * E / m); // Velocidade da partícula
    }

    function probability(n, a, b) {
        let integral = 0;
        const steps = 1000;
        const dx = (b - a) / steps;
        for (let i = 0; i <= steps; i++) {
            const x = a + i * dx;
            integral += psi(n, x) * psi(n, x) * dx;
        }
        return integral;
    }

    const results = document.getElementById('results');
    results.innerHTML = `
        <h3>Função de Onda Quântica</h3>
        <p>ψ_${ni}(x) = ${Math.floor(psiA(L))} sin(${Math.floor(psiK(ni))} * X)</p>
        
    `;
}

// If the page is the input form, handle the form submission
document.getElementById('inputForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;
    const L = parseFloat(form.L.value);
    const ni = parseInt(form.ni.value);
    const nf = parseInt(form.nf.value);
    const a = parseFloat(form.a.value);
    const b = parseFloat(form.b.value);

    const params = new URLSearchParams({
        L: L,
        ni: ni,
        nf: nf,
        a: a,
        b: b
    }).toString();

    window.location.href = `results.html?${params}`;
});
