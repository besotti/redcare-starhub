import { Tab, Tabs } from '@mui/material';
import React from 'react';

type TabNavigationProps = {
  value: number;
  onChange: (value: number) => void;
  labels: string[];
};

export const TabNavigation: React.FC<TabNavigationProps> = ({ value, onChange, labels }) => {
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    onChange(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} sx={{ mb: 2 }}>
      {labels.map((label, index) => (
        <Tab key={index} label={label} />
      ))}
    </Tabs>
  );
};
