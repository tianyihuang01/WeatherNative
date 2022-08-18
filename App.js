/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Weather from './src/pages/Weather';
// import store from './src/redux/store';

import {CITY_PLACEHOLDER, IMG_SOURCE} from './src/utils/constant';
import getCurrentAndForecast from './src/store/services/getCurrentAndForecastAxios';
import {
  setWeatherData,
  getNavIconByWeatherIcon,
} from './src/utils/weatherDataConfig';

const Tab = createBottomTabNavigator();

const AppStack = () => {
  const [weather, setWeather] = useState();
  const [navIcon, setNavIcon] = useState('weather-sunny');

  useEffect(() => {
    const {id, name, coord} = CITY_PLACEHOLDER;
    const fetchWeather = async () => {
      const {data} = await getCurrentAndForecast(coord);
      if (data.current) {
        const filteredData = setWeatherData(id, name, data);
        setWeather(filteredData);
        setNavIcon(getNavIconByWeatherIcon(data.current.weather[0].icon));
        console.log('API CALLED!!');
      }
    };
    fetchWeather();
  }, [0]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="Weather"
          // component={Weather}
          children={() => <Weather weather={weather} />}
          options={{
            tabBarLabel: 'Weather',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name={navIcon}
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
