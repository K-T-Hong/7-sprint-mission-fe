import React, { useState } from "react";

export function useErrorCheck(initialValue, validateFn) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const onChange = e => {
    setValue(e.target.value);
    if (validateFn) setError(validateFn(e.target.value));
  };

  return [value, onChange, error];
}
