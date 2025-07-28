import CryptoJS from 'crypto-js';

const RESOURCE_ENCRYPT = 'HukumMatiKoruptor'; 

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, RESOURCE_ENCRYPT).toString();
};

export const decryptData = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, RESOURCE_ENCRYPT);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    return null;
  }
};
