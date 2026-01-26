import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { getCode } from "country-list";
import Spinner from "./Spinner";
import ButtonBack from "./ButtonBack";

const formatDate = (date) =>
  new Intl.DateTimeFormat("zh-TW", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();

  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity],
  );

  const { cityName, date, notes, country } = currentCity;

  if (isLoading) return <Spinner />;

  const hasCountry = typeof country === "string" && country.length > 0;
  const isoCode = hasCountry ? getCode(country) : null;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>
            <ReactCountryFlag
              countryCode={isoCode}
              svg
              style={{ width: "1.2em", height: "1.2em", marginRight: "6px" }}
              aria-label={country}
            />
          </span>
          {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://zh.wikipedia.org/zh-tw/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          維基百科&rarr;
        </a>
      </div>

      <div>
        <ButtonBack />
      </div>
    </div>
  );
}

export default City;
