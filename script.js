// DOM yuklangandan so'ng barcha funksiyalarni ishga tushiramiz
document.addEventListener('DOMContentLoaded', function() {
    initNavbarScroll();
    initBackToTop();
    initDarkModeToggle();
    initSkillBarsAnimation();
    initContactForm();
    animatedCanvas('hero-canvas', { points: 40, dist: 120 });
    animatedCanvas('footer-canvas', { points: 40, dist: 120 });
});

// Navbarni aylantirish effektini sozlash
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    // Scroll voqeasi - navbar stilini o'zgartiradi
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// Yuqoriga qaytish tugmasini sozlash
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    // Scroll paytida tugmani ko'rsatish yoki yashirish
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    // Tugma bosilganda yuqoriga aylantirish
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Qorong'i rejim tugmasini sozlash
function initDarkModeToggle() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const icon = darkModeToggle.querySelector('i');
    
    // Tugma bosilganda qorong'i rejimni yoqish/o'chirish
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Iconni almashtirish
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            // Foydalanuvchi afzalligini saqlash
            localStorage.setItem('darkMode', 'enabled');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Oldin tanlangan rejimni yuklash
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Ko'nikmalar progress barlarini animatsiya qilish
function initSkillBarsAnimation() {
    const skillSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Progress barlarni animatsiya qilish funksiyasi
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }
    
    // Ko'nikmalar bo'limi ko'rinadigan bo'lganda animatsiyani ishga tushiradigan kuzatuvchi
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
            }
        });
    }, { threshold: 0.5 });
    
    // Kuzatuvchini ishga tushirish
    if (skillSection) {
        observer.observe(skillSection);
    }
}

// Kontakt formasi validatsiyasi va jo'natish
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    // Forma jo'natilganda tekshirish
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Forma maydonlarini olish
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Maydonlarni tekshirish
            if (name && email && message) {
                // Bu yerda odatda serverga so'rov yuboriladi
                alert('Xabaringiz qabul qilindi! Tez orada siz bilan bog\'lanamiz.');
                contactForm.reset();
            } else {
                alert('Iltimos, barcha maydonlarni to\'ldiring.');
            }
        });
    }
}

// Canvas animatsiyasi funksiyasi
function animatedCanvas(canvasId, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    let ctx, width, height;
    const POINTS = options.points || 30;
    const DIST = options.dist || 100;
    const points = [];
    let mouse = { x: -1000, y: -1000, down: false };

    function resize() {
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        canvas.width = width;
        canvas.height = height;
    }

    function randomPoint() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
        };
    }

    function initPoints() {
        points.length = 0;
        for (let i = 0; i < POINTS; i++) {
            points.push(randomPoint());
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        // Draw lines
        for (let i = 0; i < POINTS; i++) {
            for (let j = i + 1; j < POINTS; j++) {
                const p1 = points[i], p2 = points[j];
                const dx = p1.x - p2.x, dy = p1.y - p2.y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < DIST) {
                    ctx.strokeStyle = `rgba(52,152,219,${1 - d / DIST})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }

        // Draw lines to mouse
        points.forEach(p => {
            const dx = p.x - mouse.x, dy = p.y - mouse.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < DIST) {
                ctx.strokeStyle = `rgba(231,76,60,${1 - d / DIST})`;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        });

        // Draw points
        points.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.shadowColor = '#3498db';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        // Draw mouse point
        if (mouse.x >= 0 && mouse.y >= 0) {
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 7, 0, Math.PI * 2);
            ctx.fillStyle = mouse.down ? '#e74c3c' : '#3498db';
            ctx.fill();
        }
    }

    function update() {
        points.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
        });
    }

    function animate() {
        update();
        draw();
        requestAnimationFrame(animate);
    }

    function mouseMove(e) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    }

    function mouseDown(e) {
        mouse.down = true;
    }

    function mouseUp(e) {
        mouse.down = false;
    }

    window.addEventListener('resize', () => {
        resize();
        initPoints();
    });

    canvas.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('mousedown', mouseDown);
    canvas.addEventListener('mouseup', mouseUp);
    canvas.addEventListener('mouseleave', () => {
        mouse.x = -1000;
        mouse.y = -1000;
        mouse.down = false;
    });

    canvas.style.pointerEvents = 'auto';

    canvas.addEventListener('mousedown', function(e) {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        points.forEach(p => {
            const dx = p.x - mx, dy = p.y - my;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < DIST / 2) {
                p.x += (mx - p.x) * 0.3;
                p.y += (my - p.y) * 0.3;
            }
        });
    });

    ctx = canvas.getContext('2d');
    resize();
    initPoints();
    animate();
}
