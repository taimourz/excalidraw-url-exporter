import { useState, useEffect, useMemo, useCallback } from 'react';
import { urlStorageUtils } from '../utils/urlStorage';

export const useUrlStorage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [shareableUrl, setShareableUrl] = useState('');

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const data = urlStorageUtils.decodeFromUrl(hash);

    if (data) {
      setTitle(data.title || '');
      setContent(data.content || '');
    }
  }, []);

  const estimatedSize = useMemo(() => {
    return urlStorageUtils.calculateSize({ title, content });
  }, [title, content]);

  const isUrlSafe = useMemo(() => {
    return urlStorageUtils.isSafeSizeForUrl(estimatedSize);
  }, [estimatedSize]);

  const isDataEmpty = useMemo(() => {
    return !title && !content;
  }, [title, content]);

  const generateShareableUrl = useCallback(() => {
    const data = { title, content };
    const url = urlStorageUtils.encodeToUrl(data);
    const hash = url.split('#')[1];
    urlStorageUtils.updateBrowserUrl(hash);
    setShareableUrl(url);
    return url;
  }, [title, content]);

  const clearAll = useCallback(() => {
    setTitle('');
    setContent('');
    setShareableUrl('');
    urlStorageUtils.clearBrowserUrl();
  }, []);

  const getCurrentData = useCallback(() => {
    return {
      title,
      content,
      timestamp: new Date().toISOString(),
    };
  }, [title, content]);

  return {
    // State
    title,
    content,
    shareableUrl,
    estimatedSize,
    isUrlSafe,
    isDataEmpty,
    
    // Setters
    setTitle,
    setContent,
    
    // Actions
    generateShareableUrl,
    clearAll,
    getCurrentData,
  };
};