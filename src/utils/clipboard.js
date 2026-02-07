/**
 * Clipboard operations utility
 */
import { showToast } from "./toast.js";

export function copyToClipboard(text) {
  return navigator.clipboard
    .writeText(text)
    .then(() => {
      showToast(`Copied (${text.length} characters)`);
      return true;
    })
    .catch((err) => {
      console.error("Clipboard error:", err);
      showToast("Failed to copy");
      return false;
    });
}

export function copySelectedText() {
  const selection = window.getSelection();
  if (selection.toString().length > 0) {
    return copyToClipboard(selection.toString());
  } else {
    showToast("Select text first");
    return Promise.resolve(false);
  }
}
