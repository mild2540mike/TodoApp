'use client'

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { z } from 'zod';
import loginAction from './action';
import Link from 'next/link';
import { ModalAlert } from '@/components/modal/modal-alert';

const loginSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
  password: z.string().min(3, { message: 'Password must be at least 3 characters long' }),
});

export default function Home() {
  const [loading, setLoading] = React.useState(false)
  const [validate, setValidate] = React.useState(false)
  const [massageError, setMassageError] = React.useState('')

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(loginSchema)
  })

  React.useEffect(() => {
    if (errors.username || errors.password) {
      setValidate(false)
    }
  }, [watch(), errors])

  const onSubmit = async (data: any) => {
    setLoading(true)
    const result = await loginAction(data)
    if (result && !result.success) {
      setLoading(false)
      setValidate(true)
      setMassageError(result.message)
    }
  }

  return (
    <>
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
        Login
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
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Login'}
      </Button>
      <Link href="/register">
        <Button type="button" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </Link>
    </Box>
    </>
  )
}
