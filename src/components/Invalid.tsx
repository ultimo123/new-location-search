import React from "react";
import { validInputKeys } from "../validation/validationFunc";

interface InvaledInputs {
  validations: validInputKeys;
  preventPrompt?: boolean;
  errors?: {
    error: boolean;
    message: string;
  };
}

const Invalid = ({ validations, preventPrompt, errors }: InvaledInputs) => {
  const { valid, msg } = validations;
  return (
    <>
      {errors?.error && <div className="text-xs text-red-500">{errors.message}</div>}
      {!errors?.error&&!valid && !preventPrompt && (
        <span className="text-xs validations text-red-500">{msg}</span>
      )}
    </>
  );
};

export default Invalid;
