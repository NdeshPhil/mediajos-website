// ========================================
// MEDIAJOS PRODUCTIONS - COMPLETE JAVASCRIPT
// Your Image Our Focus
// ========================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initHeroVideo();
    initShutterTransitions();
    initScrollAnimations();
    initNavbarScroll();
    initServiceCards();
    initServiceLinks();
    initGalleryInteractions();
    initPortraitGalleryInteractions();
    initMobileVideos();
    initNameTags();
    initSocialIcons();
    initContactHover();
    initSmoothScroll();
    initMobileMenu();
    initLoadingAnimation();
    initVideoOptimization();
    initCounterAnimation();
    initPartnersAnimation();
    initContactCards();
    initRatingsAnimation();
    initSimpleContactForm();
    
    // Log success
    console.log('Mediajos Productions: All systems initialized 🎬');
});

// ========================================
// 1. HERO VIDEO LOADING & OPTIMIZATION
// ========================================
function initHeroVideo() {
    const heroVideo = document.querySelector('.hero-video');
    const poster = document.querySelector('.hero-poster');
    const container = document.querySelector('.hero-video-container');
    
    if (!heroVideo) return;
    
    // Create loading indicator
    const loader = document.createElement('div');
    loader.className = 'video-loading-indicator';
    container.appendChild(loader);
    
    // Check if video is cached
    if (heroVideo.readyState >= 3) {
        heroVideo.classList.add('ready');
        loader.remove();
        if (poster) poster.style.opacity = '0';
    } else {
        // Video loading events
        heroVideo.addEventListener('loadeddata', function() {
            heroVideo.classList.add('ready');
            loader.remove();
            if (poster) poster.style.opacity = '0';
        });
        
        heroVideo.addEventListener('error', function() {
            console.log('Hero video failed to load, showing poster only');
            loader.remove();
            heroVideo.style.display = 'none';
            if (poster) {
                poster.style.opacity = '1';
                poster.style.zIndex = '3';
            }
        });
    }
    
    // Ensure video plays smoothly
    heroVideo.play().catch(e => {
        console.log('Autoplay prevented:', e);
        addPlayButton(container);
    });
}

function addPlayButton(container) {
    const playBtn = document.createElement('button');
    playBtn.className = 'hero-play-btn';
    playBtn.innerHTML = '▶';
    playBtn.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60px;
        height: 60px;
        background: var(--primary-gold);
        border: none;
        border-radius: 50%;
        color: var(--primary-black);
        font-size: 24px;
        cursor: pointer;
        z-index: 10;
        animation: pulse 2s infinite;
    `;
    container.appendChild(playBtn);
    
    playBtn.addEventListener('click', () => {
        const video = container.querySelector('video');
        video.play();
        playBtn.remove();
    });
}

// ========================================
// 2. SHUTTER TRANSITIONS
// ========================================
function initShutterTransitions() {
    const shutterOverlay = document.querySelector('.shutter-overlay');
    const shutterLinks = document.querySelectorAll('.shutter-link, .service-link');
    
    if (!shutterOverlay) return;
    
    shutterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    shutterOverlay.classList.add('active');
                    animateAperture();
                    
                    setTimeout(() => {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        setTimeout(() => {
                            shutterOverlay.classList.remove('active');
                        }, 300);
                    }, 400);
                }
            }
        });
    });
    
    function animateAperture() {
        const aperture = document.querySelector('.aperture-overlay');
        if (aperture) {
            aperture.style.transform = 'translate(-50%, -50%) scale(1)';
            aperture.style.opacity = '1';
            
            setTimeout(() => {
                aperture.style.transform = 'translate(-50%, -50%) scale(0)';
                aperture.style.opacity = '0';
            }, 500);
        }
    }
}

// ========================================
// 3. SCROLL ANIMATIONS (GSAP)
// ========================================
function initScrollAnimations() {
    if (typeof gsap === 'undefined') {
        console.log('GSAP not loaded - using fallback');
        initFallbackAnimations();
        return;
    }
    
    try {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });
        
        // Animate service items
        gsap.utils.toArray('.service-item').forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out'
            });
        });
        
        // Animate category sections
        gsap.utils.toArray('.category-section').forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });
        
        // Animate why choose items
        gsap.utils.toArray('.why-choose-item').forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                scale: 0.9,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.15,
                ease: 'back.out(1.2)'
            });
        });
        
        // Animate partners section
        gsap.from('.partners-section', {
            scrollTrigger: {
                trigger: '.partners-section',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        // Animate ratings section
        gsap.from('.ratings-section', {
            scrollTrigger: {
                trigger: '.ratings-section',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        // Animate contact form section
        gsap.from('.contact-form-section', {
            scrollTrigger: {
                trigger: '.contact-form-section',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        // Animate contact cards
        gsap.utils.toArray('.contact-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: '.contact-section',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.15,
                ease: 'back.out(1.2)'
            });
        });
        
        // Animate quote
        gsap.from('.quote-container', {
            scrollTrigger: {
                trigger: '.quote-container',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
            opacity: 0,
            duration: 1.5,
            ease: 'power4.inOut'
        });
        
    } catch (error) {
        console.log('GSAP error:', error);
        initFallbackAnimations();
    }
}

// ========================================
// 4. FALLBACK ANIMATIONS
// ========================================
function initFallbackAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'all 1s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('.section-header, .service-item, .category-section, .why-choose-item, .quote-container, .partners-section, .ratings-section, .contact-form-section, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// ========================================
// 5. NAVBAR SCROLL EFFECT
// ========================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(10,10,10,0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'linear-gradient(to bottom, rgba(10,10,10,0.95), transparent)';
            navbar.style.boxShadow = 'none';
        }
        
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// ========================================
// 6. SERVICE CARDS INTERACTIONS
// ========================================
function initServiceCards() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
}

// ========================================
// 7. SERVICE LINKS HANDLER
// ========================================
function initServiceLinks() {
    const serviceLinks = document.querySelectorAll('.service-link');
    
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Highlight target
                target.style.transition = 'all 0.5s ease';
                target.style.boxShadow = 'inset 0 0 30px rgba(212, 175, 55, 0.3)';
                setTimeout(() => {
                    target.style.boxShadow = 'none';
                }, 1000);
            }
        });
    });
}

// ========================================
// 8. GALLERY INTERACTIONS (Landscape)
// ========================================
function initGalleryInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                createLightbox(img.src, img.alt);
            }
        });
    });
}

// ========================================
// 9. PORTRAIT GALLERY INTERACTIONS
// ========================================
function initPortraitGalleryInteractions() {
    const portraitItems = document.querySelectorAll('.portrait-item');
    
    portraitItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                createLightbox(img.src, img.alt);
            }
        });
    });
}

// ========================================
// 10. LIGHTBOX CREATOR
// ========================================
function createLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,0.95);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border: 3px solid var(--primary-gold);
    `;
    
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);
    
    setTimeout(() => lightbox.style.opacity = '1', 10);
    
    lightbox.addEventListener('click', () => {
        lightbox.style.opacity = '0';
        setTimeout(() => lightbox.remove(), 300);
    });
}

// ========================================
// 11. MOBILE VIDEOS OPTIMIZATION
// ========================================
function initMobileVideos() {
    const mobileVideos = document.querySelectorAll('.mobile-video, .reel-video, .vibes-video, .category-hero-video video');
    
    mobileVideos.forEach(video => {
        video.setAttribute('preload', 'metadata');
        
        // Pause when not in viewport
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        video.pause();
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(video);
        }
        
        // Handle errors
        video.addEventListener('error', function() {
            console.log('Video failed to load:', this.src);
            const fallback = document.createElement('div');
            fallback.className = 'video-fallback';
            fallback.textContent = 'Video unavailable';
            this.parentNode.insertBefore(fallback, this);
            this.style.display = 'none';
        });
    });
}

// ========================================
// 12. NAME TAGS ANIMATION
// ========================================
function initNameTags() {
    const nameTracks = document.querySelectorAll('.name-tags-track');
    
    nameTracks.forEach(track => {
        track.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });
        
        track.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
    });
}

// ========================================
// 13. SOCIAL ICONS HOVER
// ========================================
function initSocialIcons() {
    const socialIcons = document.querySelectorAll('.social-icon, .social-showcase-item');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            const img = icon.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        icon.addEventListener('mouseleave', () => {
            const img = icon.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
}

// ========================================
// 14. CONTACT ITEMS HOVER
// ========================================
function initContactHover() {
    const contactItems = document.querySelectorAll('.contact-item, .contact-card');
    
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.contact-icon, .contact-icon-large');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.contact-icon, .contact-icon-large');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
    
    // Click to copy phone
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', () => {
            showToast('Calling Mediajos Productions');
        });
    });
}

// ========================================
// 15. CONTACT CARDS INTERACTION
// ========================================
function initContactCards() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link
            if (e.target.tagName === 'A') return;
            
            // Find the first link in the card and simulate click
            const link = this.querySelector('a');
            if (link) {
                link.click();
            }
        });
    });
}

// ========================================
// 16. RATINGS SECTION ANIMATIONS
// ========================================
function initRatingsAnimation() {
    const ratingBadge = document.querySelector('.ratings-badge');
    const testimonialCards = document.querySelectorAll('.testimonial-quick');
    
    if (!ratingBadge) return;
    
    // Animate rating badge on scroll
    if (typeof gsap !== 'undefined') {
        gsap.from('.ratings-badge', {
            scrollTrigger: {
                trigger: '.ratings-section',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.2)'
        });
        
        // Animate each testimonial card with stagger
        gsap.from(testimonialCards, {
            scrollTrigger: {
                trigger: '.ratings-section',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out'
        });
    } else {
        // Fallback for no GSAP
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        ratingBadge.style.opacity = '0';
        ratingBadge.style.transform = 'scale(0.8)';
        observer.observe(ratingBadge);
        
        testimonialCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            observer.observe(card);
        });
    }
}

// ========================================
// 17. SIMPLE CONTACT FORM HANDLER
// ========================================
function initSimpleContactForm() {
    const form = document.getElementById('simpleContactForm');
    const container = document.querySelector('.contact-form-container');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(form);
            
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Show success message
                container.innerHTML = `
                    <div class="form-success">
                        <h4>🎉 Message Sent!</h4>
                        <p>Thank you for reaching out. We've received your message and will get back to you within 24 hours.</p>
                        <a href="#home" class="btn btn-secondary">Return to Home</a>
                    </div>
                `;
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Form error:', error);
            container.innerHTML = `
                <div class="form-error">
                    <h4>❌ Something went wrong</h4>
                    <p>We couldn't send your message. Please try again or email us directly at:</p>
                    <p><strong>mediajosproduction@gmail.com</strong></p>
                    <button onclick="location.reload()" class="btn btn-secondary mt-3">Try Again</button>
                </div>
            `;
        }
    });
}

// ========================================
// 18. SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ========================================
// 19. MOBILE MENU
// ========================================
function initMobileMenu() {
    if (window.innerWidth > 768) return;
    if (document.querySelector('.mobile-menu-btn')) return;
    
    const nav = document.querySelector('.navbar .container');
    if (!nav) return;
    
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '☰';
    menuBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 30px;
        cursor: pointer;
        display: block;
        z-index: 1000;
    `;
    
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.style.display = 'none';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '70px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = 'rgba(10,10,10,0.95)';
        navMenu.style.padding = '20px';
        navMenu.style.backdropFilter = 'blur(10px)';
        navMenu.style.zIndex = '99';
    }
    
    nav.appendChild(menuBtn);
    
    menuBtn.addEventListener('click', () => {
        if (navMenu) {
            const isHidden = navMenu.style.display === 'none' || navMenu.style.display === '';
            navMenu.style.display = isHidden ? 'flex' : 'none';
            menuBtn.innerHTML = isHidden ? '✕' : '☰';
        }
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && navMenu) {
                navMenu.style.display = 'none';
                menuBtn.innerHTML = '☰';
            }
        });
    });
}

// ========================================
// 20. LOADING ANIMATION
// ========================================
function initLoadingAnimation() {
    if (sessionStorage.getItem('mediajos-visited')) return;
    
    if (!document.querySelector('.loading-overlay')) {
        createLoadingOverlay();
    }
    
    showLoadingAnimation();
    sessionStorage.setItem('mediajos-visited', 'true');
    
    function createLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-content">
                <svg class="loading-logo-svg" viewBox="0 0 200 200" width="150" height="150">
                    <rect x="40" y="60" width="120" height="70" rx="10" fill="none" stroke="#D4AF37" stroke-width="2" stroke-dasharray="400" stroke-dashoffset="400"/>
                    <circle cx="100" cy="95" r="25" fill="none" stroke="#D4AF37" stroke-width="2" stroke-dasharray="160" stroke-dashoffset="160"/>
                    <circle cx="100" cy="95" r="15" fill="none" stroke="#D4AF37" stroke-width="2" stroke-dasharray="95" stroke-dashoffset="95"/>
                    <rect x="135" y="45" width="15" height="20" rx="3" fill="none" stroke="#D4AF37" stroke-width="2" stroke-dasharray="70" stroke-dashoffset="70"/>
                    <text x="50" y="160" fill="#D4AF37" font-family="cursive" font-size="18" stroke-dasharray="200" stroke-dashoffset="200">Media Jos</text>
                </svg>
                <p class="loading-text">MEDIAJOS PRODUCTIONS</p>
            </div>
        `;
        document.body.appendChild(overlay);
    }
    
    function showLoadingAnimation() {
        const overlay = document.querySelector('.loading-overlay');
        if (!overlay) return;
        
        setTimeout(() => {
            overlay.classList.add('hidden');
            setTimeout(() => overlay.remove(), 1000);
        }, 3500);
    }
}

// ========================================
// 21. VIDEO OPTIMIZATION
// ========================================
function initVideoOptimization() {
    const videoContainers = document.querySelectorAll('.category-hero-video, .mobile-video-item, .reel-item, .vibes-video-wrapper');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target.querySelector('video');
                    if (video) {
                        video.setAttribute('preload', 'auto');
                        video.load();
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        videoContainers.forEach(container => observer.observe(container));
    }
}

// ========================================
// 22. COUNTER ANIMATION FOR STATS
// ========================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target + (counter.getAttribute('data-target') === '8' ? '+' : '+');
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + (counter.getAttribute('data-target') === '8' ? '+' : '');
                    }
                }, 30);
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counter.textContent = '0';
        observer.observe(counter);
    });
}

// ========================================
// 23. PARTNERS ANIMATION CONTROL
// ========================================
function initPartnersAnimation() {
    const partnerTracks = document.querySelectorAll('.partners-track');
    
    partnerTracks.forEach(track => {
        track.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });
        
        track.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
    });
    
    // Add resize handler to adjust animation speed for mobile
    function adjustAnimationSpeed() {
        const screenWidth = window.innerWidth;
        const tracks = document.querySelectorAll('.partners-track');
        
        tracks.forEach(track => {
            if (screenWidth <= 768) {
                track.style.animationDuration = '30s';
            } else {
                track.style.animationDuration = '40s';
            }
        });
    }
    
    adjustAnimationSpeed();
    window.addEventListener('resize', adjustAnimationSpeed);
}

// ========================================
// 24. TOAST NOTIFICATION
// ========================================
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 2000);
}

// ========================================
// 25. KEYBOARD NAVIGATION
// ========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const lightbox = document.querySelector('.lightbox');
        if (lightbox) lightbox.remove();
        
        const shutterOverlay = document.querySelector('.shutter-overlay');
        if (shutterOverlay?.classList.contains('active')) {
            shutterOverlay.classList.remove('active');
        }
    }
});

// ========================================
// 26. RESIZE HANDLER
// ========================================
window.addEventListener('resize', () => {
    const navMenu = document.querySelector('.nav-menu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (window.innerWidth > 768) {
        if (navMenu) navMenu.style.display = 'flex';
        if (menuBtn) menuBtn.style.display = 'none';
    } else {
        if (navMenu) navMenu.style.display = 'none';
        if (menuBtn) menuBtn.style.display = 'block';
    }
});

// ========================================
// 27. PAGE LOAD COMPLETE
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('Mediajos Productions: Page fully loaded 🎬');
});

// ========================================
// 28. ERROR HANDLING
// ========================================
window.addEventListener('error', (e) => {
    console.log('Mediajos caught an error:', e.message);
    return true;
});

// ========================================
// 29. DEBUG INFO
// ========================================
console.log('%c🎬 Mediajos Productions', 'font-size: 20px; color: #D4AF37;');
console.log('Hero video: ✅');
console.log('About section: ✅');
console.log('Services section: ✅');
console.log('Category galleries: ✅');
console.log('Portrait gallery: ✅');
console.log('Editing reels: ✅');
console.log('Partners animation: ✅');
console.log('Ratings section: ✅');
console.log('Simple contact form: ✅');
console.log('Contact section: ✅');
console.log('Team vibes: ✅');
console.log('Ready for action!');
