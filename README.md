# Impressions of Order

A generative art project that creates unique abstract compositions based on Ethereum addresses. The project uses p5.js for rendering and implements a custom random number generator seeded by Ethereum addresses.

## Features

- **Address-Based Generation**: Enter any Ethereum address to generate unique artwork
- **Random Generation**: Generate random artwork with the "Random" button
- **Multiple Color Palettes**: 10 distinct color palettes including:
  - 🔴 🟠 / 🔵 / 🟢
  - 🔴 🟠 / 🔵 / 🟢 🟠
  - 🔵 / 🔵 / 🔴
  - And more...
- **Dynamic Rendering**: Responsive canvas that scales with the window size
- **High Resolution Export**: Support for multiple resolution outputs (2x, 4x, 6x)
- **Real-time Trait Display**: Shows artwork characteristics and algorithm information

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the local server URL

## Controls

- **Address Input**: Enter an Ethereum address to generate deterministic artwork
- **Random Button**: Generate artwork from a random address
- **Keyboard Controls**:
  - `2`: Set resolution to 1400 x 2000 pixels
  - `4`: Set resolution to 2800 x 4000 pixels
  - `6`: Set resolution to 4200 x 6000 pixels
  - `s`: Save the current artwork as PNG

## Technical Details

The project uses:
- Vite for development and building
- p5.js for canvas rendering
- ethers.js for Ethereum address handling
- Custom scanline rendering system
- Trail-based generative algorithm

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── algorithmInfo.js    # Algorithm information display
│   │   ├── canvas.js          # Canvas setup and management
│   │   ├── controls.js        # User interface controls
│   │   └── traits.js          # Artwork traits display
│   ├── utils/
│   │   ├── ethereum.js        # Ethereum address handling
│   │   ├── fxrand.js          # Random number generation
│   │   ├── run.js             # Main rendering logic
│   │   ├── scanline.js        # Scanline rendering system
│   │   ├── scriptLoader.js    # Dynamic script loading
│   │   └── trail.js           # Trail generation system
│   └── styles/
│       └── main.css           # Main stylesheet
└── index.html                 # Entry point
```

## License

MIT