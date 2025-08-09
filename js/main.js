// Main Application JavaScript
class ThreeArrowsStudio {
    constructor() {
        this.config = window.ThreeArrowsConfig;
        this.components = {};
        this.init();
    }

    init() {
        this.initializeComponents();
        this.setupEventListeners();
        this.setupScrollEffects();
        this.setupLazyLoading();
        this.setupAccessibility();
    }

    initializeComponents() {
        // Components are initialized in their respective files
        // This method can be used to store references or setup communication between components
        
        // Store references when components are ready
        document.addEventListener('DOMContentLoaded', () => {
            this.components.header = window.headerComponent;
            this.components.footer = window.footerComponent;
            this.components.newsletter = window.newsletterComponent;
        });
    }

    setupEventListeners() {
        // Smooth scroll for anchor links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });

        // Track external link clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[target="_blank"]');
            if (link) {
                this.trackExternalClick(link.href);
            }
        });

        // Handle form submissions globally
        document.addEventListener('submit', (e) => {
            const form = e.target;
            if (form.classList.contains('contact-form')) {
                this.handleContactForm(e);
            } else if (form.classList.contains('prayer-form')) {
                this.handlePrayerForm(e);
            }
        });

        // Window resize handler
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Scroll handler for effects
        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 16)); // ~60fps
    }

    setupScrollEffects() {
        // Fade-in animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements that should fade in
        document.querySelectorAll('.product-card, .testimonial-card, .welcome__content, .welcome__image')
            .forEach(el => {
                el.classList.add('fade-in');
                observer.observe(el);
            });

        // Add CSS for fade-in effect
        this.addFadeInStyles();
    }

    setupLazyLoading() {
        // Native lazy loading for images
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });

        // Fallback for older browsers
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    setupAccessibility() {
        // Keyboard navigation for custom elements
        document.addEventListener('keydown', (e) => {
            // Handle Enter key on buttons that might not be proper buttons
            if (e.key === 'Enter') {
                const target = e.target;
                if (target.getAttribute('role') === 'button' && !target.disabled) {
                    target.click();
                }
            }
        });

        // Skip to main content link
        this.addSkipLink();

        // Focus management for modals and mobile nav
        this.setupFocusTrap();
    }

    handleContactForm(e) {
        // Contact form handling will be implemented when contact page is created
        console.log('Contact form submitted');
    }

    handlePrayerForm(e) {
        // Prayer form handling will be implemented when prayer page is created
        console.log('Prayer form submitted');
    }

    handleResize() {
        // Handle responsive adjustments
        const width = window.innerWidth;
        
        // Update mobile navigation if needed
        if (width > 768 && this.components.header) {
            this.components.header.closeMobileNav();
        }
    }

    handleScroll() {
        // Handle scroll-based effects
        const scrollY = window.scrollY;
        
        // Add/remove header shadow based on scroll position
        const header = document.querySelector('.header');
        if (header) {
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    trackExternalClick(url) {
        // Google Analytics tracking
        if (window.gtag) {
            gtag('event', 'external_link_click', {
                link_url: url
            });
        }
        
        console.log('External link clicked:', url);
    }

    addFadeInStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .fade-in {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            
            .fade-in-visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            .header.scrolled {
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }
            
            .loaded {
                transition: opacity 0.3s ease-in-out;
            }
        `;
        document.head.appendChild(style);
    }

    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link sr-only';
        skipLink.style.cssText = `
            position: fixed;
            top: -40px;
            left: 6px;
            background: var(--color-sage-whisper);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add id to main content if not present
        const main = document.querySelector('main');
        if (main && !main.id) {
            main.id = 'main';
        }
    }

    setupFocusTrap() {
        // This would be implemented for modals and mobile navigation
        // For now, it's handled in the header component
    }

    // Utility functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Public methods for external use
    updateConfig(newConfig) {
        Object.assign(this.config, newConfig);
        
        // Update components with new config
        if (this.components.header) {
            this.components.header.updateNavigation();
        }
        if (this.components.footer) {
            this.components.footer.updateFooter();
        }
    }

    trackEvent(eventName, parameters = {}) {
        if (window.gtag) {
            gtag('event', eventName, parameters);
        }
        console.log('Event tracked:', eventName, parameters);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.ThreeArrowsApp = new ThreeArrowsStudio();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThreeArrowsStudio;
}
