// Newsletter Component
class Newsletter {
    constructor() {
        this.form = document.getElementById('newsletter-form');
        this.config = window.ThreeArrowsConfig;
        this.isSubmitting = false;
        this.init();
    }

    init() {
        if (this.form) {
            this.bindEvents();
            this.setupFormAction();
        }
    }

    setupFormAction() {
        if (this.config.newsletter.actionUrl) {
            this.form.setAttribute('action', this.config.newsletter.actionUrl);
        }
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Real-time email validation
        const emailInput = this.form.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('blur', () => {
                this.validateEmail(emailInput.value);
            });

            emailInput.addEventListener('input', () => {
                this.clearErrors();
            });
        }
    }

    async handleSubmit() {
        if (this.isSubmitting) return;

        const formData = new FormData(this.form);
        const email = formData.get('email');
        
        // Validate email
        if (!this.validateEmail(email)) {
            return;
        }

        this.isSubmitting = true;
        this.showLoading();

        try {
            const success = await this.submitForm(formData);
            
            if (success) {
                this.showSuccess();
                this.trackSignup();
                this.form.reset();
            } else {
                this.showError();
            }
        } catch (error) {
            console.error('Newsletter signup error:', error);
            this.showError();
        } finally {
            this.isSubmitting = false;
            this.hideLoading();
        }
    }

    async submitForm(formData) {
        const config = this.config.newsletter;
        
        switch (config.provider) {
            case 'mailchimp':
                return await this.submitToMailchimp(formData);
            case 'convertkit':
                return await this.submitToConvertKit(formData);
            case 'mailerlite':
                return await this.submitToMailerLite(formData);
            case 'custom':
                return await this.submitToCustom(formData);
            default:
                return await this.submitToDefault(formData);
        }
    }

    async submitToMailchimp(formData) {
        // Mailchimp integration - replace with your actual Mailchimp form URL
        const response = await fetch(this.config.newsletter.actionUrl, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Mailchimp doesn't support CORS
        });
        
        // Since we can't read the response with no-cors, assume success
        // You might want to implement a more sophisticated check
        return true;
    }

    async submitToConvertKit(formData) {
        // ConvertKit API integration
        const response = await fetch(this.config.newsletter.actionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.get('email'),
                first_name: formData.get('first_name') || '',
            })
        });
        
        return response.ok;
    }

    async submitToMailerLite(formData) {
        // MailerLite integration
        const response = await fetch(this.config.newsletter.actionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.get('email'),
            })
        });
        
        return response.ok;
    }

    async submitToCustom(formData) {
        // Custom form handler
        const response = await fetch(this.config.newsletter.actionUrl, {
            method: 'POST',
            body: formData
        });
        
        return response.ok;
    }

    async submitToDefault(formData) {
        // Default form submission - useful for Netlify Forms or similar
        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData).toString()
        });
        
        return response.ok;
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        
        if (!isValid) {
            this.showFieldError('email', 'Please enter a valid email address');
            return false;
        }
        
        this.clearFieldError('email');
        return true;
    }

    showLoading() {
        const submitButton = this.form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = `
                <span class="spinner"></span>
                Joining...
            `;
        }
    }

    hideLoading() {
        const submitButton = this.form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Join Our Circle';
        }
    }

    showSuccess() {
        this.showMessage(
            this.config.newsletter.successMessage,
            'success'
        );
    }

    showError() {
        this.showMessage(
            this.config.newsletter.errorMessage,
            'error'
        );
    }

    showMessage(message, type) {
        // Remove existing messages
        this.clearMessages();
        
        const messageEl = document.createElement('div');
        messageEl.className = `alert alert--${type}`;
        messageEl.textContent = message;
        messageEl.setAttribute('role', 'alert');
        
        this.form.insertBefore(messageEl, this.form.firstChild);
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageEl.remove();
            }, 5000);
        }
    }

    showFieldError(fieldName, message) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.classList.add('has-error');
            
            // Remove existing error message
            const existingError = field.parentNode.querySelector('.form-group__error');
            if (existingError) {
                existingError.remove();
            }
            
            // Add new error message
            const errorEl = document.createElement('div');
            errorEl.className = 'form-group__error';
            errorEl.textContent = message;
            errorEl.setAttribute('role', 'alert');
            
            field.parentNode.appendChild(errorEl);
        }
    }

    clearFieldError(fieldName) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.classList.remove('has-error');
            const errorEl = field.parentNode.querySelector('.form-group__error');
            if (errorEl) {
                errorEl.remove();
            }
        }
    }

    clearErrors() {
        this.form.querySelectorAll('.has-error').forEach(field => {
            field.classList.remove('has-error');
        });
        
        this.form.querySelectorAll('.form-group__error').forEach(error => {
            error.remove();
        });
    }

    clearMessages() {
        this.form.querySelectorAll('.alert').forEach(alert => {
            alert.remove();
        });
    }

    trackSignup() {
        // Google Analytics tracking
        if (window.gtag) {
            gtag('event', 'newsletter_signup', {
                method: 'form_submission'
            });
        }
        
        // Facebook Pixel tracking
        if (window.fbq) {
            fbq('track', 'Subscribe');
        }
        
        // Console log for development
        console.log('Newsletter signup tracked');
    }
}

// Initialize newsletter when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.newsletterComponent = new Newsletter();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Newsletter;
}
