
const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  username:
       { 
        type: String,
        required: true 
       },
  password:
   { type: String,
     required: true 
    },
  role: { 
    type: String, 
     enum: ['Admin', 'User'],
     default: 'User' 
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
   userSchema.pre('save',async function(next){
      if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
      }
      next();
   });

   /// to generate the  jsonwentoken 
   userSchema.methods.generateAuthToken= async function(){
     try{
        const token = jwt.sign({_id:this._id, username:this.username } , process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
     }catch (error){
     console.log(error);
     }
   }
  const User = mongoose.model('User', userSchema);
module.exports = User ;

















//  const  mongoose = require ('mongoose');

//  const UserSchema = new mongoose.Schema({
//   email:{
//       type: String,
//       required : true
//   },
//   password:{
//     type: String,
//     required : true
// }
//  });

// //  UserSchema.pre('save',async function(next){
// //   console.log('hi  from inside')
// //   if(this.isPasswordValid('password')){
// //   this.password = await bcrypt.hash(this.password,10);
// //   }
// //   next();
// // })


//  const User = mongoose.model('User',UserSchema);

//  module.exports = User;