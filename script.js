/* ==========================================================================
   JavaScript Core Logic - Sanjeevraj Bommannan M Portfolio
   Features: Theme toggling, scroll reveals, HDL console typing & highlighting,
             and canvas-based interactive circuit background.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ----------------------------------------------------------------------
       1. Light / Dark Theme Manager
       ---------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleIcon = themeToggleBtn.querySelector('i');
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        document.body.classList.add('light-theme');
        themeToggleIcon.className = 'fa-solid fa-sun';
    } else {
        document.body.classList.remove('light-theme');
        themeToggleIcon.className = 'fa-solid fa-moon';
    }
    
    // Theme toggle action
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            themeToggleIcon.className = 'fa-solid fa-sun';
            localStorage.setItem('portfolio-theme', 'light');
        } else {
            themeToggleIcon.className = 'fa-solid fa-moon';
            localStorage.setItem('portfolio-theme', 'dark');
        }
    });

    /* ----------------------------------------------------------------------
       2. Mobile Navigation Menu Toggle
       ---------------------------------------------------------------------- */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuIcon = mobileMenuBtn.querySelector('i');
    const navbar = document.getElementById('navbar');
    
    mobileMenuBtn.addEventListener('click', () => {
        navbar.classList.toggle('mobile-active');
        if (navbar.classList.contains('mobile-active')) {
            mobileMenuIcon.className = 'fa-solid fa-xmark';
        } else {
            mobileMenuIcon.className = 'fa-solid fa-bars';
        }
    });

    // Close menu when nav link clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('mobile-active');
            mobileMenuIcon.className = 'fa-solid fa-bars';
        });
    });

    // Track active navigation link on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* ----------------------------------------------------------------------
       3. Scroll Reveal Animation (IntersectionObserver)
       ---------------------------------------------------------------------- */
    // Add reveal class to sections, cards, and headers
    const elementsToReveal = [
        '.section-header', 
        '.about-text-content', 
        '.about-focus-cards .focus-card',
        '.stat-card',
        '.skill-category-card',
        '.project-card',
        '.timeline-column',
        '.contact-card',
        '.contact-form-container'
    ];

    elementsToReveal.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('reveal');
        });
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it is a skill category card, animate progress bars
                if (entry.target.classList.contains('skill-category-card')) {
                    const bars = entry.target.querySelectorAll('.skill-bar-fill');
                    bars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.transform = `scaleX(1)`;
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });


    /* ----------------------------------------------------------------------
       5. Circuit Node Canvas Background Animation
       ---------------------------------------------------------------------- */
    const canvas = document.getElementById('circuit-canvas');
    const ctx = canvas.getContext('2d');
    
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    
    // Resize handler
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initNodes();
    });

    let nodes = [];
    let connections = [];
    const maxNodes = 40;
    
    class CircuitNode {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = Math.random() * 2 + 1.5;
            this.pulse = Math.random() * Math.PI;
            this.speed = Math.random() * 0.02 + 0.005;
            this.brightness = Math.random() * 0.5 + 0.2;
        }

        draw() {
            this.pulse += this.speed;
            const currentGlow = Math.sin(this.pulse) * 0.4 + 0.6;
            
            // Get CSS color value dynamically
            const isLightTheme = document.body.classList.contains('light-theme');
            const color = isLightTheme ? '2, 132, 199' : '0, 242, 254'; // skies vs cyan
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius + currentGlow, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color}, ${this.brightness * currentGlow})`;
            ctx.fill();
            
            // Draw a subtle outer ring
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${color}, ${(this.brightness * currentGlow) * 0.25})`;
            ctx.stroke();
        }
    }

    class CircuitTrace {
        constructor(startNode, endNode) {
            this.start = startNode;
            this.end = endNode;
            this.progress = Math.random();
            this.speed = Math.random() * 0.004 + 0.001;
            this.width = Math.random() * 1.5 + 0.5;
        }

        draw() {
            this.progress += this.speed;
            if (this.progress > 1) {
                this.progress = 0;
                this.speed = Math.random() * 0.004 + 0.001;
            }

            const isLightTheme = document.body.classList.contains('light-theme');
            const color = isLightTheme ? '2, 132, 199' : '0, 242, 254';
            
            // Draw track line
            ctx.beginPath();
            ctx.moveTo(this.start.x, this.start.y);
            // Draw standard ECE 45 degree orthagonal connection path
            const midX = this.start.x + (this.end.x - this.start.x) * 0.5;
            const midY = this.start.y;
            ctx.lineTo(midX, midY);
            ctx.lineTo(this.end.x, this.end.y);
            
            ctx.strokeStyle = isLightTheme ? `rgba(203, 213, 225, 0.4)` : `rgba(255, 255, 255, 0.03)`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw glowing signal pulse moving along trace
            ctx.beginPath();
            ctx.moveTo(this.start.x, this.start.y);
            
            // Calculate pulse current coordinates
            let px = 0;
            let py = 0;
            if (this.progress < 0.5) {
                const localProg = this.progress * 2;
                px = this.start.x + (midX - this.start.x) * localProg;
                py = this.start.y;
            } else {
                const localProg = (this.progress - 0.5) * 2;
                px = midX + (this.end.x - midX) * localProg;
                py = midY + (this.end.y - midY) * localProg;
            }
            
            ctx.arc(px, py, this.width + 1, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color}, 0.6)`;
            ctx.fill();
        }
    }

    function initNodes() {
        nodes = [];
        connections = [];
        
        // Create nodes on a grid with jitter to resemble silicon traces
        const cols = 5;
        const rows = 5;
        const cellW = width / cols;
        const cellH = height / rows;
        
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const x = i * cellW + cellW * 0.5 + (Math.random() - 0.5) * (cellW * 0.6);
                const y = j * cellH + cellH * 0.5 + (Math.random() - 0.5) * (cellH * 0.6);
                nodes.push(new CircuitNode(x, y));
            }
        }
        
        // Connect nearby nodes
        for (let i = 0; i < nodes.length; i++) {
            const start = nodes[i];
            let nearby = [];
            
            for (let j = 0; j < nodes.length; j++) {
                if (i === j) continue;
                const end = nodes[j];
                const dist = Math.hypot(end.x - start.x, end.y - start.y);
                if (dist < Math.max(width, height) * 0.25) {
                    nearby.push({ node: end, dist: dist });
                }
            }
            
            // Sort by distance and connect to closest 1 or 2 nodes
            nearby.sort((a, b) => a.dist - b.dist);
            const numConn = Math.random() > 0.5 ? 2 : 1;
            for (let k = 0; k < Math.min(numConn, nearby.length); k++) {
                // Prevent duplicate tracing
                if (!connections.some(c => (c.start === start && c.end === nearby[k].node) || (c.start === nearby[k].node && c.end === start))) {
                    connections.push(new CircuitTrace(start, nearby[k].node));
                }
            }
        }
    }

    function animateCircuit() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw trace connections
        connections.forEach(conn => conn.draw());
        
        // Draw nodes
        nodes.forEach(node => node.draw());
        
        requestAnimationFrame(animateCircuit);
    }
    
    initNodes();
    animateCircuit();
});
