import { Box, Button, TextField } from "@mui/material";
import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError } from "../../api/errors";
import PasswordInput from "../../components/common/PasswordInput/PasswordInput";
import { User } from "../../models/user";
import { useUser } from "../../providers/UserProvider";
import { AuthorizationRepository } from "../../repositories/authentication";

interface LoginProps { }

const Login: FC<LoginProps> = () => {
  const userProvider = useUser();

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const handleUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (value: string): void => {
    setPassword(value);
  };

  const handleLogin = () => {
    // call api to login
    // if successful, store token in local storage
    // redirect to home page
    AuthorizationRepository.login(username, password)
      .then((response: User | undefined) => {
        if (!response) {
          return;
        }

        userProvider.dispatch({
          type: "SET_USER",
          data: {
            user: response,
          },
        });

        navigate("/home?page=1&rowsPerPage=50", { replace: true });
      })
      .catch((error: ApiError | Error) => {
        setErrorMessage('invalidUsernameOrPassword')
      });
  };

  const disableTextFields = (): void => {
    if (!usernameRef.current || !passwordRef.current) {
      return;
    }
    usernameRef.current.disabled = true;
    passwordRef.current.disabled = true;
  };

  const enableTextFields = (): void => {
    if (!usernameRef.current || !passwordRef.current) {
      return;
    }
    usernameRef.current.disabled = false;
    passwordRef.current.disabled = false;
  };

  const handlePasswordOnKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter") {
      disableTextFields();
      handleLogin();
      enableTextFields();
    }
  };

  return (
    <Box className={'flex justify-center items-center h-screen w-screen flex-col'}
    >
      <Box className={'flex flex-col w-300'}
      >
        <TextField
          ref={usernameRef}
          label={"Username"}
          value={username}
          onChange={handleUsernameChange}
          margin={"normal"}
          fullWidth={true}
        ></TextField>

        <PasswordInput
          ref={passwordRef}
          label={"Password"}
          value={password}
          handlePasswordChange={handlePasswordChange}
          handlePasswordOnKeyDown={handlePasswordOnKeyDown}
          style={{ margin: "normal", fullWidth: true }}
          validatePassword={false}
        />

        {errorMessage && (
          <Box className={'text-red-500'}
          >
            {errorMessage}
          </Box>
        )}
      </Box>
      <Button onClick={handleLogin}>Login</Button>
    </Box>
  );
};

export default Login;
