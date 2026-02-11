// 1. التمرير الانسيابي (Scroll Reveal)
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal, .service-card, .stat-item').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// 2. عداد الأرقام (Stats Counter)
const counters = document.querySelectorAll('.counter');
const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace('+', '');
            const speed = 100;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + "+";
            }
        };
        updateCount();
    });
};

// تشغيل العداد مرة واحدة عند الوصول إليه
const statsSection = document.querySelector('.stats');
const statsObserver = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) {
        startCounters();
        statsObserver.unobserve(statsSection);
    }
}, { threshold: 0.5 });
statsObserver.observe(statsSection);

// 3. التحقق من الفورم (Form Validation)
document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    const phone = document.getElementById('userPhone').value;
    const msg = document.getElementById('formMessage');

    if (phone.length < 11) {
        msg.innerHTML = "<p style='color:red; margin-top:10px;'>يرجى إدخال رقم هاتف صحيح</p>";
        return;
    }

    msg.innerHTML = `<p style='color:green; margin-top:10px;'>تم استلام طلبك يا ${name}. سنتواصل معك قريباً!</p>`;
    this.reset();
});
// التمرير الناعم لكل اللينكات
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70, // عشان الـ Navbar الثابتة
                behavior: 'smooth'
            });
        }
    });
});