/**
 * Line Tool
 * Straight line from start to end point
 */

window.TOOLS = window.TOOLS || {};

window.TOOLS.line = {
  id: "line",

  // Render completed annotation
  render(ctx, ann) {
    ctx.strokeStyle = ann.color;
    ctx.lineWidth = ann.lw;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(ann.start.x, ann.start.y);
    ctx.lineTo(ann.end.x, ann.end.y);
    ctx.stroke();
  },

  // Render preview while drawing
  renderPreview(ctx, state) {
    if (state.mode !== "line") return;

    ctx.strokeStyle = state.color;
    ctx.lineWidth = state.lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(state.startPos.x, state.startPos.y);
    ctx.lineTo(state.currentPos.x, state.currentPos.y);
    ctx.stroke();
  },

  // Create new annotation on mouse down
  create(x, y, color, lineWidth) {
    return {
      type: "line",
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
    return Math.abs(dx) > 5 || Math.abs(dy) > 5;
  },
};
