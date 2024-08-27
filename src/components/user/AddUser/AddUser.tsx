import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";
import React, { FC, useDeferredValue, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../../providers/SnackbarProvider";
import { UserRepository } from "../../../repositories/user";
import EmailInput from "../../common/EmailInput/EmailInput";
import PasswordInput from "../../common/PasswordInput/PasswordInput";
import PhoneNumberInput from "../../common/PhoneNumberInput/PhoneNumberInput";
import StandardDialogActions from "../../common/StandardDialogActions/StandardDialogActions";
import "./AddUser.css";

interface AddUserProps { }

const AddUser: FC<AddUserProps> = () => {
  const snackbarContext = useSnackbar();

  const { t } = useTranslation();

  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const emailDeferredValue = useDeferredValue(email);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailHelperText, setEmailHelperText] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const passwordDeferredValue = useDeferredValue(password);
  const [showHidePassword, setShowHidePassword] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const passwordConfirmationDeferredValue =
    useDeferredValue(passwordConfirmation);

  const [showHidePasswordConfirmation, setShowHidePasswordConfirmation] =
    useState<boolean>(false);
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState<boolean>(true);

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleClose = (): void => {
    navigate("..");
  };

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setName(event.target.value);
  };

  const handleSurnameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSurname(event.target.value);
  };

  const handleEmailChange = (value: string): void => {
    setEmail(value);
  };

  const handleEmailError = (value: boolean): void => {
    setEmailError(value);
  };

  const handlePasswordChange = (value: string): void => {
    setPassword(value);
  };

  const handleConfirmPasswordChange = (value: string): void => {
    setPasswordConfirmation(value);
  };

  const handlePhoneNumberChange = (value: string): void => {
    setPhoneNumber(value);
  };

  const checkIfPasswordsMatch = (): boolean => {
    return password === passwordConfirmation;
  };

  const handleSave = (): void => {
    if (emailError) {
      snackbarContext.dispatch({
        type: "ERROR",
        data: {
          content: "emailInvalid",
        },
      });
      return;
    }

    if (passwordError) {
      snackbarContext.dispatch({
        type: "ERROR",
        data: {
          content: "passwordInvalid",
        },
      });
      return;
    }

    if (passwordConfirmationError) {
      snackbarContext.dispatch({
        type: "ERROR",
        data: {
          content: "passwordInvalid",
        },
      });
      return;
    }

    if (!checkIfPasswordsMatch()) {
      snackbarContext.dispatch({
        type: "ERROR",
        data: {
          content: "passwordsDoNotMatch",
        },
      });
      return;
    }

    snackbarContext.dispatch({
      type: "OK",
      data: {
        content: "userSaved",
      },
    });
  };

  useEffect(() => {
    const checkIfEmailExists = async (): Promise<void> => {
      UserRepository.checkIfEmailExists(emailDeferredValue)
        .then((isValid: boolean) => {
          if (!isValid) {
            setEmailError(true);
            setEmailHelperText("emailInvalid");
          }
        })
        .catch((error: any) => {
          if (error && error.status === 409) {
            setEmailError(true);
            setEmailHelperText("emailExists");
          }

          setEmailError(true);
        });
    };

    if (emailDeferredValue.length === 0) {
      setEmailError(true);
      setEmailHelperText("");
    }

    if (emailDeferredValue) {
      checkIfEmailExists();
    }
  }, [emailDeferredValue]);

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>
        {
          t("addUser")
        }
      </DialogTitle>
      <DialogContent>
        <form>
          <Box className={"flex items-center"}>
            <TextField
              className={"!mr-2"}
              label={t("name")}
              value={name}
              onChange={handleNameChange}
              fullWidth={true}
              margin={"normal"}
            />
            <TextField
              className={"!ml-2"}
              label={t("surname")}
              value={surname}
              onChange={handleSurnameChange}
              fullWidth={true}
              margin={"normal"}
            />
          </Box>
          <EmailInput
            value={email}
            handleChange={handleEmailChange}
            error={emailError}
            setError={handleEmailError}
            textFieldProps={{
              fullWidth: true,
              margin: "normal",
              helperText: emailHelperText,
            }}
          />

          <PasswordInput
            label={t("password")}
            handlePasswordChange={handlePasswordChange}
            value={password}
            style={{ margin: "normal", fullWidth: true, autoComplete: "off" }}
            error={passwordError}
            validatePassword={true}
            setPasswordError={setPasswordError}
          />
          <PasswordInput
            label={t("confirmPassword")}
            handlePasswordChange={handleConfirmPasswordChange}
            value={passwordConfirmation}
            style={{ margin: "normal", fullWidth: true, autoComplete: "off" }}
            error={passwordConfirmationError}
            validatePassword={true}
            setPasswordError={setPasswordConfirmationError}
            additionalValidation={checkIfPasswordsMatch}
          />
          <PhoneNumberInput
            value={phoneNumber}
            handleChange={handlePhoneNumberChange}
            error={phoneNumberError}
            setError={setPhoneNumberError}
            textFieldProps={{
              fullWidth: true,
              margin: "normal",
            }}
          />
        </form>
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

export default AddUser;
