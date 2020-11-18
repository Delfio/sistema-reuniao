const Dev = require('../schemas/Dev')
const Votacao = require('../schemas/Votacao')

module.exports = {
    async store({
        user_id,
        palestra_id,
        voto
    }) {
        try {
            await Dev.findById(user_id);
            
            const reuniaoExists = await Votacao.findOne({
                palestraID: palestra_id,
            });

            if(!reuniaoExists) {
                return "Reunião inexistente";
            }

            const userJaVotou = await Votacao.findOne({
                palestraID: palestra_id,
                dev: user_id
            });

            if(userJaVotou) {
                return "Voto já contabilizado"
            };

            const votacao = await Votacao.create({
                palestraID: palestra_id,
                voto,
                dev: user_id
            });

            return votacao;

        } catch(err){
            return err.message;
        }

    },
    
    async allVotes({
        palestra_id
    }) {
        try {
            let votos = [];

            const palestraExists = await Votacao.find({
                palestraID: palestra_id
            });

            if(palestraExists.length <= 0) return "Error, palestra não existe";

            palestraExists.forEach(palestra => {
                votos.push(palestra.voto)
            });

            return votos;
        } catch(err){

        }
    }
}