
const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUserSchema = new mongoose.Schema({
     email:{
        type:String,
        required:true
     },
     password:{
        type:String,
        required:true
     },
     tokens: [
      {
        token:{
             type: String,
             required:true
        }
      }
     ]
});

   // hasshcode eithe passord with the help of  bcrrypt
   createUserSchema.pre('save',async function(next){
      if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
      }
      next();
   });

   /// to generate the  jsonwentoken 
   createUserSchema.methods.generateAuthToken= async function(){
     try{
        const token = jwt.sign({_id:this._id, username:this.username } , process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
     }catch (error){
     console.log(error);
     }
   }
  const create = mongoose.model('create', createUserSchema);
module.exports = create ;




