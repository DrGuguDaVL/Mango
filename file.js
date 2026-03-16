// ---------------- Universal Color Parser ----------------
function normalizeColorName(str) {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

// Minimal dictionary for Spanish/Portuguese -> English
const colorDict = {
    "preto":"black","blanco":"white","branco":"white",
    "rojo":"red","vermelho":"red","azul":"blue","verde":"green",
    "amarillo":"yellow","amarelo":"yellow","rosa":"pink",
    "marron":"brown","marrom":"brown","gris":"gray","cinza":"gray"
};

// Translate colors, fallback to original if not in dictionary
function translateColor(input) {
    return input
        .split(/[\s,]+/)
        .map(color => {
            const normalized = normalizeColorName(color);
            return colorDict[normalized] || color; // browser will handle CSS color
        })
        .join(', ');
}

// ---------------- Gradient Generator ----------------
const colorInput = document.getElementById('colorInput');
const gradientPreview = document.getElementById('gradientPreview');
const cssCode = document.getElementById('cssCode');

const linearBtn = document.getElementById('linearBtn');
const radialBtn = document.getElementById('radialBtn');
const conicBtn = document.getElementById('conicBtn');
const diamondBtn = document.getElementById('diamondBtn');
const reflectedBtn = document.getElementById('reflectedBtn');

let currentScheme = 'linear';

// Button click events
[linearBtn, radialBtn, conicBtn, diamondBtn, reflectedBtn].forEach(btn => {
    btn.addEventListener('click', () => setActiveScheme(btn.id.replace('Btn','').toLowerCase()));
});

// Input event
colorInput.addEventListener('input', updateGradient);

function setActiveScheme(scheme) {
    currentScheme = scheme;
    [linearBtn, radialBtn, conicBtn, diamondBtn, reflectedBtn].forEach(b => b.classList.remove('active'));
    document.getElementById(scheme + 'Btn').classList.add('active');
    updateGradient();
}

function updateGradient() {
    const inputColors = translateColor(colorInput.value.trim());
    const colors = inputColors.split(/[\s,]+/).filter(c => c);

    if(colors.length === 0){
        gradientPreview.style.background = '';
        cssCode.textContent = '/* Enter colors to see the gradient */';
        document.body.style.background = '';
        return;
    }

    let gradientCSS = '';

    if(colors.length === 1){
        gradientPreview.style.background = colors[0];
        gradientCSS = `background: ${colors[0]};`;
    } else {
        switch(currentScheme){
            case 'linear': gradientCSS = `linear-gradient(to right, ${colors.join(', ')})`; break;
            case 'radial': gradientCSS = `radial-gradient(circle, ${colors.join(', ')})`; break;
            case 'conic': gradientCSS = `conic-gradient(from 90deg, ${colors.join(', ')})`; break;
            case 'diamond': gradientCSS = `linear-gradient(45deg, ${colors.join(', ')})`; break;
            case 'reflected': 
                const reflectedColors = [...colors, ...colors.slice().reverse()];
                gradientCSS = `linear-gradient(to right, ${reflectedColors.join(', ')})`; 
                break;
        }
        gradientPreview.style.background = gradientCSS;
        gradientCSS = `background: ${gradientCSS};`;
    }

    cssCode.textContent = gradientCSS;
    document.body.style.background = gradientCSS;
}

// Initialize with example
colorInput.value = 'rojo azul verde';
updateGradient();