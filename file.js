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
            
            // Remove active class from all buttons
            const buttons = [linearBtn, radialBtn, conicBtn, diamondBtn, reflectedBtn];
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            switch(scheme) {
                case 'linear':
                    linearBtn.classList.add('active');
                    break;
                case 'radial':
                    radialBtn.classList.add('active');
                    break;
                case 'conic':
                    conicBtn.classList.add('active');
                    break;
                case 'diamond':
                    diamondBtn.classList.add('active');
                    break;
                case 'reflected':
                    reflectedBtn.classList.add('active');
                    break;
            }
            
            // Update the gradient
            updateGradient();
        }
        
        // Function to update gradient based on input and selected scheme
        function updateGradient() {
            const value = colorInput.value.trim();
            const colors = value.split(/[\s,]+/).filter(c => c);
            
            if (colors.length === 0) {
                gradientPreview.style.background = '';
                cssCode.textContent = '/* Enter colors to see the gradient */';
                document.body.style.background = 'linear-gradient(to right, #ff7e5f, #feb47b)';
                return;
            }
            
            let gradientCSS = '';
            
            if (colors.length === 1) {
                // Single color
                gradientPreview.style.background = colors[0];
                gradientCSS = `background: ${colors[0]};`;
            } else {
                // Multiple colors - apply selected scheme
                switch(currentScheme) {
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
            
            // Update CSS code display
            cssCode.textContent = gradientCSS;
            
            // Update body background for full effect
            if (colors.length > 1) {
                document.body.style.background = gradientCSS;
            } else if (colors.length === 1) {
                document.body.style.background = colors[0];
            }
        }
        
        // Initialize with example
        colorInput.value = 'red, blue, green';
        updateGradient();