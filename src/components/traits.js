// Update the traits display
export function updateTraits() {
  // If the getPal function doesn't exist yet, return
  if (typeof getPal !== 'function') return;
  
  try {
    // Get all the traits from the external functions
    const traits = {
      'Palette': getPal(),
      'Complexity': getCom() == 8 ? 'Low' : getCom() == 60 ? 'Maximum' : getCom() == 30 ? 'High' : 'Very High',
      'Memory': getPathLength(),
      'View': getRot(),
      'Extra Neat': getF(),
      'Line Direction': getOri(),
      'Glitch ‑ Vibration': getVibration(),
      'Glitch ‑ Oversize': getSuperSize(),
      'Glitch ‑ Loose Lines': getSmooth()
    };
    
    // Update the traits list in the UI
    const traitsList = document.querySelector('#traits ul');
    if (traitsList) {
      traitsList.innerHTML = '';
      
      // Add each trait to the list
      for (const [key, value] of Object.entries(traits)) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${key}</span>: ${value}`;
        traitsList.appendChild(listItem);
      }
    }
  } catch (error) {
    console.error('Error updating traits:', error);
  }
}