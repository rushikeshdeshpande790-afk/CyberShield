/**
 * LSB Steganography Logic
 */

export const encodeMessage = (imageData, message) => {
  const data = imageData.data;
  const binaryMessage = Array.from(message).map(char => 
    char.charCodeAt(0).toString(2).padStart(8, '0')
  ).join('') + '00000000'; // Null terminator

  if (binaryMessage.length > data.length * 3 / 4) {
    throw new Error('Message too long for this image.');
  }

  for (let i = 0; i < binaryMessage.length; i++) {
    // Only use R, G, B channels, skip Alpha
    const pixelIndex = Math.floor(i / 1.33) * 4 + (i % 3);
    if (binaryMessage[i] === '1') {
      data[pixelIndex] |= 1;
    } else {
      data[pixelIndex] &= ~1;
    }
  }

  return imageData;
};

export const decodeMessage = (imageData) => {
  const data = imageData.data;
  let binaryMessage = '';
  let message = '';

  for (let i = 0; i < data.length; i++) {
    if (i % 4 === 3) continue; // Skip alpha channel

    binaryMessage += (data[i] & 1).toString();

    if (binaryMessage.length === 8) {
      const charCode = parseInt(binaryMessage, 2);
      if (charCode === 0) break; // Null terminator
      message += String.fromCharCode(charCode);
      binaryMessage = '';
    }
  }

  return message;
};

// Simplified LSB for simulation UI feedback
export const getCapacity = (width, height) => {
  return Math.floor((width * height * 3) / 8); // Characters
};
