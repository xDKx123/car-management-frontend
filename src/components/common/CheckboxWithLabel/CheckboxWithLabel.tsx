import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { FC } from "react";
import "./CheckboxWithLabel.css";

interface CheckboxWithLabelProps {
  value: boolean;
  label: string;
  onChange: (value: boolean) => void;
  boxStyle?: React.CSSProperties;
  boxClassName?: string;
}

const CheckboxWithLabel: FC<CheckboxWithLabelProps> = (
  props: CheckboxWithLabelProps
) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.checked);
  };

  return (
    <Box style={props.boxStyle} className={props.boxClassName}>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={props.value} onChange={handleChange} />}
          label={props.label}
        ></FormControlLabel>
      </FormGroup>
    </Box>
  );
};
export default CheckboxWithLabel;
