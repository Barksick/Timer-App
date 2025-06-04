import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import AppTitle from '../components/AppTitle';
import Logo from '../components/Logo';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      setError('Invalid email or password');
      return;
    }

    dispatch(loginUser({ email, password }));
    navigate('/timer');
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

      <Box mt={1} mb={5} width="100%" maxWidth="400px" display="flex" flexDirection="column" gap={2}>
        <Typography variant="h4" align="center">Log in</Typography>

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

        {error && <Typography color="error" align="center">{error}</Typography>}

        <Button variant="contained" onClick={handleLogin} fullWidth>Log in</Button>

        <Typography align="center">
          Don’t have an account?{' '}
          <Button onClick={() => navigate('/register')}>Account registration</Button>
        </Typography>
      </Box>

      <Logo />
    </Box>
  );
}

export default LoginPage;
