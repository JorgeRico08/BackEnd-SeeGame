const mongoose = require('mongoose');
const comentarioSchema = mongoose.Schema({
    idPublicacion: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    comentario: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: function () {
            const currentDate = new Date();
            return currentDate.toLocaleString('es-ES', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            });
        },
    },
    isActive: {
        type: Boolean,
        default: true
    },

});

const Comentario = mongoose.model("comentarios", comentarioSchema)
module.exports = Comentario;