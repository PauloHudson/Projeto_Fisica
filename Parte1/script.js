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
    const m = parseFloat(urlParams.get('m')) || 0; // Obtém a massa da URL

    console.log("Massa recebida:", m);

    const hbar = 1.055e-34; // Joule segundo
    const h = 6.626e-34; // Constante de Planck
    const h2 = 4.136e-15; // Constante de Planck em eV
    const eV = 1.602e-19; // Joule por electron volt
    const c = 3e8; // Velocidade da luz em m/s
    console.log(m)
    
    
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
        <h3>Transição de Energia</h3>
        <p>Efoton = ${(energy(ni)*eV).toExponential(2)} J</p>
        <p>Efoton = ${(energy(ni)).toExponential(2)} eV</p>
        <p>Efoton = ${(energy2(ni)).toExponential(2)} E1/eV</p>
        <p>f = ${frequency(ni).toExponential(2)} Hz</p>
        <p>v = ${velocidade(ni).toExponential(2)} m/s</p>
        <p>λ = ${comprimentoOnda(ni).toExponential(2)} m</p>
        <p>λ de Broglie = ${comprimentoBroglie(ni).toExponential(2)} m</p>
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
    console.log(m)
    window.location.href = `results.html?${params}`;
});
