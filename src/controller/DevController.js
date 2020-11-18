const Dev = require('../schemas/Dev')

module.exports = {
    async store({
        nome,
        foto_url
    }) {
        const userExists = await Dev.findOne({
            nome: nome
        });

        if(userExists){
            return "Usuario já existe"
        };

        if(!foto_url){
            foto_url = 'https://www.lewesac.co.uk/wp-content/uploads/2017/12/default-avatar.jpg';
        }

        const novoUser = await Dev.create({
            nome,
            foto_url
        });

        return novoUser;
    }
}