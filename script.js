const WA_NUMBER = "6281225980437";

let finalSpeech = "System Online. Welcome to Jasa Kimjong."; // DEFAULT BARU

window.addEventListener('load', () => {
    detectOSForVoice();
    setTimeout(() => document.getElementById('boot-bar').style.width = "100%", 100);
    setTimeout(() => document.getElementById('start-btn').classList.remove('hidden'), 2000);

    setInterval(() => {
        document.getElementById('cpu-val').innerText = Math.floor(Math.random() * 30 + 10) + "%";
        document.getElementById('cpu-bar').style.width = Math.floor(Math.random() * 30 + 10) + "%";
    }, 1500);

    document.getElementById('start-btn').addEventListener('click', () => {
        document.getElementById('bootSound').play().catch(e => {});
        
        // --- SUARA BARU ---
        speakAI(finalSpeech); 
        // ------------------

        const screen = document.getElementById('boot-screen');
        screen.style.transition = "opacity 0.8s";
        screen.style.opacity = "0";
        setTimeout(() => {
            screen.remove();
            initParticles();
            initTypewriter();
            initWAWidget();
            initSalesTicker();
        }, 800);
    });
});

function detectOSForVoice() {
    const ua = navigator.userAgent;
    if (/Android/i.test(ua)) { finalSpeech = "Android System Detected. Access Granted."; } 
    else if (/iPhone|iPad|iPod/i.test(ua)) { finalSpeech = "iOS Device Verified. Welcome to the Network."; } 
    else if (/Win/i.test(ua)) { finalSpeech = "Windows System Detected. Security Level 0. Welcome back."; } 
    else { finalSpeech = "System Online. Welcome to Jasa Kimjong."; } // Fallback Name
}

function speakAI(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance();
        msg.text = text; msg.volume = 1; msg.rate = 0.9; msg.pitch = 0.8; msg.lang = 'en-US';
        const voices = window.speechSynthesis.getVoices();
        const robotVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Male'));
        if (robotVoice) msg.voice = robotVoice;
        window.speechSynthesis.speak(msg);
    }
}

function initParticles() {
    if(typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": { "number": { "value": 60 }, "color": { "value": "#06b6d4" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5 }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#06b6d4", "opacity": 0.4 }, "move": { "enable": true, "speed": 2 } },
            "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" } } }
        });
    }
}

const words = ["FUTURE", "EMPIRE", "LEGACY", "SYSTEM"];
let wordIndex = 0; let charIndex = 0; let isDeleting = false;
const typeEl = document.getElementById('hero-type');
function initTypewriter() {
    if(!typeEl) return;
    const currentWord = words[wordIndex];
    if(isDeleting) { typeEl.innerText = currentWord.substring(0, charIndex--); } 
    else { typeEl.innerText = currentWord.substring(0, charIndex++); }
    let speed = isDeleting ? 100 : 200;
    if(!isDeleting && charIndex === currentWord.length) { speed = 2000; isDeleting = true; }
    else if(isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; speed = 500; }
    setTimeout(initTypewriter, speed);
}

const cursor = document.getElementById('cursor-hud');
document.addEventListener('mousemove', e => { if(cursor) { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; } });
document.querySelectorAll('a, button, .tilt-card').forEach(el => {
    el.addEventListener('mouseenter', () => { if(cursor) cursor.classList.add('hover-active'); document.getElementById('hoverSound').play().catch(e=>{}); });
    el.addEventListener('mouseleave', () => { if(cursor) cursor.classList.remove('hover-active'); });
});

let currProd="", currPrice=0, bump=false;
function openCheckout(p, pr) { currProd=p; currPrice=pr; bump=false; renderCheckout(); document.getElementById('checkout-modal').style.display='flex'; }
function renderCheckout() {
    let tot=currPrice; if(bump) tot+=50000;
    document.getElementById('checkout-content').innerHTML = `
        <div class="text-center mb-6"><h3 class="text-cyan-500 font-black text-xl tracking-widest">ORDER FORM</h3></div>
        <div class="space-y-4 mb-6"><div class="p-3 bg-gray-900 border border-cyan-500/30 text-white font-mono text-center text-xs">ITEM: ${currProd}</div><input type="text" id="buyer-name" placeholder="Nama Lengkap" class="w-full bg-black border border-gray-700 text-white p-3 outline-none focus:border-cyan-500 text-center text-sm"><select id="pay-method" class="w-full bg-black border border-gray-700 text-white p-3 outline-none text-center text-sm"><option value="DANA">DANA</option><option value="GOPAY">GOPAY</option><option value="BCA">BCA</option></select></div>
        <div class="bg-yellow-900/20 border border-dashed border-yellow-600 p-3 rounded mb-6 text-left cursor-pointer hover:bg-yellow-900/40 transition" onclick="toggleBump()"><div class="flex items-center gap-3"><div class="w-5 h-5 border border-gold rounded flex items-center justify-center bg-black">${bump?'<div class="w-3 h-3 bg-gold rounded-sm"></div>':''}</div><div><div class="text-white text-xs font-bold">🔥 TAMBAH SOURCE CODE?</div><div class="text-[9px] text-gray-400">File mentahan (Editable). <span class="text-green-400">Rp 50.000</span></div></div></div></div>
        <div class="flex justify-between items-center border-t border-gray-800 pt-4"><div class="text-white font-bold text-xl">Rp ${tot.toLocaleString('id-ID')}</div><button onclick="processFinalOrder()" class="bg-cyan-500 text-black font-black px-6 py-2 hover:bg-white transition uppercase text-xs sfx-click shadow-lg">KIRIM WA</button></div>`;
}
function toggleBump() { bump=!bump; renderCheckout(); }
function processFinalOrder() {
    const name=document.getElementById('buyer-name').value; if(!name) { alert("Isi Nama!"); return; }
    let tot=currPrice; let item=currProd; if(bump) { tot+=50000; item+=" + SOURCE CODE"; }
    document.getElementById('checkout-content').innerHTML = `<div class="text-center py-8"><div class="text-cyan-500 font-bold text-sm mb-4 animate-pulse">GENERATING INVOICE...</div><div class="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-2"><div class="loader-bar"></div></div></div>`;
    setTimeout(()=>{ window.location.href=`https://wa.me/${WA_NUMBER}?text=ORDER%0A👤 ${name}%0A📦 ${item}%0A💰 Rp ${tot.toLocaleString('id-ID')}`; }, 1500);
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

function initSalesTicker() {
    setInterval(()=>{
        const names=["Alex","Budi","Dimas","Sarah"]; const prods=["Bot Telegram","Web Store","Python Script"];
        const n=names[Math.floor(Math.random()*names.length)]; const p=prods[Math.floor(Math.random()*prods.length)];
        const t=document.getElementById('social-toast');
        if(t) {
            document.getElementById('toast-name').innerText=`User: ${n}`; document.getElementById('toast-product').innerText=p;
            t.classList.remove('-translate-x-[200%]'); 
            document.getElementById('chaChing').play().catch(e=>{});
            setTimeout(()=>t.classList.add('-translate-x-[200%]'),4000);
        }
    }, 12000);
}
function initWAWidget() { 
    setTimeout(()=>{
        const b=document.getElementById('wa-bubble');
        if(b) {
            b.classList.remove('opacity-0', 'translate-y-4'); 
            document.getElementById('notifSound').play().catch(e=>{}); 
            setTimeout(()=>b.classList.add('opacity-0'), 10000);
        }
    }, 5000); 
}

const bgMusic=document.getElementById('bgMusic'); if(bgMusic) bgMusic.volume=0.3; let isPlaying=false;
function toggleMusic() { if(isPlaying){bgMusic.pause();}else{bgMusic.play();} isPlaying=!isPlaying; }
document.querySelectorAll('.sfx-click').forEach(el => el.addEventListener('click', () => document.getElementById('clickSound').play().catch(e=>{})));
