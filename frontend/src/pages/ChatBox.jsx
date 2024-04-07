import { useDispatch, useSelector} from 'react-redux'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { AddNewMsg } from '../features/chatMsgSlice';
import { createChatMsg } from '../features/chatMsgSlice';

const ChatBox = () => {
    const dispatch = useDispatch();
    const { isMsgloading, msgArray } = useSelector((store) => store.chatMessages);
    const { loggedUser } = useSelector((store) => store.user);
    const { openChat } = useSelector((store) => store.userChats);

    const [newMsg, setNewMsg] = useState(null);

    const handleSendMsg = () => {
        if(!newMsg) return;
        
        const newMessage = {
            chatId: openChat.chatId,
            senderId: loggedUser._id,
            text: newMsg,
        }
        dispatch(createChatMsg(newMessage));
        dispatch(AddNewMsg(newMessage));
    }

    if (isMsgloading) return <h4>Loading messages...</h4>;

    return (
        <>
        <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'darkgray' }}>
            ChatBox..
        </Box>

        <Box sx={{ height: '443px', overflowY: 'scroll'}}> {/* Adjust the height as needed */}
            {msgArray.map((message,index) => {
                const pos = loggedUser._id === message.senderId ? 'flex-end' : 'flex-start';
                return (
                    <Box key={index} sx={{ display: 'flex', justifyContent: pos, padding: '8px' }}>
                        {message.text}
                    </Box>
                );
            })}
        </Box>

        <Box sx={{display: 'flex', flexDirection: 'row', backgroundColor: 'darkgray'}}>
            
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SentimentSatisfiedOutlinedIcon />
            </IconButton>

            <InputBase placeholder='Message' 
                sx={{borderStyle: '1px solid black', width:"100%"}}
                onChange={(e) => setNewMsg(e.target.value)}
            />
            

            <IconButton type="button" sx={{ p: '10px' }} onClick={handleSendMsg}>
                <SendIcon />
            </IconButton>
        </Box>
        </>
    );
};

export default ChatBox