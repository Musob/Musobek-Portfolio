// DOM yuklangandan so'ng barcha funksiyalarni ishga tushiramiz
document.addEventListener('DOMContentLoaded', function() {
    initNavbarScroll();
    initBackToTop();
    initDarkModeToggle();
    initSkillBarsAnimation();
    initBookModal();
    initMoreQuotes();
    initContactForm();
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

// Kitob modali funksiyalarini sozlash
function initBookModal() {
    const bookModal = document.getElementById('bookModal');
    
    // Modal ochilganda ma'lumotlarni to'ldirish
    if (bookModal) {
        bookModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const title = button.getAttribute('data-title');
            const imgSrc = button.getAttribute('data-img');
            const description = button.getAttribute('data-desc');
            
            document.getElementById('bookModalTitle').textContent = title;
            document.getElementById('bookModalImg').src = imgSrc;
            document.getElementById('bookModalDesc').textContent = description;
        });
    }
}

// Ko'proq aforizmlarni ko'rsatish funksiyasi
function initMoreQuotes() {
    const moreQuotesBtn = document.getElementById('moreQuotesBtn');
    
    // Tugma bosilganda qo'shimcha aforizmlarni ko'rsatish/yashirish
    if (moreQuotesBtn) {
        moreQuotesBtn.addEventListener('click', function() {
            const moreQuotes = document.getElementById('moreQuotes');
            
            if (moreQuotes.style.display === 'none') {
                moreQuotes.style.display = 'flex';
                moreQuotesBtn.textContent = 'Kamroq ko\'rsatish';
            } else {
                moreQuotes.style.display = 'none';
                moreQuotesBtn.textContent = 'Ko\'proq falsafiy fikrlar';
            }
        });
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