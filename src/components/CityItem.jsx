import styles from "./CityItem.module.css";
import ReactCountryFlag from "react-country-flag";
import { getCode } from "country-list";
import { Link } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("zh-TW", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ city }) {
  const isoCode = getCode(city.country);

  return (
    <li>
      <Link
        className={styles.cityItem}
        to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
      >
        <span>
          <ReactCountryFlag
            countryCode={isoCode}
            svg
            style={{ width: "1.2em", height: "1.2em", marginRight: "6px" }}
            aria-label={city.country}
          />
        </span>
        <h3 className={styles.name}>{city.cityName}</h3>
        <time className={styles.date}>{formatDate(city.date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
