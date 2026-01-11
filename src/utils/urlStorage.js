

import { URL_STORAGE_CONSTANTS, ERROR_MESSAGES } from './constants';

export const urlStorageUtils = {

  encodeToUrl: (data) => {
    try {
      const dataWithTimestamp = {
        ...data,
        timestamp: new Date().toISOString(),
      };
      const encoded = btoa(JSON.stringify(dataWithTimestamp));
      return `${window.location.origin}${window.location.pathname}#${encoded}`;
    } catch (error) {
      console.error('Encoding error:', error);
      throw new Error(ERROR_MESSAGES.ENCODING_FAILED);
    }
  },

  decodeFromUrl: (hash) => {
    try {
      if (!hash) return null;
      const decoded = atob(hash);
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Decoding error:', error);
      return null;
    }
  },

  updateBrowserUrl: (encodedHash) => {
    window.history.pushState(null, '', `#${encodedHash}`);
  },

  clearBrowserUrl: () => {
    window.history.pushState(null, '', window.location.pathname);
  },

  calculateSize: (data) => {
    return new Blob([JSON.stringify(data)]).size;
  },

  isSafeSizeForUrl: (size) => {
    return size < URL_STORAGE_CONSTANTS.SAFE_URL_SIZE_LIMIT;
  },
};