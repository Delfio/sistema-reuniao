const { store } = require("./ReuniaoController");

const Chat = require('../schemas/Chat')
const Dev = require('../schemas/Dev')

module.exports = {
    async store({
        user_ID,
        message
    }) {
        try {
            await Dev.findById(user_ID)

            const novaMessage = await Chat.create({
                author: user_ID,
                message
            });

            return novaMessage;

        } catch(err) {
            return "Usuario não existe"

        }
    }
}