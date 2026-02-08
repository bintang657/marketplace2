const WA_NUMBER = "6281225980437";

window.addEventListener('load', () => {
    // 1. Loading Bar Animation
    setTimeout(() => {
        document.getElementById('boot-bar').style.width = "100%";
    }, 100);

    // 2. Show Button Immediately after Loading
    setTimeout(() => {
        document.getElementById('start-btn').classList.remove('hidden');
    }, 1500);

    // 3. Matrix Rain Init
    initMatrix();
    startCountdown();
    initSatellite();

    // 4. Enter System Logic
    document.getElementById('start-btn').addEventListener('click', () => {
        // Try play sound, ignore if blocked
        try { document.getElementById('bootSound').play(); } catch(e) {}
        
        // Remove boot screen
        const screen = document.getElementById('boot-screen');
        screen.style.transition = "opacity 0.8s";
        screen.style.opacity = "0";
        
        setTimeout(() => {
            screen.remove();
            document.getElementById('main-content').classList.remove('opacity-0');
            initTypewriter();
        }, 800);
    });
});

// --- MATRIX RAIN ---
function initMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = "01";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    for(let x=0; x<columns; x++) drops[x] = 1;

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0F0";
        ctx.font = fontSize + "px monospace";
        for(let i=0; i<drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i*fontSize, drops[i]*fontSize);
            if(drops[i]*fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    setInterval(draw, 33);
}

// --- UTILS ---
function initSatellite() {
    setInterval(() => {
        const coords = document.getElementById('sat-coords');
        if(coords) {
            const lat = -6.200 + (Math.random() * 0.01 - 0.005);
            const lon = 106.845 + (Math.random() * 0.01 - 0.005);
            coords.innerText = `LAT: ${lat.toFixed(3)} | LON: ${lon.toFixed(3)}`;
        }
    }, 2000);
}

function startCountdown() {
    let time = 900;
    setInterval(() => {
        let m = Math.floor(time / 60); let s = time % 60;
        const cd = document.getElementById('countdown');
        if(cd) cd.innerText = `00:${m<10?'0'+m:m}:${s<10?'0'+s:s}`;
        if(time > 0) time--;
    }, 1000);
}

// --- TYPEWRITER ---
const words = ["FUTURE", "EMPIRE", "LEGACY", "SYSTEM"];
let wordIndex = 0; let charIndex = 0; let isDeleting = false;
function initTypewriter() {
    const typeEl = document.getElementById('hero-type');
    if(!typeEl) return;
    const currentWord = words[wordIndex];
    if(isDeleting) typeEl.innerText = currentWord.substring(0, charIndex--);
    else typeEl.innerText = currentWord.substring(0, charIndex++);
    let speed = isDeleting ? 100 : 200;
    if(!isDeleting && charIndex === currentWord.length) { speed = 2000; isDeleting = true; }
    else if(isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; speed = 500; }
    setTimeout(initTypewriter, speed);
}

// --- CURSOR ---
const cursor = document.getElementById('cursor-hud');
document.addEventListener('mousemove', e => { if(cursor) { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; } });
document.querySelectorAll('a, button, .tilt-card').forEach(el => {
    el.addEventListener('mouseenter', () => { if(cursor) cursor.classList.add('hover-active'); });
    el.addEventListener('mouseleave', () => { if(cursor) cursor.classList.remove('hover-active'); });
});

// --- CHECKOUT LOGIC ---
let currProd="", currPrice=0;
function openCheckout(p, pr) { currProd=p; currPrice=pr; renderCheckout(); document.getElementById('checkout-modal').style.display='flex'; }
function renderCheckout() {
    document.getElementById('checkout-content').innerHTML = `
        <div class="text-center mb-6"><h3 class="text-cyan-500 font-black text-xl tracking-widest">ORDER FORM</h3></div>
        <div class="space-y-4 mb-6">
            <div class="p-3 bg-gray-900 border border-cyan-500/30 text-white font-mono text-center text-xs">ITEM: ${currProd}</div>
            <input type="text" id="buyer-name" placeholder="Nama Lengkap" class="w-full bg-black border border-gray-700 text-white p-3 outline-none focus:border-cyan-500 text-center text-sm">
            <select id="pay-method" class="w-full bg-black border border-gray-700 text-white p-3 outline-none text-center text-sm"><option value="DANA">DANA</option><option value="GOPAY">GOPAY</option><option value="BCA">BCA</option></select>
        </div>
        <div class="flex justify-between items-center border-t border-gray-800 pt-4">
            <div class="text-white font-bold text-xl">Rp ${currPrice.toLocaleString('id-ID')}</div>
            <button onclick="processFinalOrder()" class="bg-cyan-500 text-black font-black px-6 py-2 hover:bg-white transition uppercase text-xs sfx-click shadow-lg">KIRIM WA</button>
        </div>`;
}
function processFinalOrder() {
    const name=document.getElementById('buyer-name').value;
    if(!name) { alert("Isi Nama!"); return; }
    setTimeout(()=>{ window.location.href=`https://wa.me/${WA_NUMBER}?text=ORDER%0A👤 ${name}%0A📦 ${currProd}%0A💰 Rp ${currPrice.toLocaleString('id-ID')}`; }, 1000);
}
function calcPrice() { 
    const t = parseInt(document.getElementById('projectType').value) + parseInt(document.getElementById('addonType').value); 
    document.getElementById('totalPrice').innerText = t>0 ? "Rp "+t.toLocaleString('id-ID') : "Rp 0"; 
}
function triggerOrder() { 
    const p = document.getElementById('projectType'); 
    if(p.value==0) { alert("Pilih paket!"); return; } 
    openCheckout(p.options[p.selectedIndex].text, parseInt(p.value) + parseInt(document.getElementById('addonType').value)); 
}

// --- MUSIC ---
const bgMusic=document.getElementById('bgMusic'); 
if(bgMusic) bgMusic.volume=0.3; 
let isPlaying=false; 
function toggleMusic() { if(isPlaying){bgMusic.pause();}else{bgMusic.play();} isPlaying=!isPlaying; }
