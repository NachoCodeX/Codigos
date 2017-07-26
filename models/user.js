import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email:{type:String,unique:true,lowercase:true},
  password:String,
  displayName:String
});

UserSchema.pre('save',function(next){
  let user=this;
  console.log(`-> PRE SAVE WORKING`);

  if(!user.isModified('password')){return next();}

  bcrypt.genSalt(10,(err,salt)=>{
    if(err) return next(err);

    bcrypt.hash(user.password, salt,(err,hash)=>{
      if(err) return next(err);
      user.password=hash;
      console.log(`NEW USER PASSWORD: ${hash}`);
      next();

    });

  });

});


UserSchema.methods.validatePassword= function(password){
  return bcrypt.compareSync(password,this.password);
}


module.exports=mongoose.model("User",UserSchema);
