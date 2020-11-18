const { Schema, model } = require('mongoose');

const ReuniaoSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },

    palestrante: {
        type: String,
        required: true,
    },

    dataDaPalestra: {
        type: Date,
        required: true
    },

    like: {
        type: Number,
        default: 0
    },

    horasNecessarias: {
        type: Number,
        default: 0.30
    }

    
}, {
    timestamps: true,
})

module.exports = model('Reuniao', ReuniaoSchema);