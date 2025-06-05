# Impressions of Order

A generative art project that creates unique abstract compositions based on Ethereum addresses. The project uses p5.js for rendering and implements a custom random number generator seeded by Ethereum addresses.

**This is a clone/remake of ["Impressions of Order" by nbswwit](https://www.fxhash.xyz/article/impressions-of-order) with added determinism for Ethereum addresses.** 

Original work by: [@nbswwit](https://x.com/nbswwit)

## Screenshot

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
- **URL Navigation**: You can also use addresses directly in the URL (e.g., `yoursite.com/0x1234...abcd`)
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

### Ethereum Address to Artwork Generation

The project creates deterministic artwork from Ethereum addresses through the following process:

1. **Address Normalization**: The Ethereum address is normalized using ethers.js `getAddress()` function
2. **Hash Generation**: A Keccak-256 hash is generated from the normalized address using `keccak256(toUtf8Bytes(address))`
3. **Seed Derivation**: The first 16 characters of the hash are converted to an integer to create a deterministic seed
4. **Random Number Generation**: This seed initializes a custom random number generator (fxrand) that produces consistent sequences
5. **Artwork Creation**: The seeded random generator drives all artistic decisions including:
   - Color palette selection
   - Shape generation and positioning
   - Trail patterns and behaviors
   - Scanline rendering parameters

This ensures that each Ethereum address always produces the same unique artwork, making it possible to create NFT-like deterministic art pieces tied to specific addresses.

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
