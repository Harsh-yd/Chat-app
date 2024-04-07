const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        chatId: String,
        senderId: String,
        text: String,
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model("message", messageSchema);

module.exports = Message;