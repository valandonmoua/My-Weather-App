import React, { useState } from "react";
import "./index.css";

const api = {
  key: "1633f2e6f7403ec5f5cfe3a4d45545e1",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday,",
      "Monday,",
      "Tuesday,",
      "Wednesday,",
      "Thursday,",
      "Friday,",
      "Saturday,",
    ];
    let dates = [
      "1,",
      "2,",
      "3,",
      "4,",
      "5,",
      "6,",
      "7,",
      "8,",
      "9,",
      "10,",
      "11,",
      "12,",
      "13,",
      "14,",
      "15,",
      "16,",
      "17,",
      "18,",
      "19,",
      "20,",
      "22,",
      "23,",
      "24,",
      "25,",
      "26,",
      "27,",
      "28,",
      "29,",
      "30,",
      "31,",
    ];

    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let date = dates[d.getDate()];
    let year = d.getFullYear();

    return `${day} ${month} ${date} ${year}`;
  };

  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app cold"
          : "app cold"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C /{" "}
                {Math.round(celsiusToFahrenheit(weather.main.temp))}°F
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
