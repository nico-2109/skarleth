// --- CONFIGURACIÓN INICIAL ---
const fechaAniversario = "2026-05-01T00:00:00"; // Cambia el año al real de inicio

const razones = [
    "Amo tu risa escandalosa.",
    "Amo cómo brillas cuando hablas de lo que te gusta.",
    "Amo que seas mi novia.",
    "Amo lo inteligente que eres.",
    "Amo cada pequeño detalle de tu cara.",
    "Amo la paz que me das.",
    "Amo que me hagas sentir amado.",
    "Amo que me hagas reír incluso en los días difíciles.",
    "Amo que siempre estás ahí para mí.",
    "Amo que me aceptes tal como soy.",
    "Amo que me inspires a ser mejor cada día.",
    "Amo que me hagas sentir especial.",
    "Amo que compartamos sueños juntos.",
    "Amo que me hagas sentir seguro.",
    "Amo que me hagas sentir vivo.",
    "Amo que me hagas sentir completo.",
    "Amo que me hagas sentir amado incondicionalmente.",
    "Amo que me hagas sentir como en casa.",
    "Amo que me hagas sentir como el niño más afortunado del mundo."
];

function checkPassword() {
    const input = document.getElementById('password').value;
    if (input === "01/05") {
        const login = document.getElementById('login-screen');
        login.style.opacity = '0';
        setTimeout(() => {
            login.style.display = 'none';
            document.getElementById('main-content').classList.remove('hidden');
            initHeart();
            startLoveRain();
            updateTimer();
            setInterval(updateTimer, 1000);
            showNextReason();
        }, 500);
    } else {
        document.getElementById('error-msg').style.display = 'block';
    }
}

// --- CORAZÓN DE PARTÍCULAS ---
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: -1000, y: -1000, radius: 60 };

function updateMouse(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
    const clientY = (e.touches && e.touches[0]) ? e.touches[0].clientY : e.clientY;
    mouse.x = clientX - rect.left;
    mouse.y = clientY - rect.top;
}

window.addEventListener('mousemove', updateMouse);
window.addEventListener('touchstart', updateMouse);

function initHeart() {
    const isMobile = window.innerWidth < 600;
    canvas.width = isMobile ? 380 : 800; 
    canvas.height = isMobile ? 380 : 550;
    
    const center = { x: canvas.width / 2, y: canvas.height / 2 };
    const scale = isMobile ? 11 : 16; 

    const tempCanvas = document.createElement('canvas');
    const tCtx = tempCanvas.getContext('2d');
    tempCanvas.width = canvas.width; 
    tempCanvas.height = canvas.height;
    
    tCtx.fillStyle = 'white';
    const fontSize = isMobile ? 55 : 90;
    tCtx.font = `bold ${fontSize}px Arial`;
    tCtx.textAlign = 'center';
    tCtx.fillText('Skarleth', center.x, center.y + (fontSize/3));

    const imgData = tCtx.getImageData(0, 0, canvas.width, canvas.height).data;

    // Nombre
    for (let y = 0; y < canvas.height; y += 4) {
        for (let x = 0; x < canvas.width; x += 4) {
            if (imgData[(y * canvas.width + x) * 4] > 128) {
                particles.push(new Particle(x, y, '#e0aaff', true));
            }
        }
    }

    // Corazón
    for (let i = 0; i < (isMobile ? 1800 : 3500); i++) {
        let t = Math.random() * 2 * Math.PI;
        let r = Math.sqrt(Math.random());
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
        particles.push(new Particle(x * r * scale + center.x, y * r * scale + center.y, '#7b2cbf', false));
    }
    animate();
}

class Particle {
    constructor(x, y, color, isName) {
        this.baseX = x; this.baseY = y;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.color = color; 
        this.size = isName ? 1.5 : 1.2;
        this.density = (Math.random() * 25) + 5;
    }
    draw() {
        ctx.fillStyle = this.color; ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
    update() {
        let dx = mouse.x - this.x; let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < mouse.radius) {
            let force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx/dist) * force * this.density;
            this.y -= (dy/dist) * force * this.density;
        } else {
            this.x += (this.baseX - this.x) * 0.05;
            this.y += (this.baseY - this.y) * 0.05;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}

// --- FUNCIONES EXTRA ---
function updateTimer() {
    const start = new Date(fechaAniversario).getTime();
    const now = new Date().getTime();
    const diff = now - start;

    document.getElementById("days").innerText = Math.floor(diff / 86400000);
    document.getElementById("hours").innerText = Math.floor((diff / 3600000) % 24);
    document.getElementById("minutes").innerText = Math.floor((diff / 60000) % 60);
    document.getElementById("seconds").innerText = Math.floor((diff / 1000) % 60);
}

let reasonIdx = 0;
function showNextReason() {
    const el = document.getElementById("reasons-container");
    el.style.transition = "opacity 0.4s";
    el.style.opacity = 0;
    setTimeout(() => {
        el.innerText = razones[reasonIdx];
        el.style.opacity = 1;
        reasonIdx = (reasonIdx + 1) % razones.length;
    }, 400);
}

function startLoveRain() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('falling-heart');
        heart.innerHTML = '💜';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
    }, 400);

function initHeart() {
    // ... dentro de initHeart, cambia la fuente del Canvas también para que combine
    tCtx.font = `bold ${fontSize}px Fredoka`; // Cambiado Arial por Fredoka
    tCtx.textAlign = 'center';
    tCtx.fillText('Skarleth', center.x, center.y + (fontSize/3));
    // ...
}

}