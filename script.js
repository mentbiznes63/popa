/* ============================================
   Ейчанка — Главный скрипт
   ============================================ */

const CONFIG = {
  siteName: "Ейчанка",
  siteSubtitle: "на Красной",
  city: "Ейск",
  address: "г. Ейск, ул. Красная, 55",
  phone: "+7 (961) 522-53-41",
  phoneTel: "+79615225341",
  whatsapp: "https://wa.me/79615225341",
  telegram: "fifengmwt",
  workHours: "Ежедневно 09:00–19:00",
  rating: "4,6",
  reviewsCount: 278,
  
  // Массив фоновых фотографий (будут меняться)
  heroImages: [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80",
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1920&q=80",
    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&q=80"
  ],
  
   services: [
    { name: "Стрижка женская", price: "от 999 ₽", description: "Модельная стрижка как у раналда" },
    { name: "Стрижка мужская", price: "от 200 ₽", description: "Под горшочек" },
    { name: "Стрижка детская", price: "от 67 ₽", description: "Z" },
    { name: "Окрашивание волос", price: "от 1488 ₽", description: "Окрашиваие с последующим облысением" }
  ],

  // МАСТЕРА (можешь менять имена, возраст, стаж и названия фото)
  masters: [
    { name: "Саша Пэтрик", age: 18, experience: "умеет стрич нохти", photo: "sashapetros.jpg" },
    { name: "Добрынза", age: 6, experience: "не умеет стрич нохти", photo: "dobrinza.jpg" },
    { name: "Владька шеф", age: 18, experience: "чуть чуть умеет стрич нохти", photo: "vladka.jpg" }
  ],
  
  advantages: [
    { icon: "👩‍🎨", text: "Владька шеф попку лижет в гараже" },
    { icon: "🎨", text: "попап" },
    { icon: "☕", text: "Мастер Саша Пэтрик покатает на машине" },
    { icon: "📍", text: "Мастер Владька шеф отминетирует бонусом" },
    { icon: "🕒", text: "Работаем без выходных 12:00-12:01" }
  ],
  
  reviews: [
    { text: "салон хуйня ебаная саша пэтрик задавил а машине.", author: "Гость Google" },
    { text: "Спасибо за бонус от мастера Владьки шефа!!!", author: "Гость Google" },
    { text: "Мастера постригли меня как захотели и смеялись все вместе надо мной.", author: "Гость Google" }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  startHeroSlider();
  renderServices();
  renderMasters();
  renderBookingForm();
  renderAdvantages();
  renderReviews();
  setupMobileMenu();
  setupPWA();
  init3DBackground(); // Запуск 3D
  
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

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
  
  setText('contact-address', CONFIG.address);
  setText('contact-hours', CONFIG.workHours);
  const contactPhone = document.getElementById('contact-phone');
  if (contactPhone) { contactPhone.textContent = CONFIG.phone; contactPhone.href = `tel:${CONFIG.phoneTel}`; }
}

// Слайдер фоновых фото
function startHeroSlider() {
  const slider = document.getElementById('hero-slider');
  if (!slider || !CONFIG.heroImages.length) return;
  let currentIndex = 0;
  
  // Устанавливаем первый фон
  slider.style.backgroundImage = `url('${CONFIG.heroImages[0]}')`;
  
  // Меняем каждые 5 секунд
  setInterval(() => {
    currentIndex = (currentIndex + 1) % CONFIG.heroImages.length;
    slider.style.backgroundImage = `url('${CONFIG.heroImages[currentIndex]}')`;
  }, 5000);
}

function renderServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;
  grid.innerHTML = CONFIG.services.map(s => `
    <article class="service-card">
      <h3 class="service-card__name">${s.name}</h3>
      <div class="service-card__price">${s.price}</div>
      <p class="service-card__desc">${s.description}</p>
    </article>
  `).join('');
}

function renderMasters() {
  const grid = document.getElementById('masters-grid');
  if (!grid) return;
  const defaultPhoto = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23E2E8F0'/%3E%3Ctext x='50' y='55' font-size='40' text-anchor='middle' fill='%23FFFFFF' font-family='Arial'%3E👤%3C/text%3E%3C/svg%3E";
  grid.innerHTML = CONFIG.masters.map(m => `
    <article class="master-card">
      <img src="${m.photo || defaultPhoto}" alt="${m.name}" class="master-card__img">
      <div class="master-card__info">
        <h3 class="master-card__name">${m.name}</h3>
        <p class="master-card__details">${m.age} лет · Стаж: ${m.experience}</p>
      </div>
    </article>
  `).join('');
}

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
      <button type="submit" class="btn btn--primary btn--full" style="margin-top: 10px;">Записаться в Telegram</button>
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

      const text = `Здравствуйте! Хочу записаться.%0A%0A👤 Имя: ${name}%0A✂️ Услуга: ${service}%0A💇‍♀️ Мастер: ${master}%0A📅 Дата: ${date}%0A⏰ Время: ${time}`;
      const tgUser = CONFIG.telegram.replace("https://t.me/", "").replace("@", "");
      window.open(`https://t.me/${tgUser}?text=${text}`, "_blank");
    });
  }
}

function renderAdvantages() {
  const grid = document.getElementById('advantages-grid');
  if (!grid) return;
  grid.innerHTML = CONFIG.advantages.map(a => `
    <div class="advantage-item">
      <div class="advantage-item__icon">${a.icon}</div>
      <div class="advantage-item__text">${a.text}</div>
    </div>
  `).join('');
}

function renderReviews() {
  const grid = document.getElementById('reviews-grid');
  if (!grid) return;
  grid.innerHTML = CONFIG.reviews.map(r => `
    <article class="review-card">
      <div class="review-card__stars">★★★★★</div>
      <p class="review-card__text">«${r.text}»</p>
      <div class="review-card__author">— ${r.author}</div>
    </article>
  `).join('');
}

function setupMobileMenu() {
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobile-menu');
  if (!burger || !menu) return;
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('open');
  });
}

function setupPWA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW error:', err));
  }
}

/* ============================================
   3D Фон (Three.js)
   ============================================ */
function init3DBackground() {
  const hero = document.getElementById('hero');
  if (!hero || typeof THREE === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '2'; // Поверх картинки, но под текстом (текст z-index: 10)
  canvas.style.pointerEvents = 'none';
  hero.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, hero.clientWidth / hero.clientHeight, 0.1, 1000);
  camera.position.z = 15;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(hero.clientWidth, hero.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
  dirLight.position.set(5, 10, 7);
  scene.add(dirLight);

  const goldMat = new THREE.MeshStandardMaterial({ color: 0xD4AF37, metalness: 0.9, roughness: 0.1 });
  const blueMat = new THREE.MeshStandardMaterial({ color: 0x4F46E5, metalness: 0.5, roughness: 0.3 });

  const objects = [];

  function createScissors() {
    const group = new THREE.Group();
    const bladeGeo = new THREE.CylinderGeometry(0.1, 0.05, 3, 8);
    const blade1 = new THREE.Mesh(bladeGeo, goldMat); blade1.position.y = 1.5; blade1.rotation.z = 0.2; group.add(blade1);
    const blade2 = new THREE.Mesh(bladeGeo, goldMat); blade2.position.y = -1.5; blade2.rotation.z = 0.2; group.add(blade2);
    const ringGeo = new THREE.TorusGeometry(0.5, 0.1, 16, 32);
    const ring1 = new THREE.Mesh(ringGeo, goldMat); ring1.position.set(0.2, 2.8, 0); group.add(ring1);
    const ring2 = new THREE.Mesh(ringGeo, goldMat); ring2.position.set(-0.2, -2.8, 0); group.add(ring2);
    return group;
  }

  const s1 = createScissors(); s1.position.set(-6, 3, 0); scene.add(s1); objects.push({ mesh: s1, speed: 0.005, offset: 0 });
  const s2 = createScissors(); s2.position.set(6, -3, 0); s2.scale.set(0.7, 0.7, 0.7); scene.add(s2); objects.push({ mesh: s2, speed: -0.008, offset: 2 });

  for (let i = 0; i < 20; i++) {
    const sphereGeo = new THREE.SphereGeometry(Math.random() * 0.15 + 0.05, 16, 16);
    const sphereMat = new THREE.MeshStandardMaterial({ color: i % 2 === 0 ? 0xD4AF37 : 0x4F46E5, metalness: 0.8, roughness: 0.2 });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10);
    scene.add(sphere);
    objects.push({ mesh: sphere, speed: (Math.random() - 0.5) * 0.02, offset: Math.random() * 10 });
  }

  function animate(time) {
    requestAnimationFrame(animate);
    objects.forEach(obj => {
      obj.mesh.rotation.x += obj.speed;
      obj.mesh.rotation.y += obj.speed * 1.5;
      obj.mesh.position.y += Math.sin(time * 0.001 + obj.offset) * 0.005;
    });
    renderer.render(scene, camera);
  }
  animate(0);

  window.addEventListener('resize', () => {
    renderer.setSize(hero.clientWidth, hero.clientHeight);
    camera.aspect = hero.clientWidth / hero.clientHeight;
    camera.updateProjectionMatrix();
  });
}
