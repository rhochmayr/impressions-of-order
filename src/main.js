import { initFxRand } from './utils/fxrand.js';
import { loadExternalScripts } from './utils/scriptLoader.js';
import { setupCanvas } from './components/canvas.js';
import { updateTraits } from './components/traits.js';
import { updateAlgorithmInfo } from './components/algorithmInfo.js';
import { validateAddress, generateHashFromAddress, generateRandomAddress } from './utils/ethereum.js';
import { initializeRouter, generateFromAddress } from './utils/router.js';

// Initialize the fxrand functions
initFxRand();

// Set up address input handling
function setupAddressInput() {
  const addressInput = document.getElementById('eth-address');
  const randomButton = document.getElementById('random-address');
  // Handle address input
  addressInput.addEventListener('input', (e) => {
    const address = e.target.value;
    if (validateAddress(address)) {
      generateFromAddress(address);
    }
  });

  // Handle random address generation
  randomButton.addEventListener('click', () => {
    const address = generateRandomAddress();
    addressInput.value = address;
    generateFromAddress(address);
  });
}

// Function to regenerate the artwork
window.regen = function() {
  // Reset the random number generator with the initial seed
  window.setFxSeed(window.initialSeed);
  console.log('Regenerating with seed:', window.initialSeed);
  
  // Initialize background color with a valid default value
  window.bkc = '#FFFFFF';
  
  // Clear any potential p5.js state
  if (typeof sh !== 'undefined') {
    if (sh.resetMatrix) sh.resetMatrix();
    if (sh.clear) sh.clear();
    if (sh.background) sh.background(255);
  }
  
  // Reset graphics buffer if it exists
  if (typeof pg !== 'undefined') {
    if (pg.resetMatrix) pg.resetMatrix();
    if (pg.clear) pg.clear();
    if (pg.background) pg.background(255);
  }
  
  // Reset any global drawing state
  if (typeof resetShader === 'function') resetShader();
  if (typeof resetDrawingState === 'function') resetDrawingState();
  
  // Call the external script functions if they exist
  if (typeof setRandom === 'function') setRandom();
  if (typeof genFeatures === 'function') {
    const features = genFeatures();
    console.log('Generated features:', features);
  }
  if (typeof loadCol === 'function') loadCol();
  
  // Set the background and draw the back if the functions exist
  if (typeof sh !== 'undefined') {
    sh.background(window.bkc);
    if (typeof back === 'function') back();
  }
  
  // Call the main drawing function if it exists
  if (typeof ImpressionsOfOrder === 'function') ImpressionsOfOrder();
  
  // Draw to the screen and update traits
  drawToScreen();
  updateTraits();
  updateAlgorithmInfo();
};

// Function to draw to the screen
function drawToScreen() {
  if (typeof updateImageSize === 'function') updateImageSize();
  if (typeof image === 'function' && typeof sh !== 'undefined' && typeof width !== 'undefined' && typeof height !== 'undefined' && typeof pg !== 'undefined') {
    image(sh, width/2, height/2, pg.dX, pg.dY);
  }
  scaleCanvas();
}

// Function to scale the canvas
window.scaleCanvas = function() {
  const cvs = document.querySelector('canvas');
  if (!cvs) return;
  
  const vw = window.innerWidth * 0.5; // left column width
  const vh = window.innerHeight * 0.6; // 60vh cap
  const scale = Math.min(vw/cvs.width, vh/cvs.height, 1);
  
  cvs.style.width = `${cvs.width * scale}px`;
  cvs.style.height = `${cvs.height * scale}px`;
};

// Start the application
async function initApp() {
  try {
    // Load the external scripts first
    await loadExternalScripts();
    
    // Set up the canvas once p5.js is loaded
    await setupCanvas();
    
    // Initialize router (this will check URL and load address if present)
    initializeRouter();
    
    // Set up address input handling
    setupAddressInput();
    
    // Only generate random address if no URL address was loaded
    const addressInput = document.getElementById('eth-address');
    if (addressInput && !addressInput.value) {
      const randomAddress = generateRandomAddress();
      addressInput.value = randomAddress;
      generateFromAddress(randomAddress);
    }
    
    // Add window resize event listener
    window.addEventListener('resize', scaleCanvas);
  } catch (error) {
    console.error('Error initializing application:', error);
  }
}

// Initialize the application
initApp();