/**
 * Rectangle Tool
 * Draw rectangles (unfilled stroke)
 */

window.TOOLS = window.TOOLS || {};

window.TOOLS.rect = {
  id: "rect",

  // Render completed annotation
  render(ctx, ann) {
    ctx.strokeStyle = ann.color;
    ctx.lineWidth = ann.lw;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeRect(
      ann.start.x,
      ann.start.y,
      ann.end.x - ann.start.x,
      ann.end.y - ann.start.y,
    );
  },

  // Render preview while drawing
  renderPreview(ctx, state) {
    if (state.mode !== "rect") return;

    ctx.strokeStyle = state.color;
    ctx.lineWidth = state.lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeRect(
      state.startPos.x,
      state.startPos.y,
      state.currentPos.x - state.startPos.x,
      state.currentPos.y - state.startPos.y,
    );
  },

  // Create new annotation on mouse down
  create(x, y, color, lineWidth) {
    return {
      type: "rect",
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
    const w = Math.abs(annotation.end.x - annotation.start.x);
    const h = Math.abs(annotation.end.y - annotation.start.y);
    return w > 5 && h > 5;
  },
};
