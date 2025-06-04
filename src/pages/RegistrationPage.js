import React, { useState } from 'react';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import AppTitle from '../components/AppTitle';
import Logo from '../components/Logo';

function RegistrationPage() {
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPassword = (password) =>
    /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,30}$/.test(password);

  const validateBirthDate = (dateString) => {
    if (!dateString) return 'Date of birth is required';

    const birthDate = new Date(dateString);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    const adjustedAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

    if (birthDate > today) {
      return 'Date of birth cannot be in the future';
    }

    if (adjustedAge < 0) {
      return 'Age must be greater than 0';
    }

    if (adjustedAge > 120) {
      return 'Age must be less than 120';
    }

    return '';
  };

  const handleRegister = () => {
    if (!name || !sex || !dob || !email || !password) {
      setError('All fields are required');
      return;
    }

    const dobError = validateBirthDate(dob);
    if (dobError) {
      setError(dobError);
      return;
    }

    if (!isValidEmail(email)) {
      setError('Invalid email format');
      return;
    }

    if (!isValidPassword(password)) {
      setError('Password must be 8–30 characters long and include at least one digit and one special character');
      return;
    }

    const existing = users.find((u) => u.email === email);
    if (existing) {
      setError('User with this email already exists');
      return;
    }

    dispatch(registerUser({ name, sex, dob, email, password }));
    navigate('/login');
  };

  const fieldStyle = {
    '& .MuiInputBase-root': {
      height: 36,
    },
    '& input': {
      padding: '8px 12px',
    },
    '& .MuiSelect-select': {
      height: '36px',
      display: 'flex',
      alignItems: 'center',
    },
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      minHeight="100vh"
      padding={2}
      boxSizing="border-box"
    >
      <AppTitle />

      <Box mt={2} mb={3} width="100%" maxWidth="400px" display="flex" flexDirection="column" gap={2} alignSelf="center">
        <Typography variant="h4" align="center">Registration</Typography>

        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} sx={fieldStyle} />

        <TextField
          label="Sex"
          select
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          sx={fieldStyle}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </TextField>

        <TextField
          label="Date of birth"
          type="date"
          InputLabelProps={{ shrink: true }}
          inputProps={{ max: new Date().toISOString().split("T")[0] }}
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          sx={fieldStyle}
        />

        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} sx={fieldStyle} />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={fieldStyle} />

        {error && <Typography color="error" align="center">{error}</Typography>}

        <Button variant="contained" onClick={handleRegister}>Create an account</Button>

        <Button variant="outlined" onClick={() => navigate('/login')}>Back to log in</Button>
      </Box>

      <Logo />
    </Box>
  );
}

export default RegistrationPage;
