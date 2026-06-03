// public/js/animations/aam.js
window.CosmosAnimations = window.CosmosAnimations || {};

window.CosmosAnimations.aam = function(canvasId) {
  const c = document.getElementById(canvasId);
  if (!c) return;
  
  const ctx = c.getContext('2d');
  
  // High-DPI Anti-Aliasing Setup
  const dpr = window.devicePixelRatio || 1;
  const displayW = c.parentElement.clientWidth || 400;
  const displayH = c.parentElement.clientHeight || 300;
  
  c.width = displayW * dpr;
  c.height = displayH * dpr;
  c.style.width = displayW + "px";
  c.style.height = displayH + "px";
  ctx.scale(dpr, dpr);
  
  const W = displayW, H = displayH;
  
  // Shifted coordinates inward (0.22 and 0.78) to keep elements centered and readable
  var sources = [
    {label:'Cookie 🍪', y:0.15}, {label:'Mobile 📱', y:0.32},
    {label:'CRM 💾', y:0.50}, {label:'Web 🌐', y:0.68}, {label:'SDK 🧩', y:0.85}
  ];
  var dests = [{label:'DSP', y:0.2}, {label:'DMP', y:0.5}, {label:'Publisher', y:0.8}];
  
  var graphX = W * 0.5, graphY = H * 0.5;
  var graphR = H * 0.24;
  var graphNodes = [];
  
  for (var n = 0; n < 7; n++) {
    var angle = (n / 7) * Math.PI * 2;
    graphNodes.push({
      x: graphX + Math.cos(angle) * graphR * 0.6,
      y: graphY + Math.sin(angle) * graphR * 0.5
    });
  }
  
  var packets = [];
  for (var i = 0; i < 8; i++) {
    packets.push({
      src: Math.floor(Math.random() * sources.length),
      dst: Math.floor(Math.random() * dests.length),
      t: Math.random(),
      spd: 0.004 + Math.random() * 0.003
    });
  }

  let animationFrameId;

  (function draw() {
    ctx.fillStyle = '#06080f';
    ctx.fillRect(0, 0, W, H);

    var srcX = W * 0.22; // Brought inward to secure drawing boundaries
    var dstX = W * 0.78; // Brought inward to secure drawing boundaries

    // Graph network pipelines
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.12)';
    ctx.lineWidth = 1;
    graphNodes.forEach(function(n1) {
      graphNodes.forEach(function(n2) {
        if (n1 !== n2 && Math.random() > 0.88) {
          ctx.beginPath(); ctx.moveTo(n1.x, n1.y); ctx.lineTo(n2.x, n2.y); ctx.stroke();
        }
      });
    });

    // Central Identity Graph Nodes
    graphNodes.forEach(function(n) {
      ctx.beginPath(); ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#10B981'; ctx.fill();
    });

    // Core central matrix web indicator
    ctx.fillStyle = 'rgba(16, 185, 129, 0.35)'; 
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center'; 
    ctx.textBaseline = 'middle';
    ctx.fillText('🕸️', graphX, graphY);

    // Source Nodes (Data Inputs)
    sources.forEach(function(s) {
      var sy = H * s.y;
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(srcX + 25, sy); ctx.lineTo(graphX - 15, graphY); ctx.stroke();
      
      // Increased capsule width to give emojis and strings breathing room
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(srcX - 35, sy - 10, 70, 20, 6) : ctx.rect(srcX - 35, sy - 10, 70, 20);
      ctx.fillStyle = 'rgba(12, 16, 32, 0.8)'; ctx.fill();
      ctx.strokeStyle = '#10B981'; ctx.lineWidth = 1; ctx.stroke();
      
      ctx.fillStyle = '#e2e8f8'; 
      ctx.font = '9px system-ui, sans-serif';
      ctx.textAlign = 'center'; 
      ctx.textBaseline = 'middle';
      ctx.fillText(s.label, srcX, sy);
    });

    // Destination Nodes (Ad-Tech Activation Marketplace targets)
    dests.forEach(function(d) {
      var dy = H * d.y;
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(graphX + 15, graphY); ctx.lineTo(dstX - 25, dy); ctx.stroke();
      
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(dstX - 25, dy - 10, 50, 20, 6) : ctx.rect(dstX - 25, dy - 10, 50, 20);
      ctx.fillStyle = 'rgba(12, 16, 32, 0.8)'; ctx.fill();
      ctx.strokeStyle = '#34d399'; ctx.lineWidth = 1; ctx.stroke();
      
      ctx.fillStyle = '#e2e8f8'; 
      ctx.font = 'bold 9px system-ui, sans-serif';
      ctx.textAlign = 'center'; 
      ctx.textBaseline = 'middle';
      ctx.fillText(d.label, dstX, dy);
    });

    // Streaming Audience data packets
    packets.forEach(function(p) {
      p.t = (p.t + p.spd) % 1;
      var sy = H * sources[p.src].y;
      var dy = H * dests[p.dst].y;
      var px, py;
      if (p.t < 0.45) {
        var tt = p.t / 0.45;
        px = srcX + (graphX - srcX) * tt;
        py = sy + (graphY - sy) * tt;
      } else {
        var tt = (p.t - 0.45) / 0.55;
        px = graphX + (dstX - graphX) * tt;
        py = graphY + (dy - graphY) * tt;
      }
      ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#34d399'; ctx.fill();
    });

    animationFrameId = requestAnimationFrame(draw);
  })();

  c.dataset.animationId = animationFrameId;
};