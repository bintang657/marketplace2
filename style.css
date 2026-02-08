const WA_NUMBER = "6281225980437";
let isGodMode = false;
let isDestroyed = false;
let konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex = 0;
let destroyCode = ['x','x','x'];
let destroyIndex = 0;
let isMusicPlaying = false;
let interactionScore = 0;
let currentMood = 'neutral';
let timeDilationFactor = 1.0;
let lastFrameTime = 0;

// Themes
const themes = {
  cyan: { neon: '#06b6d4', bg: '#020202' },
  pink: { neon: '#d946ef', bg: '#0f0518' },
  green: { neon: '#22c55e', bg: '#051005' },
  red: { neon: '#ef4444', bg: '#100505' }
};

// Audio Context
let audioContext, analyser, dataArray, source;

window.addEventListener('load', async () => {
  initStarfield();
  initMatrix();
  startCountdown();
  initSatellite();
  initParticlesBg();
  initTilt();
  initTerminalLog();
  initGlitchEffect();
  
  initMouseTrail();
  initScreenshotShortcut();
  initClickExplosion();
  initEyeTrackingCursor(); // Renamed to avoid conflict with gaze
  initTypingSound();
  initKonamiCode();
  initDestroyCode(); 
  initParallax();
  initCryptoTicker();
  initWeatherSystem();
  initResourceMonitor();
  initAudioVisualizer();
  initChatbot();
  initNeuralLink();
  
  // PREVIOUS FEATURES
  initOrbOfPower();
  initTrue3DTilt();
  initEqualizerUI();
  initWebWeaver();
  initVortexScroll();
  initEncryptionVisualizer();
  initMoodDetector();
  
  // NEW ULTIMATE FEATURES
  await initGazeTracking(); // Eye tracking via webcam
  initDimensionalPortal();
  initQuantumCursor();
  initTimeDilation();
  
  await initFaceAuth(); 

  initSfx();
  initScrollDNA();
  initNavbarBehavior();
  initBackToTop();
  initKeyboardShortcuts();
  initPricingPersistence();
});

// ========= NEW: GAZE TRACKING (WEBCAM) =========
async function initGazeTracking() {
  const video = document.getElementById('eye-track-video');
  const canvas = document.getElementById('eye-track-canvas');
  const gazeStatus = document.getElementById('gaze-status');
  
  if (!video || !canvas) return;

  try {
    // Load face-api models (simplified for demo, using basic motion detection if models fail)
    // For this demo, we'll simulate gaze based on head movement stability via simple motion detection
    // Real face-api requires loading models which might be heavy for a single file demo.
    // We will use a simplified logic: If face is detected and stable for 3s -> Trigger
    
    const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 } });
    video.srcObject = stream;
    
    let stableFrames = 0;
    let lastX = 0, lastY = 0;

    setInterval(() => {
      if (!isMusicPlaying && !interactionScore) return; // Only active when engaged
      
      // Simple motion detection simulation
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, 320, 240);
      const imageData = ctx.getImageData(0, 0, 320, 240);
      const data = imageData.data;
      let sum = 0;
      for(let i=0; i<data.length; i+=4) {
        sum += data[i]; // Red channel roughly
      }
      const avg = sum / (data.length/4);
      
      // Simulate gaze stability
      if (Math.abs(avg - lastX) < 10 && Math.abs(avg - lastY) < 10) {
        stableFrames++;
      } else {
        stableFrames = 0;
      }
      lastX = avg; lastY = avg; // Dummy vars for demo

      if (stableFrames > 60) { // ~2 seconds stable
        if (!gazeStatus.classList.contains('hidden')) return;
        gazeStatus.classList.remove('hidden');
        triggerRealityShift(true);
      } else {
        if (gazeStatus.classList.contains('hidden')) return;
        gazeStatus.classList.add('hidden');
        triggerRealityShift(false);
      }
    }, 100);

  } catch (e) {
    console.log("Gaze tracking unavailable (camera permission or load error)");
  }
}

function triggerRealityShift(active) {
  const body = document.body;
  if (active) {
    body.style.filter = "invert(0.8) hue-rotate(180deg) contrast(1.5)";
    body.style.animation = "shake 0.5s infinite";
    triggerNotification("GAZE LOCKED: REALITY SHIFTING");
  } else {
    body.style.filter = "none";
    body.style.animation = "none";
  }
}

// ========= NEW: DIMENSIONAL PORTAL SCROLL =========
function initDimensionalPortal() {
  const overlay = document.getElementById('portal-overlay');
  const canvas = document.getElementById('portal-canvas');
  if (!overlay || !canvas) return;
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  let portalActive = false;
  let scrollThreshold = 500; // Activate after scrolling past hero

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold && window.scrollY < scrollThreshold + 200) {
      portalActive = true;
      overlay.style.opacity = Math.min(1, (window.scrollY - scrollThreshold) / 100);
    } else {
      portalActive = false;
      overlay.style.opacity = 0;
    }
  });

  let angle = 0;
  function drawPortal() {
    if (!portalActive && overlay.style.opacity == 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      requestAnimationFrame(drawPortal);
      return;
    }

    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    
    // Draw rainbow rings
    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      const hue = (i * 10 + angle * 50) % 360;
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.lineWidth = 5;
      const radius = i * 20 + Math.sin(angle * 2 + i) * 10;
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    ctx.restore();
    angle += 0.02;
    requestAnimationFrame(drawPortal);
  }
  drawPortal();
}

// ========= NEW: QUANTUM ENTANGLEMENT CURSOR =========
function initQuantumCursor() {
  const mainCursor = document.getElementById('cursor-hud');
  const pairCursor = document.getElementById('quantum-pair');
  
  if (!mainCursor || !pairCursor) return;
  
  pairCursor.classList.remove('hidden');

  document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const winW = window.innerWidth;
    const winH = window.innerHeight;

    // Main cursor
    mainCursor.style.left = x + 'px';
    mainCursor.style.top = y + 'px';

    // Quantum pair (opposite side with delay simulation via lerp could be added, but direct opposite is cooler)
    const pairX = winW - x;
    const pairY = winH - y;

    pairCursor.style.left = pairX + 'px';
    pairCursor.style.top = pairY + 'px';
    
    // Add entanglement trail
    if (Math.random() > 0.8) {
      createEntanglementParticle(x, y, pairX, pairY);
    }
  });
}

function createEntanglementParticle(x1, y1, x2, y2) {
  const canvas = document.getElementById('trail-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
  ctx.lineWidth = 1;
  ctx.stroke();
}

// ========= NEW: TIME DILATION =========
function initTimeDilation() {
  const timeDisplay = document.getElementById('time-dilation');
  
  setInterval(() => {
    if (isMusicPlaying && interactionScore > 40) {
      timeDilationFactor = 0.5; // Slow motion
      document.documentElement.style.setProperty('--animation-speed', '0.5');
      if(timeDisplay) timeDisplay.innerText = "0.5x";
      triggerNotification("TIME DILATION ACTIVE");
    } else {
      timeDilationFactor = 1.0;
      document.documentElement.style.setProperty('--animation-speed', '1.0');
      if(timeDisplay) timeDisplay.innerText = "1.0x";
    }
  }, 2000);
}

// ========= NEW: NEURAL LINK CHATBOT (EEG) =========
function initChatbot() {
  const btn = document.getElementById('chatbot-btn');
  const modal = document.getElementById('chatbot-modal');
  const close = document.getElementById('close-chat');
  const input = document.getElementById('chat-input');
  const send = document.getElementById('send-chat');
  const messages = document.getElementById('chat-messages');
  const eegVis = document.getElementById('eeg-visualizer');

  if(!btn) return;

  // Init EEG bars
  for(let i=0; i<20; i++) {
    const bar = document.createElement('div');
    bar.className = 'w-1 bg-green-500 h-2 transition-all duration-75';
    eegVis.appendChild(bar);
  }

  const userName = localStorage.getItem('kimjong_user_name');
  
  btn.addEventListener('click', () => {
    modal.classList.replace('hidden', 'flex');
    if (messages.children.length === 0) {
      const greet = userName ? `Neural Link Established. Welcome back, ${userName}.` : "Neural Link Initializing... Please identify yourself.";
      addMessage(greet, 'ai');
    }
  });
  close.addEventListener('click', () => modal.classList.replace('flex', 'hidden'));

  // EEG Simulation based on typing speed
  let lastKeyTime = 0;
  input.addEventListener('keydown', () => {
    const now = Date.now();
    const delta = now - lastKeyTime;
    lastKeyTime = now;
    
    const bars = eegVis.querySelectorAll('div');
    bars.forEach(bar => {
      const height = delta < 200 ? Math.random() * 40 + 10 : Math.random() * 10 + 2; // Fast typing = high waves
      bar.style.height = `${height}px`;
      bar.style.backgroundColor = delta < 200 ? '#ef4444' : '#22c55e'; // Red for Beta, Green for Alpha
    });
  });

  function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = sender === 'user' ? 'bg-cyan-900/30 p-2 rounded text-white self-end max-w-[90%] ml-auto text-right' : 'bg-gray-900 p-2 rounded text-cyan-300 self-start max-w-[90%]';
    div.innerText = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function saveName(name) {
    localStorage.setItem('kimjong_user_name', name);
    addMessage(`Identity Confirmed: ${name}. Neural Sync Complete.`, 'ai');
  }

  function getResponse(msg) {
    msg = msg.toLowerCase();
    if (!userName && (msg.includes('nama saya') || msg.includes('saya '))) {
      const name = msg.split('saya ')[1] || msg.split('nama saya ')[1] || "User";
      saveName(name);
      return `Neural pattern matched: ${name}.`;
    }
    if (msg.includes('harga')) return "Accessing pricing database... Found: 75k - 500k.";
    if (msg.includes('halo')) return userName ? `Signal received, ${userName}.` : "Handshake pending. Identify.";
    return "Processing query... Data stream unclear. Try specific keywords.";
  }

  function handleSend() {
    const val = input.value.trim();
    if (!val) return;
    addMessage(val, 'user');
    input.value = '';
    
    setTimeout(() => {
      addMessage("...", 'ai');
      setTimeout(() => {
        messages.lastChild.remove();
        addMessage(getResponse(val), 'ai');
      }, 800);
    }, 400);
  }

  send.addEventListener('click', handleSend);
  input.addEventListener('keydown', (e) => { if(e.key === 'Enter') handleSend(); });
}

// ... (Include all previous helper functions: Orb, Equalizer, WebWeaver, Vortex, Encryption, Mood, SelfDestruct, Resource, Weather, Konami, GodMode, MouseTrail, Explosion, EyeTrackingCursor, TypingSound, Matrix, Satellite, Countdown, Glitch, Terminal, Screenshot, Checkout, CalcPrice, Audio, Sfx, Particles, Tilt, Scroll, Nav, BackToTop, Keyboard, Persistence, Starfield, True3DTilt, Crypto) ...
// Note: Ensure 'initEyeTrackingCursor' is renamed from previous 'initEyeTracking' to avoid conflict with new GazeTracking.

function triggerNotification(msg){const s=document.getElementById('sat-status'); if(s){const orig=s.innerText; s.innerText=msg; s.classList.add('text-yellow-400'); setTimeout(()=>{s.innerText=orig;s.classList.remove('text-yellow-400');},2000);}}
const words=["FUTURE","EMPIRE","LEGACY","SYSTEM"]; let wI=0, cI=0, del=false;
function initTypewriter() { const el=document.getElementById('hero-type'); if(!el)return; const w=words[wI]; if(del) el.innerText=w.substring(0,cI--); else el.innerText=w.substring(0,cI++); let sp=del?100:200; if(!del&&cI===w.length){sp=2000;del=true;} else if(del&&cI===0){del=false;wI=(wI+1)%words.length;sp=500;} setTimeout(initTypewriter,sp); }
function initSatellite() { setInterval(() => { const c = document.getElementById('sat-coords'); if(c) c.innerText = `LAT: ${(-6.2+Math.random()*0.01).toFixed(3)} | LON: ${(106.8+Math.random()*0.01).toFixed(3)}`; }, 2000); }
function startCountdown() { let t=900; setInterval(()=>{ const m=Math.floor(t/60), s=t%60; const d=document.getElementById('countdown'); if(d)d.innerText=`00:${m<10?'0'+m:m}:${s<10?'0'+s:s}`; if(t>0)t--; },1000); }
function initGlitchEffect() { const el = document.querySelector('.glitch-text'); if (!el) return; setInterval(() => { if (Math.random() > 0.95) { const chars = "XYZ0123!@#"; let iterations = 0; const interval = setInterval(() => { el.innerText = el.dataset.text.split("").map((letter, index) => index < iterations ? el.dataset.text[index] : chars[Math.floor(Math.random() * chars.length)]).join(""); if (iterations >= el.dataset.text.length) clearInterval(interval); iterations += 1/3; }, 30); } }, 2000); }
function initTerminalLog() { const output = document.getElementById('terminal-output'); if (!output) return; const logs = ["System OK", "Reality Warp: ON", "Starfield: ACTIVE", "Orb: CHARGING", "Mood: Detecting...", "Gaze: Monitoring", "Time: Dilating"]; function addLog() { const line = document.createElement('div'); line.innerText = `[${new Date().toLocaleTimeString()}] ${logs[Math.floor(Math.random()*logs.length)]}`; output.appendChild(line); if (output.children.length > 6) output.removeChild(output.firstChild); setTimeout(addLog, Math.random() * 1000 + 500); } addLog(); }
function initScreenshotShortcut() { document.addEventListener('keydown', (e) => { if (e.key.toLowerCase() === 'p') { triggerNotification("CAPTURING SCREEN..."); setTimeout(() => { html2canvas(document.body, { backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--bg'), scale: 2 }).then(canvas => { const link = document.createElement('a'); link.download = 'jasa-kimjong-snapshot.png'; link.href = canvas.toDataURL(); link.click(); triggerNotification("SAVED!"); }); }, 500); } }); }
function initKonamiCode() { document.addEventListener('keydown', (e) => { if (e.key === konamiCode[konamiIndex]) { konamiIndex++; if (konamiIndex === konamiCode.length) { activateGodMode(); konamiIndex = 0; } } else { konamiIndex = 0; } }); }
function activateGodMode() { if (isGodMode || isDestroyed) return; isGodMode = true; document.body.classList.add('god-mode-active'); document.getElementById('god-mode-indicator').classList.remove('hidden'); document.querySelector('.glitch-text').setAttribute('data-text', 'GOD MODE'); document.querySelector('.glitch-text').innerText = 'GOD MODE'; document.querySelectorAll('.price-tag').forEach(el => { const text = el.innerText; const num = parseInt(text.replace(/[^0-9]/g, '')); if (num) { const newNum = Math.floor(num * 0.5); el.innerText = `Rp ${newNum.toLocaleString('id-ID')} (50% OFF)`; el.classList.add('text-purple-400', 'animate-pulse'); } }); triggerNotification("⚡ GOD MODE ACTIVATED ⚡"); }
let mouseTrailCtx, mouseTrailCanvas; let explosionParticles = [];
function initMouseTrail() { mouseTrailCanvas = document.getElementById('trail-canvas'); if (!mouseTrailCanvas) return; mouseTrailCtx = mouseTrailCanvas.getContext('2d'); mouseTrailCanvas.width = window.innerWidth; mouseTrailCanvas.height = window.innerHeight; window.addEventListener('resize', () => { mouseTrailCanvas.width = window.innerWidth; mouseTrailCanvas.height = window.innerHeight; }); const trail = []; const length = 20; document.addEventListener('mousemove', (e) => { trail.push({ x: e.clientX, y: e.clientY, life: 1 }); if (trail.length > length) trail.shift(); }); function animateTrail() { mouseTrailCtx.clearRect(0, 0, mouseTrailCanvas.width, mouseTrailCanvas.height); const isGod = document.body.classList.contains('god-mode-active'); for (let i = 0; i < trail.length; i++) { const point = trail[i]; const size = (i / length) * (isGod ? 8 : 4); const alpha = (i / length); const color = isGod ? `rgba(217, 70, 239, ${alpha})` : `rgba(6, 182, 212, ${alpha})`; mouseTrailCtx.beginPath(); mouseTrailCtx.arc(point.x, point.y, size, 0, Math.PI * 2); mouseTrailCtx.fillStyle = color; mouseTrailCtx.fill(); point.life -= 0.05; } requestAnimationFrame(animateTrail); } animateTrail(); }
function initClickExplosion() { document.addEventListener('click', (e) => { if(e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.closest('#chatbot-modal') || isDestroyed) return; const popSound = document.getElementById('popSound'); if(popSound) { popSound.currentTime = 0; popSound.volume = 0.3; popSound.play().catch(()=>{}); } createExplosion(e.clientX, e.clientY); }); }
function createExplosion(x, y) { const isGod = document.body.classList.contains('god-mode-active'); const count = isGod ? 40 : 20; for (let i = 0; i < count; i++) { explosionParticles.push({ x: x, y: y, vx: (Math.random() - 0.5) * (isGod ? 20 : 10), vy: (Math.random() - 0.5) * (isGod ? 20 : 10), life: 1, color: isGod ? `hsl(${Math.random() * 60 + 280}, 100%, 50%)` : `hsl(${Math.random() * 60 + 160}, 100%, 50%)` }); } }
function animateExplosions() { if (!mouseTrailCtx) return; for (let i = explosionParticles.length - 1; i >= 0; i--) { const p = explosionParticles[i]; p.x += p.vx; p.y += p.vy; p.life -= 0.02; if (p.life <= 0) { explosionParticles.splice(i, 1); continue; } mouseTrailCtx.beginPath(); mouseTrailCtx.arc(p.x, p.y, 2, 0, Math.PI * 2); mouseTrailCtx.fillStyle = p.color; mouseTrailCtx.globalAlpha = p.life; mouseTrailCtx.fill(); mouseTrailCtx.globalAlpha = 1; } requestAnimationFrame(animateExplosions); }
setTimeout(() => { if(mouseTrailCtx) animateExplosions(); }, 1000);
function initEyeTrackingCursor() { const cursor = document.getElementById('cursor-hud'); const leftEye = cursor?.querySelector('.eye.left'); const rightEye = cursor?.querySelector('.eye.right'); if (!cursor || !leftEye || !rightEye) return; document.addEventListener('mousemove', (e) => { const x = e.clientX; const y = e.clientY; cursor.style.left = x + 'px'; cursor.style.top = y + 'px'; const moveX = (x - window.innerWidth / 2) / 50; const moveY = (y - window.innerHeight / 2) / 50; leftEye.style.transform = `translate(${moveX}px, ${moveY}px)`; rightEye.style.transform = `translate(${moveX}px, ${moveY}px)`; }); }
function initTypingSound() { const keySound = document.getElementById('keySound'); if (!keySound) return; document.addEventListener('keydown', (e) => { if (e.target.classList.contains('typing-input') || e.target.tagName === 'TEXTAREA') { const rate = 0.8 + Math.random() * 0.4; keySound.playbackRate = rate; keySound.volume = 0.4; keySound.currentTime = 0; keySound.play().catch(() => {}); } }); }
function initMatrix() { const canvas = document.getElementById('matrix-canvas'); if (!canvas) return; const ctx = canvas.getContext('2d'); const chars = "01"; const fontSize = 14; let drops = []; let columns = 0; function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; columns = Math.floor(canvas.width / fontSize); drops = Array.from({ length: columns }, () => 1); } resize(); window.addEventListener('resize', resize); function draw() { ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; ctx.fillRect(0, 0, canvas.width, canvas.height); const style = getComputedStyle(document.documentElement); ctx.fillStyle = style.getPropertyValue('--neon') || '#0F0'; ctx.font = fontSize + "px monospace"; for (let i = 0; i < drops.length; i++) { ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, drops[i] * fontSize); if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0; drops[i]++; } } setInterval(draw, 33); }
const cursor=document.getElementById('cursor-hud'); document.addEventListener('mousemove',e=>{if(cursor){cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';}});
function bindCursorHoverTargets() { document.querySelectorAll('a,button,.tilt-card').forEach(el=>{ if(el.dataset.cursorBound)return; el.dataset.cursorBound="1"; el.addEventListener('mouseenter',()=>{if(cursor)cursor.classList.add('hover-active');}); el.addEventListener('mouseleave',()=>{if(cursor)cursor.classList.remove('hover-active');}); }); }
bindCursorHoverTargets();
let currProd="", currPrice=0;
function openCheckout(p,pr){currProd=p;currPrice=pr;renderCheckout();document.getElementById('checkout-modal').style.display='flex';}
function closeCheckout(){document.getElementById('checkout-modal').style.display='none';}
function renderCheckout(){
  const t=document.getElementById('checkout-content'); if(!t)return;
  t.innerHTML=`<div class="text-center mb-6"><h3 class="text-cyan-500 font-black text-xl tracking-widest">ORDER FORM</h3></div><div class="space-y-4 mb-6"><div class="p-3 bg-gray-900 border border-cyan-500/30 text-white font-mono text-center text-xs">ITEM: ${currProd}</div><input type="text" id="buyer-name" placeholder="Nama Lengkap" class="w-full bg-black border border-gray-700 text-white p-3 outline-none focus:border-cyan-500 text-center text-sm typing-input"><select id="pay-method" class="w-full bg-black border border-gray-700 text-white p-3 outline-none text-center text-sm typing-input"><option value="DANA">DANA</option><option value="GOPAY">GOPAY</option><option value="BCA">BCA</option></select></div><div class="flex justify-between items-center border-t border-gray-800 pt-4"><div class="text-white font-bold text-xl">Rp ${currPrice.toLocaleString('id-ID')}</div><button onclick="processFinalOrder()" class="bg-cyan-500 text-black font-black px-8 py-2 hover:bg-white transition uppercase text-xs sfx-click shadow-lg">KIRIM WA</button></div>`;
  initSfx(); bindCursorHoverTargets();
  const inp=document.getElementById('buyer-name'); if(inp){inp.focus(); inp.addEventListener('keydown',e=>{if(e.key==="Enter")processFinalOrder();});}
}
function processFinalOrder(){const n=document.getElementById('buyer-name')?.value?.trim(); if(!n){alert("Isi Nama!");return;} window.location.href=`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`ORDER\n👤 ${n}\n📦 ${currProd}\n💰 Rp ${currPrice.toLocaleString('id-ID')}`)}`;}
function calcPrice(){const p=Number(document.getElementById('projectType')?.value||0);const a=Number(document.getElementById('addonType')?.value||0);const t=p+a;const el=document.getElementById('totalPrice'); if(el)el.innerText=t>0?`Rp ${t.toLocaleString('id-ID')}`:"Rp 0"; try{localStorage.setItem("mk2_p",p);localStorage.setItem("mk2_a",a);}catch(e){}}
const bgMusic=document.getElementById('bgMusic'); if(bgMusic)bgMusic.volume=0.3; 
function initSfx(){
  const clickSound=document.getElementById('clickSound'); if(!clickSound)return;
  document.querySelectorAll('.sfx-click').forEach(el=>{if(el.dataset.sfxBound)return; el.dataset.sfxBound="1"; el.addEventListener('click',()=>{try{clickSound.currentTime=0;clickSound.volume=1;clickSound.play();}catch(e){}});});
  document.querySelectorAll('.sfx-hover').forEach(el=>{if(el.dataset.sfxHoverBound)return; el.dataset.sfxHoverBound="1"; el.addEventListener('mouseenter',()=>{try{clickSound.currentTime=0;clickSound.volume=0.1;clickSound.play();}catch(e){}});});
}
function initParticlesBg(){const el=document.getElementById('particles-js'); if(!el||typeof particlesJS==="undefined")return; particlesJS("particles-js",{particles:{number:{value:50,density:{enable:true,value_area:800}},color:{value:["#06b6d4","#ffffff"]},shape:{type:"circle"},opacity:{value:0.3,random:true},size:{value:2,random:true},line_linked:{enable:true,distance:120,color:"#06b6d4",opacity:0.15,width:1},move:{enable:true,speed:1,direction:"none",out_mode:"out"}},interactivity:{detect_on:"window",events:{onhover:{enable:true,mode:"grab"},onclick:{enable:true,mode:"push"},resize:true},modes:{grab:{distance:150,line_linked:{opacity:0.3}},push:{particles_nb:2}}},retina_detect:true});}
function initTilt(){if(typeof VanillaTilt==="undefined")return; VanillaTilt.init(document.querySelectorAll(".tilt-card"),{max:15,speed:400,glare:true,"max-glare":0.6,scale:1.05});}
function initScrollDNA(){const d=document.getElementById('scroll-dna'); if(!d)return; function u(){const doc=document.documentElement;const st=doc.scrollTop||document.body.scrollTop;const sh=(doc.scrollHeight||document.body.scrollHeight)-doc.clientHeight;const pct=sh>0?(st/sh)*100:0;d.style.height=`${Math.min(100,Math.max(0,pct))}%`;} u(); window.addEventListener('scroll',u,{passive:true}); window.addEventListener('resize',u);}
function initNavbarBehavior(){const n=document.getElementById('main-nav'); if(!n)return; let ly=window.scrollY; function os(){const y=window.scrollY; if(y>30)n.classList.add('nav-scrolled');else n.classList.remove('nav-scrolled'); if(y>ly&&y>120)n.style.transform="translateY(-120%)";else n.style.transform="translateY(0)"; ly=y;} window.addEventListener('scroll',os,{passive:true}); os();}
function initBackToTop(){const b=document.getElementById('backToTop'); if(!b)return; function t(){if(window.scrollY>500)b.classList.remove('hidden');else b.classList.add('hidden');} b.addEventListener('click',()=>window.scrollTo({top:0,behavior:"smooth"})); window.addEventListener('scroll',t,{passive:true}); t();}
function initKeyboardShortcuts(){document.addEventListener('keydown',(e)=>{if(e.key==="Escape"){closeCheckout(); document.getElementById('chatbot-modal')?.classList.add('hidden');} if(e.key.toLowerCase()==="m")toggleMusic();});}
function initPricingPersistence(){const p=document.getElementById('projectType');const a=document.getElementById('addonType'); if(!p||!a)return; try{const sp=localStorage.getItem("mk2_p");const sa=localStorage.getItem("mk2_a"); if(sp!==null)p.value=String(Number(sp)); if(sa!==null)a.value=String(Number(sa));}catch(e){} calcPrice();}
async function initFaceAuth() {
  const video = document.getElementById('webcam-video');
  const status = document.getElementById('cam-status');
  const authStatus = document.getElementById('auth-status');
  const bootBar = document.getElementById('boot-bar');
  const bootScreen = document.getElementById('boot-screen');
  const mainContent = document.getElementById('main-content');
  const skipBtn = document.getElementById('skip-auth');
  const bootSound = document.getElementById('bootSound');
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    status.innerText = "CAMERA ACTIVE. SCANNING...";
    status.classList.remove('text-cyan-400');
    status.classList.add('text-green-400');
    setTimeout(() => {
      status.innerText = "FACE DETECTED!";
      authStatus.innerText = "IDENTITY VERIFIED. WELCOME.";
      authStatus.className = "text-[10px] font-mono text-green-400 h-4";
      bootBar.style.width = "100%";
      setTimeout(() => enterSystem(bootScreen, mainContent, bootSound), 1000);
    }, 2500);
  } catch (err) {
    status.innerText = "CAMERA ERROR. CLICK TO SKIP.";
    status.classList.add('text-red-500');
    const zone = document.getElementById('camera-zone');
    zone.style.cursor = "pointer";
    zone.addEventListener('click', () => {
       authStatus.innerText = "MANUAL OVERRIDE ACCEPTED.";
       authStatus.className = "text-[10px] font-mono text-yellow-400 h-4";
       bootBar.style.width = "100%";
       setTimeout(() => enterSystem(bootScreen, mainContent, bootSound), 1000);
    });
  }
  skipBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    authStatus.innerText = "MANUAL OVERRIDE ACCEPTED.";
    authStatus.className = "text-[10px] font-mono text-yellow-400 h-4";
    bootBar.style.width = "100%";
    setTimeout(() => enterSystem(bootScreen, mainContent, bootSound), 500);
  });
}
function enterSystem(bootScreen, mainContent, bootSound) {
  try { bootSound.play(); } catch(e){}
  bootScreen.style.opacity = "0";
  bootScreen.style.pointerEvents = "none";
  setTimeout(() => {
    bootScreen.remove();
    mainContent.classList.remove('opacity-0', 'pointer-events-none');
    document.getElementById('chatbot-btn').classList.remove('hidden');
    document.getElementById('audio-controls').classList.remove('hidden');
    initTypewriter();
    bindCursorHoverTargets();
  }, 800);
}
function initParallax() {
  document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;
    document.querySelectorAll('.parallax-layer').forEach(layer => {
      const speed = layer.getAttribute('data-speed');
      const xPos = x * speed * 10;
      const yPos = y * speed * 10;
      layer.style.transform = `translateX(${xPos}px) translateY(${yPos}px)`;
    });
  });
}
async function initCryptoTicker() {
  const ticker = document.getElementById('crypto-ticker');
  if (!ticker) return;
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd');
    const data = await res.json();
    const btc = data.bitcoin.usd.toLocaleString();
    const eth = data.ethereum.usd.toLocaleString();
    const sol = data.solana.usd.toLocaleString();
    ticker.innerHTML = `<span class="text-yellow-500">BTC: $${btc}</span><span class="text-gray-500">|</span><span class="text-orange-500">ETH: $${eth}</span><span class="text-gray-500">|</span><span class="text-cyan-500">SOL: $${sol}</span><span class="text-gray-500">|</span><span id="weather-display" class="text-blue-400">WEATHER: SYNCING...</span><span id="mood-indicator" class="text-purple-400">MOOD: NEUTRAL</span><span id="gaze-status" class="text-red-500 hidden">GAZE DETECTED</span>`;
  } catch (e) { ticker.innerHTML = `<span class="text-red-500">API OFFLINE</span> | <span class="text-gray-500">BTC: --</span> | <span class="text-green-500">SYSTEM: ONLINE</span>`; }
}
function setTheme(themeName) {
  const t = themes[themeName];
  if (!t) return;
  document.documentElement.style.setProperty('--neon', t.neon);
  document.documentElement.style.setProperty('--bg', t.bg);
  triggerNotification(`THEME CHANGED TO ${themeName.toUpperCase()}`);
}
async function initWeatherSystem() {
  const display = document.getElementById('weather-display');
  if (!display) return;
  try {
    const locRes = await fetch('https://ipapi.co/json/');
    const locData = await locRes.json();
    const city = locData.city;
    const lat = locData.latitude;
    const lon = locData.longitude;
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    const weatherData = await weatherRes.json();
    const temp = weatherData.current_weather.temperature;
    const code = weatherData.current_weather.weathercode;
    let condition = "Clear";
    if (code > 3) condition = "Cloudy";
    if (code > 45) condition = "Fog";
    if (code > 50) condition = "Rain";
    if (code > 70) condition = "Snow";
    if (code > 90) condition = "Storm";
    display.innerText = `${city}: ${temp}°C (${condition})`;
  } catch (e) { display.innerText = "WEATHER: OFFLINE"; }
}
function initResourceMonitor() {
  const cpuEl = document.getElementById('cpu-load');
  const memEl = document.getElementById('mem-load');
  const evoEl = document.getElementById('evo-level');
  if (!cpuEl || !memEl) return;
  setInterval(() => {
    const baseCpu = 10 + Math.random() * 15;
    const baseMem = 20 + Math.random() * 10;
    cpuEl.innerText = Math.floor(baseCpu) + "%";
    memEl.innerText = Math.floor(baseMem) + "%";
    if (baseCpu > 20) cpuEl.classList.add('text-red-500'); else cpuEl.classList.remove('text-red-500');
    if(evoEl) {
      let level = 1;
      if(interactionScore > 30) level = 2;
      if(interactionScore > 60) level = 3;
      evoEl.innerText = level;
    }
  }, 2000);
}
function initNeuralLink() { /* Merged into Chatbot */ }
function initStarfield() {
  const canvas = document.getElementById('starfield-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let stars = [];
  const numStars = 400;
  const speedBase = 2;
  let warpSpeed = 0;
  for (let i = 0; i < numStars; i++) {
    stars.push({ x: Math.random() * canvas.width - canvas.width / 2, y: Math.random() * canvas.height - canvas.height / 2, z: Math.random() * canvas.width });
  }
  window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
  window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    warpSpeed = scrollPercent * 20;
  });
  function draw() {
    ctx.fillStyle = 'rgba(2, 2, 2, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const style = getComputedStyle(document.documentElement);
    const color = style.getPropertyValue('--neon').trim() || '#06b6d4';
    ctx.fillStyle = color;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    stars.forEach(star => {
      star.z -= (speedBase + warpSpeed);
      if (star.z <= 0) { star.z = canvas.width; star.x = Math.random() * canvas.width - canvas.width / 2; star.y = Math.random() * canvas.height - canvas.height / 2; }
      const x = (star.x / star.z) * canvas.width + cx;
      const y = (star.y / star.z) * canvas.height + cy;
      const size = (1 - star.z / canvas.width) * 3;
      if (x > 0 && x < canvas.width && y > 0 && y < canvas.height) { ctx.beginPath(); ctx.arc(x, y, size, 0, Math.PI * 2); ctx.fill(); }
    });
    requestAnimationFrame(draw);
  }
  draw();
}
function initTrue3DTilt() {
  const elements = document.querySelectorAll('.parallax-text, .tilt-card');
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    elements.forEach(el => {
      const depth = el.getAttribute('data-depth') || 0.05;
      const moveX = x * depth * 100;
      const moveY = y * depth * 100;
      el.style.transform = `translate(${moveX}px, ${moveY}px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    });
  });
}
function initOrbOfPower() {
  const container = document.getElementById('power-orb-container');
  if(!container) return;
  container.classList.remove('hidden');
  setInterval(() => {
    if(isMusicPlaying && analyser) {
      analyser.getByteFrequencyData(dataArray);
      const avg = dataArray.reduce((a,b) => a+b) / dataArray.length;
      const scale = 1 + (avg / 255) * 0.5;
      container.style.transform = `translate(-50%, -50%) scale(${scale})`;
      const bars = document.querySelectorAll('#eq-bars div');
      bars.forEach((bar, i) => {
        const val = dataArray[i * 10] || 0;
        bar.style.height = `${(val / 255) * 32}px`;
      });
      if (interactionScore > 30) {
        container.querySelector('.orb-core').style.filter = "blur(0px) hue-rotate(90deg)";
        document.getElementById('evo-level').innerText = "2";
      }
      if (interactionScore > 60) {
        container.querySelector('.orb-core').style.filter = "blur(0px) hue-rotate(180deg) drop-shadow(0 0 20px white)";
        document.getElementById('evo-level').innerText = "3";
        if(Math.random() > 0.95) triggerNotification("CORE EVOLVING...");
      }
    } else {
      const time = Date.now() * 0.002;
      const scale = 1 + Math.sin(time) * 0.05;
      container.style.transform = `translate(-50%, -50%) scale(${scale})`;
      const bars = document.querySelectorAll('#eq-bars div');
      bars.forEach(bar => bar.style.height = `${Math.random() * 10 + 5}px`);
    }
  }, 50);
  container.addEventListener('click', () => {
    createShockwave();
    interactionScore += 10;
    triggerNotification("POWER SURGE: CORE EVOLUTION +10");
  });
}
function createShockwave() {
  const shock = document.createElement('div');
  shock.className = 'shockwave';
  shock.style.position = 'fixed';
  shock.style.top = '50%';
  shock.style.left = '50%';
  shock.style.transform = 'translate(-50%, -50%)';
  shock.style.width = '10px';
  shock.style.height = '10px';
  shock.style.borderRadius = '50%';
  shock.style.border = '2px solid var(--neon)';
  shock.style.zIndex = '9999';
  shock.style.pointerEvents = 'none';
  document.body.appendChild(shock);
  let scale = 1;
  let opacity = 1;
  const anim = setInterval(() => {
    scale += 0.05;
    opacity -= 0.02;
    shock.style.transform = `translate(-50%, -50%) scale(${scale})`;
    shock.style.opacity = opacity;
    if (opacity <= 0) { clearInterval(anim); shock.remove(); }
  }, 16);
}
function initEqualizerUI() {
  const btn = document.getElementById('music-toggle');
  const controls = document.getElementById('audio-controls');
  if(btn && controls) {
    controls.classList.remove('hidden');
    btn.addEventListener('click', toggleMusic);
  }
}
function toggleMusic() {
  const audio = document.getElementById('bgMusic');
  if (!audio) return;
  if (isMusicPlaying) {
    audio.pause();
    isMusicPlaying = false;
    document.getElementById('music-toggle').classList.remove('bg-white');
    document.getElementById('music-toggle').classList.add('bg-cyan-500');
  } else {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      source = audioContext.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      analyser.fftSize = 256;
      dataArray = new Uint8Array(analyser.frequencyBinCount);
      initAudioVisualizerLogic();
    }
    audio.play();
    isMusicPlaying = true;
    document.getElementById('music-toggle').classList.remove('bg-cyan-500');
    document.getElementById('music-toggle').classList.add('bg-white');
    triggerNotification("AUDIO STREAM: ACTIVE");
  }
}
function initAudioVisualizerLogic() {
  const canvas = document.getElementById('audio-vis');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  function draw() {
    requestAnimationFrame(draw);
    if(!analyser) return;
    analyser.getByteFrequencyData(dataArray);
    ctx.fillStyle = 'rgba(2, 2, 2, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const barWidth = (canvas.width / dataArray.length) * 2.5;
    let x = 0;
    const style = getComputedStyle(document.documentElement);
    const color = style.getPropertyValue('--neon').trim() || '#06b6d4';
    for(let i = 0; i < dataArray.length; i++) {
      const barHeight = dataArray[i] / 2;
      ctx.fillStyle = color;
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth + 1;
    }
  }
  draw();
}
function initWebWeaver() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let nodes = [];
  const nodeCount = 40;
  let mouse = { x: null, y: null };
  window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
  window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; if (Math.random() > 0.9) { nodes.push({ x: mouse.x, y: mouse.y, life: 100 }); } });
  class Node { constructor(x, y) { this.x = x || Math.random() * canvas.width; this.y = y || Math.random() * canvas.height; this.vx = (Math.random() - 0.5) * 0.5; this.vy = (Math.random() - 0.5) * 0.5; this.life = 100; } update() { this.x += this.vx; this.y += this.vy; this.life -= 0.5; if (this.x < 0 || this.x > canvas.width) this.vx *= -1; if (this.y < 0 || this.y > canvas.height) this.vy *= -1; } draw() { const style = getComputedStyle(document.documentElement); const color = style.getPropertyValue('--neon').trim() || '#06b6d4'; ctx.fillStyle = `rgba(${hexToRgb(color)}, ${this.life/100})`; ctx.beginPath(); ctx.arc(this.x, this.y, 2, 0, Math.PI * 2); ctx.fill(); } }
  for(let i=0; i<nodeCount; i++) nodes.push(new Node());
  function hexToRgb(hex) { const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex); return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '6, 182, 212'; }
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const style = getComputedStyle(document.documentElement);
    const color = style.getPropertyValue('--neon').trim() || '#06b6d4';
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update(); nodes[i].draw();
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x; const dy = nodes[i].y - nodes[j].y; const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 150) { ctx.beginPath(); ctx.strokeStyle = `rgba(${hexToRgb(color)}, ${0.2 * (1 - dist/150)})`; ctx.lineWidth = 1; ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke(); }
      }
      if (nodes[i].life <= 0) { nodes.splice(i, 1); i--; }
    }
    if (mouse.x && Math.random() > 0.8) { nodes.push(new Node(mouse.x, mouse.y)); }
    requestAnimationFrame(animate);
  }
  animate();
}
function initVortexScroll() {
  const overlay = document.getElementById('vortex-overlay'); // Reusing vortex overlay for portal if needed, but we have separate portal now. Keeping both.
  // Vortex logic from previous version can stay here if desired, or removed to focus on Portal.
}
function initEncryptionVisualizer() {
  const inputs = document.querySelectorAll('.typing-input');
  inputs.forEach(input => {
    input.addEventListener('input', (e) => { if (e.target.value.length > 0) triggerNotification("DATA ENCRYPTING..."); });
    input.addEventListener('focus', () => { input.style.boxShadow = "0 0 15px var(--neon)"; input.style.borderColor = "var(--neon)"; });
    input.addEventListener('blur', () => { input.style.boxShadow = "none"; input.style.borderColor = "#374151"; });
  });
}
function initMoodDetector() {
  let lastInteraction = Date.now();
  const moodDisplay = document.getElementById('mood-indicator');
  document.addEventListener('click', () => { interactionScore += 2; lastInteraction = Date.now(); checkMood(); });
  document.addEventListener('keydown', () => { interactionScore += 1; lastInteraction = Date.now(); checkMood(); });
  window.addEventListener('scroll', () => { interactionScore += 0.5; lastInteraction = Date.now(); checkMood(); }, { passive: true });
  function checkMood() {
    const now = Date.now();
    if (now - lastInteraction > 5000) { interactionScore = Math.max(0, interactionScore - 1); }
    let newMood = 'neutral';
    if (interactionScore > 50) newMood = 'aggressive';
    else if (interactionScore < 10) newMood = 'calm';
    if (newMood !== currentMood) { currentMood = newMood; updateMoodTheme(); }
  }
  function updateMoodTheme() {
    if (currentMood === 'aggressive') { document.documentElement.style.setProperty('--neon', '#ef4444'); if(moodDisplay) moodDisplay.innerText = "MOOD: AGGRESSIVE"; triggerNotification("SYSTEM DETECTED AGGRESSION"); }
    else if (currentMood === 'calm') { document.documentElement.style.setProperty('--neon', '#3b82f6'); if(moodDisplay) moodDisplay.innerText = "MOOD: CALM"; }
    else { document.documentElement.style.setProperty('--neon', '#06b6d4'); if(moodDisplay) moodDisplay.innerText = "MOOD: NEUTRAL"; }
  }
}