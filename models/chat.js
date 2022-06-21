const mongoose = require('mongoose');
const shortid = require('shortid');

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    id: {
        type: String,
        required: true,
        default: shortid.generate,
    },
    name: {
        type: String,
        required: true,
    },
    users: [
        {
            type: String,
            required: true,
        }
    ],
    created_at: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('chats', chatSchema);
