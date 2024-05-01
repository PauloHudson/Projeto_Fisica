document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('results.html')) {
        processResults();
    }
});

function processResults() {
    const urlParams = new URLSearchParams(window.location.search);
    const L = parseFloat(urlParams.get('L'));
    const ni = parseInt(urlParams.get('ni'));
    const nf = parseInt(urlParams.get('nf'));
    const a = parseFloat(urlParams.get('a'));
    const b = parseFloat(urlParams.get('b'));

    const hbar = 1.055e-34; // Joule segundo
    let m; // Massa do elétron em kg ou massa do próton em kg

    document.getElementById('electron').addEventListener('click', function() {
    m = 9.109e-31; // Massa do elétron em kg
    processResults();
});

    document.getElementById('proton').addEventListener('click', function() {
    m = 1.673e-27; // Massa do próton em kg
    processResults();
});
    const h = 6.626e-34; // Constante de Planck
    const eV = 1.602e-19; // Joule por electron volt
    const c = 3e8; // Velocidade da luz em m/s

    function psi(n, x) {
        return Math.sqrt(2 / L) * Math.sin(n * Math.PI * x / L);
    }

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

    const Ei = energy(ni);
    const Ef = energy(nf);
    const E_photon = photonEnergy(Ei, Ef);
    const f = frequency(E_photon);
    const λ_photon = wavelengthPhoton(f);
    const vi = particleVelocity(Ei);
    const vf = particleVelocity(Ef);

    const results = document.getElementById('results');
    results.innerHTML = `
        <h3>Função de Onda Quântica</h3>
        <p>Para ni (${ni}): ψ_${ni}(x) = √(2/L) sin(${ni}πx/L)</p>
        <p>Para nf (${nf}): ψ_${nf}(x) = √(2/L) sin(${nf}πx/L)</p>
        <h3>Energias</h3>
        <p>Energia do nível quântico inicial (Ei): ${Ei.toExponential(3)} J (${(Ei / eV).toFixed(3)} eV)</p>
        <p>Energia do nível quântico final (Ef): ${Ef.toExponential(3)} J (${(Ef / eV).toFixed(3)} eV)</p>
        <h3>Fóton Emitido ou Absorvido</h3>
        <p>Energia (E_fóton): ${E_photon.toExponential(3)} J (${(E_photon / eV).toFixed(3)} eV)</p>
        <p>Frequência (f): ${f.toExponential(3)} Hz</p>
        <p>Comprimento de onda (λ): ${λ_photon.toExponential(3)} m</p>
        <h3>Velocidades</h3>
        <p>Velocidade da partícula no nível inicial (vi): ${vi.toExponential(3)} m/s</p>
        <p>Velocidade da partícula no nível final (vf): ${vf.toExponential(3)} m/s</p>
        <h3>Probabilidades</h3>
        <p>Probabilidade de encontrar a partícula entre ${a} e ${b} para ni: ${(probability(ni, a, b) * 100).toFixed(2)}%</p>
        <p>Probabilidade de encontrar a partícula entre ${a} e ${b} para nf: ${(probability(nf, a, b) * 100).toFixed(2)}%</p>
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
