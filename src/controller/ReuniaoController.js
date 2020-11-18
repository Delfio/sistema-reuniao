const { findOne } = require('../schemas/Reuniao');
const ReuniaoSchema = require('../schemas/Reuniao');

module.exports = {
    async index() {
        const reunioesExistentes = await ReuniaoSchema.find();

        return reunioesExistentes;
    },

    async store({
        titulo,
        palestrante,
        dataDaPalestra,
        horasNecessarias
    }) {
        const reuniaoCadastrada = await ReuniaoSchema
            .create({
                titulo,
                palestrante,
                dataDaPalestra,
                horasNecessarias
            });

        return reuniaoCadastrada;
    },

    async show(data) {
        console.log( new Date(data) )
        const reuniaoExists = await ReuniaoSchema.find({
            dataDaPalestra: {
                "$gte": new Date(data),
                "$lt": new Date(),
            }
        }).sort({
            dataDaPalestra: 1
        });

        return reuniaoExists;
    },

    async findOne(id) {
        const reuniao = await ReuniaoSchema.findById(id);

        return reuniao;
    },

    async likeReuniao(id) {
        const reuniao = await ReuniaoSchema.findById(id);

        reuniao.like = reuniao.like + 1;

        await reuniao.save();

        return reuniao;
    }
}