const locations = {
  tokyo: { latitude: 35.682839, longitude: 139.759455 },
  osaka: { latitude: 34.693725, longitude: 135.502254 },
  kyoto: { latitude: 35.011564, longitude: 135.768149 }
};

const baseUrl = 'https://api.open-meteo.com/v1/forecast';

export default async function getWeather(location) {
  try {
    const { latitude, longitude } = locations[location];
    const queryParams = {
      latitude,
      longitude,
      hourly: [
        'temperature_2m', 'relative_humidity_2m',
        'precipitation_probability', 'rain', 'weather_code'
      ].join(','),
      timezone: 'Asia/Tokyo'
    };
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${baseUrl}?${queryString}`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
