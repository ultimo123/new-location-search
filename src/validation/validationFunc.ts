import { InitialStateUserInput } from "../hooks/useInputData"
import { inputValidations } from "./Validation"

export interface validInputKeys {
  valid: boolean
  msg: string
}
export interface ValidInput {
  city: validInputKeys
  cityOfOrigin: validInputKeys
  date: validInputKeys
  intermedieteCitys: validInputKeys
  numberOfPassengers: validInputKeys
}

export const ValidKeys = (valid: boolean, msg: string) => {
  return {
    valid: valid,
    msg: msg,
  } as validInputKeys
}

export const inputValidation = (validateInputs: InitialStateUserInput) => {
  const {
    City,
    CityOrigin,
    DateValidation,
    IntermediateCites,
    PasangersValidation,
  } = inputValidations(validateInputs)

  const validationObj: ValidInput = {
    city: City(validateInputs.city),
    cityOfOrigin: CityOrigin(validateInputs.cityOfOrigin),
    date: DateValidation(validateInputs.date as Date),
    intermedieteCitys: IntermediateCites(validateInputs.intermedieteCitys),
    numberOfPassengers: PasangersValidation(validateInputs.numberOfPassengers),
  }

  let valid = true

  for (var obj in validationObj) {
    if (!validationObj[obj as keyof ValidInput].valid) {
      valid = false;
    }
  }
  return {
    validObj: validationObj,
    valid: valid,
  }
}
