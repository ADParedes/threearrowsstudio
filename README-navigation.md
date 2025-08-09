# Three Arrows Studio - Modular HTML System

## Overview
This system uses a simple JavaScript loader to include shared header and footer components across all HTML pages, providing modularity while maintaining reliability and performance.

## Files Structure
```
/
├── header.html          # Shared header navigation HTML
├── footer.html          # Shared footer HTML
├── js/page-loader.js    # Universal loader for header/footer
└── [page].html         # Individual pages using the system
```

## How It Works

1. **Shared Components**: `header.html` and `footer.html` contain the complete HTML structure for navigation and footer
2. **Page Loader**: `js/page-loader.js` fetches and injects the components into each page
3. **Active Navigation**: Automatically highlights the current page in navigation
4. **Mobile Menu**: Handles mobile navigation toggle functionality
5. **Fallback**: Provides backup HTML if components fail to load

## Adding to New Pages

To use this system on any HTML page:

1. **Add the container elements:**
   ```html
   <header id="header" class="header">
       <!-- Header content will be loaded by JavaScript -->
   </header>
   
   <footer id="footer" class="footer">
       <!-- Footer content will be loaded by JavaScript -->
   </footer>
   ```

2. **Include the loader script:**
   ```html
   <script src="js/page-loader.js" defer></script>
   ```

3. **That's it!** The system will automatically:
   - Load the header and footer
   - Set the active navigation state
   - Enable mobile menu functionality

## Editing Navigation

To modify navigation links across all pages, simply edit:
- `header.html` - For the navigation structure
- The `data-page` attributes match the filename (without extension)

## Benefits

✅ **Modular**: Edit header/footer once, updates everywhere
✅ **Simple**: No complex configuration or dependencies  
✅ **Reliable**: Fallback HTML if loading fails
✅ **Fast**: Minimal JavaScript, loads in parallel
✅ **Accessible**: Proper ARIA labels and mobile menu support
✅ **SEO Friendly**: Works without JavaScript (with fallback)

## Current Implementation

- ✅ index.html - Working
- ✅ about.html - Working
- 🔄 products.html - Ready to update
- 🔄 contact.html - Ready to update

## Navigation Active States

The system automatically detects the current page and applies active styles:
- Home page: `index.html` → `data-page="home"`
- About page: `about.html` → `data-page="about"`
- Products page: `products.html` → `data-page="products"`
- Contact page: `contact.html` → `data-page="contact"`
