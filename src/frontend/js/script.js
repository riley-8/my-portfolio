/**
 * Huey Freeman's Portfolio - Enhanced JavaScript
 * Complete with fixed Matrix animation and all interactive elements
 */

// ==================== MATRIX RAIN EFFECT ====================
const initMatrixBackground = () => {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = Math.floor(canvas.width / fontSize);
        rainDrops = Array(columns).fill(1);
    };
    
    // Character set - Katakana, Latin, Numbers
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?~';
    const alphabet = katakana + latin + nums + symbols;

    // Animation settings
    const fontSize = 16;
    let columns = 0;
    let rainDrops = [];
    
    // Initial setup
    resizeCanvas();

    // Main drawing function
    const drawMatrix = () => {
        // Semi-transparent background for trail effect (matches dark theme)
        ctx.fillStyle = 'rgba(18, 18, 18, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set text color to match --primary (#00ff88) with slight variation
        ctx.fillStyle = '#00ff88';
        ctx.font = `bold ${fontSize}px 'Space Mono', monospace`;
        
        // Draw each column
        for (let i = 0; i < rainDrops.length; i++) {
            // Random character with occasional bright highlight
            const randChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            const isHighlight = Math.random() > 0.85;
            
            // Slightly brighter color for some characters
            if (isHighlight) {
                ctx.fillStyle = '#00ffaa';
                ctx.fillText(randChar, i * fontSize, rainDrops[i] * fontSize);
                ctx.fillStyle = '#00ff88';
            } else {
                ctx.fillText(randChar, i * fontSize, rainDrops[i] * fontSize);
            }
            
            // Reset drop if it reaches bottom with random chance
            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            
            // Move drop down
            rainDrops[i]++;
        }
    };

    // Start animation
    const matrixInterval = setInterval(drawMatrix, 33); // ~30fps

    // Handle window resize
    const handleResize = () => {
        resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
        clearInterval(matrixInterval);
        window.removeEventListener('resize', handleResize);
    };
};

// ==================== SMOOTH SCROLLING ====================
const initSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
};

// ==================== CONTACT FORM ====================
const initContactForm = () => {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                submitButton.textContent = '✓ Sent!';
                contactForm.reset();
            } else {
                const data = await response.json();
                throw new Error(data.error || 'Server error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            submitButton.textContent = 'Error!';
        } finally {
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 4000);
        }
    });
};

// ==================== PROJECT CARDS ====================
const initProjectCards = () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Click handler
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('project-details')) return;
            
            // In production, this would open a project modal
            const projectTitle = card.querySelector('h3').textContent;
            console.log(`Selected project: ${projectTitle}`);
        });
        
        // Keyboard accessibility
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
};

// ==================== SCROLL ANIMATIONS ====================
const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
};

// ==================== UTILITY FUNCTIONS ====================
const updateCopyrightYear = () => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
};

const handleInitialScroll = () => {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView();
            }, 100);
        }
    }
};

// ==================== INITIALIZATION ====================
const initPortfolio = () => {
    initMatrixBackground();
    initSmoothScrolling();
    initContactForm();
    initProjectCards();
    initScrollAnimations();
    updateCopyrightYear();
    handleInitialScroll();
};

// Start everything when DOM is ready
document.addEventListener('DOMContentLoaded', initPortfolio);

// Handle window load
window.addEventListener('load', handleInitialScroll);
