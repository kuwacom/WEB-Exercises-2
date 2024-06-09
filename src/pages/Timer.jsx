import React, { useState, useEffect } from 'react';
import { AppBar, Box, Button, Container, Paper, TextField, Toolbar, Typography } from '@mui/material';

import alarmSound from '../assets/sounds/alarm.mp3'; // alarm音声
const audio = new Audio(alarmSound);

function Timer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleStart = () => {
    const totalMilliseconds = (minutes * 60 + seconds) * 1000 + milliseconds; // ミリ秒に変換
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
    const formattedMilliseconds = Math.floor((time % 1000) / 100); // ミリ秒を2桁表示に変換
    return `${formattedMinutes < 10 ? '0' : ''}${formattedMinutes}:${formattedSeconds < 10 ? '0' : ''}${formattedSeconds}:${formattedMilliseconds}`;
  };

  useEffect(() => {
    if (!isActive) return;
    if (time > 0) {
      setTimeout(() => {
        if (!isPaused) setTime(time - 100);
      }, 90); // 処理に時間がかかってタイマーに誤差が出る
    } else if (time === 0) { // タイマー起動
      audio.play();
      setIsActive(false);
      setIsPaused(false);
      setTime(0);
    }
  }, [isActive, isPaused, time]);

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
          <Box display="flex" alignItems="center">
            <TextField
              label="Set Minutes"
              type="number"
              value={minutes}
              onChange={(e) => {
                if (0 <= e.target.value) setMinutes(parseInt(e.target.value))
              }}
            />
            <TextField
              label="Set Seconds"
              type="number"
              value={seconds}
              onChange={(e) => {
                if (0 <= e.target.value) setSeconds(parseInt(e.target.value))
              }}
            />
            <TextField
              label="Set Milliseconds"
              type="number"
              value={milliseconds}
              onChange={(e) => {
                if (0 <= e.target.value) setMilliseconds(parseInt(e.target.value))
              }}
            />
            <Button
              color="primary"
              variant="contained"
              onClick={handleStart}
              disabled={isActive && !isPaused}
              sx={{ ml: 1 }}
            >
              Start
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {setIsPaused(true)}}
              disabled={!isActive || isPaused}
              sx={{ ml: 1 }}
            >
              Pause
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {setIsPaused(false)}}
              disabled={!isActive || !isPaused || !time}
              sx={{ ml: 1 }}
            >
              Resume
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={handleReset}
              sx={{ ml: 1 }}
            >
              Reset
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={stopAlarm}
              sx={{ ml: 1 }}
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
