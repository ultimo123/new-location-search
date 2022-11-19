import { CityLocation } from "../api/calculateCityApi/services"
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L, { Icon, latLng } from "leaflet"
import locationDrop from "../assets/locationDrop.png"

const iconDrop = new L.Icon({
  iconUrl: locationDrop,
  iconRetinaUrl: locationDrop,
  popupAnchor: [0, 0],
  iconSize: new L.Point(50, 50),
})

interface ApiResultData {
  distance2Cites: CityLocation
  distanceCites: CityLocation[]
}

interface mapProps {
  locationData: ApiResultData
  className: string
}

const MapDisplay = ({ locationData, className }: mapProps) => {
  return (
    <div
      className={`${className} p-4 mb-10 border border-[#673981] rounded-md`}
    >
      {locationData && (
        <MapContainer
          center={[46.2276, 2.2137]}
          zoom={5.55555555}
          scrollWheelZoom={true}
          className="leaflet-container"
        >
          <TileLayer
            attribution="&copy;"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locationData &&
            locationData.distanceCites.map((item, index) => (
              <div key={index + 1}>
                <Polyline
                  positions={[
                    [item.city.lat, item.city.lng],
                    [item.cityOfOrigin.lat, item.cityOfOrigin.lng],
                  ]}
                />
                <Marker
                  position={[
                    (item.cityOfOrigin.lat + item.city.lat) / 2,
                    (item.cityOfOrigin.lng + item.city.lng) / 2,
                  ]}
                  icon={iconDrop}
                  title={item.cityOfOrigin.name}
                >
                  <Popup>{Math.round(item.distance) + " km"}</Popup>
                </Marker>
                <Marker
                  position={[item.cityOfOrigin.lat, item.cityOfOrigin.lng]}
                >
                  <Popup>{item.cityOfOrigin.name}</Popup>
                </Marker>

                {locationData.distanceCites.length - 1 === index && (
                  <>
                    <Marker position={[item.city.lat, item.city.lng]}>
                      <Popup keepInView>{item.city.name}</Popup>
                    </Marker>
                  </>
                )}
              </div>
            ))}
        </MapContainer>
      )}
    </div>
  )
}

export default MapDisplay
