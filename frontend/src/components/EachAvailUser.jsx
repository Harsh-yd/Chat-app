
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';

import { createNewChat } from '../features/userChatsSlice';
import { useDispatch, useSelector} from 'react-redux'
import { removeUserFromAvailList } from '../features/availUserSlice';
import {addRecipient} from '../features/recipientSlice';
import { SocketContext } from '../hooks/SocketContext';
import { useContext } from 'react';

const EachAvailUser = ({u}) => {
    const dispatch = useDispatch();
    const {onlineUsers} = useContext(SocketContext);
    const isO = onlineUsers.some((user) => user.userId === u._id) ? true : false;

    const handleClick = () => {
        dispatch(removeUserFromAvailList(u));
        dispatch(addRecipient(u));
        dispatch(createNewChat(u));
    }

  return (
    <div>
        <Badge color="secondary" variant={isO ? 'dot' : ''}>
            <Button color="secondary" variant='outlined' onClick={handleClick}>
            {u.name}
            </Button>
        </Badge>
    </div>
  )
}
export default EachAvailUser