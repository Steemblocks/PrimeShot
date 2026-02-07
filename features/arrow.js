/**
 * Arrow Tool
 * Line with arrowhead pointing to end
 */

window.TOOLS = window.TOOLS || {};

window.TOOLS.arrow = {
  id: "arrow",

  // Helper function to draw arrow
  drawArrow(ctx, x1, y1, x2, y2, color, lineWidth) {
    const headLength = 15;
    const angle = Math.atan2(y2 - y1, x2 - x1);

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(
      x2 - headLength * Math.cos(angle - Math.PI / 6),
      y2 - headLength * Math.sin(angle - Math.PI / 6),
    );
    ctx.lineTo(
      x2 - headLength * Math.cos(angle + Math.PI / 6),
      y2 - headLength * Math.sin(angle + Math.PI / 6),
    );
    ctx.lineTo(x2, y2);
    ctx.fill();
  },

  // Render completed annotation
  render(ctx, ann) {
    this.drawArrow(
      ctx,
      ann.start.x,
      ann.start.y,
      ann.end.x,
      ann.end.y,
      ann.color,
      ann.lw,
    );
  },

  // Render preview while drawing
  renderPreview(ctx, state) {
    if (state.mode !== "arrow") return;

    this.drawArrow(
      ctx,
      state.startPos.x,
      state.startPos.y,
      state.currentPos.x,
      state.currentPos.y,
      state.color,
      state.lineWidth,
    );
  },

  // Create new annotation on mouse down
  create(x, y, color, lineWidth) {
    return {
      type: "arrow",
      color: color,
      lw: lineWidth,
      start: { x, y },
      end: { x, y },
    };
  },

  // Update end point on mouse move
  update(x, y) {
    return { x, y };
  },

  // Finish annotation
  finish(annotation) {
    return annotation;
  },

  // Check if annotation is valid (must have non-zero length)
  shouldSave(annotation) {
    if (!annotation.start || !annotation.end) return false;
    const dx = annotation.end.x - annotation.start.x;
    const dy = annotation.end.y - annotation.start.y;
    return Math.abs(dx) > 5 || Math.abs(dy) > 5; // Minimum 5px length
  },
};
