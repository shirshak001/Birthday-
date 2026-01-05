// ============================================
// BIRTHDAY SURPRISE PAGE - INTERACTIVE FEATURES
// ============================================

// === PAGE TRANSITION EFFECTS ===
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth page transition on load
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Load photo into mini polaroid
    loadMiniPolaroid();

    // Start background birthday song
    initBirthdaySong();
    
    // Add page transition on navigation links
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            // Only transition for internal links
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                e.preventDefault();
                document.body.style.transition = 'opacity 0.4s ease';
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }
        });
    });
});

// === CONFETTI ANIMATION ===
const canvas = document.getElementById('confetti');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let confettiParticles = [];
    let animationFrameId;

// Set canvas size
function resizeCanvas() {
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

// Confetti particle class
class ConfettiParticle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 8 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = this.getRandomColor();
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
    }

    getRandomColor() {
        const colors = [
            '#ff6b9d', '#ffc1e3', '#ff4757', '#ffbe76', 
            '#74b9ff', '#a29bfe', '#fd79a8', '#fdcb6e'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height) {
            this.reset();
        }

        if (this.x > canvas.width || this.x < 0) {
            this.speedX *= -1;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

// Initialize confetti
function initConfetti() {
    resizeCanvas();
    for (let i = 0; i < 80; i++) {
        confettiParticles.push(new ConfettiParticle());
    }
    animateConfetti();
}

// Animate confetti
function animateConfetti() {
    if (!canvas || !ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    confettiParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    animationFrameId = requestAnimationFrame(animateConfetti);
}

// Stop confetti after 15 seconds
setTimeout(() => {
    if (animationFrameId && canvas && ctx) {
        cancelAnimationFrame(animationFrameId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}, 15000);

} // Close canvas if block

// === MINI POLAROID CAROUSEL ===
let miniCarouselInterval;
let miniCarouselIndex = 0;
let miniSlides = [];
let miniDots = [];
let miniCaptionEl = null;
const bannedPhotos = [
    'photos/WhatsApp Image 2025-12-25 at 5.22.16 PM (2).jpeg',
    'photos/WhatsApp Image 2025-12-25 at 5.22.17 PM (1).jpeg',
    'photos/WhatsApp Image 2025-12-25 at 5.22.18 PM.jpeg'
];

function loadMiniPolaroid() {
    const polaroidMini = document.getElementById('polaroidMini');
    if (!polaroidMini) return;
    if (typeof photoConfig === 'undefined' || !photoConfig.photos || photoConfig.photos.length === 0) return;

    // Exclude any banned photos, then use up to ten for the mini carousel
    const photos = photoConfig.photos
        .filter(p => !bannedPhotos.includes(p.src))
        .slice(0, 10);

    // Clear previous content if reloading
    polaroidMini.innerHTML = '';

    // Slides wrapper is the polaroidMini itself; create slides
    photos.forEach((photo, index) => {
        const slide = document.createElement('div');
        slide.className = 'mini-slide';

        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.caption || `Memory ${index + 1}`;
        img.loading = index === 0 ? 'eager' : 'lazy';

        slide.appendChild(img);
        if (index === 0) slide.classList.add('active');
        polaroidMini.appendChild(slide);
    });

    // Dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'mini-dots';
    photos.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'mini-dot';
        if (index === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    });
    polaroidMini.appendChild(dotsContainer);

    // Loving caption below the photo area (inside the white frame but outside photo)
    const captionParent = polaroidMini.parentElement;
    if (captionParent) {
        const oldCaption = captionParent.querySelector('.mini-caption');
        if (oldCaption) oldCaption.remove();

        const caption = document.createElement('div');
        caption.className = 'mini-caption';
        miniCaptionEl = caption;
        captionParent.appendChild(caption);
    }

    // Set initial caption
    updateMiniCaption(photos, miniCarouselIndex);

    // Cache slide and dot references
    miniSlides = Array.from(polaroidMini.querySelectorAll('.mini-slide'));
    miniDots = Array.from(polaroidMini.querySelectorAll('.mini-dot'));

    // Start carousel
    miniCarouselIndex = 0;
    if (miniSlides.length > 1) {
        startMiniCarousel();
    } else {
        stopMiniCarousel();
    }
}

function startMiniCarousel() {
    stopMiniCarousel();
    if (miniSlides.length < 2) return;
    miniCarouselInterval = setInterval(() => advanceMiniSlide(), 1800);
}

function stopMiniCarousel() {
    if (miniCarouselInterval) {
        clearInterval(miniCarouselInterval);
        miniCarouselInterval = null;
    }
}

function advanceMiniSlide() {
    if (!miniSlides.length) return;

    miniSlides[miniCarouselIndex].classList.remove('active');
    if (miniDots[miniCarouselIndex]) miniDots[miniCarouselIndex].classList.remove('active');

    miniCarouselIndex = (miniCarouselIndex + 1) % miniSlides.length;

    miniSlides[miniCarouselIndex].classList.add('active');
    if (miniDots[miniCarouselIndex]) miniDots[miniCarouselIndex].classList.add('active');

    // Update caption to match current slide
    if (typeof photoConfig !== 'undefined' && photoConfig.photos && photoConfig.photos.length) {
        const photos = photoConfig.photos.filter(p => !bannedPhotos.includes(p.src)).slice(0, 10);
        updateMiniCaption(photos, miniCarouselIndex);
    }
}

// Pause carousel when window not focused to avoid runaway timers
window.addEventListener('blur', stopMiniCarousel);
window.addEventListener('focus', () => {
    if (miniSlides.length > 1) startMiniCarousel();
});

function updateMiniCaption(photos, index) {
    if (!miniCaptionEl || !photos || !photos.length) return;
    const activePhoto = photos[index % photos.length];
    miniCaptionEl.textContent = activePhoto?.caption || 'Our favorite memories together.';
}

// === SMOOTH SCROLL FUNCTION ===
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// === BIRTHDAY SONG (BACKGROUND) ===
function initBirthdaySong() {
    const audio = document.getElementById('birthdaySong');

    if (!audio) return;

    audio.loop = true;
    audio.autoplay = true;
    audio.playsInline = true;
    audio.volume = 0.8;

    const tryPlay = () => {
        audio.play()
            .catch((err) => {
                console.error('Audio play blocked', err);
            });
    };

    // Immediate attempt
    tryPlay();

    // Unlock on first user interaction if blocked
    const unlock = () => {
        tryPlay();
        window.removeEventListener('pointerdown', unlock);
        window.removeEventListener('touchstart', unlock);
    };
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('touchstart', unlock, { once: true });

    // Resume when coming back to tab
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && audio.paused) {
            tryPlay();
        }
    });
}

// === GALLERY FUNCTIONALITY ===
let currentImageIndex = 0;
let galleryImages = [];

function loadGallery() {
    const galleryGrid = document.getElementById('photoGallery');
    
    // Exit if gallery element doesn't exist (not on gallery page)
    if (!galleryGrid) return;
    
    // Check if photos are configured
    if (typeof photoConfig !== 'undefined' && photoConfig.photos.length > 0) {
        const photos = photoConfig.photos.filter(p => !bannedPhotos.includes(p.src));

        galleryGrid.innerHTML = ''; // Clear placeholders
        galleryImages = [];
        
        photos.forEach((photo, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-index', index);
            galleryItem.style.animationDelay = `${index * 0.1}s`;
            
            const img = document.createElement('img');
            img.src = photo.src;
            img.alt = photo.caption || `Memory ${index + 1}`;
            img.loading = 'lazy';
            
            // Add caption overlay - always visible
            const captionOverlay = document.createElement('div');
            captionOverlay.className = 'caption-overlay';
            captionOverlay.textContent = photo.caption || '';
            
            galleryItem.appendChild(img);
            galleryItem.appendChild(captionOverlay);
            galleryItem.addEventListener('click', () => openLightbox(index));
            
            galleryGrid.appendChild(galleryItem);
            galleryImages.push(photo);
        });
    } else {
        // Keep placeholders if no photos configured
        console.log('No photos configured. Add photos in config.js');
        galleryImages = [];
    }
}

// === LIGHTBOX FUNCTIONALITY ===
function openLightbox(index) {
    if (galleryImages.length === 0) return;
    
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const counter = document.getElementById('lightbox-counter');
    
    if (!lightbox || !lightboxImg || !caption) {
        console.error('Lightbox elements not found');
        return;
    }
    
    lightbox.style.display = 'flex';
    lightboxImg.src = galleryImages[index].src;
    caption.textContent = galleryImages[index].caption || '';
    
    if (counter) {
        counter.textContent = `${index + 1} / ${galleryImages.length}`;
    }
    
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function navigateLightbox(direction) {
    if (galleryImages.length === 0) return;
    
    currentImageIndex += direction;
    
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const counter = document.getElementById('lightbox-counter');
    
    if (!lightboxImg || !caption) {
        console.error('Lightbox elements not found in navigation');
        return;
    }
    
    lightboxImg.src = galleryImages[currentImageIndex].src;
    caption.textContent = galleryImages[currentImageIndex].caption || '';
    
    if (counter) {
        counter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
    }
}

// === ADVANCED PARALLAX SCROLL EFFECT ===
function initParallax() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const wishCards = document.querySelectorAll('.wish-card');
    const sectionTitles = document.querySelectorAll('.section-title');
    
    // Multi-layer parallax with different speeds and effects
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Gallery items - multi-directional parallax with rotation and scale
        galleryItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const itemCenter = rect.top + rect.height / 2;
            const distanceFromCenter = (windowHeight / 2 - itemCenter) / windowHeight;
            
            // Calculate different speeds for variety
            const speed = (index % 3 + 1) * 0.2;
            const yPos = -(scrolled * speed);
            
            // Add rotation based on position
            const rotation = distanceFromCenter * 5;
            
            // Scale effect - items get slightly larger when centered
            const scale = 1 + Math.abs(distanceFromCenter) * 0.05;
            
            // Depth-based translation
            const depth = (index % 4) * 20;
            const xPos = Math.sin(scrolled * 0.001 + index) * depth;
            
            item.style.transform = `
                translateY(${yPos}px) 
                translateX(${xPos}px)
                rotateZ(${rotation}deg)
                scale(${2 - scale})
            `;
            
            // Add blur for depth perception on far items
            if (Math.abs(distanceFromCenter) > 0.6) {
                item.style.filter = `blur(${Math.abs(distanceFromCenter) * 2}px)`;
            } else {
                item.style.filter = 'blur(0)';
            }
        });
        
        // Wish cards - wave motion parallax
        wishCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            if (rect.top < windowHeight && rect.bottom > 0) {
                const progress = (windowHeight - rect.top) / windowHeight;
                const wave = Math.sin(progress * Math.PI * 2 + index) * 20;
                const yOffset = progress * -30;
                
                card.style.transform = `
                    translateY(${yOffset}px)
                    translateX(${wave}px)
                    rotateY(${wave * 0.5}deg)
                `;
            }
        });
        
        // Section titles - floating effect
        sectionTitles.forEach((title, index) => {
            const rect = title.getBoundingClientRect();
            if (rect.top < windowHeight && rect.bottom > 0) {
                const scrollProgress = (windowHeight - rect.top) / windowHeight;
                const float = Math.sin(scrolled * 0.002 + index) * 10;
                
                title.style.transform = `
                    translateY(${float}px)
                    scale(${0.95 + scrollProgress * 0.05})
                `;
            }
        });
    });
    
    // Mouse movement parallax for immersive effect
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        
        galleryItems.forEach((item, index) => {
            const depth = (index % 3 + 1) * 15;
            const xMove = mouseX * depth;
            const yMove = mouseY * depth;
            
            // Combine with existing scroll transform
            const currentTransform = item.style.transform;
            if (currentTransform) {
                item.style.transform = currentTransform + ` translate(${xMove}px, ${yMove}px)`;
            }
        });
    });
}

// === ENHANCED 3D TILT EFFECT ON HOVER ===
function initTiltEffect() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const wishCards = document.querySelectorAll('.wish-card');
    
    // Enhanced tilt for gallery items
    galleryItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // More dramatic tilt angles
            const rotateX = ((y - centerY) / centerY) * 15;
            const rotateY = ((centerX - x) / centerX) * 15;
            
            // Add translation for depth
            const translateZ = 30;
            const translateX = ((x - centerX) / centerX) * 10;
            const translateY = ((y - centerY) / centerY) * 10;
            
            item.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(${translateZ}px)
                translateX(${translateX}px)
                translateY(${translateY}px)
                scale(1.08)
            `;
            
            // Add glowing shadow that follows cursor
            const shadowX = ((x - centerX) / centerX) * 20;
            const shadowY = ((y - centerY) / centerY) * 20;
            item.style.boxShadow = `
                ${shadowX}px ${shadowY}px 40px rgba(162, 155, 254, 0.6),
                ${-shadowX}px ${-shadowY}px 40px rgba(248, 181, 0, 0.4),
                0 0 60px rgba(255, 107, 157, 0.3)
            `;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
            item.style.boxShadow = '';
            item.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        item.addEventListener('mouseenter', () => {
            item.style.transition = 'none';
        });
        
        // Add ripple effect on click
        item.addEventListener('click', (e) => {
            createRipple(e, item);
        });
    });
    
    // Add subtle tilt to wish cards
    wishCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * 8;
            const rotateY = ((centerX - x) / centerX) * 8;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.03)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// === RIPPLE EFFECT ===
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        top: ${y}px;
        left: ${x}px;
        pointer-events: none;
        animation: rippleEffect 0.6s ease-out;
        z-index: 10;
    `;
    
    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// === EVENT LISTENERS ===
document.addEventListener('DOMContentLoaded', () => {
    // Initialize confetti (only on wishes page)
    if (canvas) {
        initConfetti();
    }
    
    // Load gallery
    loadGallery();
    
    // Initialize parallax and tilt effects
    setTimeout(() => {
        initParallax();
        initTiltEffect();
    }, 500);
    
    // Initialize romantic features if available
    if (typeof initRomanticFeatures === 'function') {
        initRomanticFeatures();
    }
    
    // Lightbox close button
    const closeBtn = document.querySelector('.lightbox-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    // Close lightbox on outside click
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (lightbox && (lightbox.style.display === 'flex' || lightbox.style.display === 'block')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            }
        }
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) rotateX(0)';
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Observe all wish cards and gallery items
    document.querySelectorAll('.wish-card, .gallery-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px) rotateX(-15deg)';
        observer.observe(element);
    });
});

// Resize canvas on window resize
window.addEventListener('resize', resizeCanvas);

// === TOUCH GESTURES FOR MOBILE ===
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.style.display === 'block') {
        touchStartX = e.changedTouches[0].screenX;
    }
});

document.addEventListener('touchend', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.style.display === 'block') {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next image
            navigateLightbox(1);
        } else {
            // Swipe right - previous image
            navigateLightbox(-1);
        }
    }
}

// === PREVENT CONTEXT MENU ON IMAGES (OPTIONAL) ===
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});
