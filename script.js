const WA_NUMBER = "6281225980437";

window.addEventListener('load', () => {
  // 1. Loading Bar Animation
  setTimeout(() => {
    const bar = document.getElementById('boot-bar');
    if (bar) bar.style.width = "100%";
  }, 100);

  // 2. Show Button after Loading
  setTimeout(() => {
    const btn = document.getElementById('start-btn');
    if (btn) btn.classList.remove('hidden');
  }, 1500);

  // 3. Init effects
  initMatrix();
  startCountdown();
  initSatellite();

  // NEW: features you already loaded
  initParticles();
  initTilt();
  initSfx();

  // 4. Enter System Logic
  const startBtn = document.getElementById('start-btn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      // Try play sound, ignore if blocked
      try { document.getElementById('bootSound')?.play(); } catch (e) {}

      // Remove boot screen
      const screen = document.getElementById('boot-screen');
      if (!screen) return;

      screen.style.transition = "opacity 0.8s";
      screen.style.opacity = "0";

      setTimeout(() => {
        screen.remove();
        document.getElementById('main-content')?.classList.remove('opacity-0');
        initTypewriter();
      }, 800);
    });
  }
});

// --- MATRIX RAIN (with resize) ---
function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const chars = "01";
  const fontSize = 14;
  let drops = [];
  let columns = 0;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: columns }, () => 1);
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  setInterval(draw, 33);
}

// --- SATELLITE ---
function initSatellite() {
  setInterval(() => {
    const coords = document.getElementById('sat-coords');
    if (coords) {
      const lat = -6.200 + (Math.random() * 0.01 - 0.005);
      const lon = 106.845 + (Math.random() * 0.01 - 0.005);
      coords.innerText = `LAT: ${lat.toFixed(3)} | LON: ${lon.toFixed(3)}`;
    }
  }, 2000);
}

// --- COUNTDOWN ---
function startCountdown() {
  let time = 900;
  setInterval(() => {
    const m = Math.floor(time / 60);
    const s = time % 60;
    const cd = document.getElementById('countdown');
    if (cd) cd.innerText = `00:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
    if (time > 0) time--;
  }, 1000);
}

// --- TYPEWRITER ---
const words = ["FUTURE", "EMPIRE", "LEGACY", "SYSTEM"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function initTypewriter() {
  const typeEl = document.getElementById('hero-type');
  if (!typeEl) return;

  const currentWord = words[wordIndex];

  if (isDeleting) typeEl.innerText = currentWord.substring(0, charIndex--);
  else typeEl.innerText = currentWord.substring(0, charIndex++);

  let speed = isDeleting ? 100 : 200;

  if (!isDeleting && charIndex === currentWord.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 500;
  }

  setTimeout(initTypewriter, speed);
}

// --- CURSOR ---
const cursor = document.getElementById('cursor-hud');
document.addEventListener('mousemove', e => {
  if (cursor) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  }
});

document.querySelectorAll('a, button, .tilt-card').forEach(el => {
  el.addEventListener('mouseenter', () => { if (cursor) cursor.classList.add('hover-active'); });
  el.addEventListener('mouseleave', () => { if (cursor) cursor.classList.remove('hover-active'); });
});

// --- CHECKOUT LOGIC ---
let currProd = "", currPrice = 0;

function openCheckout(p, pr) {
  currProd = p;
  currPrice = pr;
  renderCheckout();
  const modal = document.getElementById('checkout-modal');
  if (modal) modal.style.display = 'flex';
}

function renderCheckout() {
  const target = document.getElementById('checkout-content');
  if (!target) return;

  target.innerHTML = `
    <div class="text-center mb-6">
      <h3 class="text-cyan-500 font-black text-xl tracking-widest">ORDER FORM</h3>
    </div>
    <div class="space-y-4 mb-6">
      <div class="p-3 bg-gray-900 border border-cyan-500/30 text-white font-mono text-center text-xs">
        ITEM: ${currProd}
      </div>
      <input type="text" id="buyer-name" placeholder="Nama Lengkap"
        class="w-full bg-black border border-gray-700 text-white p-3 outline-none focus:border-cyan-500 text-center text-sm">
      <select id="pay-method"
        class="w-full bg-black border border-gray-700 text-white p-3 outline-none text-center text-sm">
        <option value="DANA">DANA</option>
        <option value="GOPAY">GOPAY</option>
        <option value="BCA">BCA</option>
      </select>
    </div>
    <div class="flex justify-between items-center border-t border-gray-800 pt-4">
      <div class="text-white font-bold text-xl">Rp ${currPrice.toLocaleString('id-ID')}</div>
      <button onclick="processFinalOrder()"
        class="bg-cyan-500 text-black font-black px-6 py-2 hover:bg-white transition uppercase text-xs sfx-click shadow-lg">
        KIRIM WA
      </button>
    </div>
  `;

  // Re-init SFX for newly created button in modal
  initSfx();
}

function processFinalOrder() {
  const name = document.getElementById('buyer-name')?.value?.trim();
  if (!name) { alert("Isi Nama!"); return; }

  const msg = `ORDER\n👤 ${name}\n📦 ${currProd}\n💰 Rp ${currPrice.toLocaleString('id-ID')}`;
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

  window.location.href = url;
}

function calcPrice() {
  const project = Number(document.getElementById('projectType')?.value || 0);
  const addon = Number(document.getElementById('addonType')?.value || 0);
  const t = project + addon;

  const totalEl = document.getElementById('totalPrice');
  if (totalEl) totalEl.innerText = t > 0 ? `Rp ${t.toLocaleString('id-ID')}` : "Rp 0";
}

function triggerOrder() {
  const p = document.getElementById('projectType');
  const addon = Number(document.getElementById('addonType')?.value || 0);

  if (!p || Number(p.value) === 0) { alert("Pilih paket!"); return; }

  openCheckout(p.options[p.selectedIndex].text, Number(p.value) + addon);
}

// --- MUSIC ---
const bgMusic = document.getElementById('bgMusic');
if (bgMusic) bgMusic.volume = 0.3;

let isPlaying = false;
function toggleMusic() {
  if (!bgMusic) return;
  if (isPlaying) bgMusic.pause();
  else bgMusic.play();
  isPlaying = !isPlaying;
}

// ===== NEW FEATURES =====

// Particles.js init (library already loaded in HTML)
function initParticles() {
  const el = document.getElementById('particles-js');
  if (!el || typeof particlesJS === "undefined") return;

  particlesJS("particles-js", {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 900 } },
      color: { value: ["#06b6d4", "#1e40af", "#ffffff"] },
      shape: { type: "circle" },
      opacity: { value: 0.35, random: true },
      size: { value: 2.2, random: true },
      line_linked: {
        enable: true,
        distance: 130,
        color: "#06b6d4",
        opacity: 0.20,
        width: 1
      },
      move: { enable: true, speed: 1.2, direction: "none", out_mode: "out" }
    },
    interactivity: {
      detect_on: "window",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "push" },
        resize: true
      },
      modes: {
        grab: { distance: 170, line_linked: { opacity: 0.35 } },
        push: { particles_nb: 2 }
      }
    },
    retina_detect: true
  });
}

// VanillaTilt init (library already loaded)
function initTilt() {
  if (typeof VanillaTilt === "undefined") return;
  const cards = document.querySelectorAll(".tilt-card");
  if (!cards.length) return;

  VanillaTilt.init(cards, {
    max: 10,
    speed: 500,
    glare: true,
    "max-glare": 0.25,
    scale: 1.03
  });
}

// SFX click/hover using clickSound
function initSfx() {
  const clickSound = document.getElementById('clickSound');
  if (!clickSound) return;

  // Click
  document.querySelectorAll('.sfx-click').forEach(el => {
    if (el.dataset.sfxBound) return;
    el.dataset.sfxBound = "1";

    el.addEventListener('click', () => {
      try {
        clickSound.currentTime = 0;
        clickSound.volume = 1;
        clickSound.play();
      } catch (e) {}
    });
  });

  // Hover (optional subtle)
  document.querySelectorAll('.sfx-hover').forEach(el => {
    if (el.dataset.sfxHoverBound) return;
    el.dataset.sfxHoverBound = "1";

    el.addEventListener('mouseenter', () => {
      try {
        clickSound.currentTime = 0;
        clickSound.volume = 0.12;
        clickSound.play();
      } catch (e) {}
    });
  });
}