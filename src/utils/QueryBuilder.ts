export class QueryBuilder {
  query: string | undefined;
  routPathWithUrl: string | undefined;
  isCount: boolean = true;

  constructor(routPathWithUrl: string) {
    this.routPathWithUrl = routPathWithUrl;
    this.query = "?";
  }

  public getQueryPath = () => {
    if (!this.routPathWithUrl || !this.query) {
      return "";
    }
    return this.routPathWithUrl + this.query;
  };

  public addQuery = (key: string, value: any) => {
    if (this.isCount) {
      this.query += "";
      this.isCount = false;
    } else {
      this.query += "&";
    }

    if (typeof value === "object" || Array.isArray(value)) {
      this.query += `${key}=${JSON.stringify(value)}`;
    } else {
      this.query += `${key}=${value}`;
    }
    return this;
  };
}

export const queryParser = (url: string) => {
  const urlToString = decodeURI(url);
  const parsUrl = urlToString?.split("?")[1]?.split("&");
  if (!parsUrl) {
    return false;
  }

  const parsedUrl = parsUrl?.map((n) => {
    const [key, value] = n.split("=");

    if (
      (value.includes("[") && value.includes("]")) ||
      (value.includes("{") && value.includes("}"))
    ) {
      return { [key]: JSON.parse(value) };
    }
    return { [key]: value };
  });

  let parsedObj = {};

  parsedUrl.forEach((element) => {
    parsedObj = { ...parsedObj, ...element };
  });
  return parsedObj;
};
