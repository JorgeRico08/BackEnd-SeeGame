const mongoose = require('mongoose');
const publicacionSchema =mongoose.Schema({
    userid: {
        type: String,
    },
    nickname:{
        type:String,
        required:true,
    },
    nombrePublicacion:{
        type:String,
        required:true,
        unique:false
    },
    descripcion:{
        type: String,
        required:true,
    },
    urlImagen:{
        type: [String]
    },
    date: {
        type: String,
        required: true,
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

const Publicacion= mongoose.model("publicacion",publicacionSchema)
module.exports=Publicacion;