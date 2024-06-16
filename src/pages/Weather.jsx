import { useEffect, useState } from "react";
import { AppBar, Box, Container, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, LinearProgress } from "@mui/material";
import getWeather from "../api/getWeather";
import { AcUnitOutlined, BeachAccessOutlined, CloudOutlined, WbSunnyOutlined } from "@mui/icons-material";

const weatherIcons = {
  clear: <WbSunnyOutlined />,
  cloudy: <CloudOutlined />,
  rain: <BeachAccessOutlined />,
  snow: <AcUnitOutlined />,
};

function getWeatherIcon(weatherCode) {
  if (weatherCode === 0) return weatherIcons.clear;
  if (weatherCode >= 1 && weatherCode <= 3) return weatherIcons.cloudy;
  if (weatherCode >= 61 && weatherCode <= 67) return weatherIcons.rain;
  if (weatherCode >= 71 && weatherCode <= 77) return weatherIcons.snow;
  return weatherIcons.cloudy; // 天気コードについて詳しくはわからないのでとりあえずで
}

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('tokyo');
  const [interval, setInterval] = useState(3);

  useEffect(() => {
    async function fetchWeather() {
      const data = await getWeather(location);
      setWeatherData(data);
    }
    fetchWeather();
  }, [location]);

  if (!weatherData) {
    return (
      <Container maxWidth="md">
        <Paper sx={{ p: 2, boxShadow: '0px 0 15px 0 rgba(0, 0, 0, 0.2)', textAlign: 'center' }}>
          <Typography>天気を読み込み中...</Typography>
          <LinearProgress />
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Weather | 天気予報
          </Typography>
        </Toolbar>
      </AppBar>
      <Box mt={4}>
        <Paper sx={{
          p: 2,
          boxShadow: '0px 0 15px 0 rgba(0, 0, 0, 0.2)'
        }}>
          <Box display="flex" justifyContent="center" mb={2}>
            <Select
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            >
              <MenuItem value="tokyo">東京</MenuItem>
              <MenuItem value="osaka">大阪</MenuItem>
              <MenuItem value="kyoto">京都</MenuItem>
            </Select>
            <Select
              value={interval}
              onChange={(event) => setInterval(event.target.value)}
              sx={{ ml: 2 }}
            >
              <MenuItem value={1}>1時間ごと</MenuItem>
              <MenuItem value={3}>3時間ごと</MenuItem>
              <MenuItem value={6}>6時間ごと</MenuItem>
              <MenuItem value={12}>12時間ごと</MenuItem>
              <MenuItem value={24}>1日ごと</MenuItem>
            </Select>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>日付 / 時刻</TableCell>
                  <TableCell>天気</TableCell>
                  <TableCell>温度 (°C)</TableCell>
                  <TableCell>湿度 (%)</TableCell>
                  <TableCell>降水確率 (%)</TableCell>
                  <TableCell>降水量 (mm)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {weatherData.hourly.time.map((time, index) => {
                  if (index % interval !== 0) return null;
                  const temperature = weatherData.hourly.temperature_2m?.[index];
                  const humidity = weatherData.hourly.relative_humidity_2m?.[index];
                  const precipitation = weatherData.hourly.precipitation_probability?.[index];
                  const rain = weatherData.hourly.rain?.[index];
                  const weatherIcon = getWeatherIcon(weatherData.hourly.weather_code?.[index]);

                  const temperatureColor = temperature >= 30 ? 'red' : temperature <= 10 ? 'blue' : 'green';
                  const weatherTime = new Date(time);
                  return (
                    <TableRow key={index}>
                      <TableCell>{weatherTime.getMonth() + 1}/{weatherTime.getDate()}{interval != 24 && ` / ${weatherTime.getHours()}時`}</TableCell>
                      <TableCell>{weatherIcon}</TableCell>
                      <TableCell sx={{ color: temperatureColor }}>{temperature}</TableCell>
                      <TableCell>{humidity}</TableCell>
                      <TableCell>{precipitation}</TableCell>
                      <TableCell>{rain}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
}

export default Weather;