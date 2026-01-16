document.addEventListener('DOMContentLoaded', function() {
    // --- Existing Hamburger Menu Toggle ---
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');

    // Toggle navigation menu visibility on small screens
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // --- Project Slider Logic  ---
    const projectsSlider = document.querySelector('.projects-slider');
    const projectCards = document.querySelectorAll('.project-card');
    const dots = document.querySelectorAll('.dot');
    
    if (projectsSlider && projectCards.length > 0) {
        
        const numProjects = projectCards.length;
        const cardWidthPercentage = 100 / numProjects; 
        
        projectsSlider.style.width = `${numProjects * 100}%`;
        
        projectCards.forEach(card => {
            card.style.minWidth = `${cardWidthPercentage}%`;
        });


        /**
         * Updates the slider position and highlights the active card/dot.
         * @param {number} activeIndex - The index of the project to display (0-based).
         */
        function updateSlider(activeIndex) {
            
            const offset = activeIndex * cardWidthPercentage; 
            projectsSlider.style.transform = `translateX(-${offset}%)`;

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });

            projectCards.forEach((card, index) => {
                card.classList.toggle('active', index === activeIndex);
            });
        }

        updateSlider(0); 

        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const targetIndex = parseInt(this.getAttribute('data-index'));
                updateSlider(targetIndex);
            });
        });
    }
});