import React from 'react';
import { Card, Typography } from 'antd';

const { Text } = Typography;

export const InfoCard = () => {
  return (
    <Card
      size="small"
      style={{ marginTop: 24, background: '#e0f2fe' }}
      title={<Text strong>Note:</Text>}
    >
      <ul style={{ margin: 0, paddingLeft: 20, fontSize: '13px' }}>
        <li>All Data is encoded using Base64 and stored in the URL hash</li>
        <li>Share the URL and anyone can access the same data</li>
        <li>Export to JSON for backup if larger content</li>
      </ul>
    </Card>
  );
};