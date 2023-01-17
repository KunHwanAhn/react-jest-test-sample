import React, { useState } from 'react';

interface MyCheckboxProps {
  htmlFor: string;
  labelOn: string;
  labelOff: string;
}
export default function MyCheckbox({ htmlFor, labelOn, labelOff }: MyCheckboxProps) {
  const [checked, setChecked] = useState<boolean>(false);

  const updateChecked = () => { setChecked((currChecked) => !currChecked); };

  return (
    <label htmlFor={htmlFor}>
      <input
        id={htmlFor}
        type="checkbox"
        checked={checked}
        onChange={updateChecked}
      />
      {checked ? labelOn : labelOff}
    </label>
  );
}
