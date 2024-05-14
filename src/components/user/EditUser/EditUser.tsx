import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../../models/user";
import { useSnackbar } from "../../../providers/SnackbarProvider";
import { UserRepository } from "../../../repositories/user";
import EmailInput from "../../common/EmailInput/EmailInput";
import PhoneNumberInput from "../../common/PhoneNumberInput/PhoneNumberInput";
import "./EditUser.css";

interface EditUserProps {}

type Params = {
  id: string;
};

const EditUser: FC<EditUserProps> = () => {
  const snackbarContext = useSnackbar();
  const params = useParams<Params>();

  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);

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

  const handlePhoneNumberChange = (value: string): void => {
    setPhoneNumber(value);
  };

  const handleSave = (): void => {
    if (emailError) {
      snackbarContext.dispatch({
        type: "SET_SNACKBAR_ERROR",
        data: {
          content: "Email is not valid",
        },
      });
      return;
    }

    if (phoneNumberError) {
      snackbarContext.dispatch({
        type: "SET_SNACKBAR_ERROR",
        data: {
          content: "Phone number is not valid",
        },
      });
      return;
    }

    snackbarContext.dispatch({
      type: "SET_SNACKBAR_OK",
      data: {
        content: "User saved successfully",
      },
    });
  };

  const changePasswordOnClick = (): void => {
    navigate("changePassword");
  };

  useEffect(() => {
    const fetchUser = async (userId: string): Promise<void> => {
      UserRepository.fetchUser(userId).then((user: User) => {
        if (!user) {
          return;
        }

        setName(user.firstName);
        setSurname(user.lastName);
        setUsername(user.username);
        setEmail(user.email);
        setPhoneNumber(user.phoneNumber);
      });
    };

    if (params.id) {
      fetchUser(params.id);
    }
  }, []);

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Box className={"flex items-center"}>
          <TextField
            className={"!mr-2"}
            label={"Name"}
            value={name}
            onChange={handleNameChange}
            fullWidth={true}
            margin={"normal"}
          />
          <TextField
            className={"!ml-2"}
            label={"Surname"}
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
          }}
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
        <Button onClick={changePasswordOnClick}>Change password</Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUser;
