const mongoose = require('mongoose');
const comentarioSchema =mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    comentario: {
        type: String,
        required:true
    },
    valoracion:{
        type:Number,
        min:0,
        max:5
    },
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