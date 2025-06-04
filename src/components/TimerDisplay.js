import React, { useState, useEffect, useRef } from "react";
import { Button, Stack, Typography, TextField } from "@mui/material";

const TimerDisplay = () => {
  const [time, setTime] = useState(0); // початкове значення в секундах
  const [isRunning, setIsRunning] = useState(false);
  const [hasNotified, setHasNotified] = useState(false);
  const intervalRef = useRef(null);
  const soundRef = useRef(null);
  
  const [hoursInput, setHoursInput] = useState("0");
  const [minutesInput, setMinutesInput] = useState("0");
  const [secondsInput, setSecondsInput] = useState("0");

  useEffect(() => {
    soundRef.current = new Audio("/sounds/notification.mp3");
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (time === 0 && isRunning) {
      setIsRunning(false);
      if (!hasNotified) {
        setHasNotified(true);
        if (soundRef.current) {
          soundRef.current.play().catch((e) => console.warn("Audio play failed:", e));
        }
      }
    }
  }, [time, isRunning, hasNotified]);

  const formatTime = (timeInSeconds) => {
    const hours = String(Math.floor(timeInSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(timeInSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleSetTime = () => {
    const hours = parseInt(hoursInput, 10);
    const minutes = parseInt(minutesInput, 10);
    const seconds = parseInt(secondsInput, 10);

    if (
      isNaN(hours) || hours < 0 ||
      isNaN(minutes) || minutes < 0 || minutes > 59 ||
      isNaN(seconds) || seconds < 0 || seconds > 59
    ) {
      alert("Please enter valid numbers: hours ≥ 0, minutes and seconds between 0 and 59.");
      return;
    }

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds === 0) {
      alert("Please set a time greater than 0.");
      return;
    }

    setTime(totalSeconds);
    setIsRunning(false);
    setHasNotified(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setHoursInput("0");
    setMinutesInput("0");
    setSecondsInput("0");
    setHasNotified(false);
  };

  const handleStartPause = () => {
    if (time > 0) {
        setIsRunning((prev) => !prev);
    }
  };

  return (
    <Stack spacing={3} alignItems="center">
        <Stack 
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
        >

          <TextField
            label="Hours"
            type="number"
            value={hoursInput}
            onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^[0-9\b]+$/.test(value)) {
                    setHoursInput(value);
                }
            }}
            slotProps={{ input: { min: 0 } }}
          />
          <TextField
            label="Minutes"
            type="number"
            value={minutesInput}
            onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^[0-9\b]+$/.test(value)) {
                    setMinutesInput(value);
                }
            }}
            slotProps={{ input: { min: 0, max: 59 } }}
          />
          <TextField
            label="Seconds"
            type="number"
            value={secondsInput}
            onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^[0-9\b]+$/.test(value)) {
                    setSecondsInput(value);
                }
            }}
            slotProps={{ input: { min: 0, max: 59 } }}
          />
          <Button variant="contained" onClick={handleSetTime}>
            Set Timer
          </Button>
        </Stack>

        <Typography variant="h1">{formatTime(time)}</Typography>

        {time === 0 && hasNotified && (
          <Typography variant="h5" color="error">
            ⏰ Time is up!
          </Typography>
        )}

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="error"
            size="large"
            sx={{
                width: { xs: '100%', sm: '150px' },
                height: { xs: '56px', sm: '70px' },
                fontSize: { xs: '20px', sm: '32px' }
            }}
            onClick={handleReset}
          >
            Reset
          </Button>

          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
                width: { xs: '100%', sm: '150px' },
                height: { xs: '56px', sm: '70px' },
                fontSize: { xs: '20px', sm: '32px' }
            }}
            onClick={handleStartPause}
          >
            {isRunning ? "Pause" : "Start"}
          </Button>
        </Stack>
    </Stack>
  );
};

export default TimerDisplay;