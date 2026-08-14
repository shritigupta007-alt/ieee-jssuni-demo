
// Navbar Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Mobile Navigation
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});



// Hero Carousel
const carouselImages = [
    { src: 'assets/images/image1.png', caption: 'Membership Drive' },
    { src: 'assets/images/image2.png', caption: 'Membership Drive' },
    { src: 'assets/images/JSSUN-2.png', caption: 'JSS Uni' }
];

let currentSlide = 0;
const carousel = document.getElementById('heroCarousel');

if (carousel) {
    function createCarousel() {
        carouselImages.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
            slide.style.backgroundImage = `url(${image.src})`;
            
            const caption = document.createElement('p');
            caption.className = 'carousel-caption';
            caption.textContent = image.caption;
            
            slide.appendChild(caption);
            carousel.appendChild(slide);
        });
    }
    createCarousel();

    function nextHeroSlide() {
        const slides = document.querySelectorAll('.carousel-slide');
        if (slides.length === 0) return;
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextHeroSlide, 5000);
}

// Hero background slider functionality
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');
let sliderCurrentSlide = 0;

if (slides.length > 0) {
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
    }

    function nextSlide() {
        sliderCurrentSlide = (sliderCurrentSlide + 1) % slides.length;
        showSlide(sliderCurrentSlide);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            sliderCurrentSlide = index;
            showSlide(sliderCurrentSlide);
        });
    });

    setInterval(nextSlide, 5000);
}

// Stats Counter Animation
document.addEventListener('DOMContentLoaded', function () {
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length === 0) return;

    const animateStats = () => {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target') || 0;
            let current = 0;
            const step = Math.max(1, Math.ceil(target / 40));
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    stat.innerText = target;
                    clearInterval(timer);
                } else {
                    stat.innerText = current;
                }
            }, 30);
        });
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    stats.forEach(stat => {
        observer.observe(stat);
    });
});

// Homepage Events Slider Guard
document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.event-slide-track');
    if (!track || track.children.length === 0) return;

    const slides = Array.from(track.children);
    const slideWidth = slides[0].getBoundingClientRect().width;

    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);
});

// Homepage Gallery Track Guard
document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.gallery-slide-track');
    if (!track || track.children.length === 0) return;
});

// ==========================================================================
// PHOTO GALLERY LIGHTBOX FUNCTIONALITY
// ==========================================================================
document.addEventListener('DOMContentLoaded', function () {
    const lightbox = document.getElementById('lightboxModal');
    if (!lightbox) return; // Only execute if lightbox exists on page

    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    let galleryItems = [];
    let currentIndex = 0;

    // Collect all gallery cards
    function updateGalleryItems() {
        const cards = document.querySelectorAll('.gallery-card');
        galleryItems = Array.from(cards).map(card => {
            const img = card.querySelector('.gallery-img');
            const titleEl = card.querySelector('.gallery-card-title') || card.querySelector('.gallery-card-caption');
            const descEl = card.querySelector('.gallery-card-desc');
            const category = card.closest('.gallery-section')?.dataset?.category || 'Gallery';
            return {
                src: img ? img.getAttribute('src') : '',
                alt: img ? img.getAttribute('alt') : 'IEEE JSSUN Gallery Photo',
                title: titleEl ? titleEl.textContent.trim() : category,
                desc: descEl ? descEl.textContent.trim() : '',
                category: category
            };
        });
    }

    updateGalleryItems();

    function openLightbox(index) {
        if (galleryItems.length === 0) return;
        currentIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightboxContent() {
        const item = galleryItems[currentIndex];
        if (!item) return;

        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.95)';

        setTimeout(() => {
            lightboxImg.src = item.src;
            lightboxImg.alt = item.alt;
            if (lightboxTitle) {
                lightboxTitle.textContent = item.title;
            }
            if (lightboxDesc) {
                lightboxDesc.textContent = item.desc;
            }
            if (lightboxCounter) {
                lightboxCounter.textContent = `${item.category} • Image ${currentIndex + 1} of ${galleryItems.length}`;
            }
            lightboxImg.style.opacity = '1';
            lightboxImg.style.transform = 'scale(1)';
        }, 150);
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateLightboxContent();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightboxContent();
    }

    // Attach click events to cards
    document.querySelectorAll('.gallery-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    // Control events
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (nextBtn) nextBtn.addEventListener('click', showNext);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);

    // Close when clicking outside content area
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNext();
        } else if (e.key === 'ArrowLeft') {
            showPrev();
        }
    });
});



