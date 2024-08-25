'use client'

import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      <CircularProgress size={60} />
        <Typography variant="h6" component="p" sx={{ mt: 2 }}>
            Loading...
        </Typography>
    </Box>
  );
}
