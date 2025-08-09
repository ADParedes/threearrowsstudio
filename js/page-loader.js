// Universal Page Components Loader
class PageLoader {
    constructor() {
        this.headerElement = document.getElementById('header');
        this.footerElement = document.getElementById('footer');
        this.currentPage = this.getCurrentPage();
        this.init();
    }

    async init() {
        const promises = [];
        
        if (this.headerElement) {
            promises.push(this.loadHeader());
        }
        
        if (this.footerElement) {
            promises.push(this.loadFooter());
        }
        
        await Promise.all(promises);
        
        if (this.headerElement) {
            this.setActiveNavigation();
            this.bindMobileMenu();
        }
    }

    async loadHeader() {
        try {
            const response = await fetch('header.html');
            if (response.ok) {
                const headerHTML = await response.text();
                this.headerElement.innerHTML = headerHTML;
            } else {
                console.error('Failed to load header.html');
                this.fallbackHeader();
            }
        } catch (error) {
            console.error('Error loading header:', error);
            this.fallbackHeader();
        }
    }

    async loadFooter() {
        try {
            const response = await fetch('footer.html');
            if (response.ok) {
                const footerHTML = await response.text();
                this.footerElement.innerHTML = footerHTML;
            } else {
                console.error('Failed to load footer.html');
                this.fallbackFooter();
            }
        } catch (error) {
            console.error('Error loading footer:', error);
            this.fallbackFooter();
        }
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop().split('.')[0];
        
        // Handle index/home page
        if (page === 'index' || page === '' || path.endsWith('/')) {
            return 'home';
        }
        
        return page;
    }

    setActiveNavigation() {
        // Set active state for current page
        const navLinks = this.headerElement.querySelectorAll('[data-page]');
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('data-page');
            if (linkPage === this.currentPage) {
                link.classList.add('header__nav-link--active', 'header__mobile-nav-link--active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    bindMobileMenu() {
        const mobileToggle = this.headerElement.querySelector('.header__mobile-toggle');
        const mobileNav = this.headerElement.querySelector('.header__mobile-nav');
        
        if (mobileToggle && mobileNav) {
            mobileToggle.addEventListener('click', () => {
                const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
                mobileToggle.setAttribute('aria-expanded', !isExpanded);
                mobileNav.classList.toggle('header__mobile-nav--active');
            });
            
            // Close mobile menu when clicking on a link
            const mobileLinks = mobileNav.querySelectorAll('.header__mobile-nav-link');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    mobileNav.classList.remove('header__mobile-nav--active');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.headerElement.contains(e.target)) {
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    mobileNav.classList.remove('header__mobile-nav--active');
                }
            });
        }
    }

    fallbackHeader() {
        // Fallback header in case header.html fails to load
        this.headerElement.innerHTML = `
            <div class="container">
                <div class="header__content">
                    <div class="header__logo">
                        <a href="index.html" class="header__logo-link">
                            <span class="header__logo-text">Three Arrows Studio</span>
                        </a>
                    </div>
                    <nav class="header__nav">
                        <a href="index.html" class="header__nav-link">Home</a>
                        <a href="about.html" class="header__nav-link">About</a>
                        <a href="products.html" class="header__nav-link">Products</a>
                        <a href="contact.html" class="header__nav-link">Contact</a>
                        <a href="https://threearrowsstudio.etsy.com" class="header__nav-link header__nav-link--shop" target="_blank" rel="noopener noreferrer">Shop</a>
                    </nav>
                </div>
            </div>
        `;
    }
    fallbackFooter() {
        // Fallback footer in case footer.html fails to load
        this.footerElement.innerHTML = `
            <div class="container">
                <div class="footer__content">
                    <div class="footer__section">
                        <h3 class="footer__title">Three Arrows Studio</h3>
                        <p class="footer__text">Creating sacred spaces where faith and motherhood beautifully collide.</p>
                    </div>
                    <div class="footer__section">
                        <h3 class="footer__title">Quick Links</h3>
                        <a href="about.html" class="footer__link">About</a>
                        <a href="products.html" class="footer__link">Products</a>
                        <a href="contact.html" class="footer__link">Contact</a>
                    </div>
                </div>
                <div class="footer__bottom">
                    <p class="footer__copyright">© 2025 Three Arrows Studio. All rights reserved.</p>
                </div>
            </div>
        `;
    }
}

// Initialize header and footer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PageLoader();
});
