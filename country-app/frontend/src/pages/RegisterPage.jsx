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

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { name, email, password, confirmPassword } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const body = JSON.stringify({ name, email, password });
      const res = await axios.post('http://localhost:5000/api/auth/register', body, config);
      
      localStorage.setItem('token', res.data.token);
      
      // Show success toast
      toast.success('Registration successful! Redirecting to login...');
      
      // Navigate after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
      toast.error(err.response?.data?.msg || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        
        <TextField
          label="Name"
          name="name"
          value={name}
          onChange={onChange}
          required
          fullWidth
        />
        
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
        
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
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
          {loading ? 'Registering...' : 'Register'}
        </Button>
        
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Already have an account? <Link href="/login">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;