const mongoose = require('mongoose');
const shortid = require('shortid');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        default: shortid.generate,
    },
    username: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('users', userSchema);
