const WA_NUMBER = "6281225980437";
let finalSpeech = "System Online. Welcome back, Administrator."; 
let exitTrapTriggered = false;
let typedKeySequence = "";
let idleTime = 0;
let bioTimer = null;

// COMMANDS
const COMMANDS = [
    { cmd: "BUY", desc: "Open Pricing", action: () => document.getElementById('pricing').scrollIntoView() },
    { cmd: "MUSIC", desc: "Toggle BGM", action: toggleMusic },
    { cmd: "HACK", desc: "Activate God Mode", action: triggerGodMode },
    { cmd: "DESTRUCT", desc: "System Purge", action: initDestruct },
    { cmd: "CLEAR", desc: "Close Terminal", action: () => document.getElementById('cmd-modal').classList.add('hidden') },
    { cmd: "WA", desc: "Contact Admin", action: () => window.location.href=`https://wa.me/${WA_NUMBER}` }
];

window.addEventListener('load', () => {
    detectOSForVoice();
    startCountdown();
    initLatencyGraph(); 
    initGeoTracker(); 
    initMatrix();
    initSatellite(); 
    init3DEffect();

    // NEW: BINARY TRAIL
    document.addEventListener('mousemove', (e) => {
        if(Math.random() > 0.8) createBinaryParticle(e.clientX, e.clientY);
        resetIdleTimer();
    });

    // SCROLL DNA
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('scroll-dna').style.height = scrolled + "%";
    });

    document.addEventListener('keydown', (e) => {
        typedKeySequence += e.key.toUpperCase();
        if (typedKeySequence.includes("JASA")) { triggerGodMode(); typedKeySequence = ""; }
        if (e.ctrlKey && e.key === 'k') { e.preventDefault(); openCmd(); }
        if (e.key === 'Escape') { document.getElementById('cmd-modal').classList.add('hidden'); document.getElementById('cmd-box').classList.remove('open'); }
        resetIdleTimer();
    });

    document.addEventListener('mouseleave', (e) => {
        if (e.clientY < 0 && !exitTrapTriggered) { triggerExitTrap(); }
    });

    setInterval(() => { idleTime++; if(idleTime > 10) document.getElementById('sleep-mode').classList.remove('opacity-0'); }, 1000);

    setTimeout(() => document.getElementById('boot-bar').style.width = "100%", 100);
    setTimeout(() => document.getElementById('start-btn').classList.remove('hidden'), 2000);

    setInterval(() => {
        document.getElementById('cpu-val').innerText = Math.floor(Math.random() * 30 + 10) + "%";
        document.getElementById('cpu-bar').style.width = Math.floor(Math.random() * 30 + 10) + "%";
    }, 1500);

    document.getElementById('start-btn').addEventListener('click', () => {
        document.getElementById('bootSound').play().catch(e => {});
        speakAI(finalSpeech);
        const screen = document.getElementById('boot-screen');
        screen.style.transition = "opacity 0.8s, transform 0.8s";
        screen.style.opacity = "0";
        screen.style.transform = "scale(1.1)";
        setTimeout(() => {
            screen.remove();
            const nav = document.getElementById('main-nav'); if(nav) nav.style.display = 'flex';
            initParticles(); initTypewriter(); initWAWidget(); initSalesTicker();
            const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { startTestimonialTyping(); observer.disconnect(); } }); });
            observer.observe(document.getElementById('testimonial-trigger'));
            const observer2 = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { decryptPrices(); observer2.disconnect(); } }); });
            observer2.observe(document.getElementById('pricing'));
            setTimeout(() => { document.getElementById('benchmark-bar').style.width = "100%"; }, 500);
        }, 800);
    });
});

// --- NEW: 3D PARALLAX EFFECT (RE-ADDED) ---
function init3DEffect() {
    const container = document.getElementById('boot-screen');
    const card = document.getElementById('profile-3d-card');
    if (!container || !card) return;
    container.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const yRotation = ((clientX / innerWidth) - 0.5) * 30;
        const xRotation = ((clientY / innerHeight) - 0.5) * -30;
        card.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.05)`;
    });
    container.addEventListener('mouseleave', () => { card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'; });
}

// --- NEW: BINARY TRAIL ---
function createBinaryParticle(x, y) {
    const el = document.createElement('div');
    el.innerText = Math.random() > 0.5 ? "1" : "0";
    el.className = "binary-particle";
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
}

// --- NEW: SATELLITE ---
function initSatellite() {
    setInterval(() => {
        const coords = document.getElementById('sat-coords');
        const lat = -6.200 + (Math.random() * 0.01 - 0.005);
        const lon = 106.845 + (Math.random() * 0.01 - 0.005);
        coords.innerText = `LAT: ${lat.toFixed(3)} | LON: ${lon.toFixed(3)}`;
        if(Math.random() > 0.9) {
            document.getElementById('sat-status').innerText = "UPLINK: REROUTING...";
            document.getElementById('sat-status').classList.add('text-red-500');
            setTimeout(() => { document.getElementById('sat-status').innerText = "SAT_UPLINK: STABLE"; document.getElementById('sat-status').classList.remove('text-red-500'); }, 1000);
        }
    }, 2000);
}

// --- EXISTING FEATURES ---
function toggleTerminal() { const box = document.getElementById('terminal-box'); if(box.classList.contains('hidden')) { box.classList.remove('hidden'); box.classList.remove('opacity-0', 'translate-y-4'); document.getElementById('clickSound').play().catch(e=>{}); } else { box.classList.add('hidden'); box.classList.add('opacity-0', 'translate-y-4'); } }
function termReply(type) { const log = document.getElementById('terminal-log'); let reply = ""; if(type === 'pricelist') reply = "Bot: 150K | Web: 350K | Custom: 75K+"; else if(type === 'garansi') reply = "Garansi 7 hari perbaikan bug GRATIS."; else if(type === 'order') { window.location.href = `https://wa.me/${WA_NUMBER}`; return; } log.innerHTML += `<div class="text-green-400">> ${reply}</div>`; log.scrollTop = log.scrollHeight; document.getElementById('clickSound').play().catch(e=>{}); }
function initRecTimer() { let s = 0; setInterval(() => { s++; const date = new Date(0); date.setSeconds(s); const timeString = date.toISOString().substr(11, 8); document.getElementById('rec-timer').innerText = timeString; }, 1000); }
function trackOrder() { const output = document.getElementById('track-output'); const input = document.getElementById('track-id'); if(!input.value) { output.innerText = "ERROR: INPUT EMPTY"; return; } output.innerText = "SEARCHING DATABASE..."; output.className = "text-[10px] font-mono text-yellow-500 mt-2 h-4 animate-pulse"; setTimeout(() => { output.innerText = "❌ ACCESS DENIED: ORDER ID NOT FOUND"; output.className = "text-[10px] font-mono text-red-500 mt-2 h-4"; document.getElementById('deniedSound').play().catch(e=>{}); }, 1500); }
function openQR() { document.getElementById('qr-modal').classList.remove('hidden'); document.getElementById('qr-modal').classList.add('flex'); document.getElementById('scanSound').play().catch(e=>{}); }
function decryptPrices() { const prices = document.querySelectorAll('.price-scramble'); const chars = "0123456789!@#$%^&*"; prices.forEach(el => { const originalText = el.getAttribute('data-final'); let iteration = 0; const interval = setInterval(() => { el.innerText = originalText.split("").map((letter, index) => { if(index < iteration) return originalText[index]; return chars[Math.floor(Math.random() * chars.length)]; }).join(""); if(iteration >= originalText.length) clearInterval(interval); iteration += 1 / 3; }, 50); }); }
function initNodeMap() { const container = document.getElementById('server-nodes'); for(let i=0; i<30; i++) { const dot = document.createElement('div'); dot.classList.add('node-dot'); container.appendChild(dot); } setInterval(() => { const dots = document.querySelectorAll('.node-dot'); dots.forEach(d => d.classList.remove('node-active')); const rand = Math.floor(Math.random() * dots.length); dots[rand].classList.add('node-active'); const countEl = document.getElementById('node-count'); if(countEl) countEl.innerText = parseInt(countEl.innerText) + Math.floor(Math.random() * 3) - 1; }, 500); }
function triggerExitTrap() { exitTrapTriggered = true; const modal = document.getElementById('exit-modal'); const content = document.getElementById('exit-content'); modal.classList.remove('hidden'); modal.classList.add('flex'); setTimeout(() => content.classList.remove('scale-0'), 10); document.getElementById('notifSound').play().catch(e=>{}); }
function closeExitModal() { document.getElementById('exit-modal').classList.add('hidden'); }
function startCountdown() { let time = 900; setInterval(() => { let m = Math.floor(time / 60); let s = time % 60; document.getElementById('countdown').innerText = `00:${m<10?'0'+m:m}:${s<10?'0'+s:s}`; if(time > 0) time--; }, 1000); }
function toggleFaq(el) { const content = el.querySelector('div.max-h-0'); const icon = el.querySelector('span'); if (content.style.maxHeight) { content.style.maxHeight = null; icon.style.transform = "rotate(0deg)"; } else { document.querySelectorAll('div.max-h-0').forEach(d => d.style.maxHeight = null); document.querySelectorAll('span.transform').forEach(s => s.style.transform = "rotate(0deg)"); content.style.maxHeight = content.scrollHeight + "px"; icon.style.transform = "rotate(180deg)"; } }
function detectOSForVoice() { const ua = navigator.userAgent; if (/Android/i.test(ua)) finalSpeech = "Android System Detected. Access Granted."; else if (/iPhone|iPad|iPod/i.test(ua)) finalSpeech = "iOS Device Verified. Welcome to the Network."; else if (/Win/i.test(ua)) finalSpeech = "Windows System Detected. Security Level 0. Welcome back."; else finalSpeech = "System Online. Welcome to Jasa Kimjong."; }
function speakAI(text) { if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); const msg = new SpeechSynthesisUtterance(); msg.text = text; msg.volume = 1; msg.rate = 0.9; msg.pitch = 0.8; msg.lang = 'en-US'; const voices = window.speechSynthesis.getVoices(); const robotVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Male')); if (robotVoice) msg.voice = robotVoice; window.speechSynthesis.speak(msg); } }
function initParticles() { if(typeof particlesJS !== 'undefined') { particlesJS("particles-js", { "particles": { "number": { "value": 60 }, "color": { "value": "#06b6d4" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5 }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#06b6d4", "opacity": 0.4 }, "move": { "enable": true, "speed": 2 } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" } } } }); } }
const words = ["FUTURE", "EMPIRE", "LEGACY", "SYSTEM"]; let wordIndex = 0; let charIndex = 0; let isDeleting = false; const typeEl = document.getElementById('hero-type'); function initTypewriter() { if(!typeEl) return; const currentWord = words[wordIndex]; if(isDeleting) typeEl.innerText = currentWord.substring(0, charIndex--); else typeEl.innerText = currentWord.substring(0, charIndex++); let speed = isDeleting ? 100 : 200; if(!isDeleting && charIndex === currentWord.length) { speed = 2000; isDeleting = true; } else if(isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; speed = 500; } setTimeout(initTypewriter, speed); }
const cursor = document.getElementById('cursor-hud'); document.addEventListener('mousemove', e => { if(cursor) { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; } }); document.querySelectorAll('a, button, .tilt-card').forEach(el => { el.addEventListener('mouseenter', () => { if(cursor) cursor.classList.add('hover-active'); document.getElementById('hoverSound').play().catch(e=>{}); }); el.addEventListener('mouseleave', () => { if(cursor) cursor.classList.remove('hover-active'); }); });
let currProd="", currPrice=0, bump=false; function openCheckout(p, pr) { currProd=p; currPrice=pr; bump=false; renderCheckout(); document.getElementById('checkout-modal').style.display='flex'; } function renderCheckout() { let tot=currPrice; if(bump) tot+=50000; document.getElementById('checkout-content').innerHTML = ` <div class="text-center mb-6"><h3 class="text-cyan-500 font-black text-xl tracking-widest">ORDER FORM</h3></div> <div class="space-y-4 mb-6"><div class="p-3 bg-gray-900 border border-cyan-500/30 text-white font-mono text-center text-xs">ITEM: ${currProd}</div><input type="text" id="buyer-name" placeholder="Nama Lengkap" class="w-full bg-black border border-gray-700 text-white p-3 outline-none focus:border-cyan-500 text-center text-sm"><select id="pay-method" class="w-full bg-black border border-gray-700 text-white p-3 outline-none text-center text-sm"><option value="DANA">DANA</option><option value="GOPAY">GOPAY</option><option value="BCA">BCA</option></select></div> <div class="bg-yellow-900/20 border border-dashed border-yellow-600 p-3 rounded mb-6 text-left cursor-pointer hover:bg-yellow-900/40 transition" onclick="toggleBump()"><div class="flex items-center gap-3"><div class="w-5 h-5 border border-gold rounded flex items-center justify-center bg-black">${bump?'<div class="w-3 h-3 bg-gold rounded-sm"></div>':''}</div><div><div class="text-white text-xs font-bold">🔥 TAMBAH SOURCE CODE?</div><div class="text-[9px] text-gray-400">File mentahan (Editable). <span class="text-green-400">Rp 50.000</span></div></div></div></div> <div class="flex justify-between items-center border-t border-gray-800 pt-4"><div class="text-white font-bold text-xl">Rp ${tot.toLocaleString('id-ID')}</div><button onclick="processFinalOrder()" class="bg-cyan-500 text-black font-black px-6 py-2 hover:bg-white transition uppercase text-xs sfx-click shadow-lg">KIRIM WA</button></div>`; } function toggleBump() { bump=!bump; renderCheckout(); } function processFinalOrder() { const name=document.getElementById('buyer-name').value; if(!name) { alert("Isi Nama!"); return; } let tot=currPrice; let item=currProd; if(bump) { tot+=50000; item+=" + SOURCE CODE"; } document.getElementById('checkout-content').innerHTML = `<div class="text-center py-8"><div class="text-cyan-500 font-bold text-sm mb-4 animate-pulse">GENERATING INVOICE...</div><div class="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-2"><div class="loader-bar"></div></div></div>`; setTimeout(()=>{ window.location.href=`https://wa.me/${WA_NUMBER}?text=ORDER%0A👤 ${name}%0A📦 ${item}%0A💰 Rp ${tot.toLocaleString('id-ID')}`; }, 1500); } function calcPrice() { const t = parseInt(document.getElementById('projectType').value) + parseInt(document.getElementById('addonType').value); document.getElementById('totalPrice').innerText = t>0 ? "Rp "+t.toLocaleString('id-ID') : "Rp 0"; } function triggerOrder() { const p = document.getElementById('projectType'); if(p.value==0) { alert("Pilih paket!"); return; } openCheckout(p.options[p.selectedIndex].text, parseInt(p.value) + parseInt(document.getElementById('addonType').value)); }
function initSalesTicker() { setInterval(()=>{ const names=["Alex","Budi","Dimas","Sarah"]; const prods=["Bot Telegram","Web Store","Python Script"]; const n=names[Math.floor(Math.random()*names.length)]; const p=prods[Math.floor(Math.random()*prods.length)]; const t=document.getElementById('social-toast'); if(t) { document.getElementById('toast-name').innerText=`User: ${n}`; document.getElementById('toast-product').innerText=p; t.classList.remove('-translate-x-[200%]'); document.getElementById('chaChing').play().catch(e=>{}); setTimeout(()=>t.classList.add('-translate-x-[200%]'),4000); } }, 12000); } function initWAWidget() { setTimeout(()=>{ const b=document.getElementById('wa-bubble'); if(b) { b.classList.remove('opacity-0', 'translate-y-4'); document.getElementById('notifSound').play().catch(e=>{}); setTimeout(()=>b.classList.add('opacity-0'), 10000); } }, 5000); }
const bgMusic=document.getElementById('bgMusic'); if(bgMusic) bgMusic.volume=0.3; let isPlaying=false; function toggleMusic() { if(isPlaying){bgMusic.pause();}else{bgMusic.play();} isPlaying=!isPlaying; } document.querySelectorAll('.sfx-click').forEach(el => el.addEventListener('click', () => document.getElementById('clickSound').play().catch(e=>{})));
function initMatrix() { const canvas = document.getElementById('matrix-canvas'); const ctx = canvas.getContext('2d'); canvas.width = window.innerWidth; canvas.height = window.innerHeight; const chars = "01"; const fontSize = 14; const columns = canvas.width / fontSize; const drops = []; for(let x=0; x<columns; x++) drops[x] = 1; function draw() { ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = "#0F0"; ctx.font = fontSize + "px monospace"; for(let i=0; i<drops.length; i++) { const text = chars.charAt(Math.floor(Math.random() * chars.length)); ctx.fillText(text, i*fontSize, drops[i]*fontSize); if(drops[i]*fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0; drops[i]++; } } setInterval(draw, 33); }
function startVoice() { document.getElementById('voice-hud').classList.remove('hidden'); document.getElementById('voice-hud').classList.add('flex'); const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; if(SpeechRecognition) { const recognition = new SpeechRecognition(); recognition.lang = 'en-US'; recognition.start(); recognition.onresult = (e) => { const cmd = e.results[0][0].transcript.toLowerCase(); document.getElementById('voice-hud').classList.add('hidden'); if(cmd.includes('pricing') || cmd.includes('price')) document.getElementById('pricing').scrollIntoView(); else if(cmd.includes('hack')) triggerGodMode(); else if(cmd.includes('music')) toggleMusic(); else alert("UNKNOWN COMMAND: " + cmd); }; } else { alert("VOICE NOT SUPPORTED IN THIS BROWSER"); document.getElementById('voice-hud').classList.add('hidden'); } }
function initDestruct() { const overlay = document.getElementById('destruct-overlay'); const timer = document.getElementById('destruct-timer'); overlay.classList.remove('hidden'); overlay.classList.add('flex'); document.body.classList.add('shake-hard'); document.getElementById('destructSound').play().catch(e=>{}); let t = 5; const interval = setInterval(() => { t--; timer.innerText = t; if(t <= 0) { clearInterval(interval); document.body.innerHTML = "<div class='h-screen flex items-center justify-center bg-black text-red-500 font-mono'>SYSTEM PURGED. REBOOTING...</div>"; setTimeout(() => location.reload(), 3000); } }, 1000); }
function startBio() { const fill = document.getElementById('bio-fill'); fill.style.transition = "width 2s linear"; fill.style.width = "100%"; document.getElementById('accessSound').play().catch(e=>{}); bioTimer = setTimeout(() => { triggerOrder(); fill.style.transition = "none"; fill.style.width = "0"; }, 2000); } function endBio() { clearTimeout(bioTimer); const fill = document.getElementById('bio-fill'); fill.style.transition = "width 0.2s ease-out"; fill.style.width = "0"; document.getElementById('accessSound').pause(); document.getElementById('accessSound').currentTime = 0; }
function openCmd() { const modal = document.getElementById('cmd-modal'); const box = document.getElementById('cmd-box'); const input = document.getElementById('cmd-input'); modal.classList.remove('hidden'); modal.classList.add('flex'); setTimeout(() => { box.classList.add('open'); box.classList.remove('scale-95', 'opacity-0'); input.focus(); }, 10); renderCmds(COMMANDS); } function closeCmd(e) { if(e.target.id === 'cmd-modal') { document.getElementById('cmd-modal').classList.add('hidden'); document.getElementById('cmd-box').classList.remove('open'); } } function filterCmd() { const val = document.getElementById('cmd-input').value.toUpperCase(); const filtered = COMMANDS.filter(c => c.cmd.includes(val)); renderCmds(filtered); if(event.key === 'Enter' && filtered.length > 0) { filtered[0].action(); document.getElementById('cmd-modal').classList.add('hidden'); } } function renderCmds(list) { document.getElementById('cmd-results').innerHTML = list.map(c => `<div class="flex justify-between p-2 hover:bg-cyan-900/30 cursor-pointer border border-transparent hover:border-cyan-500/30" onclick="(${c.action})()"><span class="text-white font-bold">${c.cmd}</span><span class="text-gray-500 text-sm">${c.desc}</span></div>`).join(''); }
function resetIdleTimer() { idleTime = 0; document.getElementById('sleep-mode').classList.add('opacity-0'); }
