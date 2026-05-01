import CryptoJS from 'crypto-js';

export const encrypt = (text: string, key: string): string => {
  if (!text) return '';
  return CryptoJS.AES.encrypt(text, key).toString();
};

export const decrypt = (ciphertext: string, key: string): string => {
  if (!ciphertext) return '';
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText || '[Decryption Failed]';
  } catch (e) {
    return '[Decryption Failed]';
  }
};

export const hashKey = (key: string): string => {
  return CryptoJS.SHA256(key).toString();
};
