// Set up the controls
export function setupControls() {
  try {
    const regenButton = document.getElementById('regen');
    if (regenButton) {
      regenButton.addEventListener('click', () => {
        if (typeof window.regen === 'function') {
          window.regen();
        }
      });
    }
  } catch (error) {
    console.error('Error setting up controls:', error);
  }
}