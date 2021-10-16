/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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

const renderToday = () => (
  <ImageBackground
    source={require('./src/assets/images/background_top.jpg')}
    style={{height: 400}}>
    <View style={{margin: 20}}>
      <Text style={styles.cityName}>Melbourne</Text>
      <View style={styles.tempNowContainer}>
        <Text style={styles.tempNow}>13.5°</Text>
        <Image
          style={styles.iconNow}
          source={{uri: 'https://openweathermap.org/img/wn/10d@2x.png'}}
        />
      </View>
      <View style={styles.tempTodayContainer}>
        <View style={{flexDirection: 'column'}}>
          <Text style={[styles.tempToday, {fontWeight: 'bold'}]}>16°</Text>
          <Text style={[styles.tempTodayDescription, {fontWeight: 'bold'}]}>
            Max
          </Text>
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.tempToday}>9°</Text>
          <Text style={styles.tempTodayDescription}>Min</Text>
        </View>
      </View>
      <Text style={styles.weatherTodayDescription}>
        Possible shower. Wind easing.
      </Text>
    </View>
  </ImageBackground>
);

const textColorStyle = isDarkMode => {
  return {
    color: isDarkMode ? Colors.light : Colors.dark,
  };
};

const renderHourly = isDarkMode => (
  <View style={styles.forecastContainer}>
    <Text style={[styles.forecastTitle, textColorStyle(isDarkMode)]}>
      Hourly Forecast
    </Text>
    <ScrollView horizontal style={{marginHorizontal: -20}}>
      <View
        style={[
          styles.forecastHourlyContainer,
          styles.borderBottom,
          styles.borderRight,
        ]}>
        <Text style={[styles.forecastHourlyTime, textColorStyle(isDarkMode)]}>
          5pm
        </Text>
        <Image
          style={styles.iconForecast}
          source={{uri: 'https://openweathermap.org/img/wn/10d@2x.png'}}
        />
        <Text style={[styles.forecastHourlyTemp, textColorStyle(isDarkMode)]}>
          15°
        </Text>
      </View>
      <View
        style={[
          styles.forecastHourlyContainer,
          styles.borderBottom,
          styles.borderRight,
        ]}>
        <Text style={[styles.forecastHourlyTime, textColorStyle(isDarkMode)]}>
          5pm
        </Text>
        <Image
          style={styles.iconForecast}
          source={{uri: 'https://openweathermap.org/img/wn/10d@2x.png'}}
        />
        <Text style={[styles.forecastHourlyTemp, textColorStyle(isDarkMode)]}>
          15°
        </Text>
      </View>
      <View
        style={[
          styles.forecastHourlyContainer,
          styles.borderBottom,
          styles.borderRight,
        ]}>
        <Text style={[styles.forecastHourlyTime, textColorStyle(isDarkMode)]}>
          5pm
        </Text>
        <Image
          style={styles.iconForecast}
          source={{uri: 'https://openweathermap.org/img/wn/10d@2x.png'}}
        />
        <Text style={[styles.forecastHourlyTemp, textColorStyle(isDarkMode)]}>
          15°
        </Text>
      </View>
      <View
        style={[
          styles.forecastHourlyContainer,
          styles.borderBottom,
          styles.borderRight,
        ]}>
        <Text style={[styles.forecastHourlyTime, textColorStyle(isDarkMode)]}>
          5pm
        </Text>
        <Image
          style={styles.iconForecast}
          source={{uri: 'https://openweathermap.org/img/wn/10d@2x.png'}}
        />
        <Text style={[styles.forecastHourlyTemp, textColorStyle(isDarkMode)]}>
          15°
        </Text>
      </View>
      <View
        style={[
          styles.forecastHourlyContainer,
          styles.borderBottom,
          styles.borderRight,
        ]}>
        <Text style={[styles.forecastHourlyTime, textColorStyle(isDarkMode)]}>
          5pm
        </Text>
        <Image
          style={styles.iconForecast}
          source={{uri: 'https://openweathermap.org/img/wn/10d@2x.png'}}
        />
        <Text style={[styles.forecastHourlyTemp, textColorStyle(isDarkMode)]}>
          15°
        </Text>
      </View>
      <View
        style={[
          styles.forecastHourlyContainer,
          styles.borderBottom,
          styles.borderRight,
        ]}>
        <Text style={[styles.forecastHourlyTime, textColorStyle(isDarkMode)]}>
          5pm
        </Text>
        <Image
          style={styles.iconForecast}
          source={{uri: 'https://openweathermap.org/img/wn/10d@2x.png'}}
        />
        <Text style={[styles.forecastHourlyTemp, textColorStyle(isDarkMode)]}>
          15°
        </Text>
      </View>
      <View
        style={[
          styles.forecastHourlyContainer,
          styles.borderBottom,
          styles.borderRight,
        ]}>
        <Text style={[styles.forecastHourlyTime, textColorStyle(isDarkMode)]}>
          5pm
        </Text>
        <Image
          style={styles.iconForecast}
          source={{uri: 'https://openweathermap.org/img/wn/10d@2x.png'}}
        />
        <Text style={[styles.forecastHourlyTemp, textColorStyle(isDarkMode)]}>
          15°
        </Text>
      </View>
    </ScrollView>
  </View>
);

const renderForecast = isDarkMode => (
  <View style={styles.forecastContainer}>
    <Text style={[styles.forecastTitle, textColorStyle(isDarkMode)]}>
      Daily Forecast
    </Text>
    <View style={[styles.forecastDailyContainer, styles.borderBottom]}>
      <Text style={[styles.forecastDailyWeekday, textColorStyle(isDarkMode)]}>
        Tomorrow
      </Text>
      <Image
        style={styles.iconForecast}
        source={{uri: 'https://openweathermap.org/img/wn/10d@2x.png'}}
      />
      <Text style={[styles.forecastDailyWeekday, textColorStyle(isDarkMode)]}>
        9°
      </Text>
      <Text style={[styles.forecastDailyWeekday, textColorStyle(isDarkMode)]}>
        15°
      </Text>
    </View>
    <View style={[styles.forecastDailyContainer, styles.borderBottom]}>
      <Text style={[styles.forecastDailyWeekday, textColorStyle(isDarkMode)]}>
        Tomorrow
      </Text>
      <Image
        style={styles.iconForecast}
        source={{uri: 'https://openweathermap.org/img/wn/10d@2x.png'}}
      />
      <Text style={[styles.forecastDailyWeekday, textColorStyle(isDarkMode)]}>
        9°
      </Text>
      <Text style={[styles.forecastDailyWeekday, textColorStyle(isDarkMode)]}>
        15°
      </Text>
    </View>
    <View style={[styles.forecastDailyContainer, styles.borderBottom]}>
      <Text style={[styles.forecastDailyWeekday, textColorStyle(isDarkMode)]}>
        Tomorrow
      </Text>
      <Image
        style={styles.iconForecast}
        source={{uri: 'https://openweathermap.org/img/wn/10d@2x.png'}}
      />
      <Text style={[styles.forecastDailyWeekday, textColorStyle(isDarkMode)]}>
        9°
      </Text>
      <Text style={[styles.forecastDailyWeekday, textColorStyle(isDarkMode)]}>
        15°
      </Text>
    </View>
    <View style={[styles.forecastDailyContainer, styles.borderBottom]}>
      <Text style={[styles.forecastDailyWeekday, textColorStyle(isDarkMode)]}>
        Tomorrow
      </Text>
      <Image
        style={styles.iconForecast}
        source={{uri: 'https://openweathermap.org/img/wn/10d@2x.png'}}
      />
      <Text style={[styles.forecastDailyWeekday, textColorStyle(isDarkMode)]}>
        9°
      </Text>
      <Text style={[styles.forecastDailyWeekday, textColorStyle(isDarkMode)]}>
        15°
      </Text>
    </View>
  </View>
);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView>
        {renderToday()}
        {renderHourly(isDarkMode)}
        {renderForecast(isDarkMode)}
      </ScrollView>
    </SafeAreaView>
  );
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
    fontSize: 20,
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
});

export default App;
