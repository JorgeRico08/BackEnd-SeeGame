const mongoose = require('mongoose');
const publicacionSchema =mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    nombrePublicacion:{
        type:String,
        required:true,
        unique:true,
    },
    descripcion:{
        type: String
    },
    juegoPublicado:{
        type: String
    },
    categoria:{
        type: String
    },
    date: { type: Date,
            require: true,
            default: Date.now()
    },
    comentarios:[
        {
            type:mongoose.ObjectId,
            ref:"comentarios"
        },
    ]
});

const Publicacion= mongoose.model("publicacion",publicacionSchema)
module.exports=Publicacion;