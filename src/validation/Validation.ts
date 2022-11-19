import data from "../data/citys.json";
import { InitialStateUserInput } from "../hooks/useInputData";
import { ValidKeys } from "./validationFunc";

const cityNames = data.map((n) => n[0]);
const checkIfIncludes = (nameCity: string) => cityNames.includes(nameCity);

export const inputValidations = (validationContext: InitialStateUserInput) => {
  const City = (city: string) => {
    if (!checkIfIncludes(city))
      return ValidKeys(false, `Can't find city ${city}`);

    if (city && checkIfIncludes(city)) return ValidKeys(true, "");
    return ValidKeys(false, "City is Invalid");
  };

  const CityOrigin = (city: string) => {
    if (!checkIfIncludes(city))
      return ValidKeys(false, `Can't find city ${city}`);
    if (city && checkIfIncludes(city)) return ValidKeys(true, "");

    return ValidKeys(true, "");
  };

  const IntermediateCites = (intermediateCites: Array<string>) => {
    if (
      intermediateCites.includes(validationContext.city) ||
      intermediateCites.includes(validationContext.cityOfOrigin)
    )
      return ValidKeys(
        false,
        `Intermediate City cant be ${validationContext.city} ${validationContext.cityOfOrigin}`
      );

    if (intermediateCites.length > 0) return ValidKeys(true, "");
    return ValidKeys(false, "Invalid Intermediate Cities");
  };
  const DateValidation = (date: Date) => {
    if (!date) return ValidKeys(true, "");
    if (new Date(date).getDate() + 1000 * 120 < new Date().getDate())
      return ValidKeys(false, "Date is incorrect");
    if (date) return ValidKeys(true, "");

    return ValidKeys(false, "Date  is invalid");
  };
  const PasangersValidation = (pasangers: number) => {
    if (pasangers < 0) return ValidKeys(false, "Passengers must not be 0");
    if (pasangers) return ValidKeys(true, "");

    return ValidKeys(true, "");
  };

  return {
    City,
    CityOrigin,
    IntermediateCites,
    DateValidation,
    PasangersValidation,
  };
};
