// ===== PORTUGUESE → CSS COLOR TRANSLATION (NOVO CÓDIGO) =====
const ptToCssColors = {
    "preto": "black",
    "branco": "white",
    "vermelho": "red",
    "azul": "blue",
    "verde": "green",
    "amarelo": "yellow",
    "roxo": "purple",
    "rosa": "pink",
    "laranja": "orange",
    "marrom": "brown",
    "cinza": "gray",
    "cinzento": "gray",

    "azul claro": "lightblue",
    "verde claro": "lightgreen",
    "cinza claro": "lightgray",
    "rosa claro": "lightpink",
    "amarelo claro": "lightyellow",
    "ciano claro": "lightcyan",

    "azul escuro": "darkblue",
    "verde escuro": "darkgreen",
    "cinza escuro": "darkgray",
    "vermelho escuro": "darkred",
    "roxo escuro": "indigo",

    "agua": "aqua",
    "água": "aqua",
    "ciano": "cyan",
    "magenta": "magenta",
    "fucsia": "fuchsia",
    "fúcsia": "fuchsia",
    "lima": "lime",
    "oliva": "olive",
    "navy": "navy",
    "teal": "teal",
    "marinho": "navy",
    "turquesa": "turquoise",
    "violeta": "violet",
    "indigo": "indigo",
    "índigo": "indigo",
    "ouro": "gold",
    "dourado": "gold",
    "prata": "silver",
    "bege": "beige",
    "coral": "coral",
    "salmao": "salmon",
    "salmão": "salmon",
    "salmao claro": "lightsalmon",
    "chocolate": "chocolate",
    "ameixa": "plum",
    "orquidea": "orchid",
    "orquídea": "orchid",
    "ceu": "skyblue",
    "céu": "skyblue",
    "azul ceu": "skyblue",
    "azul céu": "skyblue",

    "cinza medio": "darkgray",
    "cinza médio": "darkgray",
    "cinza chumbo": "dimgray",

    "transparente": "transparent"
};

function normalizeColorName(str) {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

function translatePortugueseColors(input) {
    return input
        .split(/[\s,]+/)
        .map(color => {
            const normalized = normalizeColorName(color);
            return ptToCssColors[normalized] || color;
        })
        .join(", ");
}

// ===== SEU CÓDIGO ORIGINAL (INALTERADO) =====
const colorInput = document.getElementById('colorInput');
const gradientPreview = document.getElementById('gradientPreview');
const cssCode = document.getElementById('cssCode');
// Get all scheme buttons
const linearBtn = document.getElementById('linearBtn');
const radialBtn = document.getElementById('radialBtn');
const conicBtn = document.getElementById('conicBtn');
const diamondBtn = document.getElementById('diamondBtn');
const reflectedBtn = document.getElementById('reflectedBtn');

// Store current scheme
let currentScheme = 'linear';

// Add event listeners to buttons
linearBtn.addEventListener('click', () => setActiveScheme('linear'));
radialBtn.addEventListener('click', () => setActiveScheme('radial'));
conicBtn.addEventListener('click', () => setActiveScheme('conic'));
diamondBtn.addEventListener('click', () => setActiveScheme('diamond'));
reflectedBtn.addEventListener('click', () => setActiveScheme('reflected'));

// Update gradient on input
colorInput.addEventListener('input', updateGradient);

// Function to set active scheme
function setActiveScheme(scheme) {
    currentScheme = scheme;

    const buttons = [linearBtn, radialBtn, conicBtn, diamondBtn, reflectedBtn];
    buttons.forEach(btn => btn.classList.remove('active'));

    switch (scheme) {
        case 'linear': linearBtn.classList.add('active'); break;
        case 'radial': radialBtn.classList.add('active'); break;
        case 'conic': conicBtn.classList.add('active'); break;
        case 'diamond': diamondBtn.classList.add('active'); break;
        case 'reflected': reflectedBtn.classList.add('active'); break;
    }

    updateGradient();
}

// Function to update gradient based on input and selected scheme
function updateGradient() {
    const value = translatePortugueseColors(colorInput.value.trim()); // ← ÚNICA LINHA USANDO O CÓDIGO NOVO
    const colors = value.split(/[\s,]+/).filter(c => c);

    if (colors.length === 0) {
        gradientPreview.style.background = '';
        cssCode.textContent = '/* Enter colors to see the gradient */';
        document.body.style.background = 'linear-gradient(to right, #ff7e5f, #feb47b)';
        return;
    }

    let gradientCSS = '';

    if (colors.length === 1) {
        gradientPreview.style.background = colors[0];
        gradientCSS = `background: ${colors[0]};`;
    } else {
        switch (currentScheme) {
            case 'linear':
                gradientCSS = `linear-gradient(to right, ${colors.join(', ')})`;
                break;
            case 'radial':
                gradientCSS = `radial-gradient(circle, ${colors.join(', ')})`;
                break;
            case 'conic':
                gradientCSS = `conic-gradient(from 90deg, ${colors.join(', ')})`;
                break;
            case 'diamond':
                gradientCSS = `linear-gradient(45deg, ${colors.join(', ')})`;
                break;
            case 'reflected':
                const reflectedColors = [...colors, ...colors.slice().reverse()];
                gradientCSS = `linear-gradient(to right, ${reflectedColors.join(', ')})`;
                break;
        }

        gradientPreview.style.background = gradientCSS;
        gradientCSS = `background: ${gradientCSS};`;
    }

    cssCode.textContent = gradientCSS;

    if (colors.length > 1) {
        document.body.style.background = gradientCSS;
    } else {
        document.body.style.background = colors[0];
    }
}

// Initialize with example
colorInput.value = 'vermelho azul verde';
updateGradient();
