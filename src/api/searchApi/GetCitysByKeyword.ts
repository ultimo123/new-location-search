import data from "../../data/citys.json";
import { timeout } from "../../utils/timeout";
import { DISABLE_TIMEOUT, MILLISECOND_DELAY } from "../config";
import { filterByKeyWordsServices } from "./services";

export const searchApi = async (keywords: string) => {
  if (!DISABLE_TIMEOUT) await timeout(MILLISECOND_DELAY);

  if (keywords === "fail") {
    return {
      status: 500,
      message: "error",
      data: undefined,
    };
  }

  return {
    status: 200,
    message: "success",
    data: filterByKeyWordsServices(data, 0, keywords),
  };
};
