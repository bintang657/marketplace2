const WA_NUMBER = "6281225980437";

// --- GLOBAL VARIABLES FOR EFFECTS ---
let mouseTrailCtx, mouseTrailCanvas;
let particles = []; // For explosion

window.addEventListener('load', () => {
  // Init Visuals
  initMatrix();
  startCountdown();
  initSatellite();
  initParticlesBg(); // Renamed to avoid conflict
  initTilt();
  initTerminalLog();
  initGlitchEffect();
  
  // NEW FEATURES INIT
  initMouseTrail();
  initVoiceCommand();
  initScreenshotShortcut();
  initClickExplosion();

  // Init UX
  initSfx();
  initScrollDNA();
  initNavbarBehavior();
  initBackToTop();
  initKeyboardShortcuts();
  initPricingPersistence();

  // Biometric Scan Logic
  const scanZone = document.getElementById('scan-zone');
  const bootBar = document.getElementById('boot-bar');
  const authStatus = document.getElementById('auth-status');
  const bootScreen = document.getElementById('boot-screen');
  const mainContent = document.getElementById('main-content');
  const bootSound = document.getElementById('bootSound');
  const voiceIndicator = document.getElementById('voice-indicator');

  if (scanZone) {
    scanZone.addEventListener('click', () => {
      try { bootSound.play(); } catch(e){}
      authStatus.innerText = "SCANNING BIOMETRICS...";
      authStatus.className = "text-[10px] font-mono text-cyan-400 h-4 animate-pulse";
      bootBar.style.width = "100%";
      
      setTimeout(() => {
        authStatus.innerText = "ACCESS GRANTED. WELCOME USER.";
        authStatus.className = "text-[10px] font-mono text-green-400 h-4";
        
        setTimeout(() => {
          bootScreen.style.opacity = "0";
          bootScreen.style.pointerEvents = "none";
          
          setTimeout(() => {
            bootScreen.remove();
            mainContent.classList.remove('opacity-0', 'pointer-events-none');
            initTypewriter();
            bindCursorHoverTargets();
            
            // Show voice indicator after login
            if(voiceIndicator) voiceIndicator.classList.remove('hidden');
          }, 800);
        }, 500);
      }, 2500);
    });
  }
});

// ========= NEW: MOUSE TRAIL EFFECT =========
function initMouseTrail() {
  mouseTrailCanvas = document.getElementById('trail-canvas');
  if (!mouseTrailCanvas) return;
  mouseTrailCtx = mouseTrailCanvas.getContext('2d');
  
  mouseTrailCanvas.width = window.innerWidth;
  mouseTrailCanvas.height = window.innerHeight;
  
  window.addEventListener('resize', () => {
    mouseTrailCanvas.width = window.innerWidth;
    mouseTrailCanvas.height = window.innerHeight;
  });

  const trail = [];
  const length = 15;

  document.addEventListener('mousemove', (e) => {
    trail.push({ x: e.clientX, y: e.clientY, life: 1 });
    if (trail.length > length) trail.shift();
  });

  function animateTrail() {
    mouseTrailCtx.clearRect(0, 0, mouseTrailCanvas.width, mouseTrailCanvas.height);
    
    for (let i = 0; i < trail.length; i++) {
      const point = trail[i];
      const size = (i / length) * 4;
      const alpha = (i / length);
      
      mouseTrailCtx.beginPath();
      mouseTrailCtx.arc(point.x, point.y, size, 0, Math.PI * 2);
      mouseTrailCtx.fillStyle = `rgba(6, 182, 212, ${alpha})`;
      mouseTrailCtx.fill();
      
      point.life -= 0.05;
    }
    
    requestAnimationFrame(animateTrail);
  }
  animateTrail();
}

// ========= NEW: CLICK EXPLOSION =========
function initClickExplosion() {
  document.addEventListener('click', (e) => {
    // Ignore clicks on inputs/selects
    if(e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

    const popSound = document.getElementById('popSound');
    if(popSound) {
      popSound.currentTime = 0;
      popSound.volume = 0.3;
      popSound.play().catch(()=>{});
    }

    createExplosion(e.clientX, e.clientY);
  });
}

function createExplosion(x, y) {
  const particleCount = 20;
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      life: 1,
      color: `hsl(${Math.random() * 60 + 160}, 100%, 50%)` // Cyan to Green range
    });
  }
}

function animateExplosions() {
  if (!mouseTrailCtx) return;
  
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.02;
    
    if (p.life <= 0) {
      particles.splice(i, 1);
      continue;
    }
    
    mouseTrailCtx.beginPath();
    mouseTrailCtx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    mouseTrailCtx.fillStyle = p.color;
    mouseTrailCtx.globalAlpha = p.life;
    mouseTrailCtx.fill();
    mouseTrailCtx.globalAlpha = 1;
  }
  requestAnimationFrame(animateExplosions);
}
// Start explosion loop
setTimeout(() => { if(mouseTrailCtx) animateExplosions(); }, 1000);


// ========= NEW: VOICE COMMAND =========
function initVoiceCommand() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.log("Voice API not supported");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'id-ID';
  recognition.continuous = false;
  recognition.interimResults = false;

  const indicator = document.getElementById('voice-indicator');

  recognition.onstart = () => {
    if(indicator) {
      indicator.innerText = "🎤 LISTENING...";
      indicator.classList.remove('hidden');
    }
  };

  recognition.onend = () => {
    if(indicator) {
      setTimeout(() => {
        indicator.innerText = "🎤 SAY: 'BUKA HARGA' OR 'BUKA CHAT'";
        // Restart listening automatically after short delay
        try { recognition.start(); } catch(e){} 
      }, 2000);
    }
  };

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    console.log("Voice Command:", command);

    if (command.includes('buka harga') || command.includes('harga')) {
      document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
      triggerNotification("COMMAND ACCEPTED: OPENING PRICING");
    } else if (command.includes('buka chat') || command.includes('chat') || command.includes('wa')) {
      openCheckout('VOICE ORDER', 0);
      triggerNotification("COMMAND ACCEPTED: OPENING CHAT");
    } else if (command.includes('musik') || command.includes('music')) {
      toggleMusic();
      triggerNotification("TOGGLED MUSIC");
    }
  };

  try {
    recognition.start();
  } catch (e) {
    console.log("Voice recognition already started or error", e);
  }
}

function triggerNotification(msg) {
  const coords = document.getElementById('sat-status');
  if(coords) {
    const original = coords.innerText;
    coords.innerText = msg;
    coords.classList.add('text-yellow-400');
    setTimeout(() => {
      coords.innerText = original;
      coords.classList.remove('text-yellow-400');
    }, 2000);
  }
}

// ========= NEW: SCREENSHOT SHORTCUT (Key 'P') =========
function initScreenshotShortcut() {
  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'p') {
      triggerNotification("CAPTURING SCREEN...");
      setTimeout(() => {
        html2canvas(document.body, {
          backgroundColor: '#020202',
          scale: 2 // Higher resolution
        }).then(canvas => {
          const link = document.createElement('a');
          link.download = 'jasa-kimjong-snapshot.png';
          link.href = canvas.toDataURL();
          link.click();
          triggerNotification("SCREENSHOT SAVED!");
        });
      }, 500);
    }
  });
}

// ========= TERMINAL LOG GENERATOR =========
function initTerminalLog() {
  const output = document.getElementById('terminal-output');
  if (!output) return;
  const logs = [
    "Initializing kernel...", "Loading modules...", "Checking firewall...", 
    "Connecting to satellite...", "Decrypting packets...", "Optimizing routes...",
    "Scanning ports...", "User verified.", "Syncing database...", 
    "Injecting code...", "Bypassing proxy...", "Secure connection established.",
    "Voice module active...", "Particle system online..."
  ];

  function addLog() {
    const line = document.createElement('div');
    const time = new Date().toLocaleTimeString('en-US', {hour12: false});
    const msg = logs[Math.floor(Math.random() * logs.length)];
    const hash = Math.random().toString(36).substring(7).toUpperCase();
    
    line.innerHTML = `<span class="text-gray-500">[${time}]</span> <span class="text-cyan-700">${hash}</span> > ${msg}`;
    output.appendChild(line);
    
    if (output.children.length > 6) output.removeChild(output.firstChild);
    setTimeout(addLog, Math.random() * 1500 + 500);
  }
  addLog();
}

// ========= GLITCH EFFECT =========
function initGlitchEffect() {
  const el = document.querySelector('.glitch-text');
  if (!el) return;
  setInterval(() => {
    if (Math.random() > 0.95) {
      const original = el.innerText;
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
      let iterations = 0;
      const interval = setInterval(() => {
        el.innerText = el.dataset.text.split("").map((letter, index) => {
          if (index < iterations) return el.dataset.text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("");
        if (iterations >= el.dataset.text.length) clearInterval(interval);
        iterations += 1/3;
      }, 30);
    }
  }, 2000);
}

// ========= MATRIX RAIN =========
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

// ========= SATELLITE & COUNTDOWN =========
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

// ========= TYPEWRITER =========
const words = ["FUTURE", "EMPIRE", "LEGACY", "SYSTEM"];
let wordIndex = 0, charIndex = 0, isDeleting = false;
function initTypewriter() {
  const typeEl = document.getElementById('hero-type');
  if (!typeEl) return;
  const currentWord = words[wordIndex];
  if (isDeleting) typeEl.innerText = currentWord.substring(0, charIndex--);
  else typeEl.innerText = currentWord.substring(0, charIndex++);
  let speed = isDeleting ? 100 : 200;
  if (!isDeleting && charIndex === currentWord.length) { speed = 2000; isDeleting = true; }
  else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; speed = 500; }
  setTimeout(initTypewriter, speed);
}

// ========= CURSOR & HOVER =========
const cursor = document.getElementById('cursor-hud');
document.addEventListener('mousemove', e => { if (cursor) { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; } });
function bindCursorHoverTargets() {
  document.querySelectorAll('a, button, .tilt-card').forEach(el => {
    if (el.dataset.cursorBound) return;
    el.dataset.cursorBound = "1";
    el.addEventListener('mouseenter', () => { if (cursor) cursor.classList.add('hover-active'); });
    el.addEventListener('mouseleave', () => { if (cursor) cursor.classList.remove('hover-active'); });
  });
}
bindCursorHoverTargets();

// ========= CHECKOUT LOGIC =========
let currProd = "", currPrice = 0;
function openCheckout(p, pr) {
  currProd = p; currPrice = pr; renderCheckout();
  const modal = document.getElementById('checkout-modal');
  if (modal) modal.style.display = 'flex';
}
function closeCheckout() {
  const modal = document.getElementById('checkout-modal');
  if (modal) modal.style.display = 'none';
}
function renderCheckout() {
  const target = document.getElementById('checkout-content');
  if (!target) return;
  target.innerHTML = `
    <div class="text-center mb-6"><h3 class="text-cyan-500 font-black text-xl tracking-widest">ORDER FORM</h3></div>
    <div class="space-y-4 mb-6">
      <div class="p-3 bg-gray-900 border border-cyan-500/30 text-white font-mono text-center text-xs">ITEM: ${currProd}</div>
      <input type="text" id="buyer-name" placeholder="Nama Lengkap" class="w-full bg-black border border-gray-700 text-white p-3 outline-none focus:border-cyan-500 text-center text-sm">
      <select id="pay-method" class="w-full bg-black border border-gray-700 text-white p-3 outline-none text-center text-sm"><option value="DANA">DANA</option><option value="GOPAY">GOPAY</option><option value="BCA">BCA</option></select>
    </div>
    <div class="flex justify-between items-center border-t border-gray-800 pt-4">
      <div class="text-white font-bold text-xl">Rp ${currPrice.toLocaleString('id-ID')}</div>
      <button id="sendWaBtn" onclick="processFinalOrder()" class="bg-cyan-500 text-black font-black px-8 py-2 hover:bg-white transition uppercase text-xs sfx-click shadow-lg">KIRIM WA</button>
    </div>`;
  initSfx(); bindCursorHoverTargets();
  const nameInput = document.getElementById('buyer-name');
  if (nameInput) {
    nameInput.focus();
    nameInput.addEventListener('keydown', (e) => { if (e.key === "Enter") processFinalOrder(); });
  }
}
function processFinalOrder() {
  const name = document.getElementById('buyer-name')?.value?.trim();
  if (!name) { alert("Isi Nama!"); return; }
  const msg = `ORDER\n👤 ${name}\n📦 ${currProd}\n💰 Rp ${currPrice.toLocaleString('id-ID')}`;
  window.location.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}
function calcPrice() {
  const project = Number(document.getElementById('projectType')?.value || 0);
  const addon = Number(document.getElementById('addonType')?.value || 0);
  const t = project + addon;
  const totalEl = document.getElementById('totalPrice');
  if (totalEl) totalEl.innerText = t > 0 ? `Rp ${t.toLocaleString('id-ID')}` : "Rp 0";
  try { localStorage.setItem("mk2_projectType", String(project)); localStorage.setItem("mk2_addonType", String(addon)); } catch (e) {}
}

// ========= AUDIO & SFX =========
const bgMusic = document.getElementById('bgMusic');
if (bgMusic) bgMusic.volume = 0.3;
let isPlaying = false;
function toggleMusic() {
  if (!bgMusic) return;
  if (isPlaying) bgMusic.pause(); else bgMusic.play();
  isPlaying = !isPlaying;
}
function initSfx() {
  const clickSound = document.getElementById('clickSound');
  if (!clickSound) return;
  document.querySelectorAll('.sfx-click').forEach(el => {
    if (el.dataset.sfxBound) return;
    el.dataset.sfxBound = "1";
    el.addEventListener('click', () => { try { clickSound.currentTime = 0; clickSound.volume = 1; clickSound.play(); } catch (e) {} });
  });
  document.querySelectorAll('.sfx-hover').forEach(el => {
    if (el.dataset.sfxHoverBound) return;
    el.dataset.sfxHoverBound = "1";
    el.addEventListener('mouseenter', () => { try { clickSound.currentTime = 0; clickSound.volume = 0.1; clickSound.play(); } catch (e) {} });
  });
}

// ========= UTILS (Particles, Tilt, Scroll, Nav, etc) =========
function initParticlesBg() {
  const el = document.getElementById('particles-js');
  if (!el || typeof particlesJS === "undefined") return;
  particlesJS("particles-js", {
    particles: { number: { value: 50, density: { enable: true, value_area: 800 } }, color: { value: ["#06b6d4", "#ffffff"] }, shape: { type: "circle" }, opacity: { value: 0.3, random: true }, size: { value: 2, random: true }, line_linked: { enable: true, distance: 120, color: "#06b6d4", opacity: 0.15, width: 1 }, move: { enable: true, speed: 1, direction: "none", out_mode: "out" } },
    interactivity: { detect_on: "window", events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true }, modes: { grab: { distance: 150, line_linked: { opacity: 0.3 } }, push: { particles_nb: 2 } } },
    retina_detect: true
  });
}
function initTilt() {
  if (typeof VanillaTilt === "undefined") return;
  const cards = document.querySelectorAll(".tilt-card");
  if (!cards.length) return;
  VanillaTilt.init(cards, { max: 10, speed: 500, glare: true, "max-glare": 0.2, scale: 1.02 });
}
function initScrollDNA() {
  const dna = document.getElementById('scroll-dna');
  if (!dna) return;
  function update() {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    dna.style.height = `${Math.min(100, Math.max(0, pct))}%`;
  }
  update(); window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update);
}
function initNavbarBehavior() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  let lastY = window.scrollY;
  function onScroll() {
    const y = window.scrollY;
    if (y > 30) nav.classList.add('nav-scrolled'); else nav.classList.remove('nav-scrolled');
    if (y > lastY && y > 120) nav.style.transform = "translateY(-120%)"; else nav.style.transform = "translateY(0)";
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
}
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  function toggle() { if (window.scrollY > 500) btn.classList.remove('hidden'); else btn.classList.add('hidden'); }
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener('scroll', toggle, { passive: true }); toggle();
}
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeCheckout();
    if (e.key.toLowerCase() === "m") toggleMusic();
  });
}
function initPricingPersistence() {
  const p = document.getElementById('projectType');
  const a = document.getElementById('addonType');
  if (!p || !a) return;
  try {
    const sp = localStorage.getItem("mk2_projectType");
    const sa = localStorage.getItem("mk2_addonType");
    if (sp !== null) p.value = String(Number(sp));
    if (sa !== null) a.value = String(Number(sa));
  } catch (e) {}
  calcPrice();
}