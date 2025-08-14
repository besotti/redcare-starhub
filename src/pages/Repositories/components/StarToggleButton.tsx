import StarFilledIcon from '@mui/icons-material/Star';
import StarIcon from '@mui/icons-material/StarBorder';
import { IconButton } from '@mui/material';
import React from 'react';

type StarToggleButtonProps = {
  starred: boolean;
  onClick: () => void;
};

export const StarToggleButton: React.FC<StarToggleButtonProps> = ({ starred, onClick }) => {
  return (
    <IconButton onClick={onClick} aria-label="Toggle Star">
      {starred ? <StarFilledIcon /> : <StarIcon />}
    </IconButton>
  );
};
