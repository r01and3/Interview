const mongoose = require('mongoose');
const shortid = require('shortid');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    id: {
        type: String,
        required: true,
        default: shortid.generate,
    },
    chat: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('messages', messageSchema);
