import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function AlertSuccess({ message }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert variant="outlined" severity="success">
        { message } 
      </Alert>
    </Stack>
  );
}
export default AlertSuccess