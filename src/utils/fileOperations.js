import { URL_STORAGE_CONSTANTS, ERROR_MESSAGES } from './constants';

export const fileUtils = {

  exportToJson: (data, filename = URL_STORAGE_CONSTANTS.DEFAULT_FILENAME) => {
    try {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}${URL_STORAGE_CONSTANTS.FILE_EXTENSION}`;
      link.click();
      URL.revokeObjectURL(url);
      return true;
    } catch (error) {
      console.error('Export error:', error);
      return false;
    }
  },

  importFromJson: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          resolve(data);
        } catch (error) {
          reject(new Error(ERROR_MESSAGES.INVALID_JSON));
        }
      };
      
      reader.onerror = () => reject(new Error(ERROR_MESSAGES.FILE_READ_ERROR));
      
      reader.readAsText(file);
    });
  },
};