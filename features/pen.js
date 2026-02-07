/**
 * Pen Tool
 * Freehand drawing with points
 */

window.TOOLS = window.TOOLS || {};

window.TOOLS.pen = {
  id: "pen",
  
  // Render completed annotation
  render(ctx, ann) {
    if (ann.points.length < 2) return;
    
    ctx.strokeStyle = ann.color;
    ctx.lineWidth = ann.lw;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(ann.points[0].x, ann.points[0].y);
    
    for (let i = 1; i < ann.points.length; i++) {
      ctx.lineTo(ann.points[i].x, ann.points[i].y);
    }
    ctx.stroke();
  },

  // Render preview while drawing
  renderPreview(ctx, state) {
    if (state.mode !== "pen" || !state.currentAnnotation) return;
    
    const pts = state.currentAnnotation.points;
    if (pts.length < 2) return;
    
    ctx.strokeStyle = state.color;
    ctx.lineWidth = state.lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i].x, pts[i].y);
    }
    ctx.stroke();
  },

  // Create new annotation on mouse down
  create(x, y, color, lineWidth) {
    return {
      type: "pen",
      color: color,
      lw: lineWidth,
      points: [{ x, y }],
    };
  },

  // Add point on mouse move
  addPoint(annotation, x, y) {
    annotation.points.push({ x, y });
  },

  // Finish annotation (finalize it)
  finish(annotation) {
    return annotation;
  },

  // Handle mouse up - check if we should save
  shouldSave(annotation) {
    return annotation.points && annotation.points.length > 1;
  },
};
