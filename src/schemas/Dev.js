const { Schema, model } = require('mongoose');

const Dev = new Schema({
    nome: {
        type: String,
        required: true
    },

    foto_url: {
        type: String,
        required: true
    }

    
}, {
    timestamps: true,
})

module.exports = model('Dev', Dev);