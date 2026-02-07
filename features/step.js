/**
 * Step Counter Tool
 * Numbered circles for step-by-step annotations
 */

window.TOOLS = window.TOOLS || {};

window.TOOLS.step = {
  id: "step",

  // Render completed annotation
  render(ctx, ann) {
    // Step Circle
    ctx.beginPath();
    ctx.fillStyle = ann.color;
    ctx.arc(ann.x, ann.y, 12, 0, Math.PI * 2);
    ctx.fill();

    // Border
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Number
    ctx.fillStyle = "#fff";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 2;
    ctx.fillText(ann.number, ann.x, ann.y);
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
  },

  // Render preview while drawing (steps don't have preview)
  renderPreview(ctx, state) {
    // Step tool doesn't show preview
  },

  // Create new annotation on mouse down
  create(x, y, color, stepNumber) {
    return {
      type: "step",
      x: x,
      y: y,
      number: stepNumber,
      color: color,
      size: 24,
    };
  },

  // Update step position on mouse move
  update(x, y) {
    return { x, y };
  },

  // Finish annotation
  finish(annotation) {
    return annotation;
  },

  // Check if annotation is valid
  shouldSave(annotation) {
    return (
      annotation.x !== undefined &&
      annotation.y !== undefined &&
      annotation.number !== undefined
    );
  },
};
