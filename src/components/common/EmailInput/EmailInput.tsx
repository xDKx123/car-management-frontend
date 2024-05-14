import { TextField, TextFieldProps } from "@mui/material";
import { FC, useDeferredValue, useEffect } from "react";
import { UtilityRepository } from "../../../repositories/utility";
import "./EmailInput.css";

interface EmailInputProps {
  handleChange: (email: string) => void;
  value: string;
  error: boolean;
  setError: (error: boolean) => void;
  textFieldProps?: Omit<TextFieldProps, "variant">;
}

const EmailInput: FC<EmailInputProps> = (props: EmailInputProps) => {
  const emailDeferred = useDeferredValue(props.value);

  useEffect(() => {
    const validateEmail = async (): Promise<void> => {
      UtilityRepository.validateEmail(emailDeferred)
        .then((isValid: boolean | undefined) => {
          props.setError(!Boolean(isValid));
        })
        .catch(() => {
          props.setError(true);
        });
    };

    if (emailDeferred.length === 0) {
      props.setError(true);
      return;
    }

    validateEmail();
  }, [emailDeferred]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    props.handleChange(e.target.value);
  };

  const handleHelperText = (): string => {
    if (props.textFieldProps?.helperText) {
      return props.textFieldProps.helperText as string;
    }

    if (props.error) {
      return "Invalid email";
    }
    return "";
  };

  return (
    <TextField
      value={props.value}
      label={"Email"}
      onChange={handleEmailChange}
      error={props.error}
      helperText={handleHelperText()}
      {...props.textFieldProps}
    />
  );
};

export default EmailInput;
