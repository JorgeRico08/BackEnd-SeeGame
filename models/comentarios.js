const mongoose = require('mongoose');
const comentarioSchema =mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    comentario: {
        type: String,
        required:true
    },
    // publicaciones: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "publicaciones"
    // },
    date: { 
        type: Date,
        require: true,
        default: Date.now()
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }, 
   
});

const Comentario= mongoose.model("comentarios",comentarioSchema)
module.exports=Comentario;