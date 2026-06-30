import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Listing from './ui/Listing';

export default function Home() {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: '#b6d3f54a', 
      py: 6
    }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 800,
              background: ' rgb(45, 47, 49)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1.5,
              letterSpacing: '-0.02em',
            }}
          >
            Fresh Recipes
          </Typography>
        </Box>
        <Listing />
      </Container>
    </Box>
  );
}