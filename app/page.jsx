"use client"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Listing from './ui/Listing';

export default function Home() {
  return (
    <Box p={2}>
      <Typography variant="h4" component="h2">
        Welcome to the Home Page
      </Typography>
      <Listing />
    </Box>
  );
}