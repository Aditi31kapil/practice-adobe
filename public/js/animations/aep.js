// public/js/animations/aep.js
window.CosmosAnimations = window.CosmosAnimations || {};

window.CosmosAnimations.aep = function(canvasId) {
  // Use the dynamically passed container ID from the presentation engine
  const c = document.getElementById(canvasId);
  if (!c) return;
  
  // Make the canvas adaptively scale to match your new desktop presentation bounds
  c.width = c.parentElement.clientWidth || 400;
  c.height = c.parentElement.clientHeight || 300;
  
  const W = c.width, H = c.height;
  const ctx = c.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  
  
  // Design properties
  const streamColors = ['#1473E6', '#00C8FF', '#45B7FF', '#0050B3', '#69D2FF'];
  const nStreams = 5;
  const pipeX = W * 0.52;
  const rowColors = ['#1473E6', '#00C8FF', '#69D2FF', '#45B7FF'];

  // Left side incoming data stream nodes
  var dots = [];
  for (var s = 0; s < nStreams; s++) {
    for (var k = 0; k < 7; k++) {
      dots.push({
        s: s, 
        x: Math.random() * pipeX * 0.85,
        y: H * 0.12 + s * (H * 0.165),
        spd: 0.8 + Math.random() * 0.8,
        col: streamColors[s], 
        r: 2.8
      });
    }
  }

  // Right side processed unified operational profiles
  var rowDots = [];
  for (var r = 0; r < 4; r++) {
    for (var k = 0; k < 5; k++) {
      rowDots.push({
        r: r, 
        x: pipeX + 14 + Math.random() * (W - pipeX - 40),
        y: H * 0.2 + r * (H * 0.185),
        spd: 0.6 + Math.random() * 0.5,
        col: rowColors[r]
      });
    }
  }

  let animationFrameId;

  (function draw() {
    // Premium Look Update: Changed background from charcoal to clean stark canvas white
    ctx.fillStyle = '#06080f';
    ctx.fillRect(0, 0, W, H);

    // Subtle alignment tracking guide grid lines
    ctx.strokeStyle = 'rgba(20, 115, 230, 0.04)';
    ctx.lineWidth = 1;
    for (var gx = 0; gx < W; gx += 24) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke(); }
    for (var gy = 0; gy < H; gy += 24) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke(); }

    // Stream guide lines (left side incoming data pipelines)
    for (var s = 0; s < nStreams; s++) {
      var sy = H * 0.12 + s * (H * 0.165);
      var grad = ctx.createLinearGradient(0, 0, pipeX - 8, 0);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(1, streamColors[s] + '22');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(pipeX - 8, sy); ctx.stroke();
    }

    // Processing Central Pipeline Cylinder Bar
    var pgrd = ctx.createLinearGradient(pipeX - 10, 0, pipeX + 10, 0);
    pgrd.addColorStop(0, 'rgba(20, 115, 230, 0.05)');
    pgrd.addColorStop(0.5, 'rgba(20, 115, 230, 0.25)');
    pgrd.addColorStop(1, 'rgba(0, 200, 255, 0.1)');
    ctx.fillStyle = pgrd;
    ctx.fillRect(pipeX - 10, H * 0.06, 20, H * 0.88);

    // Midline connection glow bar accent
    ctx.fillStyle = 'rgba(20, 115, 230, 0.4)';
    ctx.fillRect(pipeX - 2, H * 0.06, 4, H * 0.88);

    // Update & draw left side metrics nodes
    dots.forEach(function(d) {
      d.x += d.spd;
      if (d.x > pipeX - 8) d.x = Math.random() * 20;
      ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = d.col; ctx.fill();
    });

    // Update & draw right side unified profiles
    for (var r = 0; r < 4; r++) {
      var ry = H * 0.2 + r * (H * 0.185);
      var barW = W - pipeX - 30;
      
      ctx.strokeStyle = rowColors[r] + '33';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(pipeX + 14, ry); ctx.lineTo(pipeX + 14 + barW, ry); ctx.stroke();
      
      var pct = [0.85, 0.65, 0.9, 0.75][r];
      var barGrd = ctx.createLinearGradient(pipeX + 14, 0, pipeX + 14 + barW * pct, 0);
      barGrd.addColorStop(0, rowColors[r] + 'aa');
      barGrd.addColorStop(1, rowColors[r] + '11');
      ctx.fillStyle = barGrd;
      ctx.fillRect(pipeX + 14, ry - 2, barW * pct, 4);
    }

    rowDots.forEach(function(d) {
      d.x += d.spd;
      var maxX = pipeX + 14 + (W - pipeX - 40) * [0.85, 0.65, 0.9, 0.75][d.r];
      if (d.x > maxX) d.x = pipeX + 16;
      ctx.beginPath(); ctx.arc(d.x, H * 0.2 + d.r * (H * 0.185), 2.5, 0, Math.PI * 2);
      ctx.fillStyle = d.col; ctx.fill();
    });

    // Request subsequent frames and pin the index token to the canvas context tracking object
    animationFrameId = requestAnimationFrame(draw);
  })();

  // Cache animation tracker index safely so main.js can clean it up on step switch
  c.dataset.animationId = animationFrameId;
};