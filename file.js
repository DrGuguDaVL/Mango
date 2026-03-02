const cssColorNames = [
    "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond",
    "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue",
    "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki",
    "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue",
    "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick",
    "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green",
    "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush",
    "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgreen", 
    "lightgray", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", 
    "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", 
    "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue",
    "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered",
    "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "periwinkle",
    "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon",
    "sandybrown", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue",
    "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"
];
function fetchColorFromAPI(colorName) {
    const apiUrl = `https://api.color.pizza/v1/${colorName}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.colors.length > 0) {
                return data.colors[0].hex;
            }
            return colorName; // If the color isn't found, return it as is
        })
        .catch(error => {
            console.error("Error fetching color:", error);
            return colorName;
        });
}

const cssColorMap = cssColorNames.reduce((acc, color) => {
    const hex = tinycolor(color).toHexString(); // Convert the color name to hex using tinycolor
    acc[color] = hex;
    return acc;
}, {});

function translateEveryColor(input) {
    return input
        .split(/[\s,]+/)
        .map(color => {
            const normalized = normalizeColorName(color);
            return cssColorMap[normalized] || color; // Use the dynamic map here
        })
        .join(", ");
}

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
