import React from 'react';

interface CheckFormikValuesProps {}

export const CheckFormikValues: React.FC<CheckFormikValuesProps> = (props) => {
  return (
    <pre
      style={{
        margin: '1rem 0',
        background: '#f6f8fa',
        overflow: 'scroll',
      }}
    >
      {JSON.stringify(props, null, 2)}
    </pre>
  );
};
