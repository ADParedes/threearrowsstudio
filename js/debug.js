// Simple initialization test
console.log('Testing config loading...');

// Test if config is available
if (window.ThreeArrowsConfig) {
    console.log('✅ Config loaded successfully', window.ThreeArrowsConfig.site.name);
    
    if (window.ThreeArrowsConfig.helpers) {
        console.log('✅ Config helpers available');
        console.log('Current page:', window.ThreeArrowsConfig.helpers.getCurrentPageSlug());
        console.log('Navigation:', window.ThreeArrowsConfig.helpers.getNavigation());
    } else {
        console.error('❌ Config helpers not available');
    }
} else {
    console.error('❌ ThreeArrowsConfig not loaded');
}

// Test DOM ready state
console.log('DOM ready state:', document.readyState);

// Test if header element exists
const headerElement = document.getElementById('header');
if (headerElement) {
    console.log('✅ Header element found');
} else {
    console.error('❌ Header element not found');
}
