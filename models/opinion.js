const mongoose = require('mongoose');
const opinionSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    opinion: {
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
    }

});

const Opinion = mongoose.model("opinion", opinionSchema)
module.exports = Opinion;