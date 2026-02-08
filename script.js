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

const themes = {
  cyan: { neon: '#06b6d4', bg: '#020202' },
  pink: { neon: '#d946ef', bg: '#0f0518' },
  green: { neon: '#22c55e', bg: '#051005' },
  red: { neon: '#ef4444', bg: '#100505' }
};

let audioContext, analyser, dataArray, source;

window.addEventListener('load', async () => {
  // Langsung panggil semua init, karena tidak ada intro
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
  initEyeTrackingCursor();
  initTypingSound();
  initKonamiCode();
  initDestroyCode(); 
  initParallax();
  initCryptoTicker();
  initWeatherSystem();
  initResourceMonitor();
  initAudioVisualizer();
  initChatbot();
  initWebWeaver(); 
  initOrbOfPower();
  initTrue3DTilt();
  initEqualizerUI();
  initVortexScroll();
  initEncryptionVisualizer();
  initMoodDetector();
  initTimeDilation();
  
  initSfx();
  initScrollDNA();
  initNavbarBehavior();
  initBackToTop();
  initKeyboardShortcuts();
  initPricingPersistence();
  initTypewriter();
  bindCursorHoverTargets();
});

// ... (Paste SEMUA FUNGSI dari versi Ultimate Ascension di sini) ...
// ... (kecuali initFaceAuth dan initNeuralHandshake yang sudah tidak diperlukan) ...
// For brevity, here are the function stubs. Ensure you have the full functions from the previous response.

function initStarfield() { /* ... */ }
function initMatrix() { /* ... */ }
function startCountdown() { /* ... */ }
function initSatellite() { /* ... */ }
function initParticlesBg() { /* ... */ }
function initTilt() { /* ... */ }
function initTerminalLog() { /* ... */ }
function initGlitchEffect() { /* ... */ }
function initMouseTrail() { /* ... */ }
function initScreenshotShortcut() { /* ... */ }
function initClickExplosion() { /* ... */ }
function initEyeTrackingCursor() { /* ... */ }
function initTypingSound() { /* ... */ }
function initKonamiCode() { /* ... */ }
function activateGodMode() { /* ... */ }
function initDestroyCode() { /* ... */ }
function triggerSelfDestruct() { /* ... */ }
function initParallax() { /* ... */ }
function initCryptoTicker() { /* ... */ }
function initWeatherSystem() { /* ... */ }
function initResourceMonitor() { /* ... */ }
function initAudioVisualizer() { /* ... */ }
function initChatbot() { /* ... */ }
function initWebWeaver() { /* ... */ }
function initOrbOfPower() { /* ... */ }
function createShockwave() { /* ... */ }
function initTrue3DTilt() { /* ... */ }
function initEqualizerUI() { /* ... */ }
function toggleMusic() { /* ... */ }
function initAudioVisualizerLogic() { /* ... */ }
function initVortexScroll() { /* ... */ }
function initEncryptionVisualizer() { /* ... */ }
function initMoodDetector() { /* ... */ }
function initTimeDilation() { /* ... */ }
function triggerNotification(msg) { /* ... */ }
function initTypewriter() { /* ... */ }
function bindCursorHoverTargets() { /* ... */ }
function openCheckout(p, pr) { /* ... */ }
function closeCheckout() { /* ... */ }
function renderCheckout() { /* ... */ }
function processFinalOrder() { /* ... */ }
function calcPrice() { /* ... */ }
function initSfx() { /* ... */ }
function initScrollDNA() { /* ... */ }
function initNavbarBehavior() { /* ... */ }
function initBackToTop() { /* ... */ }
function initKeyboardShortcuts() { /* ... */ }
function initPricingPersistence() { /* ... */ }