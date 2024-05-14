import { TextField, TextFieldProps } from "@mui/material";
import { FC, useDeferredValue, useEffect } from "react";
import { UtilityRepository } from "../../../repositories/utility";
import "./PhoneNumberInput.css";

interface PhoneNumberInputProps {
  handleChange: (phoneNumber: string) => void;
  value: string;
  error: boolean;
  setError: (error: boolean) => void;
  textFieldProps?: Omit<TextFieldProps, "variant">;
}

const PhoneNumberInput: FC<PhoneNumberInputProps> = (
  props: PhoneNumberInputProps
) => {
  const phoneNumberDeferred = useDeferredValue(props.value);

  useEffect(() => {
    const validatePhoneNumber = async (): Promise<void> => {
      UtilityRepository.validatePhoneNumber(phoneNumberDeferred)
        .then((isValid: boolean | undefined) => {
          props.setError(!Boolean(isValid));
        })
        .catch(() => {
          props.setError(true);
        });
    };

    if (phoneNumberDeferred.length === 0) {
      props.setError(true);
      return;
    }

    validatePhoneNumber();
  }, [phoneNumberDeferred]);

  const handlePhoneNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    props.handleChange(e.target.value);
  };

  return (
    <TextField
      value={props.value}
      label={"Phone Number"}
      onChange={handlePhoneNumberChange}
      error={props.error}
      {...props.textFieldProps}
    />
  );
};

export default PhoneNumberInput;
