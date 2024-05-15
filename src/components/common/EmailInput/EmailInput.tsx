import { TextField, TextFieldProps } from "@mui/material";
import { FC, useDeferredValue, useEffect } from "react";
import { useTranslation } from "react-i18next";
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

  const { t } = useTranslation();

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
      return "invalidEmail";
    }
    return "";
  };

  return (
    <TextField
      value={props.value}
      label={t("email")}
      onChange={handleEmailChange}
      error={props.error}
      helperText={t(handleHelperText())}
      {...props.textFieldProps}
    />
  );
};

export default EmailInput;
