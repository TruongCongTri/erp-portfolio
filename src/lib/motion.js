// Shared helpers for the client-side animation layer.

export async function waitForFonts() {
  try {
    await document.fonts.ready;
    document.fonts.check("16px Manrope");
    await new Promise((resolve) => setTimeout(resolve, 100));
  } catch (error) {
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
}

// The home preloader only renders on the first visit; entrance animations
// that sit behind it declare a longer delay to use while it is on screen.
export function isPreloaderActive() {
  return !!document.querySelector(".loader");
}

export function resolveDelay(delay = 0, preloaderDelay) {
  if (preloaderDelay != null && preloaderDelay !== "" && isPreloaderActive()) {
    return parseFloat(preloaderDelay);
  }
  return parseFloat(delay) || 0;
}
