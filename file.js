const input = document.getElementById("colorInput");

  input.addEventListener("input", function () {
    const value = input.value.trim();

    // Split colors by spaces or commas
    const colors = value.split(/[\s,]+/).filter(c => c);

    if (colors.length === 1) {
      // One color
      document.body.style.background = colors[0];
    } else if (colors.length > 1) {
      // Multiple colors: gradient
      document.body.style.background = `linear-gradient(to right, ${colors.join(", ")})`;
    } else {
      // Empty input, reset background
      document.body.style.background = "";
    }
  });
         const colorInput = document.getElementById('colorInput');
        const schemeButtons = document.querySelectorAll('.scheme-btn');
        const gradientPreview = document.getElementById('gradientPreview');
        const cssCode = document.getElementById('cssCode');
        
        let currentScheme = 'linear';
        
        // Set active scheme button
        schemeButtons.forEach(button => {
            button.addEventListener('click', function() {
                schemeButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                currentScheme = this.getAttribute('data-scheme');
                updateGradient();
            });
        });
        
        // Update gradient on input
        colorInput.addEventListener('input', updateGradient);
        
        function updateGradient() {
            const value = colorInput.value.trim();
            const colors = value.split(/[\s,]+/).filter(c => c);
            
            if (colors.length === 0) {
                gradientPreview.style.background = '';
                cssCode.textContent = '/* Enter colors to see the gradient */';
                return;
            }
            
            let gradientCSS = '';
            
            if (colors.length === 1) {
                // Single color
                gradientPreview.style.background = colors[0];
                gradientCSS = `background: ${colors[0]};`;
            } else {
                // Multiple colors
                switch(currentScheme) {
                    case 'linear':
                        gradientCSS = `linear-gradient(to right, ${colors.join(', ')})`;
                        break;
                    case 'radial':
                        gradientCSS = `radial-gradient(circle, ${colors.join(', ')})`;
                        break;
                    case 'conic':
                        gradientCSS = `conic-gradient(${colors.join(', ')})`;
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
            
            // Update CSS code display
            cssCode.textContent = gradientCSS;
            
            // Update body background for full effect
            if (colors.length > 1) {
                document.body.style.background = gradientCSS;
            } else if (colors.length === 1) {
                document.body.style.background = colors[0];
            } else {
                document.body.style.background = '';
            }
        }
        
        // Initialize with example
        colorInput.value = 'red, blue, green';
        updateGradient();
