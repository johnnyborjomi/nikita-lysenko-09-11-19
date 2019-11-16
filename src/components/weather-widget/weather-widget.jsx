import * as React from "react";
import classnames from "classnames";
import { connect } from "react-redux";

import getWeather from "./weather.service";

import "./weather-widget.scss";

export class WeatherWidget extends React.Component {
  state = {
    weatherData: {}
  };

  componentDidMount() {
    let { city } = this.props;
    this.getWeather(city);
  }

  componentWillReceiveProps(props) {
    let { city } = props;
    this.getWeather(city);
  }

  async getWeather(city) {
    let weatherData = await getWeather(city);
    if (weatherData) {
      this.setState({ weatherData });
    }
  }

  render() {
    let { city, onDeleteWidget, onFavorites } = this.props;
    let { weatherData } = this.state;

    console.log(city);

    let {
      cityName,
      description = "...",
      temp = 0,
      humidity,
      pressure,
      icon = "?"
    } = weatherData;

    //todo: do it better
    let isLoading = !weatherData.icon;

    temp = Math.floor(temp);

    let tempBgc = isLoading ? "#fff" : temp > 0 ? "#fff3d0" : "#d8eeff";

    return (
      <div
        className={classnames(["weather-widget", { "is-loading": isLoading }])}
        style={{ backgroundColor: tempBgc }}
      >
        <div className="actions">
          {onFavorites && (
            <div
              className="button button--favorites"
              onClick={() =>
                onFavorites({ Key: city.Key, LocalizedName: cityName })
              }
            >
              ⭐️
            </div>
          )}
          <div
            className="button button--delete"
            onClick={() => onDeleteWidget(city)}
          >
            ✖️
          </div>
        </div>
        <div className="city">{cityName}</div>
        <div className="desc">
          {new Date().toDateString()}, {description}
          <div>
            <div>💧humidity: {humidity}</div>
            <div>🌡pressure: {pressure}</div>
          </div>
        </div>
        <div className="main">
          <div className="temp">
            <div className="temp-value">{temp}</div>
            <div className="temp-units">°C</div>
          </div>
          <div className="icon">{icon}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    favoritesList: state.favoritesList.favoritesList
  };
}

export const ConnectedWeatherWidget = connect(mapStateToProps)(WeatherWidget);
