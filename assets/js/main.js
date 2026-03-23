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
})();