import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

export const SizeIndicator = ({ size, isUrlSafe }) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <Text type="secondary">
        Size: {size.toLocaleString()} bytes
      </Text>
      {!isUrlSafe && (
        <Text type="warning" style={{ marginLeft: 8 }}>
          May exceed URL limits
        </Text>
      )}
    </div>
  );
};