import { TextField, TextFieldProps } from "@mui/material";
import { FC, useDeferredValue, useEffect } from "react";
import { UtilityRepository } from "../../../repositories/utility";

interface IdNumberInputProps {
  handleChange: (idNumber: string) => void;
  value: string;
  error: boolean;
  setError: (error: boolean) => void;
  textFieldProps?: Omit<TextFieldProps, "variant">;
}

const IdNumberInput: FC<IdNumberInputProps> = (props: IdNumberInputProps) => {
  const idNumberDeferred = useDeferredValue(props.value);

  useEffect(() => {
    const validateIdNumber = async (): Promise<void> => {
      UtilityRepository.validateIdNumber(idNumberDeferred)
        .then((isValid: boolean | undefined) => {
          props.setError(!Boolean(isValid));
        })
        .catch(() => {
          props.setError(true);
        });
    };

    validateIdNumber();
  }, [idNumberDeferred]);

  const handleIdNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    props.handleChange(e.target.value);
  };

  return (
    <TextField
      value={props.value}
      label={"Id Number"}
      onChange={handleIdNumberChange}
      error={props.error}
      fullWidth={true}
      margin={"normal"}
      {...props.textFieldProps}
    />
  );
};

export default IdNumberInput;
