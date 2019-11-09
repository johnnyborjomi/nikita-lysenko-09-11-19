import * as React from "react";
import { difference } from "lodash";

import WeatherWidget from "./weather-widget/weather-widget";
import CitySearch from "./city-search/city-search";
import apiUsageService from "./api-usage.service";

//todo: @vm: get all cities from service
const fullCityList = [
  "Kharkiv",
  "Lviv",
  "Kiev",
  "London",
  "Tokyo",
  "Moscow",
  "Paris",
  "Phuket",
  "Berlin",
  "Kiel",
  "Sharm ash Shaykh",
  "Rome"
];

export class App extends React.Component {
  state = { cities: [] }; //defaultcity here

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    apiUsageService.onChange(({ rateLimit, rateLimitRemaining }) =>
      this.setState({ rateLimit, rateLimitRemaining })
    );
  }

  handleCityChange(newCity) {
    if (this.state.cities.indexOf(newCity) >= 0) {
      console.log("city already added");
      return;
    }

    this.setState(({ cities }) => ({ cities: [...cities, newCity] }));
  }

  deleteCity(city) {
    this.setState(({ cities }) => ({ cities: difference(cities, [city]) }));
  }

  render() {
    let { cities, rateLimit, rateLimitRemaining } = this.state;

    let cityList = difference(fullCityList, cities);

    //todo: @vm: render selector and weather widget as separate components

    //todo: @vm: make weather widget as component, - it should receive city, and then
    //todo: @vm: go to service by itself and get data, and show spinner!
    //todo: @vm: also here you should have some kind of cityList where you can
    //todo: @vm: manage cities, i.e. add/remove city widgets, as in zadanie.
    //todo: @vm: so do that shit.

    return (
      <div className="screen">
        <h1 className="app-title">WeatherApp</h1>
        <div>
          {rateLimitRemaining}/{rateLimit}
        </div>
        <div className="city-selector">
          <CitySearch onSearch={event => this.handleCityChange(event)} />
        </div>

        <hr />
        <div className="widgets">
          {cities.map(city => (
            <WeatherWidget
              key={city}
              city={city}
              onDeleteWidget={city => this.deleteCity(city)}
            />
          ))}
        </div>
      </div>
    );
  }
}
