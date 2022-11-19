export const checkIfObjMissingValues = (obj: Object) => {
  let isMisingKey = false;
  for (var key in obj) {
    const value = obj[key as keyof Object];
    if (!value) isMisingKey = true;
    if (Array.isArray(value) && (value as Array<any>).length === 0) isMisingKey = true;
    if (
      typeof value === "object" &&
      Object.keys(value).length === 0 &&
      !((value as Object) instanceof Date)
    )
      isMisingKey = true;
  }
  return isMisingKey;
};
