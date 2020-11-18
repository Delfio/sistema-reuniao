const { Schema, model } = require('mongoose');

const Chat = new Schema({

    author: {
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    },

    message: {
        type: String,
        required: true
    }

}, {
    timestamps: true,
})

module.exports = model('Chat', Chat);