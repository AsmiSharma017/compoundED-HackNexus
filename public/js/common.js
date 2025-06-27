// Navbar HTML (reusable for all pages)
document.getElementById('navbar').innerHTML = `
  <a href="index.html">Home</a>
  <a href="dashboard.html">Dashboard</a>
  <a href="quiz.html">Quiz</a>
  <a href="glossary.html">Glossary</a>
  <a href="impact.html">Impact</a>
`;

// Multilingual support (add as needed)
const langData = { /* ...same as previous code... */ };
let currentLang = "en";
function updateLang() { /* ...same as previous code... */ }
function toggleLang() { /* ...same as previous code... */ }

// Modal logic for dashboard page
function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

// Confetti function (for quiz/dashboard)
function confetti() {
  const canvas = document.getElementById('confetti');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  canvas.style.display = '';
  let pieces = Array.from({length: 80}, () => ({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height/2,
    r: Math.random()*6+4,
    c: `hsl(${Math.random()*360},80%,60%)`,
    d: Math.random()*2+1
  }));
  let frame = 0;
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p => {
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 2*Math.PI);
      ctx.fillStyle = p.c; ctx.fill();
      p.y += p.d + Math.sin(frame/10 + p.x/100)*2;
    });
    frame++;
    if (frame < 60) requestAnimationFrame(draw);
    else canvas.style.display = 'none';
  }
  draw();
}
