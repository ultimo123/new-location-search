import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { QueryBuilder, queryParser } from "../utils/QueryBuilder"
import { InitialStateUserInput } from "../hooks/useInputData"
import { CityLocation } from "../api/calculateCityApi/services"
import MapDisplay from "../components/MapDisplay"
import { toast } from "react-hot-toast"
import { inputValidation } from "../validation/validationFunc"
import { CalculateCityApi } from "../api/calculateCityApi/CalculateCityApi"

interface ApiResultData {
  distance2Cites: CityLocation
  calculateCitesRoutes: number
  distanceCites: CityLocation[]
}

const SearchResult = () => {
  const location = useLocation()
  const navigation = useNavigate()
  const [locationData, setLocationData] = useState<ApiResultData>()
  const [loading, setLoading] = useState(false)
  const [urlData, setUrlData] = useState<InitialStateUserInput>()

  const calculateApi = async (search: InitialStateUserInput) => {
    setLoading(true)
    const { data, message, status } = await CalculateCityApi(search)

    if (status === 200) {
      setLocationData(data)
    } else {
      setLoading(false)
      navigation(
        new QueryBuilder("/error")
          .addQuery("error", message)
          .addQuery("data", data)
          .getQueryPath(),
      )
      return Promise.reject("error")
    }

    setLoading(false)
  }

  const validateQuery = (query: InitialStateUserInput) => {
    const inputValidations = inputValidation(query)
    return inputValidations.valid
  }

  useEffect(() => {
    const urlDataParsed = queryParser(location.search) as InitialStateUserInput

    if (!urlDataParsed) {
      navigation("eror")
      return
    }

    const validateList = validateQuery(urlDataParsed)

    if (!validateList) {
      navigation("eror")
    }
    setUrlData(urlDataParsed)

    toast.promise(calculateApi(urlDataParsed), {
      loading: <div>Loading...</div>,
      success: (
        <b className="font-medium text-sm">Data Retrieved successfully!</b>
      ),
      error: <b>Data are not correct!</b>,
    })
  }, [location])

  return (
    <div className="flex items-center justify-between h-screen py-10 pb-10 overflow-y-scroll md:overflow-hidden">
      {!loading && (
        <div className="flex flex-col h-full my-12 md:flex-row gap-20 mx-14 w-full">
          {locationData && (
            <div className="flex flex-row md:items-center flex-[0.5] items-start">
              <div className="p-2 m-5 text-white">
                <div className="flex flex-row h-full">
                  <div className="flex flex-col h-full">
                    {locationData.distanceCites.map((n, index) => (
                      <div
                        className="flex flex-col items-center gap-1"
                        key={index + 1}
                      >
                        <span className="bg-[#212a41] px-3 py-1 rounded-md">
                          {n.cityOfOrigin.name}
                        </span>
                        <div className="w-[2px] h-6 bg-red-300" />
                        <span className="bg-[#212a41] px-3 py-1 rounded-md">
                          {parseInt(`${n.distance}`)} km
                        </span>
                        <div className="w-[2px] h-6 bg-red-300" />
                        {locationData.distanceCites.length - 1 === index && (
                          <span className="bg-[#212a41] px-3 py-1 rounded-md">
                            {n.city.name}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col ml-4 mt-3">
                    <div className="flex flex-col h-full">
                      <div className="w-full h-[2px] bg-red-300" />

                      <div className="flex flex-col items-center h-full mt-2">
                        <div className="flex flex-col h-full">
                          <div className="w-[2px] h-full bg-red-300" />
                        </div>

                        <div className="flex">
                          <span className="bg-[#212a41] px-3 py-1 rounded-md my-2 flex items-center justify-center">
                            {Math.floor(locationData.calculateCitesRoutes)} km
                          </span>
                        </div>

                        <div className="flex flex-col h-full">
                          <div className="w-[2px] h-full bg-red-300" />
                        </div>
                      </div>

                      <div className="flex flex-col justify-end">
                        <div className="w-full h-[2px] bg-red-300 mt-3 mb-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 text-white"></div>

              <div className="flex flex-col">
                <p className="font-bold text-gray-400 tracking-wider text-2xl underline mb-6">
                  Search Results
                </p>
                <div className="flex flex-col">
                  <div className="result">
                    Date:{" "}
                    <span className="text-xs">
                      {new Date(
                        (urlData?.date as any)?.split('"')[1],
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="result">
                    Origin City:{" "}
                    <span className="text-xs">{urlData?.cityOfOrigin}</span>
                  </div>
                  <div className="result">
                    Cities:{" "}
                    <span className="text-xs">
                      {urlData?.intermedieteCitys.map((city, index) => (
                        <p key={`${city}-${index}`} className="w-full">
                          {city}
                        </p>
                      ))}
                    </span>
                  </div>
                  <div className="result">
                    Destination City:{" "}
                    <span className="text-xs">{urlData?.city}</span>
                  </div>
                  <div className="result">
                    Passengers:{" "}
                    <span className="text-xs">
                      {urlData?.numberOfPassengers}{" "}
                      {urlData?.numberOfPassengers === 1 ? "person" : "persons"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {locationData && (
            <MapDisplay
              className="w-full min-h-[520px]  md:flex-[0.6]"
              locationData={locationData}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default SearchResult
