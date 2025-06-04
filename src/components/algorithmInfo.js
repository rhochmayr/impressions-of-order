// Update the algorithm info display
export function updateAlgorithmInfo() {
  const infoDiv = document.getElementById('algorithm-info');
  if (!infoDiv) return;

  try {
    const info = {
      'Hash': window.fxhash || 'Not generated',
      'Seed': window.initialSeed ? window.initialSeed.toString() : 'Not set',
      'Resolution': `${pg?.wX || 0} x ${pg?.wY || 0}`,
      'Density': `${pg?.pd || 0}`,
    };

    infoDiv.innerHTML = `
      <div>
        <h2>Algorithm Info</h2>
        <ul></ul>
      </div>
    `;

    const infoList = infoDiv.querySelector('ul');
    for (const [key, value] of Object.entries(info)) {
      const listItem = document.createElement('li');
      if (key === 'Hash') {
        // Truncate hash to first 12 characters + ellipsis
        const displayHash = value === 'Not generated' ? value : `${value.slice(0, 20)}...`;
        listItem.innerHTML = `<span>${key}</span>: <code style="font-family: monospace" title="${value}">${displayHash}</code>`;
      } else {
        listItem.innerHTML = `<span>${key}</span>: ${value}`;
      }
      infoList.appendChild(listItem);
    }
  } catch (error) {
    console.error('Error updating algorithm info:', error);
  }
}