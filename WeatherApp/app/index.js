import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, Button } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig.extra.WEATHER_API_KEY;
export default function App() {
  const [city, setCity] = useState('New York');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌤 Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Get Weather" onPress={fetchWeather} />
      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : weatherData ? (
        <View style={styles.weatherContainer}>
          <Text style={styles.city}>{weatherData.name}</Text>
          <Text style={styles.temp}>{weatherData.main.temp} °C</Text>
          <Text style={styles.desc}>{weatherData.weather[0].description}</Text>
        </View>
      ) : (
        <Text style={styles.error}>Could not load weather data.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#aaa',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 40,
    marginVertical: 10,
  },
  desc: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
  loader: {
    marginTop: 20,
  },
  error: {
    marginTop: 20,
    color: 'red',
  },
});
