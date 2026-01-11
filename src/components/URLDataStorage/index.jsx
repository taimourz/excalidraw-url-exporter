import React from 'react';


import { ActionButtons } from './ActionButtons';
import { useUrlStorage } from '../../hooks';
import { DataInputSection } from './DataInputSection';
import { ShareableUrlDisplay } from './ShareableUrlDisplay';
import { InfoCard } from './InfoCard';


export const URLDataStorage = () => {
  const {
    title,
    content,
    shareableUrl,
    isDataEmpty,
    setTitle,
    setContent,

  } = useUrlStorage();


  const handleShare = () => {

  };

  const handleExport = () => {

  };

 
  const handleImport = async (file) => {

  };

  
  const handleClear = () => {

  };


  const handleCopyUrl = () => {

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