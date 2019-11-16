import React, { Fragment } from "react";
import { WeatherWidget } from "../weather-widget/weather-widget";

export function WeatherWidgetList(props) {
  return (
    <div className={"widgets"}>
      {props.cities.map(city => (
        <WeatherWidget
          key={city.Key}
          city={city}
          onDeleteWidget={props.onDeleteWidget}
          onFavorites={props.onFavorites}
        />
      ))}
    </div>
  );
}
