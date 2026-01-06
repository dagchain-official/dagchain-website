// Presentation Controller
class PresentationController {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 12;
        this.slides = [];
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        // Get DOM elements
        this.slidesContainer = document.getElementById('slides-container');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.currentSlideSpan = document.getElementById('current-slide');
        this.totalSlidesSpan = document.getElementById('total-slides');
        this.progressFill = document.getElementById('progress-fill');
        
        // Get all slides
        this.slides = Array.from(document.querySelectorAll('.slide'));
        
        // Set total slides count
        this.totalSlidesSpan.textContent = this.totalSlides;
        
        // Bind event listeners
        this.bindEvents();
        
        // Initialize presentation
        this.updatePresentation();
        
        // Add smooth loading animation
        this.addLoadingAnimation();
    }
    
    bindEvents() {
        // Button navigation
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Touch/swipe support for mobile
        this.addTouchSupport();
        
        // Prevent default behavior for certain keys
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
            }
        });
    }
    
    handleKeydown(e) {
        if (this.isTransitioning) return;
        
        switch(e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                this.previousSlide();
                break;
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ': // Spacebar
                this.nextSlide();
                break;
            case 'Home':
                this.goToSlide(1);
                break;
            case 'End':
                this.goToSlide(this.totalSlides);
                break;
            case 'Escape':
                // Could add fullscreen toggle or other functionality
                break;
        }
    }
    
    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        
        this.slidesContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        this.slidesContainer.addEventListener('touchmove', (e) => {
            // Prevent vertical scrolling during horizontal swipes
            if (Math.abs(e.touches[0].clientX - startX) > 50) {
                e.preventDefault();
            }
        }, { passive: false });
        
        this.slidesContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        }, { passive: true });
    }
    
    handleSwipe(startX, endX) {
        const threshold = 100; // Minimum distance for a swipe
        const diff = startX - endX;
        
        if (Math.abs(diff) < threshold) return;
        
        if (diff > 0) {
            // Swiped left - next slide
            this.nextSlide();
        } else {
            // Swiped right - previous slide
            this.previousSlide();
        }
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides && !this.isTransitioning) {
            this.goToSlide(this.currentSlide + 1);
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 1 && !this.isTransitioning) {
            this.goToSlide(this.currentSlide - 1);
        }
    }
    
    goToSlide(slideNumber) {
        if (slideNumber < 1 || slideNumber > this.totalSlides || this.isTransitioning) {
            return;
        }
        
        this.isTransitioning = true;
        this.currentSlide = slideNumber;
        this.updatePresentation();
        
        // Add transition delay
        setTimeout(() => {
            this.isTransitioning = false;
        }, 300);
    }
    
    updatePresentation() {
        // Update slide positions
        this.slides.forEach((slide, index) => {
            const slideNumber = index + 1;
            slide.classList.remove('active', 'prev');
            
            if (slideNumber === this.currentSlide) {
                slide.classList.add('active');
            } else if (slideNumber < this.currentSlide) {
                slide.classList.add('prev');
            }
        });
        
        // Update counter
        this.currentSlideSpan.textContent = this.currentSlide;
        
        // Update progress bar
        const progressPercent = (this.currentSlide / this.totalSlides) * 100;
        this.progressFill.style.width = `${progressPercent}%`;
        
        // Update navigation buttons
        this.prevBtn.disabled = this.currentSlide === 1;
        this.nextBtn.disabled = this.currentSlide === this.totalSlides;
        
        // Add slide-specific animations
        this.addSlideAnimations();
    }
    
    addSlideAnimations() {
        const currentSlideElement = this.slides[this.currentSlide - 1];
        
        // Remove existing animation classes
        currentSlideElement.querySelectorAll('.animate-in').forEach(el => {
            el.classList.remove('animate-in');
        });
        
        // Add animation classes with delay
        setTimeout(() => {
            const animatableElements = currentSlideElement.querySelectorAll(
                '.summary-card, .workflow-step, .method-card, .insight-card, .combo-card, .takeaway'
            );
            
            animatableElements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('animate-in');
                }, index * 100);
            });
        }, 100);
    }
    
    addLoadingAnimation() {
        // Add fade-in animation to the presentation
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
        
        // Add initial animations to first slide elements
        setTimeout(() => {
            this.addSlideAnimations();
        }, 500);
    }
    
    // Utility methods
    getCurrentSlide() {
        return this.currentSlide;
    }
    
    getTotalSlides() {
        return this.totalSlides;
    }
    
    // Method to handle window resize
    handleResize() {
        // Could add responsive behavior here if needed
        this.updatePresentation();
    }
}

// Additional utility functions
class PresentationUtils {
    static formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
    
    static addTableInteractivity() {
        // Add hover effects and click interactions to tables
        const tables = document.querySelectorAll('.tools-table');
        
        tables.forEach(table => {
            const rows = table.querySelectorAll('tbody tr');
            
            rows.forEach(row => {
                row.addEventListener('mouseenter', () => {
                    row.style.transform = 'scale(1.02)';
                    row.style.transition = 'transform 0.2s ease';
                });
                
                row.addEventListener('mouseleave', () => {
                    row.style.transform = 'scale(1)';
                });
            });
        });
    }
    
    static addCardAnimations() {
        // Add intersection observer for card animations
        const cards = document.querySelectorAll('.card, .summary-card, .method-card, .insight-card');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px'
            });
            
            cards.forEach(card => observer.observe(card));
        }
    }
    
    static addStatusIndicators() {
        // Enhance status indicators with icons
        const statusElements = document.querySelectorAll('.status');
        
        statusElements.forEach(status => {
            const text = status.textContent.trim().toLowerCase();
            let icon = '';
            
            if (text.includes('yes')) {
                icon = '✓ ';
                status.classList.add('status--success');
            } else if (text.includes('no')) {
                icon = '✗ ';
                status.classList.add('status--error');
            } else if (text.includes('limited') || text.includes('varies')) {
                icon = '⚠ ';
                status.classList.add('status--warning');
            }
            
            if (icon) {
                status.innerHTML = icon + status.innerHTML;
            }
        });
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.startTime = performance.now();
        this.slideTransitions = [];
    }
    
    recordTransition(fromSlide, toSlide) {
        this.slideTransitions.push({
            from: fromSlide,
            to: toSlide,
            timestamp: performance.now()
        });
    }
    
    getAverageTransitionTime() {
        if (this.slideTransitions.length < 2) return 0;
        
        const times = this.slideTransitions.map((transition, index) => {
            if (index === 0) return 0;
            return transition.timestamp - this.slideTransitions[index - 1].timestamp;
        }).filter(time => time > 0);
        
        return times.reduce((sum, time) => sum + time, 0) / times.length;
    }
    
    getPresentationDuration() {
        return (performance.now() - this.startTime) / 1000; // seconds
    }
}

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize presentation controller
    const presentation = new PresentationController();
    
    // Initialize performance monitor
    const performanceMonitor = new PerformanceMonitor();
    
    // Add utility enhancements
    PresentationUtils.addTableInteractivity();
    PresentationUtils.addCardAnimations();
    PresentationUtils.addStatusIndicators();
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            presentation.handleResize();
        }, 250);
    });
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.6s ease-out forwards;
            opacity: 1;
            transform: translateY(0);
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .summary-card,
        .workflow-step,
        .method-card,
        .insight-card,
        .combo-card,
        .takeaway {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .tools-table tr {
            transition: all 0.2s ease;
        }
        
        .nav-btn {
            position: relative;
            overflow: hidden;
        }
        
        .nav-btn::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.3s ease, height 0.3s ease;
        }
        
        .nav-btn:active::before {
            width: 100px;
            height: 100px;
        }
        
        .slide {
            will-change: transform;
        }
        
        @media (prefers-reduced-motion: reduce) {
            .animate-in,
            .summary-card,
            .workflow-step,
            .method-card,
            .insight-card,
            .combo-card,
            .takeaway {
                animation: none;
                transition: none;
                opacity: 1;
                transform: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add focus management for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            const focusableElements = document.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
    
    // Preload next slide for smooth transitions
    const originalGoToSlide = presentation.goToSlide.bind(presentation);
    presentation.goToSlide = function(slideNumber) {
        performanceMonitor.recordTransition(this.currentSlide, slideNumber);
        return originalGoToSlide(slideNumber);
    };
    
    // Add presentation timer (optional)
    let presentationStartTime = Date.now();
    
    // Expose global functions for debugging
    window.presentation = presentation;
    window.performanceMonitor = performanceMonitor;
    
    // Log initialization
    console.log('AI Tools Pricing Analysis Presentation initialized');
    console.log(`Total slides: ${presentation.getTotalSlides()}`);
    console.log('Navigation: Arrow keys, Space, or click buttons');
    console.log('Mobile: Swipe left/right');
});

// Service worker registration for offline capability (optional)
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         // Register service worker if available
//         // navigator.serviceWorker.register('/sw.js')
//         //     .then(registration => console.log('SW registered'))
//         //     .catch(error => console.log('SW registration failed'));
//     });
// }
