const WA_NUMBER = "6281225980437";
let isGodMode = false;
let isDestroyed = false;
let interactionScore = 0;
let currentMood = 'neutral';
let timeDilationFactor = 1.0;
let isMusicPlaying = false;

const themes = {
  cyan: { neon: '#06b6d4', bg: '#020202' },
  pink: { neon: '#d946ef', bg: '#0f0518' },
  green: { neon: '#22c55e', bg: '#051005' },
  red: { neon: '#ef4444', bg: '#100505' }
};

let audioContext, analyser, dataArray, source;

window.addEventListener('load', async () => {

  await initNeuralHandshake();

  initStarfield();
  initMatrix();
  initTrue3DTilt();
  initWebWeaver();
  initQuantumCursor();
  initMoodDetector();
  initTimeDilation();
  initOrbOfPower();
  initEqualizerUI();
  initEncryptionVisualizer();
  initSfx();
  initScrollDNA();
  initNavbarBehavior();
  initBackToTop();
  initKeyboardShortcuts();
  initCryptoTicker();
  initResourceMonitor();
});

// ========= NEURAL HANDSHAKE INTRO =========
async function initNeuralHandshake() {
  const core = document.getElementById('core-reactor');
  const bar = document.getElementById('handshake-bar');
  const instruction = document.getElementById('hold-instruction');
  const status = document.getElementById('status-text');
  const title = document.querySelector('.glitch-text');
  const energy = document.getElementById('core-energy');
  const icon = document.getElementById('core-icon');
  const ignitionSound = document.getElementById('ignition-sound');
  const humSound = document.getElementById('hum-sound');
  const canvas = document.getElementById('intro-particles');
  const ctx = canvas.getContext('2d');
  
  canvas.width = 300; canvas.height = 300;
  let particles = []; let isCharging = false; let chargeLevel = 0; let holdTimer = null; let audioStarted = false;

  class Particle {
    constructor() { this.reset(); }
    reset() { const angle = Math.random() * Math.PI * 2; const radius = 60 + Math.random() * 40; this.x = Math.cos(angle) * radius + 150; this.y = Math.sin(angle) * radius + 150; this.vx = (Math.random() - 0.5) * 2; this.vy = (Math.random() - 0.5) * 2; this.life = 1; this.size = Math.random() * 2 + 1; }
    update(suction) {
      if(suction) { const dx = 150 - this.x; const dy = 150 - this.y; const dist = Math.sqrt(dx*dx + dy*dy); if(dist>5) { this.x += (dx/dist)*5; this.y += (dy/dist)*5; } this.life -= 0.02; }
      else { this.x += this.vx; this.y += this.vy; if(this.x<100||this.x>200)this.vx*=-1; if(this.y<100||this.y>200)this.vy*=-1; }
      if(this.life<=0) this.reset();
    }
    draw() { ctx.fillStyle = `rgba(6, 182, 212, \({this.life})`; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill(); }
  }

  for(let i=0;i<50;i++) particles.push(new Particle());
  function animateParticles(suction) { ctx.clearRect(0,0,300,300); particles.forEach(p=>{p.update(suction);p.draw();}); if(!isDestroyed) requestAnimationFrame(()=>animateParticles(suction)); }
  animateParticles(false);

  const startCharge = (e) => { if(e.type==='touchstart')e.preventDefault(); if(isCharging||chargeLevel>=100)return; isCharging=true; instruction.innerText="SYNCING NEURAL LINK..."; instruction.classList.remove('animate-pulse'); status.innerText="ENERGY ABSORPTION: 0%"; core.classList.add('core-charging'); icon.innerHTML='<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>'; if(!audioStarted){humSound.volume=0.3;humSound.play().catch(()=>{});audioStarted=true;} const startTime=Date.now(); holdTimer=setInterval(()=>{ const elapsed=Date.now()-startTime; chargeLevel=Math.min((elapsed/2500)*100,100); bar.style.width=`\){chargeLevel}%`; energy.style.opacity=chargeLevel/100; status.innerText=`ENERGY ABSORPTION: \({Math.floor(chargeLevel)}%`; if(chargeLevel>=100) completeIgnition(); },16); };

  const stopCharge = () => { if(chargeLevel>=100)return; isCharging=false; clearInterval(holdTimer); instruction.innerText="HANDSHAKE INTERRUPTED"; instruction.classList.add('animate-pulse'); status.innerText="RE-INITIATING..."; core.classList.remove('core-charging'); setTimeout(()=>{if(chargeLevel<100){bar.style.width="0%";energy.style.opacity=0;chargeLevel=0;instruction.innerText="HOLD TO INITIATE HANDSHAKE";status.innerText="AWAITING ENERGY INPUT...";}},500); humSound.pause(); humSound.currentTime=0; };

  const completeIgnition = () => {
    clearInterval(holdTimer); isCharging=false; chargeLevel=100; core.classList.remove('core-charging'); core.style.borderColor="#22c55e"; core.style.boxShadow="0 0 100px #22c55e, 0 0 200px #fff"; icon.innerHTML='<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>'; icon.classList.add('text-green-500'); instruction.innerText="IGNITION SEQUENCE STARTED"; status.innerText="SYSTEM ONLINE"; title.innerText="SYSTEM ONLINE"; title.classList.add('text-online'); title.setAttribute('data-text','SYSTEM ONLINE'); humSound.pause(); ignitionSound.volume=0.6; ignitionSound.play(); const flash = document.createElement('div'); flash.className='ignition-flash'; document.getElementById('boot-screen').appendChild(flash); setTimeout(()=>{ const bootScreen = document.getElementById('boot-screen'); bootScreen.style.opacity="0"; bootScreen.style.pointerEvents="none"; setTimeout(()=>{ bootScreen.remove(); document.getElementById('main-content').classList.remove('opacity-0','pointer-events-none'); document.getElementById('chatbot-btn').classList.remove('hidden'); document.getElementById('audio-controls').classList.remove('hidden'); initTypewriter(); bindCursorHoverTargets(); },1000); },800);
  };

  core.addEventListener('mousedown', startCharge);
  core.addEventListener('touchstart', startCharge, {passive:false});
  window.addEventListener('mouseup', stopCharge);
  window.addEventListener('touchend', stopCharge);
  window.addEventListener('mouseleave', stopCharge);
}

// ========= ALL OTHER FUNCTIONS =========
function triggerNotification(msg){const s=document.getElementById('sat-status'); if(s){const orig=s.innerText; s.innerText=msg; s.classList.add('text-yellow-400'); setTimeout(()=>{s.innerText=orig;s.classList.remove('text-yellow-400');},2000);}}
const words=["FUTURE","EMPIRE","LEGACY","SYSTEM"]; let wI=0,cI=0,del=false;
function initTypewriter() { const el=document.getElementById('hero-type'); if(!el)return; const w=words[wI]; if(del) el.innerText=w.substring(0,cI--); else el.innerText=w.substring(0,cI++); let sp=del?100:200; if(!del&&cI===w.length){sp=2000;del=true;} else if(del&&cI===0){del=false;wI=(wI+1)%words.length;sp=500;} setTimeout(initTypewriter,sp); }
function bindCursorHoverTargets() { document.querySelectorAll('a,button,.tilt-card').forEach(el=>{ el.addEventListener('mouseenter',()=>{if(document.getElementById('cursor-hud'))document.getElementById('cursor-hud').classList.add('hover-active');}); el.addEventListener('mouseleave',()=>{if(document.getElementById('cursor-hud'))document.getElementById('cursor-hud').classList.remove('hover-active');}); }); }
function openCheckout(p,pr){currProd=p;currPrice=pr; triggerNotification("ORDER INITIATED"); }
function processFinalOrder(){window.location.href=`https://wa.me/\){WA_NUMBER}?text=\({encodeURIComponent(`ORDER\n📦 \){currProd}\n💰 Rp \({currPrice.toLocaleString('id-ID')}`)}`;}
function toggleMusic(){const audio=document.getElementById('bgMusic'); if(!audio)return; if(isMusicPlaying){audio.pause();isMusicPlaying=false;document.getElementById('music-toggle').classList.remove('bg-white');document.getElementById('music-toggle').classList.add('bg-cyan-500');}else{if(!audioContext){audioContext=new (window.AudioContext||window.webkitAudioContext);analyser=audioContext.createAnalyser();source=audioContext.createMediaElementSource(audio);source.connect(analyser);analyser.connect(audioContext.destination);analyser.fftSize=256;dataArray=new Uint8Array(analyser.frequencyBinCount);initAudioVisualizerLogic();} audio.play();isMusicPlaying=true;document.getElementById('music-toggle').classList.remove('bg-cyan-500');document.getElementById('music-toggle').classList.add('bg-white');triggerNotification("AUDIO ACTIVE");}}
function initAudioVisualizerLogic(){function draw(){requestAnimationFrame(draw);if(!analyser)return;analyser.getByteFrequencyData(dataArray);const bars=document.querySelectorAll('#eq-bars div');bars.forEach((bar,i)=>{const val=dataArray[i*10]||0;bar.style.height=`\){(val/255)*32}px`;});}draw();}
function initStarfield(){const canvas=document.getElementById('starfield-canvas');if(!canvas)return;const ctx=canvas.getContext('2d');canvas.width=window.innerWidth;canvas.height=window.innerHeight;let stars=[];for(let i=0;i<400;i++)stars.push({x:Math.random()*canvas.width-canvas.width/2,y:Math.random()*canvas.height-canvas.height/2,z:Math.random()*canvas.width});function draw(){ctx.fillStyle='rgba(2,2,2,0.3)';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--neon');const cx=canvas.width/2;const cy=canvas.height/2;stars.forEach(star=>{star.z-=10;if(star.z<=0)star.z=canvas.width;const x=(star.x/star.z)*canvas.width+cx;const y=(star.y/star.z)*canvas.height+cy;const size=(1-star.z/canvas.width)*3;if(x>0&&x<canvas.width&&y>0&&y<canvas.height){ctx.beginPath();ctx.arc(x,y,size,0,Math.PI*2);ctx.fill();}});requestAnimationFrame(draw);}draw();}
function initTrue3DTilt(){const el=document.querySelectorAll('.parallax-text, .tilt-card');document.addEventListener('mousemove',(e)=>{const x=(e.clientX/window.innerWidth)-0.5;const y=(e.clientY/window.innerHeight)-0.5;el.forEach(el=>{const d=el.getAttribute('data-depth')||0.05;const mx=x*d*100;const my=y*d*100;el.style.transform=`translate(${mx}px, ${my}px) rotateY(\({x*5}deg) rotateX(\){-y*5}deg)`;});});}
function initWebWeaver(){const canvas=document.getElementById('neural-canvas');if(!canvas)return;const ctx=canvas.getContext('2d');canvas.width=window.innerWidth;canvas.height=window.innerHeight;let nodes=[];let mouse={x:null,y:null};window.addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY;if(Math.random()>0.9)nodes.push({x:mouse.x,y:mouse.y,life:100});});function animate(){ctx.clearRect(0,0,canvas.width,canvas.height);for(let i=0;i<nodes.length;i++){nodes[i].life-=1;if(nodes[i].life<=0){nodes.splice(i,1);i--;}} requestAnimationFrame(animate);} animate();}
function initQuantumCursor(){const pair=document.getElementById('quantum-pair');if(!pair)return;pair.classList.remove('hidden');document.addEventListener('mousemove',e=>{pair.style.left=(window.innerWidth-e.clientX)+'px';pair.style.top=(window.innerHeight-e.clientY)+'px';});}
function initMoodDetector(){let last=Date.now();document.addEventListener('click',()=>{interactionScore+=2;last=Date.now();});document.addEventListener('keydown',()=>{interactionScore+=1;last=Date.now();});window.addEventListener('scroll',()=>{interactionScore+=0.5;last=Date.now();},{passive:true});setInterval(()=>{if(Date.now()-last>5000)interactionScore=Math.max(0,interactionScore-1);if(interactionScore>50)currentMood='aggressive';else if(interactionScore<10)currentMood='calm';else currentMood='neutral';},1000);}
function initTimeDilation(){const td=document.getElementById('time-dilation');setInterval(()=>{if(isMusicPlaying&&interactionScore>40){timeDilationFactor=0.5;document.documentElement.style.setProperty('--animation-speed','0.5');if(td)td.innerText="0.5x";}else{timeDilationFactor=1.0;document.documentElement.style.setProperty('--animation-speed','1.0');if(td)td.innerText="1.0x";}},2000);}
function initOrbOfPower(){}
function initEqualizerUI(){document.getElementById('music-toggle').addEventListener('click',toggleMusic);}
function initEncryptionVisualizer(){document.querySelectorAll('.typing-input').forEach(i=>{i.addEventListener('input',()=>triggerNotification("DATA ENCRYPTED"));});}
function initSfx(){const s=document.getElementById('clickSound');document.querySelectorAll('.sfx-click').forEach(el=>{el.addEventListener('click',()=>{try{s.currentTime=0;s.play();}catch(e){}});});}
function initScrollDNA(){const d=document.getElementById('scroll-dna');window.addEventListener('scroll',()=>{const p=window.scrollY/(document.body.scrollHeight-window.innerHeight);d.style.height=`\({Math.min(100,Math.max(0,p*100))}%`;},{passive:true});}
function initNavbarBehavior(){const n=document.getElementById('main-nav');let ly=0;window.addEventListener('scroll',()=>{const y=window.scrollY;if(y>30)n.classList.add('nav-scrolled');else n.classList.remove('nav-scrolled');if(y>ly&&y>120)n.style.transform="translateY(-120%)";else n.style.transform="translateY(0)";ly=y;},{passive:true});}
function initBackToTop(){const b=document.getElementById('backToTop');window.addEventListener('scroll',()=>{if(window.scrollY>500)b.classList.remove('hidden');else b.classList.add('hidden');},{passive:true});b.addEventListener('click',()=>window.scrollTo({top:0,behavior:"smooth"}));}
function initKeyboardShortcuts(){document.addEventListener('keydown',e=>{if(e.key==="Escape")document.getElementById('checkout-modal')?.style.display='none';if(e.key.toLowerCase()==="m")toggleMusic();});}
async function initCryptoTicker(){try{const res=await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd');const d=await res.json();document.getElementById('crypto-ticker').innerHTML=`<span class="text-yellow-500">BTC: $${d.bitcoin.usd.toLocaleString()}</span><span class="text-gray-500">|</span><span class="text-orange-500">ETH: $${d.ethereum.usd.toLocaleString()}</span><span class="text-gray-500">|</span><span class="text-cyan-500">SOL: $${d.solana.usd.toLocaleString()}</span>`;}catch(e){}}
function initResourceMonitor(){const cpu=document.getElementById('cpu-load');const mem=document.getElementById('mem-load');const evo=document.getElementById('evo-level');setInterval(()=>{cpu.innerText=Math.floor(10+Math.random()*15)+"%";mem.innerText=Math.floor(20+Math.random()*10)+"%";let l=1;if(interactionScore>30)l=2;if(interactionScore>60)l=3;if(evo)evo.innerText=l;},2000);}
function setTheme(n){const t=themes[n];document.documentElement.style.setProperty('--neon',t.neon);document.documentElement.style.setProperty('--bg',t.bg);triggerNotification(`THEME: \){n.toUpperCase()}`);}
let currProd="",currPrice=0;