// تهيئة مكتبة AOS للانيميشن
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// متغيرات عامة
let isMenuOpen = false;
let lastScrollTop = 0;

// انتظار تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// تهيئة التطبيق
function initializeApp() {
    setupNavigation();
    setupSmoothScrolling();
    setupProjectFilter();
    setupContactForm();
    setupScrollEffects();
    setupAnimations();
}

// إعداد التنقل
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    // تبديل القائمة في الجوال
    hamburger.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        navLinks.classList.toggle('active');
        
        // تغيير أيقونة القائمة
        const icon = hamburger.querySelector('i');
        if (isMenuOpen) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    // إغلاق القائمة عند النقر على رابط
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                isMenuOpen = false;
                const icon = hamburger.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            isMenuOpen = false;
            const icon = hamburger.querySelector('i');
            icon.className = 'fas fa-bars';
        }
    });
}

// إعداد التمرير السلس
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('#header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
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
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // إزالة الفئة النشطة من جميع الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // إضافة الفئة النشطة للزر المحدد
            this.classList.add('active');
            
            // تصفية المشاريع
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// إعداد نموذج الاتصال
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع بيانات النموذج
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // التحقق من صحة البيانات
            if (validateForm(formData)) {
                // إرسال البيانات (يمكن إضافة API هنا)
                showSuccessMessage('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
                contactForm.reset();
            }
        });
    }
}

// التحقق من صحة النموذج
function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    
    if (!data.name || data.name.trim().length < 2) {
        showErrorMessage('يرجى إدخال اسم صحيح');
        return false;
    }
    
    if (!emailRegex.test(data.email)) {
        showErrorMessage('يرجى إدخال بريد إلكتروني صحيح');
        return false;
    }
    
    if (!phoneRegex.test(data.phone)) {
        showErrorMessage('يرجى إدخال رقم هاتف صحيح');
        return false;
    }
    
    if (!data.subject || data.subject.trim().length < 3) {
        showErrorMessage('يرجى إدخال موضوع الرسالة');
        return false;
    }
    
    if (!data.message || data.message.trim().length < 10) {
        showErrorMessage('يرجى إدخال رسالة تحتوي على 10 أحرف على الأقل');
        return false;
    }
    
    return true;
}

// عرض رسالة نجاح
function showSuccessMessage(message) {
    showNotification(message, 'success');
}

// عرض رسالة خطأ
function showErrorMessage(message) {
    showNotification(message, 'error');
}

// عرض الإشعارات
function showNotification(message, type) {
    // إزالة الإشعارات السابقة
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // إنشاء إشعار جديد
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // إضافة الأنماط
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // إضافة الأنماط للمحتوى
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    // إضافة أنماط زر الإغلاق
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: auto;
    `;
    
    // إضافة الصفحة
    document.body.appendChild(notification);
    
    // إغلاق الإشعار
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });
    
    // إغلاق تلقائي بعد 5 ثوان
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// إعداد تأثيرات التمرير
function setupScrollEffects() {
    const header = document.querySelector('#header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // تأثير الشريط العلوي
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // تحديث الروابط النشطة
        updateActiveNavLink(scrollTop);
        
        lastScrollTop = scrollTop;
    });
}

// تحديث الرابط النشط
function updateActiveNavLink(scrollTop) {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('#header').offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// إعداد الانيميشن
function setupAnimations() {
    // انيميشن الأرقام
    const statNumbers = document.querySelectorAll('.stat-item .number');
    
    const animateNumbers = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            const increment = target / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '') + (stat.textContent.includes('%') ? '%' : '');
            }, 30);
        });
    };
    
    // تشغيل انيميشن الأرقام عند الوصول للقسم
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    });
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // انيميشن التحميل التدريجي للصور
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        });
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.8)';
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        imageObserver.observe(img);
    });
}

// تحسين الأداء
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// تطبيق debounce على وظائف التمرير
const debouncedScrollHandler = debounce(setupScrollEffects, 10);
window.addEventListener('scroll', debouncedScrollHandler);

// تحسين التحميل
window.addEventListener('load', function() {
    // إخفاء شاشة التحميل إذا كانت موجودة
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }
    
    // تحسين أداء الصور
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// إضافة أنماط CSS للانيميشن
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification-close:hover {
        opacity: 0.7;
    }
`;
document.head.appendChild(style);

// تحسين تجربة المستخدم على الأجهزة المحمولة
if ('ontouchstart' in window) {
    // تحسين التفاعل باللمس
    document.addEventListener('touchstart', function() {}, {passive: true});
    
    // منع التكبير المزدوج
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// تحسين الأداء للشاشات الكبيرة
if (window.innerWidth > 1200) {
    // تحسين الانيميشن للشاشات الكبيرة
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 50
    });
}

// إضافة دعم للوضع المظلم (اختياري)
function setupDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #667eea;
        color: white;
        border: none;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
    `;
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
    
    // إضافة أنماط الوضع المظلم
    const darkModeStyles = document.createElement('style');
    darkModeStyles.textContent = `
        .dark-mode {
            background: #1a1a1a !important;
            color: #ffffff !important;
        }
        
        .dark-mode #header {
            background: rgba(26, 26, 26, 0.95) !important;
        }
        
        .dark-mode .nav-link {
            color: #ffffff !important;
        }
        
        .dark-mode .section-title {
            color: #ffffff !important;
        }
        
        .dark-mode .feature,
        .dark-mode .service-card,
        .dark-mode .project-item {
            background: #2d2d2d !important;
            color: #ffffff !important;
        }
    `;
    document.head.appendChild(darkModeStyles);
    
    // إضافة زر الوضع المظلم (اختياري)
    // document.body.appendChild(darkModeToggle);
}

// تهيئة الوضع المظلم (يمكن تفعيله لاحقاً)
// setupDarkMode(); 