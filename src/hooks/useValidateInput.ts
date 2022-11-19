import React, { useEffect, useState } from "react"
import {
  inputValidation,
  ValidInput,
  validInputKeys,
  ValidKeys,
} from "../validation/validationFunc"
import { inputValidations } from "../validation/Validation"
import { InitialStateUserInput } from "./useInputData"

const useValidateInput = (inputs: InitialStateUserInput) => {
  const [isValid, setIsValid] = useState(false)
  const [isTouched, setIsTouched] = useState(false)

  const [validInputs, setValidInputs] = useState<ValidInput>({
    city: ValidKeys(true, ""),
    cityOfOrigin: ValidKeys(true, ""),
    date: ValidKeys(true, ""),
    intermedieteCitys: ValidKeys(true, ""),
    numberOfPassengers: ValidKeys(true, ""),
  })

  const validateInput = () => {
    const validation = inputValidation(inputs)
    setValidInputs(validation.validObj)
    setIsValid(validation.valid)
    setIsTouched(true)
    return validation.valid
  }

  const getInvalidInput: ValidInput = {
    ...validInputs,
  }

  useEffect(() => {
    validateInput()
    if (isTouched) {
    }
  }, [inputs])

  return {
    validateInput,
    getInvalidInput,
    isValid,
    isTouched,
  }
}

export default useValidateInput
