// Initialize fxrand functions
export function initFxRand() {
  // This recreates the fxrand function from fxhash.xyz
  const A = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
  let s = window.initialSeed || (Date.now() % 2147483647);
  
  window.fxrand = () => {
    s = Math.imul(48271, s) % 2147483647;
    return s / 2147483647;
  };
  
  window.setFxSeed = (seed) => {
    s = seed % 2147483647;
    window.initialSeed = s;
  };
  
  window.fxhash = fxrand().toString(16).slice(2).padEnd(64, "0");
  window.alphabet = A;
  window.fxpreview = () => {};
}