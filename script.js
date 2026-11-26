/* ============================================
   Ейчанка — Landing Page Script
   ВСЁ РЕДАКТИРУЕТСЯ ЗДЕСЬ ↓
   ============================================ */

const CONFIG = {
  // ——— Основные данные ———
  siteName: "Ейчанка",
  siteSubtitle: "на Красной",
  city: "Ейск",
  address: "г. Ейск, ул. Красная, 55",
  phone: "+7 (961) 522-53-41",
  phoneTel: "+79615225341",          // для ссылок tel: без пробелов и скобок
  whatsapp: "",  // можно заменить на реальный номер
  telegram: "https://t.me/fifengmwt",
  yclients: "https://n320905.yclients.com", // онлайн-запись
  workHours: "Ежедневно 09:00–19:00",
  rating: "4,6",
  reviewsCount: 278,
  
  // Google Maps
  // Ссылка «Построить маршрут»
  googleMapsLink: "https://www.google.com/maps/dir/?api=1&destination=Ейск,+ул.+Красная,+55&travelmode=driving",
  // Embed-карта (можно заменить на точный embed из Google Maps → Поделиться → Встроить карту)
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2828.8!2d38.2865!3d46.6773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40e44b0b0b0b0b0b%3A0x0!2z0K_Rg9C70LjRhtCw0Y8g0YPQu9C40YbQsCwgNTUsINCV0LnRgdC6!5e0!3m2!1sru!2sru!4v1700000000000!5m2!1sru!2sru",
  
  // Фоновая картинка Hero (можно заменить на своё фото салона)
  heroImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80",
  
  // ——— Услуги (цены — примерные, замените на актуальные) ———
  services: [
    {
      name: "Стрижка женская",
      price: "от 800 ₽",
      description: "Модельная стрижка с мытьём и укладкой"
    },
    {
      name: "Стрижка мужская",
      price: "от 500 ₽",
      description: "Классическая или современная стрижка"
    },
    {
      name: "Стрижка детская",
      price: "от 450 ₽",
      description: "Бережно и с заботой о маленьких гостях"
    },
    {
      name: "Окрашивание волос",
      price: "от 1500 ₽",
      description: "В один тон или сложные техники"
    },
    {
      name: "Мелирование",
      price: "от 2000 ₽",
      description: "Классическое и креативное мелирование"
    },
    {
      name: "Укладка / завивка",
      price: "от 600 ₽",
      description: "Праздничная укладка или повседневная"
    },
    {
      name: "Уход за волосами",
      price: "от 700 ₽",
      description: "Восстанавливающие и увлажняющие процедуры"
    }
  ],
  
  // ——— Преимущества ———
  advantages: [
    { icon: "👩‍🎨", text: "Опытные мастера — знатоки своего дела (особенно хвалят Олесю и Алёну)" },
    { icon: "🎨", text: "Всегда в наличии нужная краска для обновления цвета" },
    { icon: "☕", text: "Уютная атмосфера и чай или кофе для гостей" },
    { icon: "📍", text: "Удобное расположение на ул. Красной" },
    { icon: "🕒", text: "Работаем без выходных 09:00–19:00" }
  ],
  
  // ——— Отзывы ———
  reviews: [
    {
      text: "Не плохой салон, вежливые мастера, предлагают чай или кофе. Приятно возвращаться.",
      author: "Гость Google"
    },
    {
      text: "Спасибо за профессионализм, приятный, вежливый коллектив. Приятно от посещения.",
      author: "Гость Google"
    },
    {
      text: "Впервые побывала в салоне Ейчанка. Приятная атмосфера, вежливые сотрудники, профессиональные мастера.",
      author: "Гость Google"
    }
  ],
  
  // ——— Цвета (синхронизируются с CSS-переменными) ———
  colors: {
    accent: "#C9A27E",
    bg: "#FAF7F2",
    text: "#2B2B2B"
  }
    // МАСТЕРА (ЗАПОЛНИ СВОИМИ ДАННЫМИ)
  // Фото кидай на GitHub в корень сайта (например, master1.jpg) и пиши сюда имя файла
  masters: [
    { name: "Саша Пэтрик", age: 18, experience: "умеет стрич нохти", photo: "sashapetros.jpg" },
    { name: "Добрынза", age: 123, experience: "бреет мужыкам ноги", photo: "dobrinza.jpg" },
    { name: "Владька шэф", age: 18, experience: "бреет залупу", photo: "vladka.jpg" } // Если фото нет, покажется заглушка
  ],

  advantages: [
    "Опытные мастера — знатоки своего дела",
    "Всегда в наличии нужная краска",
    "Уютная атмосфера и чай/кофе для гостей",
    "Работаем без выходных"
  ],

  reviews: [
    { text: "Отличный салон, вежливые мастера, предлагают чай или кофе.", author: "Гость Google" },
    { text: "Спасибо за профессионализм, приятный, вежливый коллектив!", author: "Гость Google" },
    { text: "Приятная атмосфера, профессиональные мастера.", author: "Гость Google" }
  ]
};
};

/* ============================================
   Дальше — логика сайта (обычно менять не нужно)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  renderServices();
  renderAdvantages();
  renderReviews();
  setupMobileMenu();
  setupScrollAnimations();
  setupPWA();
  document.getElementById('year').textContent = new Date().getFullYear();
});

/** Применяет все данные из CONFIG к элементам страницы */
function applyConfig() {
  // Логотип
  setText('logo-name', CONFIG.siteName);
  setText('logo-sub', CONFIG.siteSubtitle);
  
  // Шапка
  setText('header-hours', CONFIG.workHours);
  const phoneEl = document.getElementById('header-phone');
  if (phoneEl) {
    phoneEl.textContent = CONFIG.phone;
    phoneEl.href = `tel:${CONFIG.phoneTel}`;
  }
  
  // Кнопки «Позвонить»
  document.querySelectorAll('[id^="btn-call"]').forEach(btn => {
    btn.href = `tel:${CONFIG.phoneTel}`;
  });
  
  // Hero
  setText('hero-title', `Парикмахерская «${CONFIG.siteName}» — ваш салон красоты в ${CONFIG.city}`);
  setText('hero-subtitle', `Профессиональные мастера, уютная атмосфера и чашка кофе. Рейтинг ${CONFIG.rating} ★ по ${CONFIG.reviewsCount} отзывам`);
  setText('rating-text', `${CONFIG.rating} ★ · ${CONFIG.reviewsCount} отзывов`);
  
  // Hero background
  const heroBg = document.getElementById('hero-bg');
  if (heroBg && CONFIG.heroImage) {
    heroBg.style.backgroundImage = `
      linear-gradient(135deg, rgba(250, 247, 242, 0.92) 0%, rgba(250, 247, 242, 0.75) 50%, rgba(250, 247, 242, 0.55) 100%),
      url('${CONFIG.heroImage}')`;
  }
  
  // Контакты
  setText('contact-address', CONFIG.address);
  setText('contact-hours', CONFIG.workHours);
  
  const contactPhone = document.getElementById('contact-phone');
  if (contactPhone) {
    contactPhone.textContent = CONFIG.phone;
    contactPhone.href = `tel:${CONFIG.phoneTel}`;
  }
  
  // Мессенджеры и онлайн-запись
  const wa = document.getElementById('btn-whatsapp');
  if (wa) wa.href = CONFIG.whatsapp;
  
  const tg = document.getElementById('btn-telegram');
  if (tg) tg.href = CONFIG.telegram;
  
  const yc = document.getElementById('btn-yclients');
  if (yc) yc.href = CONFIG.yclients;
  
  // Маршрут
  const route = document.getElementById('btn-route');
  if (route) route.href = CONFIG.googleMapsLink;
  
  // Карта
  const map = document.getElementById('map-iframe');
  if (map && CONFIG.googleMapsEmbed) {
    map.src = CONFIG.googleMapsEmbed;
  }
  
  // Цвета (если нужно переопределить)
  if (CONFIG.colors) {
    document.documentElement.style.setProperty('--accent', CONFIG.colors.accent);
    document.documentElement.style.setProperty('--bg', CONFIG.colors.bg);
    document.documentElement.style.setProperty('--text', CONFIG.colors.text);
  }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

/** Рендер карточек услуг */
function renderServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;
  
  grid.innerHTML = CONFIG.services.map(s => `
    <article class="service-card">
      <h3 class="service-card__name">${escapeHtml(s.name)}</h3>
      <div class="service-card__price">${escapeHtml(s.price)}</div>
      <p class="service-card__desc">${escapeHtml(s.description)}</p>
    </article>
  `).join('');
}

/** Рендер преимуществ */
function renderAdvantages() {
  const grid = document.getElementById('advantages-grid');
  if (!grid) return;
  
  grid.innerHTML = CONFIG.advantages.map(a => `
    <div class="advantage-item">
      <div class="advantage-item__icon">${a.icon}</div>
      <div class="advantage-item__text">${escapeHtml(a.text)}</div>
    </div>
  `).join('');
}

/** Рендер отзывов */
function renderReviews() {
  const grid = document.getElementById('reviews-grid');
  if (!grid) return;
  
  grid.innerHTML = CONFIG.reviews.map(r => `
    <article class="review-card">
      <div class="review-card__stars">★★★★★</div>
      <p class="review-card__text">«${escapeHtml(r.text)}»</p>
      <div class="review-card__author">— ${escapeHtml(r.author)}</div>
    </article>
  `).join('');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/** Мобильное меню */
function setupMobileMenu() {
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobile-menu');
  if (!burger || !menu) return;
  
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('open');
  });
  
  // Закрытие при клике на ссылку
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      menu.classList.remove('open');
    });
  });
}

/** Плавное появление блоков при скролле */
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });
  
  document.querySelectorAll('.service-card, .advantage-item, .review-card').forEach(el => {
    observer.observe(el);
  });
}

/** PWA: установка + Service Worker */
function setupPWA() {
  // Регистрация Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('SW registered'))
      .catch(err => console.log('SW registration failed:', err));
  }
  
  // Кнопка «Добавить на главный экран»
  let deferredPrompt = null;
  const installBtn = document.getElementById('btn-install');
  const instructions = document.getElementById('pwa-instructions');
  
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) {
      installBtn.style.display = 'inline-flex';
    }
  });
  
  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log('Install outcome:', outcome);
        deferredPrompt = null;
        installBtn.style.display = 'none';
      } else {
        // Показываем инструкцию для iOS / ручной установки
        if (instructions) {
          instructions.style.display = 'block';
        }
        alert('На iPhone: нажмите «Поделиться» → «На экран „Домой“».\nНа Android: меню браузера → «Установить приложение».');
      }
    });
  }
  
  // Скрываем кнопку, если уже установлено
  window.addEventListener('appinstalled', () => {
    if (installBtn) installBtn.style.display = 'none';
  });
}
