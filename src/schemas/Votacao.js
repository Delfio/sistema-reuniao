const { Schema, model } = require('mongoose');

const VotacaoSchema = new Schema({

    palestraID: {
        type: Schema.Types.ObjectId,
        ref: 'Reuniao',
        required: true,
    },

    voto: {
        type: String,
        required: true
    },

    dev: {
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }
    
}, {
    timestamps: true,
})

module.exports = model('Votacao', VotacaoSchema);