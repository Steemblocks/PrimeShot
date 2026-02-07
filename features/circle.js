/**
 * Circle Tool
 * Draw circles/ellipses (unfilled stroke)
 */

window.TOOLS = window.TOOLS || {};

window.TOOLS.circle = {
  id: "circle",

  // Render completed annotation
  render(ctx, ann) {
    const cx = (ann.start.x + ann.end.x) / 2;
    const cy = (ann.start.y + ann.end.y) / 2;
    const rx = Math.abs(ann.end.x - ann.start.x) / 2;
    const ry = Math.abs(ann.end.y - ann.start.y) / 2;

    ctx.strokeStyle = ann.color;
    ctx.lineWidth = ann.lw;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();
  },

  // Render preview while drawing
  renderPreview(ctx, state) {
    if (state.mode !== "circle") return;

    const cx = (state.startPos.x + state.currentPos.x) / 2;
    const cy = (state.startPos.y + state.currentPos.y) / 2;
    const rx = Math.abs(state.currentPos.x - state.startPos.x) / 2;
    const ry = Math.abs(state.currentPos.y - state.startPos.y) / 2;

    ctx.strokeStyle = state.color;
    ctx.lineWidth = state.lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();
  },

  // Create new annotation on mouse down
  create(x, y, color, lineWidth) {
    return {
      type: "circle",
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

  // Check if annotation is valid (must have minimum size)
  shouldSave(annotation) {
    if (!annotation.start || !annotation.end) return false;
    const rx = Math.abs(annotation.end.x - annotation.start.x) / 2;
    const ry = Math.abs(annotation.end.y - annotation.start.y) / 2;
    return rx > 3 && ry > 3;
  },
};
