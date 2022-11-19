import { InitialStateUserInput } from "../../hooks/useInputData";
import { calculateByNameCity, haversineDistance } from "./services";
import { timeout } from "../../utils/timeout";
import { DISABLE_TIMEOUT, MILLISECOND_DELAY } from "../config";

export const CalculateCityApi = async (body: InitialStateUserInput) => {
  const calcCites = calculateByNameCity(
    body.city,
    body.cityOfOrigin,
    body.intermedieteCitys
  );

  if (!DISABLE_TIMEOUT) await timeout(MILLISECOND_DELAY);

  

  if (
    body.city.toLowerCase() === "Dijon".toLowerCase() ||
    body.cityOfOrigin.toLowerCase() === "Dijon".toLowerCase() ||
    body.intermedieteCitys.includes("Dijon")
  ) {
    return {
      status: 500,
      message: "calculation failure",
      data: undefined,
    };
  }
  return {
    status: 200,
    message: "success",
    data: {
      distance2Cites: calcCites.calculate2Cites(),
      distanceCites: calcCites.calculateCites(),
      calculateCitesRoutes:calcCites.calculateRoutes()
    },
  };
};
