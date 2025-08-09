# Three Arrows Studio Website

A beautiful, faith-based website for Three Arrows Studio - creating sacred spaces where faith and motherhood beautifully collide. Built with modular HTML, CSS, and JavaScript for easy customization and configuration.

## 🎨 Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modular CSS Architecture** - Easy to customize and maintain
- **Configurable Content** - Update links, content, and settings via JavaScript config
- **Accessibility First** - WCAG AA compliant with proper semantic markup
- **Performance Optimized** - Lazy loading, optimized images, minimal JavaScript
- **SEO Ready** - Proper meta tags, structured data, and semantic HTML
- **Animation Effects** - Smooth scroll animations and hover effects

## 📁 Project Structure

```
threearrowsstudio/
├── index.html              # Homepage
├── about.html              # About page
├── css/
│   ├── reset.css           # CSS reset styles
│   ├── variables.css       # CSS custom properties/variables
│   ├── base.css            # Base typography and elements
│   ├── components.css      # Reusable components
│   ├── layout.css          # Layout and grid systems
│   └── pages/
│       ├── home.css        # Homepage specific styles
│       └── about.css       # About page specific styles
├── js/
│   ├── config.js           # Main configuration file
│   ├── main.js             # Main application JavaScript
│   └── components/
│       ├── header.js       # Header component
│       ├── footer.js       # Footer component
│       └── newsletter.js   # Newsletter signup component
└── images/                 # Image assets (to be added)
```

## 🚀 Quick Start

1. **Clone or Download** the project files to your web server
2. **Update Configuration** in `js/config.js` (see Configuration section below)
3. **Add Images** to the `images/` directory
4. **Customize Content** by editing HTML files or updating config
5. **Deploy** to your hosting provider

## ⚙️ Configuration

The website is highly configurable through the `js/config.js` file. Update these key sections:

### Site Information
```javascript
site: {
    name: "Your Studio Name",
    tagline: "Your tagline here",
    url: "https://yourdomain.com",
    description: "Your meta description"
}
```

### Owner Information
```javascript
owner: {
    name: "Your Name", 
    title: "Founder & Artist",
    children: ["Child1", "Child2", "Child3"],
    story: "Your personal story"
}
```

### Contact & Social Links
```javascript
contact: {
    email: "hello@yourdomain.com",
    // ... other contact info
},
social: {
    instagram: "https://instagram.com/yourhandle",
    facebook: "https://facebook.com/yourpage",
    pinterest: "https://pinterest.com/yourprofile",
    etsy: "https://etsy.com/shop/yourshop"
}
```

### Shop & Product Links
```javascript
links: {
    shopUrl: "https://etsy.com/shop/yourshop",
    productLink1: "https://etsy.com/listing/product1",
    productLink2: "https://etsy.com/listing/product2",
    productLink3: "https://etsy.com/listing/product3"
}
```

## 🖼️ Images Required

Add these images to the `images/` directory:

### Homepage
- `hero-bg.jpg` - Hero background image (1920x1080px recommended)
- `founder-photo.jpg` - Founder/family photo (600x800px recommended)

### Products
- `products/be-still-know.jpg`
- `products/arrows-warrior.jpg` 
- `products/morning-joy.jpg`

### Testimonials
- `testimonials/sarah.jpg`
- `testimonials/jennifer.jpg`
- `testimonials/maria.jpg`

### About Page
- `family-photo.jpg` - Family hero image
- `studio-workspace.jpg` - Workspace photo
- `design-process.jpg` - Design process photo
- `studio-corner.jpg` - Studio corner photo
- `creating-art.jpg` - Creating art photo

## 📧 Form Integration

### Newsletter Signup
Configure newsletter integration in `js/config.js`:

```javascript
newsletter: {
    provider: "mailchimp", // Options: mailchimp, convertkit, mailerlite, custom
    actionUrl: "https://your-signup-url.com",
    successMessage: "Thank you for joining!",
    errorMessage: "Something went wrong."
}
```

### Supported Providers
- **Mailchimp** - Use embedded form URL
- **ConvertKit** - Use API endpoint
- **MailerLite** - Use API endpoint  
- **Custom** - Use your own form handler
- **Netlify Forms** - Works out of the box with Netlify hosting

## 🎨 Customization

### Colors
Update color scheme in `css/variables.css`:

```css
:root {
    --color-sage-whisper: #9CAF88;    /* Primary brand color */
    --color-terracotta-kiss: #C77B5C;  /* Call-to-action color */
    --color-cream-dream: #F9F7F4;      /* Background color */
    /* ... other colors */
}
```

### Typography
Font families are defined in `css/variables.css`:

```css
:root {
    --font-primary: 'Dancing Script', cursive;    /* Headings */
    --font-secondary: 'Crimson Text', serif;      /* Body text */
    --font-tertiary: 'Open Sans', sans-serif;     /* UI elements */
}
```

### Adding New Pages
1. Create HTML file based on existing page structure
2. Include required CSS and JS files
3. Create page-specific CSS in `css/pages/`
4. Update navigation in `js/config.js`

## 📱 Responsive Breakpoints

```css
--breakpoint-sm: 640px;   /* Small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small desktop */
--breakpoint-xl: 1280px;  /* Desktop */
```

## 🔧 Browser Support

- **Modern Browsers** - Chrome, Firefox, Safari, Edge (current versions)
- **Mobile Browsers** - iOS Safari, Chrome Mobile, Samsung Internet
- **Accessibility** - Screen readers, keyboard navigation, high contrast mode

## 📊 Analytics & Tracking

Add tracking IDs to `js/config.js`:

```javascript
analytics: {
    googleAnalytics: "GA4-MEASUREMENT-ID",
    facebookPixel: "PIXEL-ID",
    pinterestTag: "TAG-ID"
}
```

## 🚀 Hosting Recommendations

### Static Hosting (Recommended)
- **Netlify** - Free tier, auto-deployment from Git, form handling
- **Vercel** - Fast deployment, good performance
- **GitHub Pages** - Free for public repositories

### Traditional Hosting
- **SiteGround** - WordPress hosting with static site support
- **Bluehost** - Affordable shared hosting
- **DreamHost** - Reliable hosting with good support

## 🛠️ Development

### Local Development
1. Use a local server (VS Code Live Server, Python's http.server, etc.)
2. Make changes to HTML, CSS, or JS files
3. Refresh browser to see changes
4. Test on multiple device sizes

### Performance Tips
- Optimize images (use WebP format when possible)
- Minimize JavaScript and CSS for production
- Use a CDN for faster global delivery
- Enable browser caching

## 📋 SEO Checklist

- [x] Semantic HTML structure
- [x] Meta descriptions for all pages
- [x] Alt text for all images
- [x] Proper heading hierarchy (H1, H2, H3)
- [x] Mobile-friendly design
- [x] Fast loading times
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics
- [ ] Optimize images for web
- [ ] Add structured data markup

## 🆘 Support & Troubleshooting

### Common Issues

**Images not showing:**
- Check file paths in HTML and CSS
- Ensure images are uploaded to `images/` directory
- Verify image file names match exactly (case-sensitive)

**Newsletter not working:**
- Update `actionUrl` in `js/config.js`
- Check form provider documentation
- Test form submission manually

**Mobile menu not working:**
- Ensure JavaScript files are loaded
- Check browser console for errors
- Verify header component is initialized

### Getting Help
- Check browser console for JavaScript errors
- Validate HTML and CSS using W3C validators
- Test on multiple browsers and devices
- Review configuration settings in `js/config.js`

## 📄 License

This project is created for Three Arrows Studio. Please respect copyright and trademark rights when using this template.

## 🙏 Credits

Built with love, prayer, and modern web standards for Three Arrows Studio - creating sacred spaces where faith and motherhood beautifully collide.

---

*"Like arrows in the hands of a warrior are children born in one's youth." - Psalm 127:4*
