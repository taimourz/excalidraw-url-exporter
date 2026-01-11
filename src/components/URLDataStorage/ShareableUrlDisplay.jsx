import React from 'react';
import { Alert } from 'antd';

export const ShareableUrlDisplay = ({ url, onCopy }) => {
  // if (!url) return null;

  return (
    <Alert
      message="Shareable URL (click to copy)"
      description={
        <div
          onClick={onCopy}
          style={{
            padding: 12,
            background: 'white',
            border: '1px solid #d9d9d9',
            borderRadius: 4,
            cursor: 'pointer',
            marginTop: 8,
            wordBreak: 'break-all',
            fontFamily: 'monospace',
            fontSize: '12px',
            color: '#1890ff',
          }}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && onCopy()}
          aria-label="Click to copy shareable URL"
        >
          {url}
        </div>
      }
      type="info"
      style={{ marginTop: 24 }}
    />
  );
};