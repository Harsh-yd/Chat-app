require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const chatRoute = require('./routes/chatRoute');
const messageRoute = require('./routes/messageRoute');
const cookieParser = require('cookie-parser');


// setting our expresss app
const app = express();

// middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with the actual domain of your React application
    credentials: true // Allow cookies to be sent with cross-origin requests
}));
app.use(cookieParser());


// connection to db
const port = process.env.PORT || 3000;
const dbURI = process.env.dbURI;

mongoose.connect(dbURI)
    .then(() => {
        console.log('connected to db..');
        app.listen(port, (req, res) => {
            console.log(`server running on port ${port}`);
        })
    })
    .catch((err) => console.log(err.message));


// routes
app.get('/', (req, res) => {
    res.send('Home');
})

app.use('/api/users', userRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);


