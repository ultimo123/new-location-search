import data from "../../data/citys.json";

export interface CityLocation {
  cityOfOrigin: {
    name: string;
    lat: number;
    lng: number;
  };
  city: {
    name: string;
    lat: number;
    lng: number;
  };
  distance: number;
}

export const haversineDistance = (a: Array<number>, b: Array<number>) => {
  const asin = Math.asin;
  const cos = Math.cos;
  const sin = Math.sin;
  const sqrt = Math.sqrt;
  const PI = Math.PI;
  const squared = (x: number) => Math.pow(x, 2);
  const R = 6378.137;
  const toRad = (x: number) => (x * PI) / 180.0;
  const hav = (x: number) => squared(sin(x / 2));
  const aLat = toRad(a[0]);
  const bLat = toRad(b[0]);
  const aLng = toRad(a[1]);
  const bLng = toRad(b[1]);
  const ht = hav(bLat - aLat) + cos(aLat) * cos(bLat) * hav(bLng - aLng);
  return 2 * R * asin(sqrt(ht));
};

const queryCityByName = (name: string) => {
  const query = data.find((n) => n[0] === name);
  return query as Array<string | number>;
};

export const calculateByNameCity = (
  city: string,
  cityOfOrigin: string,
  intermedieteCitys: Array<string>
) => {
  const calculate2Cites = (A?: string, B?: string) => {
    let cityA: Array<any>;
    let cityB: Array<any>;

    if (A && B) {
      cityA = queryCityByName(A);
      cityB = queryCityByName(B);
    } else {
      cityA = queryCityByName(cityOfOrigin);
      cityB = queryCityByName(city);
    }

    let processedDistance: CityLocation = {
      cityOfOrigin: {
        name: cityA[0],
        lat: cityA[1] as number,
        lng: cityA[2] as number,
      },
      city: {
        name: cityB[0],
        lat: cityB[1] as number,
        lng: cityB[2] as number,
      },
      distance: 0,
    };

    processedDistance = {
      ...processedDistance,
      distance: haversineDistance([cityA[1], cityA[2]], [cityB[1], cityB[2]]),
    };

    return processedDistance as CityLocation;
  };

  const calculateCites = () => {
    let citesCalc: Array<CityLocation>;
    citesCalc = [];
    const cityProcess = [cityOfOrigin, ...intermedieteCitys, city];

    for (let i = 0; i < cityProcess.length; i++) {
      const thisCity = cityProcess[i];
      const nextCity = cityProcess[i + 1];
      if (nextCity == undefined) {
        break;
      }
      citesCalc.push(calculate2Cites(thisCity, nextCity));
    }
    return citesCalc as Array<CityLocation>;
  };

  const calculateRoutes = () => {
    let cityCalculation = 0;
    for (let i = 0; i < calculateCites().length; i++) {
      cityCalculation += calculateCites()[i].distance;
    }
    return cityCalculation;
  };

  return {
    calculate2Cites,
    calculateCites,
    calculateRoutes,
  };
};
