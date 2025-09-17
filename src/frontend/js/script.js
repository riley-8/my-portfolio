
'use strict';

// --- MATRIX RAIN --- //
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width / fontSize;
const rainDrops = [];

for (let x = 0; x < columns; x++) {
  rainDrops[x] = 1;
}

const draw = () => {
  ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00ff88';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < rainDrops.length; i++) {
    const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

    if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      rainDrops[i] = 0;
    }
    rainDrops[i]++;
  }
};

setInterval(draw, 33);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


// --- TEXT SCRAMBLE EFFECT --- //
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// --- INTERSECTION OBSERVER FOR SCROLL ANIMATIONS --- //
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  const scrambleEl = document.querySelector('.text-scramble');
  if (scrambleEl) {
    const phrases = [
      'Systems Engineer',
      'Full-Stack Developer',
      'Game Designer',
      'Creative Technologist'
    ];
    const fx = new TextScramble(scrambleEl);
    let counter = 0;
    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 2000);
      });
      counter = (counter + 1) % phrases.length;
    };
    next();
  }

  document.querySelectorAll('section').forEach(section => {
    scrollObserver.observe(section);
  });

  const projectGrid = document.querySelector('.project-grid');
  if (projectGrid) {
    fetch('/projects') 
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      })
      .then(projects => {
        projectGrid.innerHTML = '';
        projects.forEach(project => {
          const card = document.createElement('div');
          card.className = 'project-card';
          
          let tagsHtml = project.tags.map(tag => `<span>${tag}</span>`).join('');
          let linksHtml = '';
          if (project.source_code_link) {
            linksHtml += `<a href="${project.source_code_link}" class="btn project-btn" target="_blank" rel="noopener noreferrer">Source</a>`;
          }
          if (project.live_demo_link) {
            linksHtml += `<a href="${project.live_demo_link}" class="btn project-btn" target="_blank" rel="noopener noreferrer">Demo</a>`;
          }

          card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.long_description}</p>
            <div class="project-tags">${tagsHtml}</div>
            <div class="project-links">${linksHtml}</div>
          `;
          projectGrid.appendChild(card);
        });
      })
      .catch(error => {
          console.error('Error loading projects:', error)
          const placeholder = document.querySelector('.project-card-placeholder');
          if(placeholder) {
              placeholder.textContent = "// ERROR: Could not load projects. Check console for details.";
          }
      });
  }

  // --- KND NAME ANIMATION --- //
  const nameEl = document.querySelector('.knd-name');
  const name = 'Kwazi Ngidi';
  const textSpan = document.createElement('span');
  const cursorSpan = document.createElement('span');
  cursorSpan.classList.add('cursor');
  nameEl.appendChild(textSpan);
  nameEl.appendChild(cursorSpan);

  async function kndAnimation() {
    nameEl.classList.remove('matrix-blink');
    textSpan.textContent = '';
    cursorSpan.style.opacity = '1';
    
    // Typing
    for (let i = 0; i < name.length; i++) {
      textSpan.textContent += name[i];
      await new Promise(resolve => setTimeout(resolve, 90));
    }
    
    // Set data-text for glitch effect
    nameEl.setAttribute('data-text', name);

    // Blinking with glitch
    let blinkCount = 0;
    const blinkInterval = setInterval(() => {
        
        if (cursorSpan.style.opacity === '0') {
            cursorSpan.style.opacity = '1';
            nameEl.classList.add('matrix-blink');
        } else {
            cursorSpan.style.opacity = '0';
            nameEl.classList.remove('matrix-blink');
        }
        
        blinkCount++;
      if (blinkCount === 10) { // 5 blinks (on and off)
        clearInterval(blinkInterval);
        
        // Deleting
        async function deleteAnimation() {
          nameEl.classList.remove('matrix-blink');
          for (let i = name.length; i >= 0; i--) {
            textSpan.textContent = name.substring(0, i);
            await new Promise(resolve => setTimeout(resolve, 150));
          }
          kndAnimation(); // Loop
        }
        deleteAnimation();
      }
    }, 500); // Sync with cursor blink animation
  }

  kndAnimation();
});
