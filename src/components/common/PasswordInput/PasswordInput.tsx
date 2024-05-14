import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  Tooltip,
} from "@mui/material";
import React, { FC, useDeferredValue, useEffect, useState } from "react";
import { UtilityRepository } from "../../../repositories/utility";
import "./PasswordInput.css";

interface PasswordInputProps {
  ref?: React.Ref<HTMLInputElement>;
  label: string;
  value: string;
  handlePasswordChange: (value: string) => void;
  handlePasswordOnKeyDown?: (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => void;
  style?: Omit<TextFieldProps, "variant">;
  error?: boolean;
  setPasswordError?: (error: boolean) => void;
  validatePassword?: boolean;
  additionalValidation?: () => boolean;
}

const PasswordInput: FC<PasswordInputProps> = (props: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const passwordDeferredValue = useDeferredValue(props.value);

  const handleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.handlePasswordChange(event.target.value);
  };

  useEffect(() => {
    const validatePassword = (): void => {
      UtilityRepository.validatePassword(passwordDeferredValue)
        .then((isValid: boolean) => {
          if (props.setPasswordError) {
            if (props.additionalValidation) {
              isValid = isValid && props.additionalValidation();
            }
            props.setPasswordError(!isValid);
          }
        })
        .catch(() => {
          if (props.setPasswordError) {
            props.setPasswordError(true);
          }
        });
    };

    if (passwordDeferredValue.length === 0 && props.setPasswordError) {
      props.setPasswordError(true);
      return;
    }

    if (props.validatePassword) {
      validatePassword();
    }
  }, [passwordDeferredValue]);

  return (
    <FormControl fullWidth={true}>
      <TextField
        ref={props.ref}
        label={props.label ?? "Password"}
        value={props.value}
        type={showPassword ? "text" : "password"}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position={"end"}>
              <Tooltip title={showPassword ? "Hide password" : "Show password"}>
                <IconButton onClick={handleShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
        onKeyDown={props.handlePasswordOnKeyDown}
        error={props.error}
        {...props.style}
      />
    </FormControl>
  );
};

export default PasswordInput;
