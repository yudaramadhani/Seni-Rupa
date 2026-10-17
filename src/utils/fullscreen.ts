/**
 * HTML5 Fullscreen API Utility with robust cross-browser support and fallback handling
 */

export interface FullscreenAPIElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

export interface FullscreenAPIDocument extends Document {
  webkitFullscreenElement?: Element;
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  webkitExitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
}

export async function requestAppFullscreen(): Promise<boolean> {
  const docEl = document.documentElement as FullscreenAPIElement;
  try {
    if (docEl.requestFullscreen) {
      await docEl.requestFullscreen();
      return true;
    } else if (docEl.webkitRequestFullscreen) {
      await docEl.webkitRequestFullscreen();
      return true;
    } else if (docEl.mozRequestFullScreen) {
      await docEl.mozRequestFullScreen();
      return true;
    } else if (docEl.msRequestFullscreen) {
      await docEl.msRequestFullscreen();
      return true;
    }
    return false;
  } catch (err) {
    console.warn('Fullscreen request could not be completed (e.g. iframe permission or user gesture restriction):', err);
    return false;
  }
}

export async function exitAppFullscreen(): Promise<boolean> {
  const doc = document as FullscreenAPIDocument;
  try {
    if (doc.exitFullscreen) {
      await doc.exitFullscreen();
      return true;
    } else if (doc.webkitExitFullscreen) {
      await doc.webkitExitFullscreen();
      return true;
    } else if (doc.mozCancelFullScreen) {
      await doc.mozCancelFullScreen();
      return true;
    } else if (doc.msExitFullscreen) {
      await doc.msExitFullscreen();
      return true;
    }
    return false;
  } catch (err) {
    console.warn('Exit fullscreen error:', err);
    return false;
  }
}

export function isAppFullscreen(): boolean {
  const doc = document as FullscreenAPIDocument;
  return Boolean(
    doc.fullscreenElement ||
    doc.webkitFullscreenElement ||
    doc.mozFullScreenElement ||
    doc.msFullscreenElement
  );
}

export async function toggleAppFullscreen(): Promise<boolean> {
  if (isAppFullscreen()) {
    await exitAppFullscreen();
    return false;
  } else {
    return await requestAppFullscreen();
  }
}
