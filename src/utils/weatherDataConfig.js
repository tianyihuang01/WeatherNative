import {weekName, TIME_FORMAT, imgName} from './constant';

const getImg = weatherId => {
  let selectedImg;
  let imgList = [];
  if (weatherId >= 200 && weatherId < 700) {
    const firstDigit = String(weatherId)[0];
    imgList = imgName.filter(img => img[0] === firstDigit);
  } else {
    const threeDigits = String(weatherId).substring(0, 3);
    imgList = imgName.filter(img => img.substring(0, 3) === threeDigits);
  }
  if (imgList.length > 0) {
    selectedImg = imgList[Math.floor(Math.random() * imgList.length)];
  } else {
    selectedImg = '000-0';
  }
  return `${selectedImg}`;
  // return `./src/assets/images/${selectedImg}.jpg`;
};

const getIconUrl = iconId => {
  return `https://openweathermap.org/img/wn/${iconId}@2x.png`;
};

const getTimeFromUnix = (unixTimeStamp, option) => {
  let unix_timestamp = unixTimeStamp;
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  const date = new Date(unix_timestamp * 1000);
  // Hours part from the timestamp
  const hours = date.getHours();
  // Minutes part from the timestamp
  const minutes = '0' + date.getMinutes();
  // Seconds part from the timestamp
  const seconds = '0' + date.getSeconds();
  // get Date
  const day = weekName[date.getDay()];

  const ampm = hours >= 12 ? 'pm' : 'am';
  let hours12 = hours % 12;
  hours12 = hours12 ? hours12 : 12; // the hour '0' should be '12'
  hours12 = hours12 + ampm;

  const hourMinute = hours + ':' + minutes.substr(-2);
  const hourMinuteSecond = hourMinute + ':' + seconds.substr(-2);

  switch (option) {
    case TIME_FORMAT.HH:
      return hours12;
    case TIME_FORMAT.HHMM:
      return hourMinute;
    case TIME_FORMAT.HHMMSS:
      return hourMinuteSecond;
    case TIME_FORMAT.DD:
      return day;
  }
};

export const setWeatherData = (id, name, weatherData) => {
  //current forecast
  const currentData = {
    temp_current: Math.round(weatherData.current.temp * 10) / 10,
    feels_like: Math.round(weatherData.current.feels_like * 10) / 10,
    temp_max: Math.round(weatherData.daily[0].temp.max),
    temp_min: Math.round(weatherData.daily[0].temp.min),
    weather_id: weatherData.current.weather[0].id,
    weather_img: getImg(weatherData.current.weather[0].id),
    weather_desc: weatherData.current.weather[0].description,
    weather_desc_brief: weatherData.current.weather[0].main,
    icon: getIconUrl(weatherData.current.weather[0].icon),
    rain_last_hour: weatherData.current.rain
      ? weatherData.current.rain['1h']
      : null,
    snow_last_hour: weatherData.current.snow
      ? weatherData.current.snow['1h']
      : null,
    wind_deg: weatherData.current.wind_deg, //TODO: convert degree to direction
    wind_speed: weatherData.current.wind_speed,
    wind_gust: weatherData.current.wind_gust
      ? weatherData.current.wind_gust
      : null,
    humidity: weatherData.current.humidity,
    sunrise: getTimeFromUnix(weatherData.current.sunrise, TIME_FORMAT.HHMM), //convert time format (to hour:minute)
    sunset: getTimeFromUnix(weatherData.current.sunset, TIME_FORMAT.HHMM), //convert time format (to hour:minute)
    uvi: weatherData.current.uvi,
  };

  //hourly forecast
  let hourlyDataList = [];
  for (let i = 0; i < weatherData.hourly.length; i++) {
    const hourlyData = {
      timestamp: getTimeFromUnix(weatherData.hourly[i].dt, TIME_FORMAT.HH), //convert time format (to hour)
      weather_id: weatherData.hourly[i].weather[0].id,
      weather_img: getImg(weatherData.hourly[i].weather[0].id),
      icon: getIconUrl(weatherData.hourly[i].weather[0].icon),
      temp: Math.round(weatherData.hourly[i].temp),
      feels_like: Math.round(weatherData.hourly[i].feels_like * 10) / 10,
      rain_last_hour: weatherData.hourly[i].rain
        ? weatherData.hourly[i].rain['1h']
        : null,
      snow_last_hour: weatherData.hourly[i].snow
        ? weatherData.hourly[i].snow['1h']
        : null,
      wind_deg: weatherData.hourly[i].wind_deg, //TODO: convert degree to direction
      wind_speed: weatherData.hourly[i].wind_speed,
      wind_gust: weatherData.hourly[i].wind_gust
        ? weatherData.hourly[i].wind_gust
        : null,
    };
    hourlyDataList.push(hourlyData);
  }

  //daily forecast
  let dailyForecastList = [];
  //skip today
  for (let i = 1; i < weatherData.daily.length; i++) {
    const dailyForecast = {
      timestamp:
        i === 1
          ? 'Tomorrow'
          : getTimeFromUnix(weatherData.daily[i].dt, TIME_FORMAT.DD), //convert time format (to week)
      weather_id: weatherData.daily[i].weather[0].id,
      weather_img: getImg(weatherData.daily[i].weather[0].id),
      icon: getIconUrl(weatherData.daily[i].weather[0].icon),
      temp_max: Math.round(weatherData.daily[i].temp.max),
      temp_min: Math.round(weatherData.daily[i].temp.min),
      rain_vol: weatherData.daily[i].rain ? weatherData.daily[i].rain : null,
      snow_vol: weatherData.daily[i].snow ? weatherData.daily[i].snow : null,
      sunrise: getTimeFromUnix(weatherData.daily[i].sunrise, TIME_FORMAT.HHMM), //convert time format (to hour:minute)
      sunset: getTimeFromUnix(weatherData.daily[i].sunset, TIME_FORMAT.HHMM), //convert time format (to hour:minute)
      uvi: weatherData.daily[i].uvi,
    };
    dailyForecastList.push(dailyForecast);
  }

  //TODO: alert system (optional)

  const filteredData = {
    id,
    name,
    current: currentData,
    hourly: hourlyDataList,
    daily: dailyForecastList,
  };
  return filteredData;
};
