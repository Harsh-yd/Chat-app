import { useDispatch, useSelector} from 'react-redux'
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import CircleIcon from '@mui/icons-material/Circle';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import { useEffect } from 'react';

import EachAvailUser from '../components/EachAvailUser';

const AvailUsers = () => {
  const dispatch = useDispatch();

  const {availUserList} = useSelector((store) => store.availUser);

  const availUsers = availUserList.map((u) => {
    return (
      <div key={u._id}>
        <EachAvailUser u={u}/>
      </div>
    )
  });

  return (
    <Box>
      <Stack direction='row' gap={3}>
      {availUsers}
      </Stack>
    </Box>
  )
}
export default AvailUsers