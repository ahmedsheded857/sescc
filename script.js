// انتظار تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // إعداد القائمة المنسدلة
    setupMobileMenu();
    // إعداد التمرير السلس
    setupSmoothScrolling();
    // إعداد النموذج
    setupContactForm();
    // إعداد فلتر المشاريع
    setupProjectFilter();
    // إعداد انيميشن التمرير السلس والمتدرج (staggered)
    setupScrollAnimations();
});

// إعداد القائمة المنسدلة
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        // إغلاق القائمة عند النقر على رابط
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
}

// إعداد التمرير السلس
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1 && document.querySelector(targetId)) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                let header = document.querySelector('header');
                let headerHeight = 0;
                if (header && window.getComputedStyle(header).display !== 'none') {
                    headerHeight = header.offsetHeight;
                }
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// إعداد فلتر المشاريع
function setupProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة الفئة النشطة للزر المحدد
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            // تصفية المشاريع
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.classList.add('visible');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('visible');
                }
            });
        });
    });
}

// إعداد انيميشن التمرير السلس والمتدرج (staggered)
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate__fadeInCustom, .animate__slideInRight, .animate__slideInLeft, .animate__zoomIn');
    const observerOptions = {
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                // إضافة تأخير متدرج حسب ترتيب العنصر
                const delay = entry.target.dataset.stagger || (idx * 40);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                obs.unobserve(entry.target); // لا تراقب العنصر مرة أخرى
            }
        });
    }, observerOptions);
    animatedElements.forEach((el, i) => {
        // دعم التأخير اليدوي عبر data-stagger أو تلقائي حسب الترتيب
        if (!el.dataset.stagger) {
            el.dataset.stagger = i * 40;
        }
        observer.observe(el);
    });
}

// إعداد النموذج
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // جمع بيانات النموذج
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            // بناء نص الرسالة
            const whatsappMessage =
                `👤 الاسم: ${name}\n` +
                `📧 البريد الإلكتروني: ${email}\n` +
                `📱 رقم الهاتف: ${phone}\n` +
                `📝 الموضوع: ${subject}\n` +
                `💬 الرسالة: ${message}`;
            // رقم الواتساب
            const phoneNumber = '966531443917'; // بدون +
            // فتح واتساب مع الرسالة
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(url, '_blank');
        });
    }
}

// التحقق من صحة النموذج
function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.name || data.name.trim().length < 2) {
        alert('يرجى إدخال اسم صحيح');
        return false;
    }
    if (!emailRegex.test(data.email)) {
        alert('يرجى إدخال بريد إلكتروني صحيح');
        return false;
    }
    if (!data.phone || data.phone.trim().length < 10) {
        alert('يرجى إدخال رقم هاتف صحيح');
        return false;
    }
    if (!data.subject || data.subject.trim().length < 3) {
        alert('يرجى إدخال موضوع الرسالة');
        return false;
    }
    if (!data.message || data.message.trim().length < 10) {
        alert('يرجى إدخال رسالة تحتوي على 10 أحرف على الأقل');
        return false;
    }
    return true;
} 