'use client'

import React from 'react';
import {
  Box,
  Button,
  Container,
  IconButton,
  Typography,
} from '@mui/material';
import { DataGrid, GridDeleteIcon, GridMoreVertIcon } from '@mui/x-data-grid';
import { useListTodo } from '@/hooks/actions/list-todo';
import Loading from '@/components/loading/loading-page';
import moment from 'moment';
import { generateToken } from '@/lib/encryption-utils';
import { getCookieClient } from '@/lib/cookie-utils';
import { useDeleteTodo } from '@/hooks/actions/delete-todo';
import useTodoStore from '@/store/useTodoStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function TodoApp() {
  const router = useRouter();
  const val = getCookieClient('LOGIN');
  const [rafashToken] = React.useState(generateToken());
  const [id_removed, setId, setIdRemoved] = useTodoStore((state: any) => [state.id_removed, state.setId, state.setIdRemoved]);
  const { data, isLoading } = useListTodo(val, rafashToken);
  const { isLoading: deleteLoading } = useDeleteTodo(val, id_removed);
  if (isLoading || deleteLoading) return <Loading />

  const handleEdit = async (id: string) => {
    setId(id);
    router.push('/home/edit');
  }

  const handleDelete = async (id: string) => {
    setIdRemoved(id);
    window.location.reload();
  }
  
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'no', headerName: 'No.', flex: 0.5 },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'desc', headerName: 'Description', flex: 2 },
    { field: 'date', headerName: 'Created Date', flex: 1.5 },
    { 
      field: 'action', 
      headerName: 'Action', 
      flex: 1,
      renderCell: (params: any) => (
        <>
          <IconButton onClick={() => handleDelete(params.id)}>
            <GridDeleteIcon />
          </IconButton>
          <IconButton onClick={() => handleEdit(params.id)}>
            <GridMoreVertIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = data?.data?.filter((item: any) => item.id !== undefined).map((item: any, index: number) => ({
    id: item?.id || generateToken(),
    no: item?.no ?? index + 1,
    title: item?.title ?? '',
    desc: item?.description ?? '',
    date: moment(item?.date).format('DD MMM YYYY HH:mm:ss') ?? '',
  }));
  
  return (
    <Container maxWidth="md">
      {/* add Create button */}
      <Box sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          To-Do List
        </Typography>
        <Box sx={{ textAlign: 'right', mb: 1 }}>
          <Link href="/home/create">
            <Button variant="contained" color="primary">
              Create
            </Button>
          </Link>
        </Box>
        <div className='h-[400px] w-full'>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection
          />
        </div>
      </Box>
    </Container>
  );
}