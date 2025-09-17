
/**
 * Huey Freeman'''s Portfolio - Enhanced JavaScript
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

// ==================== PROJECT HANDLING ====================
const initProjects = () => {
    const projectCarousel = document.querySelector('.project-carousel');
    const modalBackdrop = document.getElementById('project-modal-backdrop');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.getElementById('modal-close-btn');
    let projectsData = [];

    // Fetch project data from the backend
    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/projects');
            if (!response.ok) throw new Error('Network response was not ok');
            projectsData = await response.json();
            renderProjects();
        } catch (error) {
            console.error('Failed to fetch projects:', error);
            projectCarousel.innerHTML = '<p style="color: var(--primary);">Error loading projects. Please try again later.</p>';
        }
    };

    const renderProjects = () => {
        projectCarousel.innerHTML = ''; // Clear loaders or old content

        projectsData.forEach(project => {
            const projectCard = document.createElement('article');
            projectCard.className = 'project-card';
            projectCard.dataset.projectId = project.id;

            const tagsHtml = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');
            
            // Create a short description from the long one
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = project.long_description;
            const shortDescription = tempDiv.textContent.trim().split('.')[0] + '...';

            projectCard.innerHTML = `
                <h3>${project.title}</h3>
                <div class="project-tags">${tagsHtml}</div>
                <p>${shortDescription}</p>
                <button class="project-details">View Project</button>
            `;

            projectCarousel.appendChild(projectCard);
        });

        // Re-attach event listeners for the new cards
        initProjectModalListeners();
    };

    const openModal = (projectId) => {
        const project = projectsData.find(p => p.id === projectId);
        if (!project) return;

        const tagsHtml = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');
        const sourceButton = project.source_code_link ? `<a href="${project.source_code_link}" target="_blank" rel="noopener noreferrer">Source Code</a>` : '';
        const demoButton = project.live_demo_link ? `<a href="${project.live_demo_link}" target="_blank" rel="noopener noreferrer">Live Demo</a>` : '';

        modalContent.innerHTML = `
            <h2>${project.title}</h2>
            <div class="project-tags">${tagsHtml}</div>
            <div>${project.long_description}</div>
            <div class="modal-links">
                ${sourceButton}
                ${demoButton}
            </div>
        `;
        modalBackdrop.classList.add('visible');
        document.body.style.overflow = 'hidden'; 
    };

    const closeModal = () => {
        modalBackdrop.classList.remove('visible');
        document.body.style.overflow = 'auto';
    };

    const initProjectModalListeners = () => {
        document.querySelectorAll('.project-details').forEach(button => {
            button.addEventListener('click', () => {
                const card = button.closest('.project-card');
                const projectId = card.dataset.projectId;
                if (projectId) {
                    openModal(projectId);
                }
            });
        });
    };

    closeBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalBackdrop.classList.contains('visible')) {
            closeModal();
        }
    });

    // Initial fetch
    fetchProjects();
};


// ==================== SCROLL ANIMATIONS ====================
const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .project-card, .skill-category, .timeline li').forEach(el => {
        observer.observe(el);
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
                target.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
};

// ==================== INITIALIZATION ====================
const initPortfolio = () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        initMatrixBackground();
        initScrollAnimations();
    } else {
        // Fallback for reduced motion: just make sections visible
        document.querySelectorAll('section, .project-card, .skill-category, .timeline li').forEach(el => {
            el.classList.add('visible');
        });
    }

    initSmoothScrolling();
    initContactForm();
    initProjects();
    updateCopyrightYear();
    handleInitialScroll();
};

// Start everything when DOM is ready
document.addEventListener('DOMContentLoaded', initPortfolio);
