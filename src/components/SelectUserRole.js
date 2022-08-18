import React, { useState } from "react";
import {
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
} from "@mui/material";

//rendered by SignUp.js
export default function SelectUserRole(props) {
  const { setUserRole } = props;
  const handleChange = (e) => {
    setUserRole(e.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">
        What will you be doing?
      </FormLabel>
      <RadioGroup
        onChange={handleChange}
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel
          value="buyer"
          control={<Radio />}
          label="Buying Cars"
        />
        <FormControlLabel
          value="seller"
          control={<Radio />}
          label="Selling Cars"
        />
      </RadioGroup>
    </FormControl>
  );
}
