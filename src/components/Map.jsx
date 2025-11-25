import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { UseUrlPosition } from "../hooks/useUrlPosition";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url
  ).toString(),
  iconUrl: new URL(
    "leaflet/dist/images/marker-icon.png",
    import.meta.url
  ).toString(),
  shadowUrl: new URL(
    "leaflet/dist/images/marker-shadow.png",
    import.meta.url
  ).toString(),
});

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([0, 0]);

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = UseUrlPosition();

  useEffect(
    function () {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      // prettier-ignore
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (geoLocationPosition)setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    },
    [geoLocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "載入中..." : "你的位置"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={9}
        scrollWheelZoom={true}
        className={styles.map}
        maxBounds={[
          [-85, -180],
          [85, 180],
        ]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          noWrap={true}
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.flyTo(position, 10, {
    duration: 0.8,
  });
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
