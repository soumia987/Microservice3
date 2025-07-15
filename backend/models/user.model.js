const mongoose =require('mongoose');
const validator=require('validator');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('Email is invalid');
            }
        }
    },
    password:{
        type:String,
        required:true,
        enum:['ARRENANT','ADMIN','FORMATEUR'],
        default:'APPRENANT'
    }
   
});
module.exports=mongoose.model('User',userSchema);