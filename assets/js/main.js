// ========================================
// MEDIAJOS PRODUCTIONS - MAIN JAVASCRIPT
// Shutter transitions, animations, and interactions
// ========================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initShutterTransitions();
    initScrollAnimations();
    initNavbarScroll();
    initPortfolioHover();
    initLoadingAnimation();
    initVideoPreviews();
    initClientLogos();
    
});

// ========================================
// 1. SHUTTER TRANSITIONS (Page Navigation)
// ========================================
function initShutterTransitions() {
    
    const shutterOverlay = document.querySelector('.shutter-overlay');
    const shutterLinks = document.querySelectorAll('.shutter-link, .shutter-click');
    
    if (!shutterOverlay) return;
    
    shutterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only for internal links
            const href = this.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                e.preventDefault();
                
                // Play shutter sound (if you want to add audio later)
                // playShutterSound();
                
                // Activate shutter overlay
                shutterOverlay.classList.add('active');
                
                // Animate shutter blades
                animateAperture();
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.href = href;
                }, 600); // Match CSS transition duration
            }
        });
    });
    
    // Aperture blade animation
    function animateAperture() {
        const aperture = document.querySelector('.aperture-overlay');
        if (aperture) {
            aperture.style.animation = 'apertureSpin 0.6s ease-out';
            setTimeout(() => {
                aperture.style.animation = '';
            }, 600);
        }
    }
}

// ========================================
// 2. SCROLL ANIMATIONS (GSAP)
// ========================================
function initScrollAnimations() {
    
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.log('GSAP not loaded - using fallback animations');
        initFallbackAnimations();
        return;
    }
    
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate section headers on scroll
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
    
    // Animate portfolio items with staggered reveal
    gsap.utils.toArray('.portfolio-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'back.out(1.2)'
        });
    });
    
    // Animate aperture items with lens opening effect
    gsap.utils.toArray('.aperture-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            rotation: 15,
            scale: 0.8,
            opacity: 0,
            duration: 1,
            delay: index * 0.15,
            ease: 'elastic.out(1, 0.5)'
        });
        
        // Animate aperture blades inside
        const blades = item.querySelector('.aperture-blades');
        if (blades) {
            gsap.to(blades, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: 'none'
            });
        }
    });
    
    // Animate quote with shutter reveal
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
    
    // Parallax effect on hero video
    gsap.to('.hero-video', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        scale: 1.2,
        ease: 'none'
    });
}

// ========================================
// 3. FALLBACK ANIMATIONS (if GSAP fails)
// ========================================
function initFallbackAnimations() {
    
    // Simple Intersection Observer for browsers without GSAP
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'all 1s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, { threshold: 0.2 });
    
    // Observe elements
    document.querySelectorAll('.section-header, .portfolio-item, .aperture-item, .quote-container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// ========================================
// 4. NAVBAR SCROLL EFFECT
// ========================================
function initNavbarScroll() {
    
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add background on scroll
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(10,10,10,0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'linear-gradient(to bottom, rgba(10,10,10,0.95), transparent)';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// ========================================
// 5. PORTFOLIO HOVER EFFECTS
// ========================================
function initPortfolioHover() {
    
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        const img = item.querySelector('img');
        const filmStrip = item.querySelector('.film-strip-hover');
        
        item.addEventListener('mouseenter', () => {
            // Play subtle shutter sound effect (visual only)
            item.style.transform = 'scale(1.02) translateY(-10px)';
            
            // Simulate aperture closing/opening
            if (img) {
                img.style.filter = 'brightness(1.1) contrast(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1) translateY(0)';
            
            if (img) {
                img.style.filter = 'brightness(1) contrast(1)';
            }
        });
    });
    
    // Video thumbnail hover preview (if you want to add video playback)
    const videoThumbs = document.querySelectorAll('.video-thumb');
    videoThumbs.forEach(thumb => {
        const img = thumb.querySelector('img');
        
        thumb.addEventListener('mouseenter', () => {
            // This is where you could swap image with short video clip
            // For now, just animate the play icon
            const playIcon = thumb.querySelector('.play-icon');
            if (playIcon) {
                playIcon.style.transform = 'scale(1.2)';
            }
        });
        
        thumb.addEventListener('mouseleave', () => {
            const playIcon = thumb.querySelector('.play-icon');
            if (playIcon) {
                playIcon.style.transform = 'scale(1)';
            }
        });
    });
}

// ========================================
// 6. LOADING ANIMATION (Wireframe Logo)
// ========================================
function initLoadingAnimation() {
    
    // Create loading overlay if it doesn't exist
    if (!document.querySelector('.loading-overlay')) {
        createLoadingOverlay();
    }
    
    // Show loading animation on first visit
    if (!sessionStorage.getItem('visited')) {
        showLoadingAnimation();
        sessionStorage.setItem('visited', 'true');
    }
    
    function createLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-content">
                <svg class="loading-logo-svg" viewBox="0 0 200 200" width="150" height="150">
                    <!-- Camera outline from wireframe logo -->
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
        
        // Add styles for loading overlay
        const style = document.createElement('style');
        style.textContent = `
            .loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: var(--primary-black);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: opacity 1s ease, visibility 1s ease;
            }
            .loading-overlay.hidden {
                opacity: 0;
                visibility: hidden;
            }
            .loading-content {
                text-align: center;
            }
            .loading-logo-svg {
                animation: drawLogo 2.5s ease-out forwards;
            }
            .loading-text {
                color: var(--primary-gold);
                margin-top: 20px;
                font-size: 14px;
                letter-spacing: 5px;
                opacity: 0;
                animation: fadeInText 1s ease-out 2s forwards;
            }
            @keyframes fadeInText {
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    function showLoadingAnimation() {
        const overlay = document.querySelector('.loading-overlay');
        if (!overlay) return;
        
        // Hide after animation completes
        setTimeout(() => {
            overlay.classList.add('hidden');
            
            // Remove from DOM after hidden
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 1000);
        }, 3500);
    }
}

// ========================================
// 7. VIDEO PREVIEW ON HOVER
// ========================================
function initVideoPreviews() {
    
    // This function prepares for video preview functionality
    // You can enhance this later to play short clips on hover
    
    const videoThumbs = document.querySelectorAll('.video-thumb');
    
    videoThumbs.forEach(thumb => {
        // Store the video source if needed later
        const img = thumb.querySelector('img');
        if (img) {
            const videoSrc = img.getAttribute('data-video-src');
            if (videoSrc) {
                thumb.setAttribute('data-video', videoSrc);
            }
        }
    });
}

// ========================================
// 8. CLIENT LOGOS CAROUSEL
// ========================================
function initClientLogos() {
    
    const logoTrack = document.querySelector('.logo-track');
    if (!logoTrack) return;
    
    // Duplicate logos for seamless infinite scroll
    const logos = logoTrack.innerHTML;
    logoTrack.innerHTML = logos + logos;
    
    // Pause animation on hover
    logoTrack.addEventListener('mouseenter', () => {
        logoTrack.style.animationPlayState = 'paused';
    });
    
    logoTrack.addEventListener('mouseleave', () => {
        logoTrack.style.animationPlayState = 'running';
    });
}

// ========================================
// 9. APERTURE BLADE INTERACTION
// ========================================
function initApertureInteraction() {
    
    const apertureItems = document.querySelectorAll('.aperture-item');
    
    apertureItems.forEach(item => {
        const blades = item.querySelector('.aperture-blades');
        
        item.addEventListener('click', () => {
            // Simulate aperture closing/opening
            if (blades) {
                blades.style.transition = 'transform 0.3s ease';
                blades.style.transform = 'translate(-50%, -50%) rotate(45deg) scale(0.8)';
                
                setTimeout(() => {
                    blades.style.transform = 'translate(-50%, -50%) rotate(0deg) scale(1)';
                }, 300);
            }
        });
    });
}

// ========================================
// 10. MOBILE MENU (if needed later)
// ========================================
function initMobileMenu() {
    
    // Create mobile menu button if it doesn't exist
    if (!document.querySelector('.mobile-menu-btn') && window.innerWidth <= 768) {
        const nav = document.querySelector('.navbar .container');
        const menuBtn = document.createElement('button');
        menuBtn.className = 'mobile-menu-btn';
        menuBtn.innerHTML = '☰';
        menuBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 30px;
            cursor: pointer;
            display: none;
        `;
        
        if (window.innerWidth <= 768) {
            menuBtn.style.display = 'block';
        }
        
        nav.appendChild(menuBtn);
        
        menuBtn.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }
}

// ========================================
// 11. PARALLAX EFFECT ON HERO
// ========================================
function initParallax() {
    
    const hero = document.querySelector('.hero');
    const heroVideo = document.querySelector('.hero-video');
    
    if (!hero || !heroVideo) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        heroVideo.style.transform = `translateY(${rate * 0.3}px) scale(${1 + scrolled * 0.0005})`;
    });
}

// ========================================
// 12. SHUTTER SOUND EFFECT (Optional)
// ========================================
function playShutterSound() {
    // Uncomment and add audio file if you want sound
    /*
    const audio = new Audio('assets/media/audio/shutter-click.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio playback failed:', e));
    */
}

// ========================================
// 13. IMAGE LAZY LOADING
// ========================================
function initLazyLoading() {
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.classList.add('loaded');
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ========================================
// 14. CUSTOM CURSOR (Optional)
// ========================================
function initCustomCursor() {
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = `
        <div class="cursor-dot"></div>
        <div class="cursor-ring"></div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
        }
        .cursor-dot {
            width: 5px;
            height: 5px;
            background: white;
            border-radius: 50%;
            position: absolute;
            top: -2.5px;
            left: -2.5px;
        }
        .cursor-ring {
            width: 30px;
            height: 30px;
            border: 2px solid var(--primary-gold);
            border-radius: 50%;
            position: absolute;
            top: -15px;
            left: -15px;
            transition: all 0.1s ease;
        }
        .custom-cursor.hover .cursor-ring {
            transform: scale(1.5);
            border-color: white;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    
    document.querySelectorAll('a, button, .portfolio-item, .btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// ========================================
// 15. VIDEO BACKGROUND FALLBACK
// ========================================
function initVideoFallback() {
    
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
        // Check if video can play
        heroVideo.addEventListener('error', () => {
            console.log('Video failed to load - showing fallback image');
            const fallbackImg = document.createElement('div');
            fallbackImg.className = 'video-fallback';
            fallbackImg.style.background = 'linear-gradient(135deg, #1a1a1a, #4A2C5F)';
            heroVideo.parentNode.insertBefore(fallbackImg, heroVideo);
            heroVideo.style.display = 'none';
        });
    }
}

// ========================================
// 16. RESIZE HANDLER
// ========================================
window.addEventListener('resize', () => {
    // Update any responsive elements
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth > 768 && navMenu) {
        navMenu.style.display = 'flex';
    }
});

// ========================================
// 17. KEYBOARD NAVIGATION
// ========================================
document.addEventListener('keydown', (e) => {
    // ESC key closes any open overlays
    if (e.key === 'Escape') {
        const shutterOverlay = document.querySelector('.shutter-overlay');
        if (shutterOverlay && shutterOverlay.classList.contains('active')) {
            shutterOverlay.classList.remove('active');
        }
    }
});

// ========================================
// 18. PERFORMANCE OPTIMIZATION
// ========================================
// Defer non-critical tasks
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        initLazyLoading();
        initVideoFallback();
    });
} else {
    setTimeout(() => {
        initLazyLoading();
        initVideoFallback();
    }, 1000);
}

// ========================================
// 19. PAGE TRANSITION COMPLETE
// ========================================
window.addEventListener('load', () => {
    // Remove shutter overlay if it's active
    const shutterOverlay = document.querySelector('.shutter-overlay');
    if (shutterOverlay) {
        shutterOverlay.classList.remove('active');
    }
    
    // Trigger any post-load animations
    document.body.classList.add('loaded');
});

// ========================================
// 20. DEBUG INFO (remove in production)
// ========================================
console.log('Mediajos Productions website loaded successfully!');
console.log('Film strip borders: ✅');
console.log('Shutter transitions: ✅');
console.log('Aperture animations: ✅');
console.log('Ready for action! 🎬');
