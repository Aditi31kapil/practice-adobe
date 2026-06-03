// public/js/animations/rtcdp.js
window.CosmosAnimations = window.CosmosAnimations || {};

window.CosmosAnimations.rtcdp = function(canvasId) {
  const c = document.getElementById(canvasId);
  if (!c) return;
  
  const ctx = c.getContext('2d');
  
  // FIX BLURRY CANVAS: Match rendering resolution to high-DPI screens
  const dpr = window.devicePixelRatio || 1;
  const displayW = c.parentElement.clientWidth || 400;
  const displayH = c.parentElement.clientHeight || 300;
  
  c.width = displayW * dpr;
  c.height = displayH * dpr;
  c.style.width = displayW + "px";
  c.style.height = displayH + "px";
  ctx.scale(dpr, dpr);
  
  const W = displayW, H = displayH;
  
  var cx = W / 2, cy = H / 2;
  var radius = Math.min(W, H) * 0.33; 
  var dests = ['Web', 'Email', 'Social', 'Mobile', 'Display'];
  var destColors = ['#1473E6', '#7C3AED', '#EC4899', '#10B981', '#F97316'];
  var pulses = dests.map(function(_, i) { return { t: i * 0.2, dest: i }; });
  var t = 0;

  let animationFrameId;

  (function draw() {
    t += 0.015;
    ctx.fillStyle = '#06080f';
    ctx.fillRect(0, 0, W, H);

    // 1. Draw outer target nodes
    dests.forEach(function(label, i) {
      var angle = (i / dests.length) * Math.PI * 2 - Math.PI / 2;
      var dx = cx + Math.cos(angle) * radius;
      var dy = cy + Math.sin(angle) * radius;

      var lineGrd = ctx.createLinearGradient(cx, cy, dx, dy);
      lineGrd.addColorStop(0, 'rgba(124, 58, 237, 0.2)');
      lineGrd.addColorStop(1, destColors[i] + '15');
      ctx.strokeStyle = lineGrd; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(dx, dy); ctx.stroke();

      // Increased terminal radius node size to 24 to comfortably hold texts
      ctx.beginPath(); ctx.arc(dx, dy, 24, 0, Math.PI * 2);
      ctx.fillStyle = '#0c1020'; ctx.fill();
      ctx.strokeStyle = destColors[i]; ctx.lineWidth = 1.5; ctx.stroke();

      // Centered Alignment typography configurations
      ctx.fillStyle = '#e2e8f8'; 
      ctx.font = 'bold 10px system-ui, sans-serif';
      ctx.textAlign = 'center'; 
      ctx.textBaseline = 'middle'; // Center text horizontally and vertically
      ctx.fillText(label, dx, dy);
    });

    // 2. Draw live activation stream pulses
    pulses.forEach(function(p) {
      p.t = (p.t + 0.006) % 1;
      var i = p.dest;
      var angle = (i / dests.length) * Math.PI * 2 - Math.PI / 2;
      var dx = cx + Math.cos(angle) * radius;
      var dy = cy + Math.sin(angle) * radius;
      var px = cx + (dx - cx) * p.t;
      var py = cy + (dy - cy) * p.t;
      
      ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = destColors[i]; ctx.fill();
    });

    // 3. Central Profile Core Node: Increased radius circle boundary to 28
    var pulse = 1 + 0.04 * Math.sin(t * 2.5);
    var activeRadius = 28 * pulse;
    
    ctx.beginPath(); ctx.arc(cx, cy, activeRadius, 0, Math.PI * 2);
    var cGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28);
    cGrd.addColorStop(0, '#a78bfa');
    cGrd.addColorStop(1, '#7C3AED');
    ctx.fillStyle = cGrd; ctx.fill();
    
    // Unified vector profile icon shapes
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(cx, cy - 4, 5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy + 9, 9, Math.PI, 0); ctx.fill();

    animationFrameId = requestAnimationFrame(draw);
  })();

  c.dataset.animationId = animationFrameId;
};