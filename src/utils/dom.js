/**
 * DOM manipulation helpers
 */

export function createElement(
  tag,
  className = "",
  attributes = {},
  content = ""
) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (content) el.textContent = content;

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "data") {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        el.dataset[dataKey] = dataValue;
      });
    } else if (key === "style") {
      Object.entries(value).forEach(([styleKey, styleValue]) => {
        el.style[styleKey] = styleValue;
      });
    } else {
      el.setAttribute(key, value);
    }
  });

  return el;
}

export function createButton(className, text, onClick) {
  const btn = createElement("button", className, {}, text);
  if (onClick) btn.addEventListener("click", onClick);
  return btn;
}

export function clearElement(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

export function addStyles(shadowRoot, css) {
  const style = document.createElement("style");
  style.textContent = css;
  shadowRoot.appendChild(style);
}
