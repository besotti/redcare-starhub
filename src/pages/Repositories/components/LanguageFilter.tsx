import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

type LanguageFilterProps = {
  value: string;
  onChange: (value: string) => void;
  languages: string[];
  label?: string;
};

export const LanguageFilter: React.FC<LanguageFilterProps> = ({
  value,
  onChange,
  languages,
  label = 'Language',
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 150 }}>
      <InputLabel id="language-select-label">{label}</InputLabel>
      <Select
        labelId="language-select-label"
        id="language-select"
        value={value}
        label={label}
        onChange={handleChange}
      >
        {languages.map((lang) => (
          <MenuItem key={lang} value={lang}>
            {lang}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
