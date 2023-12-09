import { IconButton } from '@mui/material';
import React from 'react';

type Props = {
  handleClick: () => void;
  icon: React.ReactNode;
  disabled?: boolean;
  ariaLabel: string;
};

const CustomIconButton = ({ handleClick, icon, disabled = false, ariaLabel }: Props) => {
  return (
    <IconButton aria-label={ariaLabel} onClick={handleClick} disabled={disabled}>
      {icon}
    </IconButton>
  );
};

export default CustomIconButton;
