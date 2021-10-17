/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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

import {CITY_PLACEHOLDER} from './src/utils/constant';
import getCurrentAndForecast from './src/store/services/getCurrentAndForecastAxios';
import {setWeatherData} from './src/utils/weatherDataConfig';

const renderToday = (isLoading, weather) => {
  if (isLoading) {
    return (
      <ImageBackground
        source={require('./src/assets/images/background_top.jpg')}
        style={{height: 400}}>
        <View style={{margin: 20}}>
          <Text style={styles.cityName}>Loading...</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('./src/assets/images/background_top.jpg')}
      style={{height: 400}}>
      <View style={{margin: 20}}>
        <Text style={styles.cityName}>{weather?.name}</Text>
        <View style={styles.tempNowContainer}>
          <Text style={styles.tempNow}>{weather?.current.temp_current}°</Text>
          <Image style={styles.iconNow} source={{uri: weather?.current.icon}} />
        </View>
        <View style={styles.tempTodayContainer}>
          <View style={{flexDirection: 'column'}}>
            <Text style={[styles.tempToday, {fontWeight: 'bold'}]}>
              {weather?.current.temp_max}°
            </Text>
            <Text style={[styles.tempTodayDescription, {fontWeight: 'bold'}]}>
              Max
            </Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.tempToday}>{weather?.current.temp_min}°</Text>
            <Text style={styles.tempTodayDescription}>Min</Text>
          </View>
        </View>
        <Text style={styles.weatherTodayDescription}>
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
        <View
          key={index}
          style={[
            styles.forecastHourlyContainer,
            styles.borderBottom,
            styles.borderRight,
          ]}>
          <Text style={[styles.forecastHourlyTime, textColorStyle(isDarkMode)]}>
            {hourlyWeather.timestamp}
          </Text>
          <Image
            style={styles.iconForecast}
            source={{uri: hourlyWeather.icon}}
          />
          <Text style={[styles.forecastHourlyTemp, textColorStyle(isDarkMode)]}>
            {hourlyWeather.temp}°
          </Text>
        </View>
      ))}
    </ScrollView>
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
    return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView>{renderToday(true)}</ScrollView>
      </SafeAreaView>
    );
  }

  if (weather) {
    return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView>
          {renderToday(false, weather)}
          {renderHourly(isDarkMode, weather)}
          {renderForecast(isDarkMode, weather)}
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
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
  iconNow: {width: 100, height: 100},
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
