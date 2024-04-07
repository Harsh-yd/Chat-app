import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';



import { useEffect, useState, useContext } from 'react'; 
import { useDispatch, useSelector} from 'react-redux'
import {SocketContext} from '../hooks/SocketContext'

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const Chat = ({chat}) => {
  const {onlineUsers} = useContext(SocketContext);
  
  const isO = onlineUsers.some((user) => user.userId === chat._id) ? true : false;
  const {name} = chat;

  return (
    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center', padding: 1}}>

        <Box sx={
          {marginRight: 2,display: 'flex', alignItems: 'center'}}>
            <IconButton aria-label="cart">
              <Badge color="secondary" overlap="circular" variant={isO ? 'dot' : ''}>
                <Avatar sx={{ width: 42, height: 42 }}>
                  H
                </Avatar>
              </Badge>
            </IconButton>
        </Box>

        <Box>
          <Stack direction="column">
            <Typography variant="subtitle2" gutterBottom noWrap={true}>
              {name && capitalize(name)}
            </Typography>
            <Typography variant="caption">
              Last Text
            </Typography>
          </Stack>
        </Box>

        <Box flexGrow='1'/>
        <Box >
            <Box sx={
            {display: 'flex', justifyContent: 'end'}}>
              <Avatar sx={
                { width: 20, height: 20, marginBottom: 0.5}}>
                <Typography variant="body2">
                  6
                </Typography>
              </Avatar>
            </Box>

            <Typography variant="caption">
              31/3/24
            </Typography>
        </Box>

    </Box>
  )
}
export default Chat