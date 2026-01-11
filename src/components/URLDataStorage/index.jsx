import React from 'react';


import { ActionButtons } from './ActionButtons';
import { useUrlStorage } from '../../hooks';
import { DataInputSection } from './DataInputSection';
import { ShareableUrlDisplay } from './ShareableUrlDisplay';
import {  fileUtils, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../../utils/index';

import { InfoCard } from './InfoCard';


export const URLDataStorage = () => {
  const {
    title,
    content,
    shareableUrl,
    isDataEmpty,
    setTitle,
    setContent,
    generateShareableUrl,
    clearAll,
    getCurrentData,
  } = useUrlStorage();


  const handleShare = () => {
    debugger
    if (isDataEmpty) {
      return;
    }

    const url = generateShareableUrl();
    navigator.clipboard.writeText(url);
    message.success(SUCCESS_MESSAGES.URL_COPIED);
  };


  const handleExport = () => {
    if (isDataEmpty) {
      message.warning(ERROR_MESSAGES.NO_DATA);
      return;
    }

    const success = fileUtils.exportToJson(getCurrentData(), title || 'untitled');

    if (success) {
      message.success(SUCCESS_MESSAGES.FILE_EXPORTED);
    } else {
      message.error(ERROR_MESSAGES.EXPORT_FAILED);
    }
  };

 
  const handleImport = async (file) => {
    try {
      const data = await fileUtils.importFromJson(file);
      setTitle(data.title || '');
      setContent(data.content || '');
      message.success(SUCCESS_MESSAGES.FILE_IMPORTED);
    } catch (error) {
      message.error(error.message || ERROR_MESSAGES.IMPORT_FAILED);
    }
    return false; 
  };


  const handleClear = () => {
    clearAll();
    message.info(SUCCESS_MESSAGES.DATA_CLEARED);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shareableUrl);
    message.success(SUCCESS_MESSAGES.URL_COPIED);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0f2fe 0%, #ddd6fe 100%)',
        padding: '32px',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>



          <div style={{ marginTop: 24 }}>
            <DataInputSection
              title={title}
              content={content}
              onTitleChange={setTitle}
              onContentChange={setContent}
            />



            <ActionButtons
              onShare={handleShare}
              onExport={handleExport}
              onImport={handleImport}
              onClear={handleClear}
              disabled={isDataEmpty}
            />
          </div>

          <InfoCard />

          <ShareableUrlDisplay url={shareableUrl} onCopy={handleCopyUrl} />          

      </div>
    </div>
  );
};