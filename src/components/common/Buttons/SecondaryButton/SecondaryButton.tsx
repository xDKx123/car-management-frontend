import React, { FC } from 'react';
import './SecondaryButton.css';
import { Button, ButtonProps } from '@mui/material';

interface SecondaryButtonProps {
  label: string;
  onClick: () => void;
  rest?: ButtonProps
}

const SecondaryButton: FC<SecondaryButtonProps> = (props: SecondaryButtonProps) => {
  return (
    <Button variant={'text'} onClick={props.onClick}>
      {
        props.label
      }
    </Button>
  )
}

export default SecondaryButton;

export type {
  SecondaryButtonProps
}