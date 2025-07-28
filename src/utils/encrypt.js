import CryptoJS from 'crypto-js';

const RESOURCE_ENCRYPT = 'HukumMatiKoruptor'; 

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

export const decryptData = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    return null;
  }
};
