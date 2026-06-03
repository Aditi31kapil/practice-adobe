// public/js/main.js

document.addEventListener('DOMContentLoaded', () => {
  let products = [];
  let currentStep = -1;
  let countdownTimer = null;
  let timeLeft = 15;
  let isRevealed = false;

  fetch('/api/products')
    .then(res => res.json())
    .then(data => {
      products = data;
      initPresentationDeck();
    });

  function initPresentationDeck() {
    document.getElementById('btn-next').addEventListener('click', advanceDeckSlide);
    document.getElementById('btn-prev').addEventListener('click', regressDeckSlide);
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') advanceDeckSlide();
      if (e.key === 'ArrowLeft') regressDeckSlide();
    });

    loadActiveSlide();
  }

  function loadActiveSlide() {
    // FIX: Removed clearAllRosterHighlights() from here! 
    // Now, previously illuminated product bubbles will remain permanently highlighted.

    if (currentStep === -1) {
      clearAllRosterHighlights(); // Only reset when resetting back to the very beginning onboarding screen
      renderWelcomeLandingScreen();
      return;
    }

    isRevealed = false;
    timeLeft = 15;
    document.getElementById('global-timer').textContent = "15s";
    document.getElementById('global-timer').style.visibility = "visible";
    
    const oldCanvas = document.querySelector('.animation-media-target canvas');
    if (oldCanvas && oldCanvas.dataset.animationId) {
      cancelAnimationFrame(parseInt(oldCanvas.dataset.animationId));
    }

    const p = products[currentStep];

    document.getElementById('canvas-container').style.display = '';
    document.getElementById('revealed-logo').style.display = 'none';
    document.getElementById('canvas-container').innerHTML = `<canvas id="cvs-${p.id}"></canvas>`;
    
    triggerCanvasModule(p.id);
    renderConsultantQuizClue(p);
    startSlideClock();
  }

  function renderWelcomeLandingScreen() {
    clearInterval(countdownTimer);
    document.getElementById('global-timer').style.visibility = "hidden";

    document.getElementById('canvas-container').innerHTML = `<img src="/images/Adobe.jpg" style="width:100%; height:100%; object-fit:cover;" alt="Adobe Core Identity">`;
    document.getElementById('canvas-container').style.display = 'flex';
    document.getElementById('revealed-logo').style.display = 'none';

    const view = document.getElementById('dynamic-placard');
    view.innerHTML = `
      <div style="animation: cleanPop 0.4s ease forwards; width: 100%;">
        <h1 class="welcome-header-title">Adobe Experience Cloud</h1>
        <div class="welcome-host-subtitle">Presenter: Aditi </div>
        <div class="clue-title" style="margin-top: 24px;">SUMMIT CHALLENGE RULES</div>
        <div class="rules-box-panel">
          <div class="rule-row-item">Each core puzzle vector maps directly to one letter of the <strong>A-D-O-B-E</strong> corporate framework.</div>
          <div class="rule-row-item">A strategic operational riddle will appear alongside a matching background hint simulation.</div>
          <div class="rule-row-item">The room has exactly <strong>15 seconds</strong> to identify the hidden product solution before the dashboard reveals data configurations.</div>
        </div>
      </div>
    `;
  }

  function triggerCanvasModule(productId) {
    const scriptId = `anim-script-${productId}`;
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `/js/animations/${productId}.js`;
      script.onload = () => runCanvasEngine(productId);
      document.body.appendChild(script);
    } else {
      runCanvasEngine(productId);
    }
  }

  function runCanvasEngine(id) {
    if (window.CosmosAnimations && window.CosmosAnimations[id]) {
      window.CosmosAnimations[id](`cvs-${id}`);
    }
  }

  function renderConsultantQuizClue(p) {
    const view = document.getElementById('dynamic-placard');
    view.style.setProperty('--slide-accent', p.accent);

    view.innerHTML = `
      <div style="animation: cleanPop 0.4s ease forwards;">
        <div class="letter-title-header" style="color: ${p.accent};">${p.letter}</div>
        <div class="action-keyword-subtitle">${p.keyword}</div>
        <div class="presentation-clue-text">"${p.clue}"</div>
      </div>
    `;
  }

  function startSlideClock() {
    clearInterval(countdownTimer);
    countdownTimer = setInterval(() => {
      timeLeft--;
      document.getElementById('global-timer').textContent = `${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(countdownTimer);
        revealProductStrategy();
      }
    }, 1000);
  }

  function revealProductStrategy() {
    if (isRevealed) return;
    isRevealed = true;
    clearInterval(countdownTimer);
    document.getElementById('global-timer').textContent = "REVEALED";

    const p = products[currentStep];

    document.getElementById('canvas-container').style.display = 'none';
    const logoImg = document.getElementById('revealed-logo');
    logoImg.src = p.logo;
    logoImg.style.display = 'block';

    // 2. Continuous Highlight Execution: Illuminate current item without touching previous states
    highlightRosterToken(p.rosterIndex, p.accent);

    const view = document.getElementById('dynamic-placard');
    const items = p.capabilities.map(c => `<li>${c}</li>`).join('');

    view.innerHTML = `
      <div class="placard-active" style="animation: cleanPop 0.4s ease forwards;">
        <h3 style="color:var(--text-muted)">LETTER "${p.letter}" ANALYSIS &bull; ${p.keyword}</h3>
        <h2>${p.name}</h2>
        <div class="tag-row">
          <span class="tag-item" style="color:${p.accent}; border-color:${p.accent}33;">${p.type}</span>
          <span class="tag-item">${p.category}</span>
        </div>

        <div style="margin-bottom: 12px;">
          <span style="font-size:10px; text-transform:uppercase; font-weight:700; color:var(--text-muted)">Strategic Focus:</span>
          <p style="font-size:13.5px; font-weight:600; color:#fff; margin-top:1px;">${p.focus}</p>
        </div>

        <div style="margin-bottom: 14px;">
          <span style="font-size:10px; text-transform:uppercase; font-weight:700; color:var(--text-muted)">Target Enterprise Profile:</span>
          <p style="font-size:13px; color:#94a3b8; margin-top:1px;">${p.audience}</p>
        </div>

        <ul class="consulting-bullet-list">${items}</ul>
      </div>
    `;
  }

  function highlightRosterToken(index, color) {
    const bubbles = document.querySelectorAll('.cloud-roster-grid .roster-bubble');
    if (bubbles[index]) {
      bubbles[index].classList.add('highlighted-token');
      bubbles[index].style.setProperty('--token-accent-color', color);
      bubbles[index].style.setProperty('--token-accent-shadow', color + '66');
    }
  }

  function clearAllRosterHighlights() {
    const bubbles = document.querySelectorAll('.cloud-roster-grid .roster-bubble');
    bubbles.forEach(b => {
      b.classList.remove('highlighted-token');
      b.style.removeProperty('--token-accent-color');
      b.style.removeProperty('--token-accent-shadow');
    });
  }

  function advanceDeckSlide() {
    if (currentStep === -1) {
      currentStep = 0;
      loadActiveSlide();
      return;
    }

    if (!isRevealed) {
      revealProductStrategy();
    } else {
      if (currentStep < products.length - 1) {
        currentStep++;
        loadActiveSlide();
      } else {
        renderCelebrationCard();
      }
    }
  }

  function regressDeckSlide() {
    if (currentStep > -1) {
      currentStep--;
      loadActiveSlide();
    }
  }

  function renderCelebrationCard() {
    clearInterval(countdownTimer);
    document.getElementById('global-timer').textContent = "FIN";
    
    // Clear out previous modules and inject a clean canvas canvas layer for the celebration bursts
    const mediaContainer = document.getElementById('canvas-container');
    mediaContainer.style.display = 'flex';
    mediaContainer.innerHTML = `<canvas id="celebration-canvas" style="width:100%; height:100%; object-fit:fill;"></canvas>`;
    document.getElementById('revealed-logo').style.display = 'none';

    // Ignite the particle celebration bursts layout engine
    initCelebrationPopUp();

    const view = document.getElementById('dynamic-placard');
    view.innerHTML = `
      <div style="text-align: center; width: 100%; animation: cleanPop 0.4s ease;">
        <img class="end-celebration-gif" src="/images/penguin-praise.gif" alt="Praise Loop">
        <h3 style="color: #EC4899; font-size: 15px; margin-top: 15px; font-weight: 700;">👏 Shower some praise!</h3>
      </div>
    `;
  }

  function initCelebrationPopUp() {
    const canvas = document.getElementById('celebration-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Smooth High-DPI calculation layout matching parameters
    const dpr = window.devicePixelRatio || 1;
    const displayW = canvas.parentElement.clientWidth || 400;
    const displayH = canvas.parentElement.clientHeight || 400;
    
    canvas.width = displayW * dpr;
    canvas.height = displayH * dpr;
    canvas.style.width = displayW + "px";
    canvas.style.height = displayH + "px";
    ctx.scale(dpr, dpr);
    
    const W = displayW, H = displayH;

    let particles = [];
    const colors = ['#FA0F00', '#FF3B30', '#FF9500', '#FFCC00', '#4CD964', '#5AC8FA', '#007AFF', '#5856D6'];
    
    const adobeLogo = new Image();
    adobeLogo.src = '/images/Adobe.jpg';
    let logoAlpha = 0;

    function spawnBurst(originX, originY) {
      const count = 25;
      const baseColor = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 3.5;
        particles.push({
          x: originX, y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          color: Math.random() > 0.4 ? baseColor : colors[Math.floor(Math.random() * colors.length)],
          radius: 2 + Math.random() * 2.5,
          alpha: 1,
          decay: 0.015 + Math.random() * 0.01
        });
      }
    }

    setTimeout(() => spawnBurst(W * 0.5, H * 0.5), 100);
    setTimeout(() => spawnBurst(W * 0.3, H * 0.4), 400);
    setTimeout(() => spawnBurst(W * 0.7, H * 0.4), 600);

    const ambientTimer = setInterval(() => {
      if (document.getElementById('celebration-canvas')) {
        spawnBurst(W * 0.2 + Math.random() * (W * 0.6), H * 0.2 + Math.random() * (H * 0.5));
      } else {
        clearInterval(ambientTimer);
      }
    }, 800);

    function drawFrame() {
      ctx.fillStyle = '#06080f';
      ctx.fillRect(0, 0, W, H);

      particles.forEach((p, index) => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.04; p.alpha -= p.decay;
        if (p.alpha <= 0) { particles.splice(index, 1); return; }
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.fill();
        ctx.restore();
      });
      // 2. Drive the centered crisp Adobe Corporate logo full-bleed presentation fade calculations
      if (logoAlpha < 1) logoAlpha += 0.02;
      
      ctx.save();
      ctx.globalAlpha = logoAlpha;
      
      // Calculate balanced proportional scales to COVER the entire left panel background canvas context window
      const imgAspect = adobeLogo.width / adobeLogo.height || 1;
      const canvasAspect = W / H;
      
      let renderW, renderH;

      // Determine appropriate full-bleed coverage boundaries without image pixel distortion
      if (canvasAspect > imgAspect) {
        renderW = W;
        renderH = W / imgAspect;
      } else {
        renderH = H;
        renderW = H * imgAspect;
      }

      // Center the upscaled image coordinates so the overflow trims symmetrically
      const xPos = (W - renderW) / 2;
      const yPos = (H - renderH) / 2;

      if (adobeLogo.complete) {
        ctx.drawImage(adobeLogo, xPos, yPos, renderW, renderH);
      }
      ctx.restore();

      // 3. Render active vector celebration burst particles OVER the top of the background image mask
      particles.forEach((p, index) => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.04; p.alpha -= p.decay;
        if (p.alpha <= 0) { particles.splice(index, 1); return; }
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(drawFrame);
    }
    drawFrame();
  }
});