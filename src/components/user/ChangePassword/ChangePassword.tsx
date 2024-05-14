import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "../../../providers/SnackbarProvider";
import { UserRepository } from "../../../repositories/user";
import PasswordInput from "../../common/PasswordInput/PasswordInput";
import "./ChangePassword.css";

interface ChangePasswordProps {}

type Params = {
  id: string;
};

const ChangePassword: FC<ChangePasswordProps> = () => {
  const snackbarContext = useSnackbar();
  const navigate = useNavigate();
  const params = useParams<Params>();

  const [oldPassword, setOldPassword] = useState<string>("");

  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordError, setNewPasswordError] = useState<boolean>(false);

  const [passwordNewConfirmation, setPasswordNewConfirmation] =
    useState<string>("");
  const [passwordNewConfirmationError, setPasswordNewConfirmationError] =
    useState<boolean>(false);

  const handleOldPasswordChange = (value: string): void => {
    setOldPassword(value);
  };

  const handleNewPasswordChange = (value: string): void => {
    setNewPassword(value);
  };

  const handlePasswordConfirmationChange = (value: string): void => {
    setPasswordNewConfirmation(value);
  };

  const handleClose = (): void => {
    navigate("..");
  };

  const additionalValidation = (): boolean => {
    return newPassword === passwordNewConfirmation;
  };

  const handleSave = (): void => {
    if (!oldPassword || !newPassword || !passwordNewConfirmation) {
      snackbarContext.dispatch({
        type: "SET_SNACKBAR_ERROR",
        data: {
          content: "Password and Confirm Password are required",
        },
      });
      return;
    }

    if (newPassword !== passwordNewConfirmation) {
      snackbarContext.dispatch({
        type: "SET_SNACKBAR_ERROR",
        data: {
          content: "Password and Confirm Password must match",
        },
      });
      return;
    }

    // Call API to change password
    if (!params.id) {
      snackbarContext.dispatch({
        type: "SET_SNACKBAR_ERROR",
        data: {
          content: "User ID is required",
        },
      });
      return;
    }

    UserRepository.changePassword(
      params.id,
      oldPassword,
      newPassword,
      passwordNewConfirmation
    ).then((success: boolean) => {
      if (success) {
        snackbarContext.dispatch({
          type: "SET_SNACKBAR_OK",
          data: {
            content: "Password changed successfully",
          },
        });
        handleClose();
      } else {
        snackbarContext.dispatch({
          type: "SET_SNACKBAR_ERROR",
          data: {
            content: "Password change failed",
          },
        });
      }
    });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogContent>
        <PasswordInput
          label={"Old Password"}
          handlePasswordChange={handleOldPasswordChange}
          value={oldPassword}
          style={{ margin: "normal", fullWidth: true }}
        />
        <PasswordInput
          label={"New Password"}
          handlePasswordChange={handleNewPasswordChange}
          value={newPassword}
          style={{ margin: "normal", fullWidth: true }}
          error={newPasswordError}
          validatePassword={true}
          setPasswordError={setNewPasswordError}
        />
        <PasswordInput
          label={"Confirm New Password"}
          handlePasswordChange={handlePasswordConfirmationChange}
          value={passwordNewConfirmation}
          style={{ margin: "normal", fullWidth: true }}
          error={passwordNewConfirmationError}
          validatePassword={true}
          setPasswordError={setPasswordNewConfirmationError}
          additionalValidation={additionalValidation}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
export default ChangePassword;
