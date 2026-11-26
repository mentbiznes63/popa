/* ============================================
   Ейчанка — Landing Page Script
   ============================================ */

const CONFIG = {
  siteName: "Ейчанка",
  siteSubtitle: "на Красной",
  city: "Ейск",
  address: "г. Ейск, ул. Красная, 55",
  phone: "+7 (961) 522-53-41",
  phoneTel: "+79615225341",
  whatsapp: "",
  telegram: "fifengmwt", // <--- ВАЖНО: твой никнейм БЕЗ https://t.me/
  workHours: "Ежедневно 09:00–19:00",
  rating: "4,6",
  reviewsCount: 278,
  
  heroImage: "vladka.jpg",
  
  services: [
    { name: "Стрижка женская", price: "от 800 ₽", description: "Модельная стрижка с мытьём и укладкой" },
    { name: "Стрижка мужская", price: "от 500 ₽", description: "Классическая или современная стрижка" },
    { name: "Стрижка детская", price: "от 450 ₽", description: "Бережно и с заботой о маленьких гостях" },
    { name: "Окрашивание волос", price: "от 1500 ₽", description: "В один тон или сложные техники" },
    { name: "Мелирование", price: "от 2000 ₽", description: "Классическое и креативное мелирование" },
    { name: "Укладка / завивка", price: "от 600 ₽", description: "Праздничная укладка или повседневная" }
  ],

  // МАСТЕРА (можешь менять имена, возраст, стаж и названия фото)
  masters: [
    { name: "Саша Пэтрик", age: 18, experience: "умеет стрич нохти", photo: "sashapetros.jpg" },
    { name: "Добрынза", age: 6, experience: "не умеет стрич нохти", photo: "dobrinza.jpg" },
    { name: "Владька шеф", age: 18, experience: "чуть чуть умеет стрич нохти", photo: "vladka.jpg" }
  ],
  
  advantages: [
    { icon: "👩‍🎨", text: "Опытные мастера — знатоки своего дела" },
    { icon: "🎨", text: "Всегда в наличии нужная краска для обновления цвета" },
    { icon: "☕", text: "Уютная атмосфера и чай или кофе для гостей" },
    { icon: "📍", text: "Удобное расположение на ул. Красной" },
    { icon: "🕒", text: "Работаем без выходных 09:00–19:00" }
  ],
  
  reviews: [
    { text: "Не плохой салон, вежливые мастера, предлагают чай или кофе. Приятно возвращаться.", author: "Гость Google" },
    { text: "Спасибо за профессионализм, приятный, вежливый коллектив. Приятно от посещения.", author: "Гость Google" },
    { text: "Впервые побывала в салоне Ейчанка. Приятная атмосфера, вежливые сотрудники, профессиональные мастера.", author: "Гость Google" }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  renderServices();
  renderMasters();
  renderBookingForm(); // <-- Добавили рендер формы
  renderAdvantages();
  renderReviews();
  setupMobileMenu();
  setupScrollAnimations();
  setupPWA();
  document.getElementById('year').textContent = new Date().getFullYear();
});

function applyConfig() {
  setText('logo-name', CONFIG.siteName);
  setText('logo-sub', CONFIG.siteSubtitle);
  setText('header-hours', CONFIG.workHours);
  
  const phoneEl = document.getElementById('header-phone');
  if (phoneEl) { phoneEl.textContent = CONFIG.phone; phoneEl.href = `tel:${CONFIG.phoneTel}`; }
  document.querySelectorAll('[id^="btn-call"]').forEach(btn => { btn.href = `tel:${CONFIG.phoneTel}`; });
  
  setText('hero-title', `Парикмахерская «${CONFIG.siteName}» — ваш салон красоты в ${CONFIG.city}`);
  setText('hero-subtitle', `Профессиональные мастера, уютная атмосфера и чашка кофе. Рейтинг ${CONFIG.rating} ★ по ${CONFIG.reviewsCount} отзывам`);
  setText('rating-text', `${CONFIG.rating} ★ · ${CONFIG.reviewsCount} отзывов`);
  
  const heroBg = document.getElementById('hero-bg');
  if (heroBg && CONFIG.heroImage) {
    heroBg.style.backgroundImage = `linear-gradient(135deg, rgba(250, 247, 242, 0.92) 0%, rgba(250, 247, 242, 0.75) 50%, rgba(250, 247, 242, 0.55) 100%), url('${CONFIG.heroImage}')`;
  }
  
  setText('contact-address', CONFIG.address);
  setText('contact-hours', CONFIG.workHours);
  const contactPhone = document.getElementById('contact-phone');
  if (contactPhone) { contactPhone.textContent = CONFIG.phone; contactPhone.href = `tel:${CONFIG.phoneTel}`; }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

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

function renderMasters() {
  const grid = document.getElementById('masters-grid');
  if (!grid) return;
  const defaultPhoto = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23E8D5C0'/%3E%3Ctext x='50' y='55' font-size='40' text-anchor='middle' fill='%23FFFFFF' font-family='Arial'%3E👤%3C/text%3E%3C/svg%3E";
  grid.innerHTML = CONFIG.masters.map(m => `
    <article class="master-card">
      <img src="${m.photo || defaultPhoto}" alt="${escapeHtml(m.name)}" class="master-card__img">
      <div class="master-card__info">
        <h3 class="master-card__name">${escapeHtml(m.name)}</h3>
        <p class="master-card__details">${m.age} лет · Стаж: ${escapeHtml(m.experience)}</p>
      </div>
    </article>
  `).join('');
}

// НОВОЕ: Форма записи
function renderBookingForm() {
  const container = document.getElementById('booking-form-container');
  if (!container) return;

  const servicesOptions = CONFIG.services.map(s => `<option value="${s.name}">${s.name} (${s.price})</option>`).join("");
  const mastersOptions = CONFIG.masters.map(m => `<option value="${m.name}">${m.name}</option>`).join("");

  container.innerHTML = `
    <form id="booking-form" class="booking-form">
      <div class="form-group">
        <label>Ваше имя</label>
        <input type="text" id="book-name" required placeholder="Как к вам обращаться?">
      </div>
      <div class="form-group">
        <label>Услуга</label>
        <select id="book-service" required>
          <option value="">-- Выберите услугу --</option>
          ${servicesOptions}
        </select>
      </div>
      <div class="form-group">
        <label>Мастер</label>
        <select id="book-master" required>
          <option value="">-- Выберите мастера --</option>
          ${mastersOptions}
        </select>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Дата</label>
          <input type="date" id="book-date" required>
        </div>
        <div class="form-group">
          <label>Время</label>
          <input type="time" id="book-time" required>
        </div>
      </div>
      <button type="submit" class="btn btn--primary btn--full" style="margin-top: 10px;">Отправить в Telegram</button>
    </form>
  `;

  const form = document.getElementById("booking-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("book-name").value;
    const service = document.getElementById("book-service").value;
    const master = document.getElementById("book-master").value;
    const date = document.getElementById("book-date").value;
    const time = document.getElementById("book-time").value;

    // Формируем текст сообщения
    const text = `Здравствуйте! Хочу записаться.%0A%0A👤 *Имя:* ${name}%0A✂️ *Услуга:* ${service}%0A💇‍♀️ *Мастер:* ${master}%0A📅 *Дата:* ${date}%0A⏰ *Время:* ${time}`;
    
    // Формируем ссылку (убираем лишние символы, если они есть)
    const tgUser = CONFIG.telegram.replace("https://t.me/", "").replace("@", "");
    const url = `https://t.me/${tgUser}?text=${text}`;
    
    window.open(url, "_blank");
  });
}

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

function setupMobileMenu() {
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobile-menu');
  if (!burger || !menu) return;
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      menu.classList.remove('open');
    });
  });
}

function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  
  document.querySelectorAll('.service-card, .advantage-item, .review-card, .master-card').forEach(el => {
    observer.observe(el);
  });
}

function setupPWA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW error:', err));
  }
  let deferredPrompt = null;
  const installBtn = document.getElementById('btn-install');
  const instructions = document.getElementById('pwa-instructions');
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) installBtn.style.display = 'inline-flex';
  });
  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;
        installBtn.style.display = 'none';
      } else {
        if (instructions) instructions.style.display = 'block';
      }
    });
  }
}
