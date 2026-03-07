document.addEventListener('DOMContentLoaded', function() {
    // --- Existing Hamburger Menu Toggle ---
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // --- Project Slider Logic ---
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

    // --- Smooth Scroll for Nav Links ---
    const navLinks = document.querySelectorAll('.nav-links a, .hamburger-menu .bar');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href') || link.getAttribute('data-target');
            // If using .bar text as links, you might need data-target="#about" etc.
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                    nav.classList.remove('active');
                }
            }
        });
    });

    // --- Footer & Back to Top Logic ---
    const backToTopBtn = document.querySelector('#backToTop');
    const footer = document.querySelector('footer'); 
    const yearSpan = document.querySelector('.footer-bottom span');

    // Update Year automatically
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    if (backToTopBtn && footer) {
        window.addEventListener('scroll', () => {
            // Precise detection: get footer position relative to viewport
            const footerRect = footer.getBoundingClientRect();
            
            // If the top of the footer is less than the window height, it's visible
            if (footerRect.top < window.innerHeight) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});