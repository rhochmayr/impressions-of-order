// Router utility for URL-based address handling
import { validateAddress, generateHashFromAddress } from './ethereum.js';

export function initializeRouter() {
  // Check URL on page load
  handleRouteChange();
  
  // Listen for URL changes (back/forward buttons)
  window.addEventListener('popstate', handleRouteChange);
}

export function handleRouteChange() {
  const path = window.location.pathname;
  
  // Check if path contains an Ethereum address
  // Format: /0x... or just the address without leading slash
  const addressMatch = path.match(/\/?(?:0x)?([a-fA-F0-9]{40})$/);
  
  if (addressMatch) {
    const address = '0x' + addressMatch[1].toLowerCase();
    
    if (validateAddress(address)) {
      console.log('Loading address from URL:', address);
      
      // Update the input field
      const addressInput = document.getElementById('eth-address');
      if (addressInput) {
        addressInput.value = address;
      }
      
      // Generate the artwork
      generateFromAddress(address);
      
      return true;
    }
  }
  
  return false;
}

export function updateURL(address) {
  const newPath = `/${address}`;
  
  // Only update if the URL is different
  if (window.location.pathname !== newPath) {
    window.history.pushState({ address }, '', newPath);
  }
}

export function generateFromAddress(address) {
  if (!validateAddress(address)) {
    console.error('Invalid Ethereum address:', address);
    return;
  }

  console.log('Generating artwork for address:', address);
  
  // Update URL
  updateURL(address);
  
  // Generate hash from address
  const hash = generateHashFromAddress(address);
  if (hash) {
    window.fxhash = hash;
    window.initialSeed = parseInt(hash.slice(0, 16), 16);
    
    // IMPORTANT: Set the seed BEFORE calling regen to ensure clean state
    window.setFxSeed(window.initialSeed);
    console.log('Set initial seed for address generation:', window.initialSeed);
    
    // Call the enhanced regen function
    if (typeof window.regen === 'function') {
      window.regen();
    }
  }
}
