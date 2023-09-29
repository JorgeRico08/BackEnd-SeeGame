const mongoose = require('mongoose');

const userSchema =mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password: { 
        type: String
    },
    nombre:{
        type: String
    },
    apellido:{
        type: String
    },
    image:{
        type: String
    },    
    publicaciones:[
        {
            publicaciones: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "publicaciones"
            }
        }
    ],
    // Control para inicio de sesion y recuperar la contraseña
    rol: {
        type: String,
        required: true,
        default: 'user'
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    tokenPass : {
        type: Number
    },
         
})

const User= mongoose.model("users",userSchema)
module.exports=User;