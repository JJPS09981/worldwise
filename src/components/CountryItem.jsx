import styles from "./CountryItem.module.css";
import ReactCountryFlag from "react-country-flag";
import { getCode } from "country-list";

function CountryItem({ country }) {
  const isoCode = getCode(country.country);

  return (
    <li className={styles.countryItem}>
      <span>
        <ReactCountryFlag
          countryCode={isoCode}
          svg
          style={{ width: "1.2em", height: "1.2em", marginRight: "6px" }}
          aria-label={country.country}
        />
      </span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
