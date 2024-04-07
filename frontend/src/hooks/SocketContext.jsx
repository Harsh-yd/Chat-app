import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { addNewMsg } from '../features/chatMsgSlice';

export const SocketContext = createContext(); 
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const dispatch = useDispatch();

    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const { loggedUser, isLoading } = useSelector((store) => store.user);
    const {latestMsg, msgArray } = useSelector((store) => store.chatMessages);
    const {openChat} = useSelector((store) => store.userChats);
    // console.log('openChat', openChat);


    useEffect(() => {
        console.log('socket established');
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);

        return () => {newSocket.disconnect();};

    }, [loggedUser]);

    // online users
    useEffect(() => {
        console.log('addNew User and getOnlineUser');
        if (socket === null || loggedUser === null) return;

        socket.emit("addNewUser", loggedUser._id);

        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res);
        });

    }, [socket, loggedUser]);

    // send message
    useEffect(()=> {
        console.log('send message');
        if(socket === null || latestMsg === null || openChat === null) return;

        const recipientId = openChat._id;
        // console.log('message sent', openChat.chatId);
        socket.emit("sendMessage", {...latestMsg, recipientId});
    },[latestMsg]);


    // receive message
    useEffect(()=> {
        console.log('get message');
        if(socket === null || openChat === null) return;
        
        socket.on("getMessage", res => {
            if(openChat.chatId === res.chatId) {
                // console.log('message received', openChat.chatId);

                dispatch(addNewMsg(res));
            }
        });
    },[socket,openChat]);


    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
