import React, { Context, Fragment } from "react";
import { difference } from "lodash";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { connect } from "react-redux";

import {
  addToFavoritesList,
  removeFromFavoritesList
} from "../actions/action-creator";

import store from "../store";
import Header from "./header/header";
import CitySearch from "./city-search/city-search";
import { WeatherWidgetList } from "./weather-widget-list/weather-widget-list";

const defaultCity = { Key: "215854", LocalizedName: "Tel Aviv" };

function mapStateToProps(state) {
  return {
    cities: state.favoritesList.favoritesList
  };
}

const ConnectedWeatherWidgetList = connect(mapStateToProps)(WeatherWidgetList);

export class App extends React.Component {
  state = { cities: [] }; //defaultcity here

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
    let { cities } = this.state;
    console.log(this.props.store.getState());

    return (
      <Router>
        <Header>
          <NavLink exact={true} activeClassName="is-active" to={"/"}>
            Home
          </NavLink>
          <NavLink activeClassName="is-active" to={"/favorites"}>
            Favorites
          </NavLink>
        </Header>
        <Route exact path="/">
          <div className="screen">
            <div className="city-selector">
              <CitySearch onSearch={event => this.handleCityChange(event)} />
            </div>

            <hr />
            <div className="widgets">
              <WeatherWidgetList
                cities={cities}
                onDeleteWidget={city => this.deleteCity(city)}
                onFavorites={city => store.dispatch(addToFavoritesList(city))}
              />
            </div>
          </div>
        </Route>
        <Route path="/favorites">
          <h1>favorites</h1>
          <ConnectedWeatherWidgetList
            onDeleteWidget={city =>
              store.dispatch(removeFromFavoritesList(city))
            }
          />
        </Route>
      </Router>
    );
  }
}
