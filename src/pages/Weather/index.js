import React, {useState, useEffect} from 'react';
// import type {Node} from 'react';
import {
  ImageBackground,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {CITY_PLACEHOLDER, IMG_SOURCE} from '../../utils/constant';
import getCurrentAndForecast from '../../store/services/getCurrentAndForecastAxios';
import {setWeatherData} from '../../utils/weatherDataConfig';

const renderToday = (isLoading, weather) => {
  if (isLoading) {
    return (
      <ImageBackground
        source={IMG_SOURCE[weather?.current.weather_img]}
        style={{height: 400}}>
        <View style={{margin: 20}}>
          <Text style={styles.cityName}>Loading...</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={IMG_SOURCE[weather?.current.weather_img]}
      style={{height: 400}}>
      <View style={{margin: 20}}>
        <Text style={[styles.cityName, styles.textShadow]}>
          {weather?.name}
        </Text>
        <View style={styles.tempNowContainer}>
          <Text style={[styles.tempNow, styles.textShadow]}>
            {weather?.current.temp_current}°
          </Text>
          <Image style={styles.iconNow} source={{uri: weather?.current.icon}} />
        </View>
        <Text style={[styles.tempTodayFeels, styles.textShadow]}>
          Feels like {weather?.current.feels_like}°
        </Text>
        <View style={styles.tempTodayContainer}>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={[
                styles.tempToday,
                styles.textShadow,
                {fontWeight: 'bold'},
              ]}>
              {weather?.current.temp_max}°
            </Text>
            <Text
              style={[
                styles.tempTodayDescription,
                styles.textShadow,
                {fontWeight: 'bold'},
              ]}>
              Max
            </Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={[styles.tempToday, styles.textShadow]}>
              {weather?.current.temp_min}°
            </Text>
            <Text style={[styles.tempTodayDescription, styles.textShadow]}>
              Min
            </Text>
          </View>
        </View>
        <Text style={[styles.weatherTodayDescription, styles.textShadow]}>
          {weather?.current.weather_desc}
        </Text>
      </View>
    </ImageBackground>
  );
};

const textColorStyle = isDarkMode => {
  return {
    color: isDarkMode ? Colors.light : Colors.dark,
  };
};

const renderHourly = (isDarkMode, weather) => (
  <View style={styles.forecastContainer}>
    <Text style={[styles.forecastTitle, textColorStyle(isDarkMode)]}>
      Hourly Forecast
    </Text>
    <ScrollView horizontal style={{marginHorizontal: -20}}>
      {weather?.hourly.map((hourlyWeather, index) => (
        <View key={index} style={styles.forecastHourlyContainer}>
          <View style={[styles.borderBottom, styles.borderRight]}>
            <Text
              style={[styles.forecastHourlyTime, textColorStyle(isDarkMode)]}>
              {hourlyWeather.timestamp}
            </Text>
            <Image
              style={styles.iconForecast}
              source={{uri: hourlyWeather.icon}}
            />
            <Text
              style={[styles.forecastHourlyTemp, textColorStyle(isDarkMode)]}>
              {hourlyWeather.temp}°
            </Text>
          </View>
          <Text
            style={[
              styles.forecastHourlyFeels,
              textColorStyle(isDarkMode),
              styles.borderTop,
              styles.borderBottom,
              styles.borderRight,
              {marginBottom: 1},
            ]}>
            {hourlyWeather.feels_like}°
          </Text>
        </View>
      ))}
    </ScrollView>
    <Text style={[styles.forecastHourlyFeelsText, textColorStyle(isDarkMode)]}>
      Feels like
    </Text>
  </View>
);

const renderForecast = (isDarkMode, weather) => (
  <View style={styles.forecastContainer}>
    <Text style={[styles.forecastTitle, textColorStyle(isDarkMode)]}>
      Daily Forecast
    </Text>
    {weather?.daily.map((dailyWeather, index) => (
      <View
        key={index}
        style={[styles.forecastDailyContainer, styles.borderBottom]}>
        <Text
          style={[
            styles.forecastDailyWeekName,
            styles.forecastDailyWeekday,
            textColorStyle(isDarkMode),
          ]}>
          {dailyWeather.timestamp}
        </Text>
        <Image style={styles.iconForecast} source={{uri: dailyWeather.icon}} />
        <Text
          style={[
            styles.forecastDailyTemp,
            styles.forecastDailyWeekday,
            textColorStyle(isDarkMode),
          ]}>
          {dailyWeather.temp_min}°
        </Text>
        <Text
          style={[
            styles.forecastDailyTemp,
            styles.forecastDailyWeekday,
            textColorStyle(isDarkMode),
          ]}>
          {dailyWeather.temp_max}°
        </Text>
      </View>
    ))}
  </View>
);

const renderLoadingView = (isDarkMode, backgroundStyle) => (
  <SafeAreaView style={backgroundStyle}>
    <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
    <ScrollView>{renderToday(true)}</ScrollView>
  </SafeAreaView>
);

const renderWeatherView = (isDarkMode, backgroundStyle, weather) => (
  <SafeAreaView style={backgroundStyle}>
    <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
    <ScrollView>
      {renderToday(false, weather)}
      {renderHourly(isDarkMode, weather)}
      {renderForecast(isDarkMode, weather)}
    </ScrollView>
  </SafeAreaView>
);

const App = () => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    const {id, name, coord} = CITY_PLACEHOLDER;
    const fetchWeather = async () => {
      const {data} = await getCurrentAndForecast(coord);
      if (data.current) {
        const filteredData = setWeatherData(id, name, data);
        setWeather(filteredData);
        console.log('API CALLED!!');
      }
    };
    fetchWeather();
  }, [0]);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : null,
  };

  if (!weather) {
    return renderLoadingView(isDarkMode, backgroundStyle);
  }

  if (weather) {
    return renderWeatherView(isDarkMode, backgroundStyle, weather);
  }
};

const styles = StyleSheet.create({
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: '#d1d1d1',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1d1',
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: '#d1d1d1',
  },
  cityName: {color: 'white', fontSize: 30},
  tempNowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
  },
  tempNow: {
    color: 'white',
    textAlign: 'left',
    fontSize: 50,
  },
  textShadow: {
    textShadowColor: '#000000',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  iconNow: {width: 100, height: 80},
  iconForecast: {width: 65, height: 65},
  tempTodayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%',
  },
  tempToday: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
  },
  tempTodayFeels: {
    color: 'white',
    textAlign: 'left',
    fontSize: 20,
    paddingBottom: 5,
  },
  tempTodayDescription: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  weatherTodayDescription: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
    marginVertical: 120,
  },
  forecastContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  forecastTitle: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 20,
  },
  forecastHourlyContainer: {
    flexDirection: 'column',
  },
  forecastHourlyTime: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 3,
  },
  forecastHourlyTemp: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '500',
  },
  forecastHourlyFeels: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 19,
  },
  forecastHourlyFeelsText: {
    marginHorizontal: -20,
    paddingLeft: 10,
    textAlign: 'left',
    fontSize: 15,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 177,
  },
  forecastDailyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forecastDailyWeekday: {
    fontSize: 18,
    fontWeight: '500',
  },
  forecastDailyWeekName: {
    width: 110,
  },
  forecastDailyTemp: {
    width: 45,
  },
});

export default App;
