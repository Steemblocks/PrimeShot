/**
 * Text Tool
 * Simple, human-style inline text annotations
 * - Click anywhere to add text
 * - Click and drag existing text to move it
 * - Double-click existing text to edit
 * - Fonts and colors work seamlessly
 */

window.TOOLS = window.TOOLS || {};

window.TOOLS.text = {
  id: "text",

  // Calculate text bounds
  getBounds(ctx, ann) {
    const fontSize = ann.fontSize || 20;
    ctx.font = `${fontSize}px "${ann.font || "Arial"}", sans-serif`;
    const lines = ann.text.split("\n");

    let maxWidth = 0;
    lines.forEach((line) => {
      const m = ctx.measureText(line);
      if (m.width > maxWidth) maxWidth = m.width;
    });

    const totalHeight = lines.length * fontSize * 1.2;
    const padding = 4;

    return {
      x: ann.x - padding,
      y: ann.y - padding,
      width: maxWidth + padding * 2,
      height: totalHeight + padding * 2,
    };
  },

  // Render completed annotation
  render(ctx, ann, isSelected = false) {
    const fontSize = ann.fontSize || 20;
    ctx.font = `${fontSize}px "${ann.font || "Arial"}", sans-serif`;
    ctx.textBaseline = "top";
    ctx.fillStyle = ann.color;

    // Subtle shadow for readability (not bold-looking)
    ctx.shadowColor = "rgba(255,255,255,0.5)";
    ctx.shadowBlur = 1;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    const lines = ann.text.split("\n");
    lines.forEach((line, i) => {
      ctx.fillText(line, ann.x, ann.y + i * fontSize * 1.2);
    });

    // Reset Shadow
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Draw selection indicator if selected
    if (isSelected) {
      const bounds = this.getBounds(ctx, ann);
      ctx.strokeStyle = "#2563eb";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
      ctx.setLineDash([]);

      // Draw move handle icon
      const iconSize = 16;
      const iconX = bounds.x + bounds.width - iconSize - 4;
      const iconY = bounds.y + 4;

      ctx.fillStyle = "#2563eb";
      ctx.beginPath();
      ctx.arc(
        iconX + iconSize / 2,
        iconY + iconSize / 2,
        iconSize / 2 + 2,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      // Move arrows icon
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Horizontal arrow
      ctx.moveTo(iconX + 4, iconY + iconSize / 2);
      ctx.lineTo(iconX + iconSize - 4, iconY + iconSize / 2);
      // Vertical arrow
      ctx.moveTo(iconX + iconSize / 2, iconY + 4);
      ctx.lineTo(iconX + iconSize / 2, iconY + iconSize - 4);
      ctx.stroke();
    }
  },

  // Render preview while drawing (text doesn't have a preview)
  renderPreview(ctx, state) {
    // Text tool doesn't show preview
  },

  // Create new annotation (text is handled differently - via text input)
  create(x, y, text, color, font, fontSize) {
    return {
      type: "text",
      text: text,
      color: color,
      font: font,
      fontSize: fontSize,
      x: x,
      y: y,
      lw: 1,
    };
  },

  // Text doesn't support preview
  update(x, y) {
    return { x, y };
  },

  // Finish annotation
  finish(annotation) {
    return annotation;
  },

  // Check if annotation is valid
  shouldSave(annotation) {
    return annotation.text && annotation.text.trim().length > 0;
  },
};
