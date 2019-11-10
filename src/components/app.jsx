import * as React from "react";
import { difference } from "lodash";

import Header from "./header/header";
import WeatherWidget from "./weather-widget/weather-widget";
import CitySearch from "./city-search/city-search";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import apiUsageService from "./api-usage.service";

import "./app.scss";

export class App extends React.Component {
  state = { cities: [] }; //defaultcity here

  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   apiUsageService.onChange(({ rateLimit, rateLimitRemaining }) =>
  //     this.setState({ rateLimit, rateLimitRemaining })
  //   );
  // }

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
                    key={city}
                    city={city}
                    onDeleteWidget={city => this.deleteCity(city)}
                  />
                ))}
              </div>
            </div>
          </Route>
          <Route path="/favorites">
            <div>favorites</div>
          </Route>
        </Router>
        {/* <div className="api-request-info">
                API Requests: {rateLimitRemaining}/{rateLimit}
              </div> */}
      </>
    );
  }
}
