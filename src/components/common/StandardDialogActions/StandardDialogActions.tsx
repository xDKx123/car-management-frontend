import { DialogActions } from '@mui/material';
import { FC } from 'react';
import PrimaryButton, { PrimaryButtonProps } from '../Buttons/PrimaryButton/PrimaryButton';
import SecondaryButton, { SecondaryButtonProps } from '../Buttons/SecondaryButton/SecondaryButton';
import './StandardDialogActions.css';

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
