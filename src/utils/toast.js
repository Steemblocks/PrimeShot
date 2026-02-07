/**
 * Toast notification utility
 */
import { CONSTANTS } from "../shared/state.js";

let toastElement = null;
const DEBUG = false;

export function initToast(element) {
  if (!element) {
    console.error("[Toast] Cannot initialize: element is null");
    return false;
  }
  toastElement = element;
  if (DEBUG) console.log("[Toast] Initialized with element:", element);
  return true;
}

export function showToast(message, duration = CONSTANTS.UI.TOAST_DURATION) {
  if (!toastElement) {
    console.warn(
      "[Toast] showToast called but toast element not initialized. Message:",
      message,
    );
    return false;
  }

  if (DEBUG) console.log("[Toast]", message);

  toastElement.textContent = message;
  toastElement.style.opacity = "1";

  setTimeout(() => {
    if (toastElement) toastElement.style.opacity = "0";
  }, duration);

  return true;
}

export function hideToast() {
  if (!toastElement) {
    console.warn("[Toast] hideToast called but toast element not initialized");
    return false;
  }
  toastElement.style.opacity = "0";
  return true;
}
