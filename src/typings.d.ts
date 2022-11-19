import React from "react";

export type InputProps = {
  stateManager: {
    value: string | Date;
    onChange: (
      e: string | Date | Array<string> | React.ChangeEvent<HTMLInputElement>
    ) => void;
  };
  placeholder?: string;
  isArraySelect?: boolean;
  className?: string;
  validation: {
    valid: boolean;
    msg: string;
  };
};
