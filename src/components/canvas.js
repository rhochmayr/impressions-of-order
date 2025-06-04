// Set up the canvas and attach it to the holder
export function setupCanvas() {
  return new Promise((resolve) => {
    // Check if p5 is loaded
    if (typeof p5 === 'undefined') {
      console.error('p5.js is not loaded yet');
      setTimeout(() => setupCanvas().then(resolve), 100);
      return;
    }
    
    // Set up a function to be called once the p5 canvas is created
    const checkForCanvas = () => {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        const holder = document.getElementById('sketch-holder');
        if (holder && !holder.contains(canvas)) {
          holder.appendChild(canvas);
        }
        resolve();
      } else {
        // Canvas not created yet, check again in a moment
        setTimeout(checkForCanvas, 100);
      }
    };
    
    // Start checking for the canvas
    checkForCanvas();
  });
}