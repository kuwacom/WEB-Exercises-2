import { useState, useEffect } from 'react';
import { AppBar, Box, Button, Container, Paper, TextField, Toolbar, Typography } from '@mui/material';

import alarmSound from '../assets/sounds/alarm.mp3'; // alarm音声
const audio = new Audio(alarmSound);

function Timer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  // const [milliseconds, setMilliseconds] = useState(0);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleStart = () => {
    const totalMilliseconds = (minutes * 60 + seconds) * 1000; // ミリ秒に変換
    if (totalMilliseconds <= 0) return;
    setTime(totalMilliseconds);
    setIsActive(true);
    setIsPaused(false);
  };

  const stopAlarm = () => {
    audio.pause();
    audio.currentTime = 0;
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTime(0);
    stopAlarm();
  };

  const formatTime = (time) => {
    const formattedMinutes = Math.floor((time / (1000 * 60)) % 60);
    const formattedSeconds = Math.floor((time / 1000) % 60);
    const formattedMilliseconds = Math.floor((time % 1000) / 10); // ミリ秒を2桁表示に変換
    return `${formattedMinutes < 10 ? '0' : ''}${formattedMinutes}:${formattedSeconds < 10 ? '0' : ''}${formattedSeconds}:${formattedMilliseconds < 10 ? '0' : ''}${formattedMilliseconds}`;
  };

  useEffect(() => {
    if (!isActive) return;
    let interval;
    interval = setInterval(() => {
      if (!isPaused) setTime(pTime => {
        if (pTime === 0) { // タイマー起動
          clearInterval(interval);
          audio.play();
          setIsActive(false);
          setIsPaused(false);
          return 0;
        } else return pTime - 10;
      });
    }, 10);
    return () => {
      clearInterval(interval);
    }
  }, [isActive, isPaused]);

  return (
    <Container maxWidth="sm">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Timer App
          </Typography>
        </Toolbar>
      </AppBar>
      <Box mt={4}>
        <Paper sx={{ p: 2, boxShadow: '0px 0 15px 0 rgba(0, 0, 0, 0.2)' }}>
          <Box sx={{ display: 'flex', mb: 1 }}>
              <TextField
                label="Minutes"
                type="number"
                fullWidth
                value={minutes}
                sx={{ pr: 1 }}
                onChange={(e) => {
                  if (0 <= e.target.value) setMinutes(parseInt(e.target.value))
                }}
              />
              <TextField
                label="Seconds"
                type="number"
                fullWidth
                value={seconds}
                onChange={(e) => {
                  if (0 <= e.target.value) setSeconds(parseInt(e.target.value))
                }}
              />
              {/* 
              <TextField
                label="Milliseconds"
                type="number"
                fullWidth
                value={milliseconds}
                onChange={(e) => {
                  if (0 <= e.target.value) setMilliseconds(parseInt(e.target.value))
                }}
              /> */}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleStart}
                disabled={isActive && !isPaused}
                sx={{ flex: 1, mr: 1 }}
              >
                Start
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => { setIsPaused(true) }}
                disabled={!isActive || isPaused}
                sx={{ flex: 1, mr: 1 }}
              >
                Pause
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={() => { setIsPaused(false) }}
                disabled={!isActive || !isPaused || !time}
                sx={{ flex: 1, mr: 1 }}
              >
                Resume
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={handleReset}
                sx={{ flex: 1, mr: 1 }}
              >
                Reset
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={stopAlarm}
                sx={{ flex: 2, mr: 1 }}
              >
                Stop Alarm
              </Button>
            </Box>
          <Box mt={4} display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h3">
              {formatTime(time)}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Timer;
