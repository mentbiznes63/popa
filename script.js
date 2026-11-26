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
  whatsapp: "https://wa.me/79615225341",
  telegram: "fifengmwt", // Твой аккаунт
  workHours: "Ежедневно 09:00–19:00",
  rating: "4,6",
  reviewsCount: 278,
  
  heroImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80",
  
  services: [
    { name: "Стрижка женская", price: "от 800 ₽", description: "Модельная стрижка с мытьём и укладкой" },
    { name: "Стрижка мужская", price: "от 500 ₽", description: "Классическая или современная стрижка" },
    { name: "Стрижка детская", price: "от 450 ₽", description: "Бережно и с заботой о маленьких гостях" },
    { name: "Окрашивание волос", price: "от 1500 ₽", description: "В один тон или сложные техники" }
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
    { text: "Отличный салон, вежливые мастера.", author: "Гость Google" },
    { text: "Спасибо за профессионализм!", author: "Гость Google" },
    { text: "Приятная атмосфера, профессиональные мастера.", author: "Гость Google" }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  try { applyConfig(); } catch(e) { console.log(e); }
  try { renderServices(); } catch(e) { console.log(e); }
  try { renderMasters(); } catch(e) { console.log(e); }
  try { renderBookingForm(); } catch(e) { console.log(e); } // Форма
  try { renderAdvantages(); } catch(e) { console.log(e); }
  try { renderReviews(); } catch(e) { console.log(e); }
  try { setupMobileMenu(); } catch(e) { console.log(e); }
  try { setupScrollAnimations(); } catch(e) { console.log(e); }
  try { setupPWA(); } catch(e) { console.log(e); }
  
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Умный поиск блока: находит заголовок и создает под ним контейнер
function getOrCreateContainer(titleText, tag = 'div', className = 'dynamic-container') {
  const headings = Array.from(document.querySelectorAll('h2, h3'));
  // Ищем заголовок по тексту
  const targetHeading = headings.find(h => h.textContent.trim().toLowerCase().includes(titleText.toLowerCase()));
  if (!targetHeading) return null;

  let container = targetHeading.nextElementSibling;
  // Если контейнера нет, создаем его
  if (!container || !container.classList.contains(className)) {
    container = document.createElement(tag);
    container.className = className;
    targetHeading.parentNode.insertBefore(container, targetHeading.nextSibling);
  }
  return container;
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

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

function renderServices() {
  const grid = getOrCreateContainer("Услуги и цены", "div", "services-grid");
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
  const grid = getOrCreateContainer("Наши мастера", "div", "masters-grid");
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

function renderBookingForm() {
  const container = getOrCreateContainer("Запись онлайн", "div", "booking-wrapper");
  if (!container) return;

  const servicesOptions = CONFIG.services.map(s => `<option value="${s.name}">${s.name} (${s.price})</option>`).join("");
  const mastersOptions = CONFIG.masters.map(m => `<option value="${m.name}">${m.name}</option>`).join("");

  container.innerHTML = `
    <form id="booking-form" class="booking-form" style="max-width:500px; margin:0 auto; background:#fff; padding:30px; border-radius:16px; box-shadow:0 4px 20px rgba(0,0,0,0.06); display:flex; flex-direction:column; gap:16px;">
      <div style="display:flex; flex-direction:column; gap:6px;">
        <label style="font-size:0.9rem; font-weight:600; color:#6B6560;">Ваше имя</label>
        <input type="text" id="book-name" required placeholder="Как к вам обращаться?" style="width:100%; padding:12px 16px; border:1px solid #EDE6DC; border-radius:12px; font-family:inherit; font-size:1rem; background:#FAF7F2; color:#2B2B2B; outline:none;">
      </div>
      <div style="display:flex; flex-direction:column; gap:6px;">
        <label style="font-size:0.9rem; font-weight:600; color:#6B6560;">Услуга</label>
        <select id="book-service" required style="width:100%; padding:12px 16px; border:1px solid #EDE6DC; border-radius:12px; font-family:inherit; font-size:1rem; background:#FAF7F2; color:#2B2B2B; outline:none;">
          <option value="">-- Выберите услугу --</option>
          ${servicesOptions}
        </select>
      </div>
      <div style="display:flex; flex-direction:column; gap:6px;">
        <label style="font-size:0.9rem; font-weight:600; color:#6B6560;">Мастер</label>
        <select id="book-master" required style="width:100%; padding:12px 16px; border:1px solid #EDE6DC; border-radius:12px; font-family:inherit; font-size:1rem; background:#FAF7F2; color:#2B2B2B; outline:none;">
          <option value="">-- Выберите мастера --</option>
          ${mastersOptions}
        </select>
      </div>
      <div style="display:flex; gap:12px;">
        <div style="display:flex; flex-direction:column; gap:6px; flex:1;">
          <label style="font-size:0.9rem; font-weight:600; color:#6B6560;">Дата</label>
          <input type="date" id="book-date" required style="width:100%; padding:12px 16px; border:1px solid #EDE6DC; border-radius:12px; font-family:inherit; font-size:1rem; background:#FAF7F2; color:#2B2B2B; outline:none;">
        </div>
        <div style="display:flex; flex-direction:column; gap:6px; flex:1;">
          <label style="font-size:0.9rem; font-weight:600; color:#6B6560;">Время</label>
          <input type="time" id="book-time" required style="width:100%; padding:12px 16px; border:1px solid #EDE6DC; border-radius:12px; font-family:inherit; font-size:1rem; background:#FAF7F2; color:#2B2B2B; outline:none;">
        </div>
      </div>
      <button type="submit" class="btn btn--primary btn--full" style="margin-top: 10px;">Отправить в Telegram</button>
    </form>
  `;

  const form = document.getElementById("booking-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("book-name").value;
      const service = document.getElementById("book-service").value;
      const master = document.getElementById("book-master").value;
      const date = document.getElementById("book-date").value;
      const time = document.getElementById("book-time").value;

      const text = `Здравствуйте! Хочу записаться.%0A%0A👤 *Имя:* ${name}%0A✂️ *Услуга:* ${service}%0A💇‍♀️ *Мастер:* ${master}%0A📅 *Дата:* ${date}%0A⏰ *Время:* ${time}`;
      const tgUser = CONFIG.telegram.replace("https://t.me/", "").replace("@", "");
      const url = `https://t.me/${tgUser}?text=${text}`;
      
      window.open(url, "_blank");
    });
  }
}

function renderAdvantages() {
  const grid = getOrCreateContainer("Почему нас выбирают", "div", "advantages-grid");
  if (!grid) return;
  grid.innerHTML = CONFIG.advantages.map(a => `
    <div class="advantage-item">
      <div class="advantage-item__icon">${a.icon}</div>
      <div class="advantage-item__text">${escapeHtml(a.text)}</div>
    </div>
  `).join('');
}

function renderReviews() {
  const grid = getOrCreateContainer("Отзывы гостей", "div", "reviews-grid");
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
