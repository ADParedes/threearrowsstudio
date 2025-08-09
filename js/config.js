// Configuration Object
window.ThreeArrowsConfig = {
    // Site Information
    site: {
        name: "Three Arrows Studio",
        tagline: "Creating Sacred Spaces Where Faith & Motherhood Beautifully Collide",
        url: "https://threearrowsstudio.com",
        description: "Faith-based wall art and home decor celebrating motherhood and scripture. Digital downloads and prints for creating sacred spaces in your home."
    },

    // Business Owner Information
    owner: {
        name: "Jessica Ashley", // Replace with actual name
        title: "Founder & Artist",
        children: ["Jude", "Wyatt", "Lucy"],
        story: "As a single mother, I've learned that our homes don't need to be perfect to be sacred. They just need to reflect the love that lives within them."
    },

    // Contact Information
    contact: {
        email: "hello@threearrowsstudio.com", // Replace with actual email
        phone: "", // Optional
        address: {
            city: "",
            state: "",
            country: "USA"
        }
    },

    // Social Media Links
    social: {
        instagram: "https://instagram.com/threearrowsstudio", // Replace with actual URLs
        facebook: "https://facebook.com/threearrowsstudio",
        pinterest: "https://pinterest.com/threearrowsstudio",
        etsy: "https://etsy.com/shop/threearrowsstudio",
        youtube: "", // Optional
        tiktok: "" // Optional
    },

    // External Links
    links: {
        shopUrl: "https://etsy.com/shop/threearrowsstudio", // Main shop URL
        productLink1: "https://etsy.com/listing/example1", // Be Still & Know product
        productLink2: "https://etsy.com/listing/example2", // Like Arrows product
        productLink3: "https://etsy.com/listing/example3", // Joy Comes product
        privacyPolicy: "/privacy-policy.html",
        termsOfService: "/terms-of-service.html",
        returnPolicy: "/return-policy.html"
    },

    // Navigation Menu
    navigation: [
        { name: "Home", url: "index.html", slug: "index.html" },
        { name: "About", url: "about.html", slug: "about.html" },
        { name: "Shop", url: "#", external: true, configKey: "shopUrl", slug: "shop" },
        { name: "Gallery", url: "gallery.html", slug: "gallery.html" },
        { name: "Prayer Requests", url: "prayer-requests.html", slug: "prayer-requests.html" },
        { name: "Contact", url: "contact.html", slug: "contact.html" }
    ],

    // Newsletter Configuration
    newsletter: {
        provider: "mailchimp", // Options: mailchimp, convertkit, mailerlite, custom
        actionUrl: "https://your-newsletter-signup-url.com", // Replace with actual URL
        successMessage: "Thank you for joining our sacred circle! Check your email for a welcome gift.",
        errorMessage: "Something went wrong. Please try again or contact us directly."
    },

    // Prayer Request Configuration
    prayerRequests: {
        provider: "netlify", // Options: netlify, formspree, custom
        actionUrl: "https://your-form-handler-url.com", // Replace with actual URL
        successMessage: "Your prayer request has been received. You are loved and prayed for.",
        errorMessage: "Unable to submit your request. Please try again or email us directly."
    },

    // SEO Configuration
    seo: {
        keywords: [
            "Christian wall art",
            "Faith-based home decor",
            "Scripture wall art",
            "Christian motherhood",
            "Biblical wall art",
            "Faith prints",
            "Christian nursery decor"
        ],
        author: "Three Arrows Studio",
        twitterHandle: "@threearrowsstudio" // Replace with actual handle
    },

    // Analytics (Optional)
    analytics: {
        googleAnalytics: "", // GA4 Measurement ID
        facebookPixel: "", // Facebook Pixel ID
        pinterestTag: "" // Pinterest Tag ID
    },

    // Feature Flags
    features: {
        blog: false, // Enable when blog is ready
        testimonials: true,
        newsletter: true,
        prayerRequests: true,
        darkMode: false, // Future feature
        multiLanguage: false // Future feature
    },

    // Content Configuration
    content: {
        heroTitle: "Creating Sacred Spaces Where Faith & Motherhood Beautifully Collide",
        heroSubtitle: "Like arrows in the hands of a warrior are children born in one's youth. Welcome to Three Arrows Studio, where every piece of art celebrates God's greatest gifts—faith, family, and the holy calling of motherhood.",
        missionStatement: "At Three Arrows Studio, we believe every home is already holy because love lives there. Our mission is to help you create beautiful, sacred spaces that reflect your faith journey and celebrate the incredible gift of motherhood—one meaningful piece of art at a time.",
        primaryScripture: {
            text: "Like arrows in the hands of a warrior are children born in one's youth.",
            reference: "Psalm 127:4"
        },
        secondaryScripture: {
            text: "Weeping may stay for the night, but rejoicing comes in the morning.",
            reference: "Psalm 30:5"
        }
    },

    // Image Paths
    images: {
        logo: "images/logo.png",
        heroBackground: "images/hero-bg.jpg",
        founderPhoto: "images/founder-photo.jpg",
        fallbackImage: "images/placeholder.jpg"
    }
};

// Configuration Helper Functions
window.ThreeArrowsConfig.helpers = {
    // Get configuration value by dot notation path
    get(path) {
        return path.split('.').reduce((obj, key) => obj && obj[key], this);
    },

    // Set configuration value by dot notation path
    set(path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((obj, key) => obj[key] = obj[key] || {}, this);
        target[lastKey] = value;
    },

    // Get social media links as array
    getSocialLinks() {
        const social = this.social;
        return Object.entries(social)
            .filter(([key, url]) => url && url.trim() !== '')
            .map(([platform, url]) => ({ platform, url }));
    },

    // Get navigation items
    getNavigation() {
        return this.navigation.map(item => ({
            ...item,
            url: item.configKey ? this.links[item.configKey] || item.url : item.url
        }));
    },

    // Get current page slug for navigation
    getCurrentPageSlug() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        
        // Handle root path
        if (page === '' || page === '/') {
            return 'index.html';
        }
        
        return page;
    },

    // Check if feature is enabled
    isFeatureEnabled(feature) {
        return this.features[feature] === true;
    }
};

// Initialize configuration on page load
document.addEventListener('DOMContentLoaded', function() {
    // Apply configuration to data-config elements
    const configElements = document.querySelectorAll('[data-config]');
    
    configElements.forEach(element => {
        const configKey = element.getAttribute('data-config');
        const configValue = window.ThreeArrowsConfig.helpers.get(configKey) || 
                           window.ThreeArrowsConfig.links[configKey];
        
        if (configValue) {
            if (element.tagName.toLowerCase() === 'a') {
                element.href = configValue;
            } else if (element.tagName.toLowerCase() === 'img') {
                element.src = configValue;
            } else {
                element.textContent = configValue;
            }
        }
    });

    // Set page title
    if (window.ThreeArrowsConfig.site.name) {
        document.title = document.title.replace(/Three Arrows Studio/, window.ThreeArrowsConfig.site.name);
    }

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && window.ThreeArrowsConfig.site.description) {
        metaDescription.setAttribute('content', window.ThreeArrowsConfig.site.description);
    }

    // Initialize analytics if configured
    if (window.ThreeArrowsConfig.analytics.googleAnalytics) {
        initializeGoogleAnalytics(window.ThreeArrowsConfig.analytics.googleAnalytics);
    }
});

// Analytics initialization function
function initializeGoogleAnalytics(measurementId) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', measurementId);
    window.gtag = gtag;
}
