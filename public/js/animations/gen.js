// public/js/animations/gen.js
window.CosmosAnimations = window.CosmosAnimations || {};

window.CosmosAnimations.gen = function(canvasId) {
  const c = document.getElementById(canvasId);
  if (!c) return;
  
  const ctx = c.getContext('2d');
  
  // ── FIX BLURRY CANVAS: High-DPI / Retina Screen Anti-Aliasing Logic ──
  const dpr = window.devicePixelRatio || 1;
  const displayW = c.parentElement.clientWidth || 400;
  const displayH = c.parentElement.clientHeight || 300;
  
  c.width = displayW * dpr;
  c.height = displayH * dpr;
  c.style.width = displayW + "px";
  c.style.height = displayH + "px";
  ctx.scale(dpr, dpr);
  
  const W = displayW, H = displayH;
  
  // Grid layout design metrics (perfectly proportioned to the scaled space)
  var cols = 5, rows = 3;
  var cellW = (W * 0.54) / cols;
  var cellH = (H * 0.65) / rows;
  var gridX = W * 0.38, gridY = H * 0.16;
  var masterX = 20, masterY = H * 0.25, masterW = W * 0.22, masterH = H * 0.50;
  
  var varHues = [310, 340, 270, 200, 160, 30, 60, 350, 220, 180, 290, 0, 120, 190, 250];
  var cells = [];
  
  for (var r = 0; r < rows; r++) {
    for (var col = 0; col < cols; col++) {
      cells.push({ 
        r: r, 
        col: col, 
        progress: 0, 
        delay: (r * cols + col) * 12, 
        hue: varHues[(r * cols + col) % varHues.length] 
      });
    }
  }
  
  var meshT = 0;
  var frame = 0;
  let animationFrameId;

  (function draw() {
    frame++;
    meshT += 0.02;
    
    // Maintain executive pitch dark baseline theme backdrop
    ctx.fillStyle = '#06080f';
    ctx.fillRect(0, 0, W, H);

    // AI neural node background network matrix
    for (var mx = 0; mx < W; mx += 24) {
      for (var my = 0; my < H; my += 24) {
        var bri = 0.02 + 0.05 * Math.sin(meshT + mx * 0.1 + my * 0.08);
        ctx.fillStyle = 'rgba(236, 72, 153, ' + bri + ')';
        ctx.beginPath(); ctx.arc(mx, my, 1, 0, Math.PI * 2); ctx.fill();
      }
    }

    // Master Creative Asset Box
    var mGrd = ctx.createLinearGradient(masterX, masterY, masterX + masterW, masterY + masterH);
    mGrd.addColorStop(0, '#EC4899');
    mGrd.addColorStop(0.5, '#a855f7');
    mGrd.addColorStop(1, '#6366f1');
    ctx.fillStyle = mGrd;
    
    ctx.beginPath();
    ctx.rect(masterX, masterY, masterW, masterH);
    ctx.fill();
    
    // Crisp text styling with explicit baseline centering hooks
    ctx.fillStyle = '#ffffff'; 
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.textAlign = 'center'; 
    ctx.textBaseline = 'middle';
    ctx.fillText('Master', masterX + masterW / 2, masterY + masterH / 2 - 8);
    ctx.fillText('Creative', masterX + masterW / 2, masterY + masterH / 2 + 8);

    // GenAI Variations Matrix Generation loop
    cells.forEach(function(cell) {
      if (frame > cell.delay) {
        cell.progress = Math.min(1, cell.progress + 0.03);
      }
      if (cell.progress <= 0) return;
      
      var cx2 = gridX + cell.col * cellW + 3;
      var cy2 = gridY + cell.r * cellH + 3;
      var cw = cellW - 5, ch = cellH - 5;
      var alpha = cell.progress;
      var scale = 0.75 + 0.25 * cell.progress;
      
      ctx.save();
      ctx.translate(cx2 + cw / 2, cy2 + ch / 2);
      ctx.scale(scale, scale);
      ctx.translate(-(cw / 2), -(ch / 2));
      ctx.globalAlpha = alpha;
      
      var h = cell.hue;
      var cGrd2 = ctx.createLinearGradient(0, 0, cw, ch);
      cGrd2.addColorStop(0, 'hsl(' + h + ', 85%, 60%)');
      cGrd2.addColorStop(1, 'hsl(' + (h + 30) + ', 75%, 45%)');
      ctx.fillStyle = cGrd2;
      
      ctx.beginPath();
      ctx.rect(0, 0, cw, ch); 
      ctx.fill();
      ctx.restore();
      ctx.globalAlpha = 1;

      // Pipeline link vectors mapping master asset to localized variants
      if (cell.progress > 0.4 && cell.col === 0) {
        ctx.strokeStyle = 'rgba(236, 72, 153, ' + (cell.progress * 0.2) + ')';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(masterX + masterW, masterY + masterH / 2);
        ctx.lineTo(gridX + 2, gridY + cell.r * cellH + cellH / 2);
        ctx.stroke();
      }
    });

    // Content Velocity Loop Counter String Metric
    ctx.fillStyle = 'rgba(236, 72, 153, 0.75)'; 
    ctx.font = 'bold 10px system-ui, sans-serif';
    ctx.textAlign = 'left'; 
    ctx.textBaseline = 'bottom';
    ctx.fillText('✨ Content Velocity Loop: x' + (cols * rows) + ' Variations Generated', gridX + 2, H - 15);

    animationFrameId = requestAnimationFrame(draw);
  })();

  c.dataset.animationId = animationFrameId;
};