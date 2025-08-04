import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Avatar,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mockCredentials = {
      admin: {
        email: 'admin@sayas.in',
        password: 'admin123',
        role: 'Admin',
      },
      agent: {
        email: 'agent@sayas.in',
        password: 'agent123',
        role: 'Agent',
      },
    };

    if (
      form.email === mockCredentials.admin.email &&
      form.password === mockCredentials.admin.password
    ) {
      onLogin({ role: 'admin' });
      navigate('/admin');
    } else if (
      form.email === mockCredentials.agent.email &&
      form.password === mockCredentials.agent.password
    ) {
      onLogin({ role: 'agent' });
      navigate('/agent');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f1f5f9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          borderRadius: 4,
          width: '100%',
          maxWidth: 400,
          textAlign: 'center',
        }}
      >
        <Avatar
          sx={{
            backgroundColor: '#2563eb',
            margin: '0 auto',
            marginBottom: 2,
            width: 56,
            height: 56,
          }}
        >
          <LockOutlined />
        </Avatar>

        <Typography variant="h5" fontWeight={600} gutterBottom>
          Welcome to Sayas AI
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Sign in to continue
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          {error && (
            <Typography variant="body2" color="error" mt={1}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, paddingY: 1 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
