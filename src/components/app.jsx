import * as React from "react";
import { difference } from "lodash";

import Header from "./header/header";
import { WeatherWidget } from "./weather-widget/weather-widget";
import { ConnectedWeatherWidget } from "./weather-widget/weather-widget";
import CitySearch from "./city-search/city-search";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import store from "../store";

const defaultCity = { Key: "215854", LocalizedName: "Tel Aviv" };

export class App extends React.Component {
  state = { cities: [defaultCity] }; //defaultcity here

  constructor(props) {
    super(props);
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
    // let { cities, rateLimit = 0, rateLimitRemaining = 0 } = this.state;
    let { cities } = this.state;
    console.log(this.props.store.getState());

    //todo: @vm: render selector and weather widget as separate components

    //todo: @vm: make weather widget as component, - it should receive city, and then
    //todo: @vm: go to service by itself and get data, and show spinner!
    //todo: @vm: also here you should have some kind of cityList where you can
    //todo: @vm: manage cities, i.e. add/remove city widgets, as in zadanie.
    //todo: @vm: so do that shit.

    return (
      <>
        <Router>
          <Header>
            <Link to={"/"}>Home</Link>
            <Link to={"/favorites"}>Favorites</Link>
          </Header>
          <Route exact path="/">
            <div className="screen">
              <div className="city-selector">
                <CitySearch onSearch={event => this.handleCityChange(event)} />
              </div>

              <hr />
              <div className="widgets">
                {cities.map(city => (
                  <WeatherWidget
                    key={city.Key}
                    city={city}
                    onDeleteWidget={city => this.deleteCity(city)}
                  />
                ))}
              </div>
            </div>
          </Route>
          <Route path="/favorites">
            <>
              <h1>favorites</h1>
              {store.getState().favoritesList.favoritesList.map(city => {
                <ConnectedWeatherWidget key={city.Key} city={city} />;
              })}
            </>
          </Route>
        </Router>
      </>
    );
  }
}
