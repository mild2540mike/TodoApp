'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography } from '@mui/material';
import { z } from 'zod';
import registerAction from './action';
import { ModalAlert } from '@/components/modal/modal-alert';

const registerSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
  password: z.string().min(3, { message: 'Password must be at least 3 characters long' }),
  confirmPassword: z.string().min(3, { message: 'Confirm password must be at least 3 characters long' }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
});

export default function RegisterPage() {
  const [loading, setLoading] = React.useState(false)
  const [validate, setValidate] = React.useState(false)
  const [massageError, setMassageError] = React.useState('')

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(registerSchema)
  })

  React.useEffect(() => {
    if (errors.username || errors.password) {
      setValidate(false)
    }
  }, [watch(), errors])

  const onSubmit = async (data: any) => {
    const result = await registerAction(data);
    if (result && !result.success) {
      setValidate(true)
      setMassageError(result.message)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: 500,
        mx: 'auto',
        mt: 8,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        border: '1px solid #ccc',
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" textAlign="center" mb={2}>
        Register
      </Typography>
      <ModalAlert validate={validate} message={massageError} severity="error" />
      <TextField
        label="Username"
        variant="outlined"
        {...register('username')}
        error={!!errors.username}
        helperText={errors.username?.message?.toString() || ''}
        fullWidth
        required
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message?.toString() || ''}
        fullWidth
        required
      />
      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        {...register('confirmPassword')}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message?.toString() || ''}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Register
      </Button>
    </Box>
  );
}
