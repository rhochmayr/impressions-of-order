// Function to load a script by URL and get its content
function loadScript(url) {
  return new Promise((resolve, reject) => {
    try {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then(scriptContent => {
          const scriptElement = document.createElement('script');
          scriptElement.textContent = scriptContent;
          document.head.appendChild(scriptElement);
          resolve();
        })
        .catch(error => {
          console.error(`Error loading script from ${url}:`, error);
          reject(error);
        });
    } catch (error) {
      console.error(`Error loading script from ${url}:`, error);
      reject(error);
    }
  });
}

// Function to load a script by src attribute
function loadScriptSrc(src) {
  return new Promise((resolve, reject) => {
    const scriptElement = document.createElement('script');
    scriptElement.src = src;
    scriptElement.onload = () => resolve();
    scriptElement.onerror = (error) => reject(error);
    document.head.appendChild(scriptElement);
  });
}

// Load external scripts in sequence
export function loadExternalScripts() {
  return new Promise((resolve, reject) => {
    // Use Vite's built-in BASE_URL environment variable
    const basePath = import.meta.env.BASE_URL.replace(/\/$/, ''); // Remove trailing slash
    
    // Load scripts from the utils directory
    const scriptSources = [
      `${basePath}/utils/trail.js`,
      `${basePath}/utils/scanline.js`, 
      `${basePath}/utils/run.js`
    ];
    
    console.log('Loading scripts from:', scriptSources);
    
    // Load each script in sequence
    let chain = Promise.resolve();
    
    scriptSources.forEach(src => {
      chain = chain.then(() => loadScript(src));
    });
    
    // Then load p5.js
    chain
      .then(() => loadScriptSrc('https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js'))
      .then(() => resolve(true))
      .catch(error => {
        console.error('Error loading scripts:', error);
        reject(error);
      });
  });
}