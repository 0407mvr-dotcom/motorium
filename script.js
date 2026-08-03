// ===== ЧАСТИЦЫ =====
(function createParticles() {
    const container = document.getElementById('particles');
    const count = 50;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDuration = 8 + Math.random() * 12 + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(particle);
    }
})();

// ===== БУРГЕР-МЕНЮ (исправленный) =====
const burgerBtn = document.getElementById('burgerBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileClose = document.getElementById('mobileClose');

function toggleMenu() {
    burgerBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
}

// Открытие по бургеру
burgerBtn.addEventListener('click', toggleMenu);

// Закрытие по крестику
mobileClose.addEventListener('click', toggleMenu);

// Закрытие по оверлею
mobileOverlay.addEventListener('click', toggleMenu);

// Закрытие при клике на ссылку
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileNav.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        toggleMenu();
    }
});

// ===== ПЛАВАЮЩИЕ КАРТОЧКИ =====
document.querySelectorAll('.floating-card').forEach(card => {
    const rotation = card.dataset.rotation || '0';
    card.style.setProperty('--rotation', rotation + 'deg');
    card.classList.add('floating');
    
    card.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
});

// ===== ДОБАВЛЯЕМ БОЛТЫ НА ШИНУ =====
(function addBolts() {
    const tire = document.querySelector('.tire-bg');
    if (!tire) return;
    const positions = [
        { top: '15%', left: '50%' },
        { bottom: '15%', left: '50%' },
        { left: '15%', top: '50%' },
        { right: '15%', top: '50%' },
        { top: '22%', left: '22%' },
        { top: '22%', right: '22%' },
        { bottom: '22%', left: '22%' },
        { bottom: '22%', right: '22%' }
    ];
    positions.forEach(pos => {
        const bolt = document.createElement('div');
        bolt.className = 'bolt';
        Object.keys(pos).forEach(key => {
            bolt.style[key] = pos[key];
        });
        tire.appendChild(bolt);
    });
})();

// ===== СЛАЙДЕР ОТЗЫВОВ (ИСПРАВЛЕННЫЙ) =====
const sliderWrapper = document.getElementById('sliderWrapper');
const cards = sliderWrapper.querySelectorAll('.review-card');
const totalCards = cards.length;
let currentIndex = 0;
let autoSlideInterval;

// Создаём индикаторы точек
const dotsContainer = document.getElementById('sliderDots');
for (let i = 0; i < totalCards; i++) {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.dataset.index = i;
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
}

const dots = dotsContainer.querySelectorAll('.slider-dot');

function goToSlide(index) {
    if (index < 0) index = totalCards - 1;
    if (index >= totalCards) index = 0;
    currentIndex = index;
    
    // Плавный переход
    sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    sliderWrapper.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    // Обновляем точки
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

function nextSlide() {
    goToSlide(currentIndex + 1);
}

function prevSlide() {
    goToSlide(currentIndex - 1);
}

// Кнопки управления
document.getElementById('nextReview').addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    nextSlide();
    startAutoSlide();
});

document.getElementById('prevReview').addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    prevSlide();
    startAutoSlide();
});

// Авто-слайдер
function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000);
}

// Пауза при наведении
const sliderContainer = document.getElementById('reviewsSlider');
sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

sliderContainer.addEventListener('mouseleave', () => {
    startAutoSlide();
});

// Запускаем слайдер
goToSlide(0);
startAutoSlide();

// ===== АДАПТИВ: проверка обрезки текста =====
function checkOverflow() {
    cards.forEach(card => {
        const p = card.querySelector('p');
        if (p) {
            // Убираем ограничение высоты, если оно было
            card.style.height = 'auto';
            p.style.maxHeight = 'none';
        }
    });
}

// Проверяем при загрузке и изменении размера окна
window.addEventListener('load', checkOverflow);
window.addEventListener('resize', checkOverflow);

// ===== ФОРМА В КОНТАКТАХ =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('✅ Спасибо! Мы свяжемся с вами в ближайшее время.');
    this.reset();
});

// ===== ФОРМА В ФУТЕРЕ =====
document.getElementById('footerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('✅ Спасибо! Мы перезвоним вам в течение 5 минут.');
    this.reset();
});