import CryptoJS from 'crypto-js';

/**
 * Classical Ciphers
 */

export const caesarCipher = (text, shift, decrypt = false) => {
  const s = decrypt ? (26 - (shift % 26)) % 26 : shift % 26;
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      const code = char.charCodeAt(0);
      const base = code >= 65 && code <= 90 ? 65 : 97;
      return String.fromCharCode(((code - base + s) % 26) + base);
    }
    return char;
  }).join('');
};

export const vigenereCipher = (text, key, decrypt = false) => {
  let result = '';
  let keyIndex = 0;
  key = key.toLowerCase();

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char.match(/[a-z]/i)) {
      const isUpper = char === char.toUpperCase();
      const textBase = isUpper ? 65 : 97;
      const textVal = char.toLowerCase().charCodeAt(0) - 97;
      const keyVal = key[keyIndex % key.length].charCodeAt(0) - 97;
      
      let shift = decrypt ? (textVal - keyVal + 26) % 26 : (textVal + keyVal) % 26;
      result += String.fromCharCode(shift + textBase);
      keyIndex++;
    } else {
      result += char;
    }
  }
  return result;
};

export const railFenceCipher = (text, rails, decrypt = false) => {
  if (rails < 2) return text;
  
  if (!decrypt) {
    let fence = Array.from({ length: rails }, () => []);
    let rail = 0;
    let direction = 1;

    for (let char of text) {
      fence[rail].push(char);
      rail += direction;
      if (rail === rails - 1 || rail === 0) direction *= -1;
    }
    return fence.map(row => row.join('')).join('');
  } else {
    // Decryption logic for Rail Fence is complex, using a simulation approach
    let pattern = Array.from({ length: rails }, () => Array(text.length).fill(null));
    let rail = 0;
    let direction = 1;

    for (let i = 0; i < text.length; i++) {
      pattern[rail][i] = '*';
      rail += direction;
      if (rail === rails - 1 || rail === 0) direction *= -1;
    }

    let index = 0;
    for (let r = 0; r < rails; r++) {
      for (let c = 0; c < text.length; c++) {
        if (pattern[r][c] === '*' && index < text.length) {
          pattern[r][c] = text[index++];
        }
      }
    }

    let result = '';
    rail = 0;
    direction = 1;
    for (let i = 0; i < text.length; i++) {
      result += pattern[rail][i];
      rail += direction;
      if (rail === rails - 1 || rail === 0) direction *= -1;
    }
    return result;
  }
};

/**
 * Modern Ciphers (Crypto-JS)
 */

export const aesEncrypt = (text, key) => {
  return CryptoJS.AES.encrypt(text, key).toString();
};

export const aesDecrypt = (ciphertext, key) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    return 'Invalid Key or Ciphertext';
  }
};

export const sha256Hash = (text) => {
  return CryptoJS.SHA256(text).toString();
};

/**
 * RSA Simulation Logic
 */
export const rsaSim = {
  generateKeys: () => {
    // Dummy static keys for simulation
    return {
      public: 'PU_KEY_8372',
      private: 'PR_KEY_1928'
    };
  },
  encrypt: (text, publicKey) => {
    return `RSA-ENC(${text})-BY-${publicKey}`;
  },
  decrypt: (ciphertext, privateKey) => {
    return ciphertext.replace(`RSA-ENC(`, '').replace(`)-BY-PU_KEY_8372`, '');
  }
};
