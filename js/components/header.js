// Header Component
class Header {
    constructor() {
        this.headerElement = document.getElementById('header');
        this.mobileNav = null;
        this.init();
    }

    init() {
        if (this.headerElement) {
            this.render();
            this.bindEvents();
            this.setActiveNavItem();
        }
    }

    render() {
        const config = window.ThreeArrowsConfig;
        if (!config || !config.helpers) {
            console.error('ThreeArrowsConfig not available for header');
            return;
        }
        
        const navigation = config.helpers.getNavigation();
        const currentPage = config.helpers.getCurrentPageSlug();
        
        this.headerElement.innerHTML = `
            <div class="container">
                <div class="header__content">
                    <a href="index.html" class="header__logo">
                        ${config.site.name}
                    </a>
                    
                    <nav class="header__nav" role="navigation" aria-label="Main navigation">
                        ${navigation.map(item => {
                            const isActive = item.slug === currentPage;
                            return `
                                <a href="${item.url}" 
                                   class="header__nav-link ${isActive ? 'is-active' : ''}"
                                   ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                                    ${item.name}
                                </a>
                            `;
                        }).join('')}
                    </nav>
                    
                    <button class="header__mobile-toggle" 
                            aria-label="Open mobile menu"
                            aria-expanded="false"
                            aria-controls="mobile-nav">
                        <span class="mobile-toggle__icon">☰</span>
                    </button>
                </div>
            </div>
        `;

        // Create mobile navigation
        this.createMobileNav(navigation, currentPage);
    }

    createMobileNav(navigation, currentPage) {
        const config = window.ThreeArrowsConfig;
        
        // Remove existing mobile nav if it exists
        if (this.mobileNav) {
            this.mobileNav.remove();
        }

        this.mobileNav = document.createElement('div');
        this.mobileNav.id = 'mobile-nav';
        this.mobileNav.className = 'mobile-nav';
        this.mobileNav.setAttribute('aria-hidden', 'true');
        
        this.mobileNav.innerHTML = `
            <div class="mobile-nav__header">
                <a href="index.html" class="header__logo">
                    ${config.site.name}
                </a>
                <button class="mobile-nav__close" 
                        aria-label="Close mobile menu">
                    ×
                </button>
            </div>
            <nav role="navigation" aria-label="Mobile navigation">
                <ul class="mobile-nav__menu">
                    ${navigation.map(item => {
                        const isActive = item.slug === currentPage;
                        return `
                            <li class="mobile-nav__item">
                                <a href="${item.url}" 
                                   class="mobile-nav__link ${isActive ? 'is-active' : ''}"
                                   ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                                    ${item.name}
                                </a>
                            </li>
                        `;
                    }).join('')}
                </ul>
            </nav>
        `;

        document.body.appendChild(this.mobileNav);
    }

    bindEvents() {
        const mobileToggle = this.headerElement.querySelector('.header__mobile-toggle');
        const mobileClose = this.mobileNav?.querySelector('.mobile-nav__close');
        
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => this.toggleMobileNav());
        }
        
        if (mobileClose) {
            mobileClose.addEventListener('click', () => this.closeMobileNav());
        }

        // Close mobile nav when clicking on links
        const mobileLinks = this.mobileNav?.querySelectorAll('.mobile-nav__link');
        if (mobileLinks) {
            mobileLinks.forEach(link => {
                if (!link.getAttribute('target')) { // Only for internal links
                    link.addEventListener('click', () => this.closeMobileNav());
                }
            });
        }

        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            if (this.mobileNav && 
                this.mobileNav.classList.contains('is-open') && 
                !this.mobileNav.contains(e.target) && 
                !mobileToggle.contains(e.target)) {
                this.closeMobileNav();
            }
        });

        // Close mobile nav on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileNav && this.mobileNav.classList.contains('is-open')) {
                this.closeMobileNav();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.mobileNav && this.mobileNav.classList.contains('is-open')) {
                this.closeMobileNav();
            }
        });
    }

    toggleMobileNav() {
        if (this.mobileNav) {
            const isOpen = this.mobileNav.classList.contains('is-open');
            if (isOpen) {
                this.closeMobileNav();
            } else {
                this.openMobileNav();
            }
        }
    }

    openMobileNav() {
        if (this.mobileNav) {
            const mobileToggle = this.headerElement.querySelector('.header__mobile-toggle');
            
            this.mobileNav.classList.add('is-open');
            this.mobileNav.setAttribute('aria-hidden', 'false');
            
            if (mobileToggle) {
                mobileToggle.setAttribute('aria-expanded', 'true');
                mobileToggle.querySelector('.mobile-toggle__icon').textContent = '×';
            }
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            // Focus first link for accessibility
            const firstLink = this.mobileNav.querySelector('.mobile-nav__link');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
            }
        }
    }

    closeMobileNav() {
        if (this.mobileNav) {
            const mobileToggle = this.headerElement.querySelector('.header__mobile-toggle');
            
            this.mobileNav.classList.remove('is-open');
            this.mobileNav.setAttribute('aria-hidden', 'true');
            
            if (mobileToggle) {
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.querySelector('.mobile-toggle__icon').textContent = '☰';
            }
            
            // Restore body scroll
            document.body.style.overflow = '';
        }
    }

    setActiveNavItem() {
        const config = window.ThreeArrowsConfig;
        const currentPage = config.helpers.getCurrentPageSlug();
        const navLinks = this.headerElement.querySelectorAll('.header__nav-link');
        const mobileLinks = this.mobileNav?.querySelectorAll('.mobile-nav__link');
        
        // Remove existing active classes
        [...navLinks, ...(mobileLinks || [])].forEach(link => {
            link.classList.remove('is-active');
        });
        
        // Add active class to current page links
        const navigation = config.helpers.getNavigation();
        navigation.forEach((item, index) => {
            if (item.slug === currentPage) {
                if (navLinks[index]) navLinks[index].classList.add('is-active');
                if (mobileLinks && mobileLinks[index]) mobileLinks[index].classList.add('is-active');
            }
        });
    }

    // Method to update navigation (useful for dynamic updates)
    updateNavigation() {
        this.render();
        this.bindEvents();
        this.setActiveNavItem();
    }
}

// Initialize header when DOM is loaded
function initializeHeader() {
    console.log('Attempting to initialize header...');
    
    if (!window.ThreeArrowsConfig) {
        console.error('Config not available, retrying in 100ms...');
        setTimeout(initializeHeader, 100);
        return;
    }
    
    if (!window.ThreeArrowsConfig.helpers) {
        console.error('Config helpers not available, retrying in 100ms...');
        setTimeout(initializeHeader, 100);
        return;
    }
    
    console.log('Config available, creating header...');
    window.headerComponent = new Header();
}

// Try to initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeHeader);
} else {
    initializeHeader();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Header;
}
