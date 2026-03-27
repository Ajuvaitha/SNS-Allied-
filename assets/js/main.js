(function () {
    let currentIndex = 0;
    const track = document.getElementById('testimonials-track');
    const dots = document.querySelectorAll('.testimonial-dot');
    const totalSlides = 4;
    const nextBtn = document.getElementById('next-testimonial');
    const prevBtn = document.getElementById('prev-testimonial');

    if (track && dots.length && nextBtn && prevBtn) {
        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.remove('bg-gray-300');
                    dot.classList.add('bg-primary-600');
                } else {
                    dot.classList.remove('bg-primary-600');
                    dot.classList.add('bg-gray-300');
                }
            });
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                currentIndex = parseInt(dot.dataset.index);
                updateCarousel();
            });
        });

        // Auto-advance every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Story categories filtering
    const tabAll = document.getElementById('tab-all');
    const tabAcademic = document.getElementById('tab-academic');
    const storyCards = document.querySelectorAll('.story-card');

    if (tabAll && tabAcademic && storyCards.length > 0) {
        function setActiveTab(active) {
            tabAll.className = 'tab-button px-6 py-2 bg-white text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition border';
            tabAcademic.className = 'tab-button px-6 py-2 bg-white text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition border';
            
            active.className = 'tab-button px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition';
        }

        tabAll.addEventListener('click', () => {
            setActiveTab(tabAll);
            storyCards.forEach(card => card.style.display = 'flex');
        });

        tabAcademic.addEventListener('click', () => {
            setActiveTab(tabAcademic);
            storyCards.forEach(card => {
                if (card.dataset.category === 'academic') {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Active Navigation Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('nav a, #mobile-menu a, .fixed.bottom-0 a').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href === '#' || href.startsWith('http') || href.startsWith('tel') || href.startsWith('mailto')) return;
        
        const linkPath = href.split('/').pop() || 'index.html';
        
        // Ensure accurate matches for specific paths. Exception: empty path => index.html
        if (linkPath === currentPath) {
            // Check if it's the bottom fixed nav (Mobile)
            if (link.closest('.fixed.bottom-0')) {
                link.classList.remove('text-gray-400');
                link.classList.add('text-primary-600');
                // Make the icon bounce or slightly larger for active state
                const icon = link.querySelector('i');
                if (icon && !link.closest('.bg-primary-500')) {
                    icon.classList.add('scale-110');
                }
            } else {
                // Regular Top Nav and Mobile Drawer Menu highlights
                link.classList.remove('text-gray-700', 'text-gray-600', 'text-gray-400', 'font-medium');
                link.classList.add('text-primary-600', 'font-bold');
                
                // If it's a dropdown link, maybe give it a background cue
                if (link.classList.contains('px-4')) {
                    link.classList.add('bg-primary-50');
                }

                // Highlight parent dropdown button (Desktop)
                const dropdown = link.closest('.group');
                if (dropdown) {
                    const btn = dropdown.querySelector('button');
                    if (btn) {
                        btn.classList.remove('text-gray-700', 'font-medium');
                        btn.classList.add('text-primary-600', 'font-bold');
                    }
                }
                
                // Highlight parent accordion button (Mobile)
                const mobileMenuSection = link.closest('div.hidden.pl-4');
                if (mobileMenuSection && mobileMenuSection.previousElementSibling && mobileMenuSection.previousElementSibling.tagName === 'BUTTON') {
                    const btn = mobileMenuSection.previousElementSibling;
                    btn.classList.remove('text-gray-700', 'font-medium');
                    btn.classList.add('text-primary-600', 'font-bold');
                    // Automatically open the current active section for mobile view
                    mobileMenuSection.classList.remove('hidden');
                }
            }
        }
    });

})();