import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Link 
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const body = JSON.stringify({ email, password });
      const res = await axios.post('http://localhost:5000/api/auth/login', body, config);
      
      localStorage.setItem('token', res.data.token);
      
      // Show success toast
      toast.success('Login successful! Redirecting...');
      
      // Navigate after 2 seconds
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
      toast.error(err.response?.data?.msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        
        <TextField
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={onChange}
          required
          fullWidth
        />
        
        <TextField
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={onChange}
          required
          fullWidth
        />
        
        <Button 
          type="submit" 
          variant="contained" 
          size="large" 
          fullWidth
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Don't have an account? <Link href="/register">Register</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;