// انتظار تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // إعداد القائمة المنسدلة
    setupMobileMenu();
    
    // إعداد التمرير السلس
    setupSmoothScrolling();
    
    // إعداد النموذج
    setupContactForm();
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
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// إعداد النموذج
function setupContactForm() {
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع بيانات النموذج
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // التحقق من البيانات
            if (validateForm(data)) {
                // إرسال البيانات (يمكن إضافة API هنا)
                alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
                form.reset();
            }
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