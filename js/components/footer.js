// Footer Component
class Footer {
    constructor() {
        this.footerElement = document.getElementById('footer');
        this.init();
    }

    init() {
        if (this.footerElement) {
            this.render();
            this.bindEvents();
        }
    }

    render() {
        const config = window.ThreeArrowsConfig;
        if (!config || !config.helpers) {
            console.error('ThreeArrowsConfig not available for footer');
            return;
        }
        
        const socialLinks = config.helpers.getSocialLinks();
        const currentYear = new Date().getFullYear();
        
        this.footerElement.innerHTML = `
            <div class="container">
                <div class="footer__content">
                    <div class="footer__section">
                        <h3 class="footer__title">${config.site.name}</h3>
                        <p class="footer__text">
                            Creating sacred spaces where faith and motherhood beautifully collide. 
                            Every piece is prayerfully designed to bring peace and beauty to your home.
                        </p>
                        <div class="footer__social">
                            ${socialLinks.map(social => `
                                <a href="${social.url}" 
                                   class="footer__social-link"
                                   target="_blank" 
                                   rel="noopener noreferrer"
                                   aria-label="Visit our ${this.formatSocialName(social.platform)}">
                                    ${this.getSocialIcon(social.platform)}
                                </a>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="footer__section">
                        <h3 class="footer__title">Quick Links</h3>
                        <nav role="navigation" aria-label="Footer navigation">
                            <a href="about.html" class="footer__link">About Our Story</a>
                            <a href="${config.links.shopUrl}" class="footer__link" target="_blank" rel="noopener noreferrer">Shop Collection</a>
                            <a href="gallery.html" class="footer__link">View Gallery</a>
                            <a href="prayer-requests.html" class="footer__link">Prayer Requests</a>
                            <a href="contact.html" class="footer__link">Contact Us</a>
                        </nav>
                    </div>
                    
                    <div class="footer__section">
                        <h3 class="footer__title">Connect With Us</h3>
                        <p class="footer__text">
                            Join our sacred circle for encouragement, new designs, and faith-filled inspiration.
                        </p>
                        ${config.contact.email ? `
                            <a href="mailto:${config.contact.email}" class="footer__link">
                                ${config.contact.email}
                            </a>
                        ` : ''}
                        <div class="footer__newsletter-signup">
                            <a href="#newsletter-signup" class="btn btn--secondary btn--small">
                                Join Newsletter
                            </a>
                        </div>
                    </div>
                    
                    <div class="footer__section">
                        <h3 class="footer__title">Sacred Reminder</h3>
                        <blockquote class="footer__scripture">
                            <p class="footer__text">
                                "${config.content.primaryScripture.text}"
                            </p>
                            <cite class="footer__scripture-ref">
                                — ${config.content.primaryScripture.reference}
                            </cite>
                        </blockquote>
                    </div>
                </div>
                
                <div class="footer__bottom">
                    <div class="footer__copyright">
                        © ${currentYear} ${config.site.name}. All rights reserved. 
                        Made with ♥ and prayer.
                    </div>
                    <nav class="footer__legal" role="navigation" aria-label="Legal links">
                        <a href="${config.links.privacyPolicy}" class="footer__legal-link">Privacy Policy</a>
                        <a href="${config.links.termsOfService}" class="footer__legal-link">Terms of Service</a>
                        <a href="${config.links.returnPolicy}" class="footer__legal-link">Return Policy</a>
                    </nav>
                </div>
            </div>
        `;
    }

    bindEvents() {
        // Newsletter signup link scroll behavior
        const newsletterLink = this.footerElement.querySelector('[href="#newsletter-signup"]');
        if (newsletterLink) {
            newsletterLink.addEventListener('click', (e) => {
                e.preventDefault();
                const newsletterForm = document.getElementById('newsletter-form');
                if (newsletterForm) {
                    newsletterForm.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'center'
                    });
                    
                    // Focus the email input after scrolling
                    setTimeout(() => {
                        const emailInput = newsletterForm.querySelector('input[type="email"]');
                        if (emailInput) {
                            emailInput.focus();
                        }
                    }, 500);
                }
            });
        }

        // Track social link clicks for analytics
        const socialLinks = this.footerElement.querySelectorAll('.footer__social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const platform = this.extractPlatformFromUrl(link.href);
                this.trackSocialClick(platform);
            });
        });

        // Track external shop link clicks
        const shopLinks = this.footerElement.querySelectorAll('[target="_blank"]');
        shopLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.href.includes('etsy.com') || link.href === window.ThreeArrowsConfig.links.shopUrl) {
                    this.trackShopClick();
                }
            });
        });
    }

    getSocialIcon(platform) {
        const icons = {
            instagram: '📷',
            facebook: '📘',
            pinterest: '📌',
            etsy: '🛍️',
            youtube: '📺',
            tiktok: '🎵',
            twitter: '🐦',
            linkedin: '💼'
        };
        
        return icons[platform.toLowerCase()] || '🔗';
    }

    formatSocialName(platform) {
        const names = {
            instagram: 'Instagram',
            facebook: 'Facebook',
            pinterest: 'Pinterest',
            etsy: 'Etsy Shop',
            youtube: 'YouTube',
            tiktok: 'TikTok',
            twitter: 'Twitter',
            linkedin: 'LinkedIn'
        };
        
        return names[platform.toLowerCase()] || platform;
    }

    extractPlatformFromUrl(url) {
        if (url.includes('instagram.com')) return 'instagram';
        if (url.includes('facebook.com')) return 'facebook';
        if (url.includes('pinterest.com')) return 'pinterest';
        if (url.includes('etsy.com')) return 'etsy';
        if (url.includes('youtube.com')) return 'youtube';
        if (url.includes('tiktok.com')) return 'tiktok';
        if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
        if (url.includes('linkedin.com')) return 'linkedin';
        return 'unknown';
    }

    trackSocialClick(platform) {
        // Google Analytics tracking
        if (window.gtag) {
            gtag('event', 'social_click', {
                platform: platform,
                location: 'footer'
            });
        }
        
        // Console log for development
        console.log(`Social click tracked: ${platform}`);
    }

    trackShopClick() {
        // Google Analytics tracking
        if (window.gtag) {
            gtag('event', 'shop_click', {
                location: 'footer'
            });
        }
        
        // Console log for development
        console.log('Shop click tracked from footer');
    }

    // Method to update footer content (useful for dynamic updates)
    updateFooter() {
        this.render();
        this.bindEvents();
    }
}

// Initialize footer when DOM is loaded
function initializeFooter() {
    console.log('Attempting to initialize footer...');
    
    if (!window.ThreeArrowsConfig) {
        console.error('Config not available for footer, retrying in 100ms...');
        setTimeout(initializeFooter, 100);
        return;
    }
    
    if (!window.ThreeArrowsConfig.helpers) {
        console.error('Config helpers not available for footer, retrying in 100ms...');
        setTimeout(initializeFooter, 100);
        return;
    }
    
    console.log('Config available, creating footer...');
    window.footerComponent = new Footer();
}

// Try to initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFooter);
} else {
    initializeFooter();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Footer;
}
