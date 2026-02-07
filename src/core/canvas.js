/**
 * Canvas drawing utilities
 * Core drawing functions for annotations
 */

export function initCanvas(canvas, width, height, dpr = 1) {
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  return ctx;
}

export function clearCanvas(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);
}

export function drawLine(
  ctx,
  x1,
  y1,
  x2,
  y2,
  color = "#ff0000",
  lineWidth = 2
) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

export function drawRect(
  ctx,
  x,
  y,
  w,
  h,
  color = "#ff0000",
  lineWidth = 2,
  fill = false
) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lineWidth;

  if (fill) {
    ctx.globalAlpha = 0.3;
    ctx.fillRect(x, y, w, h);
    ctx.globalAlpha = 1.0;
  }

  ctx.strokeRect(x, y, w, h);
}

export function drawCircle(
  ctx,
  cx,
  cy,
  rx,
  ry,
  color = "#ff0000",
  lineWidth = 2,
  fill = false
) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);

  if (fill) {
    ctx.globalAlpha = 0.3;
    ctx.fill();
    ctx.globalAlpha = 1.0;
  }

  ctx.stroke();
}

export function drawText(
  ctx,
  text,
  x,
  y,
  color = "#ff0000",
  fontSize = 20,
  fontFamily = "Arial"
) {
  ctx.fillStyle = color;
  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.textBaseline = "top";
  ctx.fillText(text, x, y);
}

export function drawArrow(ctx, fromX, fromY, toX, toY, color = "#ff0000") {
  const headlen = 15;
  const angle = Math.atan2(toY - fromY, toX - fromX);

  // Draw line
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();

  // Draw arrowhead
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(toX, toY);
  ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();
}

export function drawPen(ctx, points, color = "#ff0000", lineWidth = 2) {
  if (points.length < 2) return;

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();
}

export function drawHighlight(ctx, x, y, w, h, color = "#ffff00") {
  ctx.globalAlpha = 0.4;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  ctx.globalAlpha = 1.0;
}

export function drawBlur(ctx, x, y, w, h, pixelSize = 10) {
  if (w <= 0 || h <= 0) return;

  try {
    const imageData = ctx.getImageData(x, y, w, h);
    const data = imageData.data;

    for (let py = 0; py < h; py += pixelSize) {
      for (let px = 0; px < w; px += pixelSize) {
        let r = 0,
          g = 0,
          b = 0,
          count = 0;
        for (let dy = 0; dy < pixelSize && py + dy < h; dy++) {
          for (let dx = 0; dx < pixelSize && px + dx < w; dx++) {
            const i = ((py + dy) * w + (px + dx)) * 4;
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            count++;
          }
        }
        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);

        for (let dy = 0; dy < pixelSize && py + dy < h; dy++) {
          for (let dx = 0; dx < pixelSize && px + dx < w; dx++) {
            const i = ((py + dy) * w + (px + dx)) * 4;
            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;
          }
        }
      }
    }
    ctx.putImageData(imageData, x, y);
  } catch (e) {
    // Fallback: draw gray box
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = "#333333";
    ctx.fillRect(x, y, w, h);
    ctx.globalAlpha = 1.0;
  }
}
