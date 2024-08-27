import { Dialog, DialogContent } from "@mui/material";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "../../../providers/SnackbarProvider";
import { UserRepository } from "../../../repositories/user";
import PasswordInput from "../../common/PasswordInput/PasswordInput";
import StandardDialogActions from "../../common/StandardDialogActions/StandardDialogActions";
import "./ChangePassword.css";

interface ChangePasswordProps { }

type Params = {
  id: string;
};

const ChangePassword: FC<ChangePasswordProps> = () => {
  const snackbarContext = useSnackbar();
  const navigate = useNavigate();
  const params = useParams<Params>();

  const { t } = useTranslation();

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
        type: "ERROR",
        data: {
          content: "fillRequiredFields",
        },
      });
      return;
    }

    if (newPassword !== passwordNewConfirmation) {
      snackbarContext.dispatch({
        type: "ERROR",
        data: {
          content: "passwordsDoNotMatch",
        },
      });
      return;
    }

    // Call API to change password
    if (!params.id) {
      snackbarContext.dispatch({
        type: "ERROR",
        data: {
          content: "userIdRequired",
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
          type: "OK",
          data: {
            content: "passwordChanged",
          },
        });
        handleClose();
      } else {
        snackbarContext.dispatch({
          type: "ERROR",
          data: {
            content: "errorChangingPassword",
          },
        });
      }
    });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogContent>
        <PasswordInput
          label={t("oldPassword")}
          handlePasswordChange={handleOldPasswordChange}
          value={oldPassword}
          style={{ margin: "normal", fullWidth: true }}
        />
        <PasswordInput
          label={t("newPassword")}
          handlePasswordChange={handleNewPasswordChange}
          value={newPassword}
          style={{ margin: "normal", fullWidth: true }}
          error={newPasswordError}
          validatePassword={true}
          setPasswordError={setNewPasswordError}
        />
        <PasswordInput
          label={t("confirmNewPassword")}
          handlePasswordChange={handlePasswordConfirmationChange}
          value={passwordNewConfirmation}
          style={{ margin: "normal", fullWidth: true }}
          error={passwordNewConfirmationError}
          validatePassword={true}
          setPasswordError={setPasswordNewConfirmationError}
          additionalValidation={additionalValidation}
        />
      </DialogContent>
      <StandardDialogActions
        primaryButtonProps={{
          label: "save",
          onClick: handleSave,
        }}
        secondaryButtonProps={{
          label: "cancel",
          onClick: handleClose,
        }}
      />
    </Dialog>
  );
};
export default ChangePassword;
