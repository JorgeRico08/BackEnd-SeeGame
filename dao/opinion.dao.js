const Opinion = require("../models/opinion")

class opinionDAO{
    async crearOpinion(opinionData){
        try {
            const opinion = await new Opinion(opinionData);
            return await opinion.save();
        } catch (error) {
            console.error(error);
            throw new Error('Error al crear la opinión.');
        }
    }

    
}

module.exports = opinionDAO;