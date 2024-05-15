import React, { FC } from 'react';
import './SecondaryButton.css';
import { Button, ButtonProps } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface SecondaryButtonProps {
  label: string;
  onClick: () => void;
  rest?: ButtonProps
}

const SecondaryButton: FC<SecondaryButtonProps> = (props: SecondaryButtonProps) => {
  const { t } = useTranslation()

  return (
    <Button variant={'text'} onClick={props.onClick}>
      {
        t(props.label)
      }
    </Button>
  )
}

export default SecondaryButton;

export type {
  SecondaryButtonProps
}