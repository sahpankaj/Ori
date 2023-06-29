import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader() {
  return (
    <Stack sx={{ color: 'grey.500' , width:"100vw", display:"flex", justifyContent:'center'}} spacing={2} direction="row">
      <CircularProgress color="success" />
    </Stack>
  );
}