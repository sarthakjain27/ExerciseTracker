const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        //will throw error if we try to add user with a username that is already present in DB
        unique:true,
        trim:true,
        minlength:3
    }
},{
    timestamps:true
});

const User=mongoose.model('user',userSchema)

module.exports=User;