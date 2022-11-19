import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Select from "./InputWrapper";
import Invalid from "./Invalid";

type InputProps = {
  stateManager: {
    value: number;
    onChange: (e: number) => void;
  };
  className?: string;
  placeholder: string;
  validation: {
    valid: boolean;
    msg: string;
  };
};

const SelectNumberInput = ({
  stateManager,
  className,
  validation,
  placeholder,
}: InputProps) => {
  const { onChange, value } = stateManager;
  const [isTouched, setIsTouched] = useState(false);

  return (
    <div className="cursor-pointer">
      <Select
        className={`${className} ${className} ${
          validation.valid ? "" : "bg-black"
        }`}
      >
        <input
          title="input"
          onChange={(e) => {
            setIsTouched(true);
            onChange(parseInt(e.target.value));
          }}
          className="bg-transparent outline-none w-full -ml-3"
          value={isTouched ? value : ''}
          type="number"
          placeholder={placeholder}
        />
      </Select>

      <Invalid validations={validation} />
    </div>
  );
};

export default SelectNumberInput;
