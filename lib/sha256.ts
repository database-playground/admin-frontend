/**
 * Ported from <https://github.com/sindresorhus/crypto-hash/blob/main/browser.js>
 */

export async function sha256(data: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data));
  return bufferToHex(digest);
}

// Pre-computed hex lookup table for fast conversion
const HEX_CHARS = "0123456789abcdef";
const HEX_LUT: string[] = [];
for (let index = 0; index < 256; index++) {
  HEX_LUT[index] = HEX_CHARS[(index >>> 4) & 0xF] + HEX_CHARS[index & 0xF];
}

export function bufferToHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let hex = "";
  for (let index = 0; index < bytes.length; index++) {
    hex += HEX_LUT[bytes[index]];
  }

  return hex;
}
