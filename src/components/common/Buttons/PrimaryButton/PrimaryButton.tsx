import React, { FC } from 'react';
import './PrimaryButton.css';
import { Button, ButtonOwnProps, ButtonProps, ButtonTypeMap } from '@mui/material';
import { useTheme } from '@emotion/react';
import { OverrideProps } from '@mui/material/OverridableComponent';

interface PrimaryButtonProps {
  label: string;
  onClick: () => void;
  rest?: ButtonProps
}

const PrimaryButton: FC<PrimaryButtonProps> = (props: PrimaryButtonProps) => {
  const theme = useTheme();

  return (
    <Button variant={'contained'} onClick={props.onClick} {...props.rest}>
      {props.label}
    </Button>
  )
}

export default PrimaryButton;

export type {
  PrimaryButtonProps
}
