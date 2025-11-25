// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import ReactCountryFlag from "react-country-flag";

import { UseUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

// export function convertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`;

function Form() {
  const [lat, lng] = UseUrlPosition();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeo, setIsLoadongGeo] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(
    function () {
      if (!lat && !lng) return;

      async function fetchCityData() {
        try {
          setIsLoadongGeo(true);
          setGeocodingError("");

          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );

          if (!res.ok) throw new Error(`Error fetching data: ${res.status}`);

          const data = await res.json();

          if (!data.countryCode)
            throw new Error(`這似乎不是一個城市，請點擊其他地方`);

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName || "");
          setEmoji(data.countryCode);
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsLoadongGeo(false);
        }
      }

      fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);

    navigate("/app/cities");
  }

  if (!lat && !lng) return <Message message={`請點擊地圖開始使用`} />;

  if (isLoadingGeo) return <Spinner />;

  if (geocodingError) return <Message message={geocodingError} />;

  // const datePickerRef = useRef(null);

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          <ReactCountryFlag
            countryCode={emoji}
            svg
            style={{ width: "1.2em", height: "1.2em", marginRight: "6px" }}
            aria-label={country}
          />
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          selected={date}
          onChange={(d) => {
            setDate(d);
            setIsOpen(false); // ⭐ 選完就關掉日曆
          }}
          dateFormat="yyyy/MM/dd"
          open={isOpen}
          onClickOutside={() => setIsOpen(false)}
        />

        <img
          src="/calendar.png"
          alt="calendar"
          className={styles.icon}
          onClick={() => setIsOpen((open) => !open)} // ✨ 點圖開日曆
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">新增</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
