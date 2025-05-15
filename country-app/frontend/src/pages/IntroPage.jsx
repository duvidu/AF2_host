import { Container, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const IntroPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Country Info App
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Explore countries around the world
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button 
          variant="contained" 
          size="large" 
          component={Link} 
          to="/register"
          fullWidth
        >
          Register
        </Button>
        <Button 
          variant="outlined" 
          size="large" 
          component={Link} 
          to="/login"
          fullWidth
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default IntroPage;