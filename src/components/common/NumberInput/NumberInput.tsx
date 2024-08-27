import { TextField } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { isNumber } from "../../../utils/utils";
import "./NumberInput.css";
import { useTranslation } from "react-i18next";

interface NumberInputProps {
  label?: string;
  required?: boolean;
  value: string;
  handleChange: (value: string) => void;
}

const NumberInput: FC<NumberInputProps> = (props: NumberInputProps) => {
  const [value, setValue] = useState<string>(props.value || "");
  //const valueDeferred = useDeferredValue<string>(value)
  //const [isValid, setIsValid] = useState<boolean>(false)

  /*useEffect(() => {
    if (isNumber(value)) {
      //setIsValid(true)
      props.handleChange(value);
      return;
    } else {
      //setIsValid(false)
      props.handleChange("");
    }
  }, [value]);*/

  const { t } = useTranslation();

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isNumber(event.target.value)) {
      setValue(event.target.value);
      props.handleChange(event.target.value);
    }
  };

  return (
    <TextField
      value={value}
      onChange={handleValueChange}
      label={t(props.label || "")}
      fullWidth={true}
      required={props.required}
      margin={"normal"}
    />
  );
};

export default NumberInput;
