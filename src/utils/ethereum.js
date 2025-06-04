import { isAddress, getAddress, keccak256, toUtf8Bytes } from 'ethers';

// Validate Ethereum address
export function validateAddress(address) {
  try {
    return isAddress(address);
  } catch (e) {
    return false;
  }
}

// Generate a deterministic hash from an Ethereum address
export function generateHashFromAddress(address) {
  try {
    // Normalize the address and generate hash
    const normalizedAddress = getAddress(address);
    const hash = keccak256(toUtf8Bytes(normalizedAddress));
    const finalHash = hash.slice(2);
    
    return finalHash;
  } catch (e) {
    console.error('Error generating hash:', e);
    return null;
  }
}

// Generate a random Ethereum address
export function generateRandomAddress() {
  const chars = '0123456789abcdef';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
}