// ========================================
// MEDIAJOS PRODUCTIONS - COMPLETE JAVASCRIPT
// Film-inspired animations and interactions
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
    initNameTags();
    initSocialIcons();
    initContactHover();
    initSmoothScroll();
    initCategoryScroll();
    initVideoOptimization();
    initMobileMenu();
    initServiceCards(); // NEW - Services section interactions
    initServiceLinks(); // NEW - Handle "Read More" clicks
    
    // Log success
    console.log('Mediajos Productions: All systems initialized 🎬');
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
            const href = this.getAttribute('href');
            
            // Only for internal anchor links (starts with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                // Get the target element
                const target = document.querySelector(href);
                if (target) {
                    // Activate shutter overlay
                    shutterOverlay.classList.add('active');
                    
                    // Animate aperture
                    animateAperture();
                    
                    // Scroll to target after animation
                    setTimeout(() => {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Remove shutter overlay
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
// 2. SCROLL ANIMATIONS (GSAP)
// ========================================
function initScrollAnimations() {
    
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.log('GSAP not loaded - using fallback animations');
        initFallbackAnimations();
        return;
    }
    
    try {
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
        
        // Animate service items with staggered reveal
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
        
    } catch (error) {
        console.log('GSAP animation error, using fallback:', error);
        initFallbackAnimations();
    }
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
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    // Observe elements
    document.querySelectorAll('.section-header, .service-item, .portfolio-item, .aperture-item, .quote-container, .category-section').forEach(el => {
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
    if (!navbar) return;
    
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
        
        item.addEventListener('mouseenter', () => {
            // Subtle scale effect
            item.style.transform = 'scale(1.02) translateY(-10px)';
            
            // Brighten image
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
}

// ========================================
// 6. SERVICE CARDS INTERACTIONS (NEW)
// ========================================
function initServiceCards() {
    
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        // Add subtle hover effect beyond CSS
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
// 7. SERVICE LINKS HANDLER (NEW)
// ========================================
function initServiceLinks() {
    
    const serviceLinks = document.querySelectorAll('.service-link');
    
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                // Add shutter effect
                const shutterOverlay = document.querySelector('.shutter-overlay');
                if (shutterOverlay) {
                    shutterOverlay.classList.add('active');
                    
                    setTimeout(() => {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        setTimeout(() => {
                            shutterOverlay.classList.remove('active');
                        }, 500);
                    }, 300);
                } else {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Highlight the target section briefly
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
// 8. LOADING ANIMATION
// ========================================
function initLoadingAnimation() {
    
    // Check if user has visited before
    if (sessionStorage.getItem('mediajos-visited')) {
        return; // Skip loading animation
    }
    
    // Create loading overlay if it doesn't exist
    if (!document.querySelector('.loading-overlay')) {
        createLoadingOverlay();
    }
    
    // Show loading animation
    showLoadingAnimation();
    
    // Set visited flag
    sessionStorage.setItem('mediajos-visited', 'true');
    
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
// 9. VIDEO PREVIEW OPTIMIZATION
// ========================================
function initVideoPreviews() {
    
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Set preload to metadata to save bandwidth
        video.setAttribute('preload', 'metadata');
        
        // Add error handling
        video.addEventListener('error', function() {
            console.log('Video failed to load:', this.src);
            const fallback = document.createElement('div');
            fallback.className = 'video-fallback';
            this.parentNode.appendChild(fallback);
        });
        
        // Pause video when not in viewport
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.setAttribute('preload', 'auto');
                        video.load();
                        observer.unobserve(video);
                    }
                });
            });
            observer.observe(video);
        }
    });
}

// ========================================
// 10. VIDEO OPTIMIZATION
// ========================================
function initVideoOptimization() {
    
    // Lazy load videos
    const videoContainers = document.querySelectorAll('.hero-video-container, .video-thumb, .category-hero-video');
    
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
// 11. NAME TAGS ANIMATION CONTROL
// ========================================
function initNameTags() {
    
    const nameTracks = document.querySelectorAll('.name-tags-track');
    
    nameTracks.forEach(track => {
        // Pause animation on hover
        track.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });
        
        track.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
    });
    
    // Add film grain effect to name tags section
    const trustedSection = document.querySelector('.trusted-by');
    if (trustedSection && !trustedSection.querySelector('.film-grain-light')) {
        const grain = document.createElement('div');
        grain.className = 'film-grain-light';
        grain.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNmKSIgb3BhY2l0eT0iMC4wMiIgLz48L3N2Zz4=');
            opacity: 0.3;
            pointer-events: none;
            z-index: 1;
        `;
        trustedSection.style.position = 'relative';
        trustedSection.appendChild(grain);
    }
}

// ========================================
// 12. SOCIAL ICONS HOVER EFFECTS
// ========================================
function initSocialIcons() {
    
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            // Add lens flare effect
            icon.style.boxShadow = '0 0 30px currentColor';
            icon.style.transform = 'scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.boxShadow = 'none';
            icon.style.transform = 'scale(1)';
        });
        
        // Track clicks (optional)
        icon.addEventListener('click', () => {
            console.log(`Social icon clicked: ${icon.classList}`);
        });
    });
}

// ========================================
// 13. CONTACT ITEMS HOVER EFFECT
// ========================================
function initContactHover() {
    
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const icon = item.querySelector('.contact-icon');
        
        item.addEventListener('mouseenter', () => {
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
    
    // Add click-to-copy for phone (optional)
    const phoneLink = document.querySelector('a[href="tel:+254715024685"]');
    if (phoneLink) {
        phoneLink.addEventListener('click', (e) => {
            showToast('Calling Mediajos Productions');
        });
    }
}

// ========================================
// 14. SMOOTH SCROLL FOR NAVIGATION
// ========================================
function initSmoothScroll() {
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || !href) return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active state in navigation
                updateActiveNavLink(href);
            }
        });
    });
    
    function updateActiveNavLink(targetId) {
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }
}

// ========================================
// 15. CATEGORY SCROLL FROM PORTFOLIO
// ========================================
function initCategoryScroll() {
    
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const sections = [
        '#corporate-section',
        '#documentaries-section',
        '#photography-section',
        '#weddings-section',
        '#video-production-section'
    ];
    
    portfolioItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (index < sections.length) {
                const target = document.querySelector(sections[index]);
                if (target) {
                    // Add shutter effect
                    const shutterOverlay = document.querySelector('.shutter-overlay');
                    if (shutterOverlay) {
                        shutterOverlay.classList.add('active');
                        
                        setTimeout(() => {
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                            
                            setTimeout(() => {
                                shutterOverlay.classList.remove('active');
                            }, 500);
                        }, 300);
                    } else {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            }
        });
    });
}

// ========================================
// 16. MOBILE MENU
// ========================================
function initMobileMenu() {
    
    // Only create if on mobile and menu doesn't exist
    if (window.innerWidth > 768) return;
    if (document.querySelector('.mobile-menu-btn')) return;
    
    const nav = document.querySelector('.navbar .container');
    if (!nav) return;
    
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '☰';
    menuBtn.setAttribute('aria-label', 'Toggle menu');
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
    
    // Close menu when clicking a link
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
// 17. TOAST NOTIFICATION
// ========================================
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--primary-gold);
        color: var(--primary-black);
        padding: 10px 30px;
        border-radius: 30px;
        font-weight: 600;
        z-index: 10000;
        animation: toastFade 2s ease forwards;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 2000);
}

// ========================================
// 18. PARALLAX EFFECT ON HERO
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
// 19. KEYBOARD NAVIGATION
// ========================================
document.addEventListener('keydown', (e) => {
    // ESC key closes any open overlays
    if (e.key === 'Escape') {
        const shutterOverlay = document.querySelector('.shutter-overlay');
        if (shutterOverlay && shutterOverlay.classList.contains('active')) {
            shutterOverlay.classList.remove('active');
        }
        
        // Close mobile menu if open
        const navMenu = document.querySelector('.nav-menu');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        if (window.innerWidth <= 768 && navMenu && navMenu.style.display === 'flex') {
            navMenu.style.display = 'none';
            if (menuBtn) menuBtn.innerHTML = '☰';
        }
    }
});

// ========================================
// 20. ACTIVE NAVIGATION ON SCROLL
// ========================================
function initActiveNavigation() {
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    });
}

// ========================================
// 21. RESIZE HANDLER
// ========================================
window.addEventListener('resize', () => {
    // Update mobile menu visibility
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
// 22. PERFORMANCE OPTIMIZATION
// ========================================
// Defer non-critical tasks
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        initParallax();
        initActiveNavigation();
    }, { timeout: 2000 });
} else {
    setTimeout(() => {
        initParallax();
        initActiveNavigation();
    }, 1000);
}

// ========================================
// 23. PAGE TRANSITION COMPLETE
// ========================================
window.addEventListener('load', () => {
    // Remove shutter overlay if it's active
    const shutterOverlay = document.querySelector('.shutter-overlay');
    if (shutterOverlay) {
        shutterOverlay.classList.remove('active');
    }
    
    // Trigger any post-load animations
    document.body.classList.add('loaded');
    
    console.log('Mediajos Productions: Page fully loaded 🎬');
});

// ========================================
// 24. ERROR HANDLING
// ========================================
window.addEventListener('error', (e) => {
    console.log('Mediajos caught an error:', e.message);
    // Prevent errors from breaking the site
    return true;
});

// ========================================
// 25. CUSTOM SHUTTER SOUND (Optional)
// ========================================
function playShutterClick() {
    // Uncomment and add audio file if you want sound
    /*
    const audio = new Audio('assets/media/audio/shutter-click.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio playback failed:', e));
    */
}

// ========================================
// 26. DEBUG INFO
// ========================================
console.log('%c🎬 Mediajos Productions', 'font-size: 20px; color: #D4AF37;');
console.log('Film strip borders: ✅');
console.log('Shutter transitions: ✅');
console.log('Services section: ✅');
console.log('Service cards: ✅');
console.log('Name tags animation: ✅');
console.log('Contact section: ✅');
console.log('Social media icons: ✅');
console.log('Ready for action!');
