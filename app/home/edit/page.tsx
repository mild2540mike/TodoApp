'use client'

import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCookieClient } from '@/lib/cookie-utils';
import { useGetTodoById } from '@/hooks/actions/get-todo-by';
import useTodoStore from '@/store/useTodoStore';
import Loading from '@/components/loading/loading-page';
import updateTodo from './action';
import { generateToken } from '@/lib/encryption-utils';

const todoSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters long' }),
  description: z.string().min(5, { message: 'Description must be at least 5 characters long' }),
});

export default function UpdateTodo() {
  const [loading, setLoading] = useState(false);
  const val = getCookieClient('LOGIN');
  const [id] = useTodoStore((state: any) => [state.id]);
  const [rafashToken] = React.useState(generateToken());
  const { data, isLoading } = useGetTodoById(val, rafashToken, id);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(todoSchema),
  });

  if (isLoading) return <Loading />

  const onSubmit = async (data: any) => {
    setLoading(true)
      const result = await updateTodo(val, id, data)
      if (result && !result?.success) {
        alert(result.message)
        setLoading(false)
      }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New To-Do
        </Typography>
        <TextField
          fullWidth
          label="Title"
          margin="normal"
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message?.toString() || ''}
          defaultValue={data?.title || ''}
          required
        />
        <TextField
          fullWidth
          label="Description"
          margin="normal"
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message?.toString() || ''}
          defaultValue={data?.description || ''}
          multiline
          rows={4}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update To-Do'}
        </Button>
      </Box>
    </Container>
  );
}
