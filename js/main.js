
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
    { src: 'assest/images/image1.jpg', caption: 'Membership  Drive' },
    { src: 'assest/images/image2.jpg', caption: 'Membership Drive' },
    { src: 'assest/images/JSSUN-2.jpg', caption: 'JSS Uni' }
];

let currentSlide = 0;
const carousel = document.getElementById('heroCarousel');

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

function nextSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Change slide every 5 seconds
setInterval(nextSlide, 5000);

// Slider functionality
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');
let sliderCurrentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    sliderCurrentSlide = (sliderCurrentSlide + 1) % slides.length;
    showSlide(sliderCurrentSlide);
}

// Add click events to dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        sliderCurrentSlide = index;
        showSlide(sliderCurrentSlide);
    });
});

// Auto advance slides
setInterval(nextSlide, 5000);



document.addEventListener('DOMContentLoaded', function () {
    const stats = document.querySelectorAll('.stat-number');

    const animateStats = () => {
        stats.forEach(stat => {
            const updateCount = () => {
                const target = +stat.getAttribute('data-target');
                const count = +stat.innerText;
                const increment = target / 200;

                if (count < target) {
                    stat.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 10);
                } else {
                    stat.innerText = target;
                }
            };

            updateCount();
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
        threshold: 0.5
    });

    stats.forEach(stat => {
        observer.observe(stat);
    });
});


// events
document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.event-slide-track');
    const slides = Array.from(track.children);
    const slideWidth = slides[0].getBoundingClientRect().width;

    // Duplicate slides for infinite effect
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        track.appendChild(clone);
    });

    // Arrange the slides next to one another
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    const allSlides = Array.from(track.children);
    allSlides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    // Auto slide
    let currentIndex = 0;
    let intervalId;

    const startAutoSlide = () => {
        intervalId = setInterval(() => {
            const currentSlide = track.querySelector('.current-slide') || allSlides[0];
            const nextSlide = currentSlide.nextElementSibling || allSlides[0];
            moveToSlide(track, currentSlide, nextSlide);
            currentIndex = (currentIndex + 1) % allSlides.length;

            // Reset position for infinite effect
            if (currentIndex === slides.length) {
                track.style.transition = 'none';
                track.style.transform = 'translateX(0)';
                currentIndex = 0;
            }
        }, 3000); // Change slide every 3 seconds
    };

    const stopAutoSlide = () => {
        clearInterval(intervalId);
    };

    startAutoSlide();

    // Stop animation on hover
    track.addEventListener('mouseenter', stopAutoSlide);
    track.addEventListener('mouseleave', startAutoSlide);
});


document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.gallery-slide-track');
    const slides = Array.from(track.children);
    const slideWidth = slides[0].getBoundingClientRect().width;

    // Duplicate slides for infinite effect
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        track.appendChild(clone);
    });

    let currentIndex = 0;

    const moveToNextSlide = () => {
        currentIndex++;
        track.style.transition = 'transform 0.5s linear';
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

        if (currentIndex >= slides.length) {
            setTimeout(() => {
                track.style.transition = 'none';
                track.style.transform = 'translateX(0)';
                currentIndex = 0;
            }, 500); // Match the transition duration
        }
    };

    const startInfiniteScroll = () => {
        setInterval(moveToNextSlide, 3000); // Change slide every 3 seconds
    };

    startInfiniteScroll();
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



