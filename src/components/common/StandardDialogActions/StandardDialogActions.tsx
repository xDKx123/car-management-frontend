import React, { FC } from 'react';
import './StandardDialogActions.css';
import PrimaryButton, { PrimaryButtonProps } from '../Buttons/PrimaryButton/PrimaryButton';
import { DialogActions } from '@mui/material';
import SecondaryButton, { SecondaryButtonProps } from '../Buttons/SecondaryButton/SecondaryButton';

interface StandardDialogActionsProps {
  primaryButtonProps: PrimaryButtonProps;
  secondaryButtonProps: SecondaryButtonProps;
}

const StandardDialogActions: FC<StandardDialogActionsProps> = (props: StandardDialogActionsProps) => {
  return (
    <DialogActions>
      <PrimaryButton
        {...props.primaryButtonProps}
      />
      <SecondaryButton
        {...props.secondaryButtonProps}
      />
    </DialogActions>
  )
}

export default StandardDialogActions;
