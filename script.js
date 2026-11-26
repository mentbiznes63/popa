/* ============================================================
   ПАРИКМАХЕРСКАЯ «ЕЙЧАНКА» — script.js
   ============================================================ */

const CONFIG = {
  siteName: "Ейчанка",
  siteSubtitle: "на Красной",
  city: "Ейск",
  address: "г. Ейск, ул. Красная, 55",
  phone: "+7 (995) 228-87-57",
  phoneRaw: "+79952288757",
  whatsapp: "", 
  telegram: "https://t.me/fifengmwt", // Твой ТГ для заявок
  workHours: "Ежедневно 09:00–19:00",
  rating: "4,6",
  reviewsCount: 278,
  
  // ФОТО НА ГЛАВНОМ ЭКРАНЕ
  heroImage: "hero.jpg", 

  // СПИСОК УСЛУГ
  services: [
    { name: "Стрижка женская",   price: "от 666 ₽", description: "Модельная стрижка с укладкой" },
    { name: "Стрижка мужская",   price: "от 777 ₽", description: "Классическая или современная" },
    { name: "Стрижка детская",   price: "от 228 ₽", description: "Аккуратно и без слёз" },
    { name: "Окрашивание волос", price: "от 105 ₽", description: "Однотонное, сложное, тонирование" }
  ],

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

/* ============================================================
   ЛОГИКА (НЕ МЕНЯЙ БЕЗ НЕОБХОДИМОСТИ)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  try { renderHeader(); } catch(e) { console.log(e); }
  try { renderHero(); } catch(e) { console.log(e); }
  try { renderServices(); } catch(e) { console.log(e); }
  try { renderMasters(); } catch(e) { console.log(e); }
  try { renderBookingForm(); } catch(e) { console.log(e); }
  try { renderAdvantages(); } catch(e) { console.log(e); }
  try { renderReviews(); } catch(e) { console.log(e); }
  try { renderContacts(); } catch(e) { console.log(e); }
  try { initPWA(); } catch(e) { console.log(e); }
  try { registerServiceWorker(); } catch(e) { console.log(e); }
});

function $(sel) { return document.querySelector(sel); }
function setText(sel, text) { const el = $(sel); if (el) el.textContent = text; }

function getOrCreateContainer(titleText, tag = 'div', className = 'dynamic-container') {
  const headings = Array.from(document.querySelectorAll('h2, h3'));
  const targetHeading = headings.find(h => h.textContent.trim().toLowerCase().includes(titleText.toLowerCase()));
  if (!targetHeading) return null;

  let container = targetHeading.nextElementSibling;
  if (!container || !container.classList.contains(className)) {
    container = document.createElement(tag);
    container.className = className;
    targetHeading.parentNode.insertBefore(container, targetHeading.nextSibling);
  }
  return container;
}

function renderHeader() {
  setText("#site-name", CONFIG.siteName);
  setText("#site-subtitle", CONFIG.siteSubtitle);
  setText("#work-hours", CONFIG.workHours);
  const phoneLink = $("#header-phone");
  if (phoneLink) { phoneLink.textContent = CONFIG.phone; phoneLink.href = "tel:" + CONFIG.phoneRaw; }
}

function renderHero() {
  const hero = $("#hero");
  if (hero && CONFIG.heroImage) {
    hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.55)), url("${CONFIG.heroImage}")`;
    hero.style.backgroundSize = "cover";
    hero.style.backgroundPosition = "center";
  }
}

function renderServices() {
  const container = getOrCreateContainer("Услуги и цены", "div", "services-grid");
  if (!container) return;
  container.innerHTML = CONFIG.services.map(s => `
    <div style="background:#fff; padding:20px; border-radius:12px; box-shadow:0 4px 15px rgba(0,0,0,0.05); margin-bottom:15px;">
      <h3 style="margin:0 0 5px 0; font-size:1.2rem; color:#333;">${s.name}</h3>
      <p style="margin:0 0 10px 0; color:#666; font-size:0.9rem;">${s.description || ""}</p>
      <div style="font-weight:bold; color:#C9A27E; font-size:1.1rem;">${s.price}</div>
    </div>
  `).join("");
}

// НОВОЕ: Карточки мастеров
function renderMasters() {
  const container = getOrCreateContainer("Наши мастера", "div", "masters-grid");
  if (!container) return;
  
  container.style.display = "flex";
  container.style.gap = "20px";
  container.style.flexWrap = "wrap";

  container.innerHTML = CONFIG.masters.map(m => {
    const imgSrc = m.photo ? m.photo : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23C9A27E'/%3E%3Ctext x='50' y='60' font-size='40' text-anchor='middle' fill='white' font-family='Arial'%3E👤%3C/text%3E%3C/svg%3E";
    return `
    <div style="background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.05); width:200px; text-align:center;">
      <img src="${imgSrc}" alt="${m.name}" style="width:100%; height:200px; object-fit:cover;">
      <div style="padding:15px;">
        <h4 style="margin:0 0 5px 0; font-size:1.1rem;">${m.name}</h4>
        <p style="margin:0; font-size:0.9rem; color:#666;">Возраст: ${m.age}</p>
        <p style="margin:0; font-size:0.9rem; color:#666;">Стаж: ${m.experience}</p>
      </div>
    </div>
    `;
  }).join("");
}

// НОВОЕ: Анкета для записи
function renderBookingForm() {
  const container = getOrCreateContainer("Запись онлайн", "div", "booking-form-container");
  if (!container) return;

  const servicesOptions = CONFIG.services.map(s => `<option value="${s.name}">${s.name} (${s.price})</option>`).join("");
  const mastersOptions = CONFIG.masters.map(m => `<option value="${m.name}">${m.name}</option>`).join("");

  container.innerHTML = `
    <form id="booking-form" style="background:#fff; padding:25px; border-radius:12px; box-shadow:0 4px 15px rgba(0,0,0,0.05); max-width:500px; margin:0 auto; display:flex; flex-direction:column; gap:15px;">
      <label style="font-weight:bold; font-size:0.9rem;">Ваше имя:
        <input type="text" id="book-name" required placeholder="Как к вам обращаться?" style="width:100%; padding:10px; margin-top:5px; border:1px solid #ccc; border-radius:8px; box-sizing:border-box;">
      </label>

      <label style="font-weight:bold; font-size:0.9rem;">Выберите услугу:
        <select id="book-service" required style="width:100%; padding:10px; margin-top:5px; border:1px solid #ccc; border-radius:8px; box-sizing:border-box;">
          <option value="">-- Выберите --</option>
          ${servicesOptions}
        </select>
      </label>

      <label style="font-weight:bold; font-size:0.9rem;">Выберите мастера:
        <select id="book-master" required style="width:100%; padding:10px; margin-top:5px; border:1px solid #ccc; border-radius:8px; box-sizing:border-box;">
          <option value="">-- Выберите --</option>
          ${mastersOptions}
        </select>
      </label>

      <div style="display:flex; gap:10px;">
        <label style="font-weight:bold; font-size:0.9rem; flex:1;">Дата:
          <input type="date" id="book-date" required style="width:100%; padding:10px; margin-top:5px; border:1px solid #ccc; border-radius:8px; box-sizing:border-box;">
        </label>
        <label style="font-weight:bold; font-size:0.9rem; flex:1;">Время:
          <input type="time" id="book-time" required style="width:100%; padding:10px; margin-top:5px; border:1px solid #ccc; border-radius:8px; box-sizing:border-box;">
        </label>
      </div>

      <button type="submit" style="background:#C9A27E; color:#fff; border:none; padding:15px; border-radius:8px; font-size:1.1rem; cursor:pointer; font-weight:bold; margin-top:10px;">Записаться через Telegram</button>
    </form>
  `;

  // Обработка отправки формы
  const form = document.getElementById("booking-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("book-name").value;
      const service = document.getElementById("book-service").value;
      const master = document.getElementById("book-master").value;
      const date = document.getElementById("book-date").value;
      const time = document.getElementById("book-time").value;

      // Формируем красивый текст заявки
      const text = `Здравствуйте! Хочу записаться в парикмахерскую "${CONFIG.siteName}".%0A%0A👤 *Имя:* ${name}%0A✂️ *Услуга:* ${service}%0A💇‍♀️ *Мастер:* ${master}%0A📅 *Дата:* ${date}%0A⏰ *Время:* ${time}`;
      
      // Открываем Telegram с предзаполненным текстом
      const tgLink = CONFIG.telegram.startsWith("http") ? CONFIG.telegram.replace("https://t.me/", "") : CONFIG.telegram;
      const url = `https://t.me/${tgLink}?text=${text}`;
      
      window.open(url, "_blank");
      form.reset();
    });
  }
}

function renderAdvantages() {
  const container = getOrCreateContainer("Почему нас выбирают", "ul", "advantages-list");
  if (!container) return;
  container.style.listStyle = "none";
  container.style.padding = "0";
  container.innerHTML = CONFIG.advantages.map(a => `
    <li style="padding:10px 0; border-bottom:1px solid #eee; font-size:1.1rem;">
      <span style="color:#C9A27E; margin-right:10px;">✔</span> ${a}
    </li>
  `).join("");
}

function renderReviews() {
  const container = getOrCreateContainer("Отзывы гостей", "div", "reviews-grid");
  if (!container) return;
  container.innerHTML = CONFIG.reviews.map(r => `
    <div style="background:#f9f9f9; padding:20px; border-radius:12px; margin-bottom:15px;">
      <div style="color:#C9A27E; margin-bottom:10px;">★★★★★</div>
      <p style="font-style:italic; margin:0 0 10px 0;">«${r.text}»</p>
      <p style="margin:0; font-weight:bold; font-size:0.9rem;">— ${r.author}</p>
    </div>
  `).join("");
}

function renderContacts() {
  setText("#contact-address", CONFIG.address);
  setText("#contact-hours", CONFIG.workHours);
  const phoneLink = $("#contact-phone");
  if (phoneLink) { phoneLink.textContent = CONFIG.phone; phoneLink.href = "tel:" + CONFIG.phoneRaw; }
}

function initPWA() { }
function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }
}
