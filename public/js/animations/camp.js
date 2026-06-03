// public/js/animations/camp.js
window.CosmosAnimations = window.CosmosAnimations || {};

window.CosmosAnimations.camp = function(canvasId) {
  const c = document.getElementById(canvasId);
  if (!c) return;
  
  const ctx = c.getContext('2d');
  
  
  // FIX BLURRY CANVAS: Scale the canvas resolution based on device pixel ratio
  const dpr = window.devicePixelRatio || 1;
  const displayW = c.parentElement.clientWidth || 400;
  const displayH = c.parentElement.clientHeight || 300;
  
  c.width = displayW * dpr;
  c.height = displayH * dpr;
  c.style.width = displayW + "px";
  c.style.height = displayH + "px";
  ctx.scale(dpr, dpr);
  
  const W = displayW, H = displayH;
  
  // Adjusted layouts to sit perfectly inside the expanded frame boundaries
  var rootX = W / 2, rootY = H * 0.18;
  var branches = [
    { label: 'Email', icon: '✉', x: W * 0.22, y: H * 0.78, color: '#f97316' },
    { label: 'Push',  icon: '🔔', x: W * 0.50, y: H * 0.78, color: '#fb923c' },
    { label: 'SMS',   icon: '💬', x: W * 0.78, y: H * 0.78, color: '#fbbf24' }
  ];
  var decisions = [
    { x: W * 0.36, y: H * 0.48 },
    { x: W * 0.64, y: H * 0.48 }
  ];
  var packets = branches.map(function(_, i) { 
    return { branch: i, t: i * 0.33, spd: 0.008 }; // Smooth acceleration step speed multipliers
  });

  let animationFrameId;

  (function draw() {
    ctx.fillStyle = '#06080f';
    ctx.fillRect(0, 0, W, H);

    // Tree edges layout path metrics
    var edgeColor = 'rgba(249, 115, 22, 0.18)';
    ctx.strokeStyle = edgeColor; 
    ctx.lineWidth = 2;

    // Root → decision nodes
    [decisions[0], decisions[1]].forEach(function(d) {
      ctx.beginPath(); ctx.moveTo(rootX, rootY + 28); ctx.lineTo(d.x, d.y); ctx.stroke();
    });

    // Decision → leaves
    ctx.beginPath(); ctx.moveTo(decisions[0].x, decisions[0].y); ctx.lineTo(branches[0].x, branches[0].y - 28); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(decisions[0].x, decisions[0].y); ctx.lineTo(branches[1].x, branches[1].y - 28); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(decisions[1].x, decisions[1].y); ctx.lineTo(branches[1].x, branches[1].y - 28); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(decisions[1].x, decisions[1].y); ctx.lineTo(branches[2].x, branches[2].y - 28); ctx.stroke();

    // Decision diamonds
    decisions.forEach(function(d) {
      ctx.save();
      ctx.translate(d.x, d.y);
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = 'rgba(249, 115, 22, 0.08)'; 
      ctx.fillRect(-10, -10, 20, 20);
      ctx.strokeStyle = '#f97316'; 
      ctx.lineWidth = 1.5; 
      ctx.strokeRect(-10, -10, 20, 20);
      ctx.restore();
      
      ctx.fillStyle = '#f97316'; 
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.textAlign = 'center'; 
      ctx.textBaseline = 'middle';
      ctx.fillText('?', d.x, d.y);
    });

    // ROOT NODE: Increased circle size to 28 so "Audience" fits completely centered inside
    ctx.beginPath(); ctx.arc(rootX, rootY, 28, 0, Math.PI * 2);
    // var rGrd = ctx.createRadialGradient(rootX, rootY, 3, rootX, rootY, 28);
    // rGrd.addColorStop(0, '#ffedd5');
    // rGrd.addColorStop(1, 'rgba(249, 115, 22, 0.25)');
    // ctx.fillStyle = rGrd; ctx.fill();
    ctx.strokeStyle = '#f97316'; ctx.lineWidth = 1.5; ctx.stroke();
    
    // Explicit Middle Typography Baseline Lock
    ctx.fillStyle = '#f97316'; 
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.textAlign = 'center'; 
    ctx.textBaseline = 'middle'; // Center text horizontally and vertically
    ctx.fillText('Audience', rootX, rootY);

    // CHANNEL LEAF NODES: Increased circle size to 28 so titles and icons center perfectly
    branches.forEach(function(b) {
      ctx.beginPath(); ctx.arc(b.x, b.y, 28, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(12, 16, 32, 0.7)'; ctx.fill();
      ctx.strokeStyle = b.color; ctx.lineWidth = 1.5; ctx.stroke();
      
      // Top Position: Channel Icon
      ctx.fillStyle = b.color; 
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center'; 
      ctx.textBaseline = 'middle';
      ctx.fillText(b.icon, b.x, b.y - 6); // Shunted up slightly to leave space for text
      
      // Bottom Position: Channel Text
      ctx.fillStyle = '#94a3b8'; 
      ctx.font = 'bold 9px system-ui, sans-serif';
      ctx.textBaseline = 'middle';
      ctx.fillText(b.label, b.x, b.y + 10); // Shunted down cleanly within the same node frame
    });

    // Outbound packets tracking loops
    packets.forEach(function(p) {
      p.t = (p.t + p.spd) % 1;
      var b = branches[p.branch];
      var midX = p.branch < 2 ? decisions[0].x : decisions[1].x;
      var midY = decisions[p.branch < 2 ? 0 : 1].y;
      var px, py;
      
      if (p.t < 0.4) {
        var tt = p.t / 0.4;
        px = rootX + (midX - rootX) * tt;
        py = rootY + (midY - rootY) * tt;
      } else {
        var tt = (p.t - 0.4) / 0.6;
        px = midX + (b.x - midX) * tt;
        py = midY + (b.y - midY) * tt;
      }
      
      ctx.beginPath(); ctx.arc(px, py, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = b.color; ctx.fill();
    });

    animationFrameId = requestAnimationFrame(draw);
  })();

  c.dataset.animationId = animationFrameId;
};