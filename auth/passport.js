import passport from 'passport';
const LocalStrategy=require('passport-local').Strategy;
import User from '../models/user';

module.exports=app=>{
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user,done)=>{
    done(null,user._id);
  });

  passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
      done(err,user);
    });
  });

  const localConfig={
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
  }

  passport.use('signup',new LocalStrategy(localConfig,(req,email,password,done)=>{

      // function findOrCreateUser() {
        if(req.body.password2 === req.body.password){
          User.findOne({'email':email},(err,user)=>{
            if(err){return done(err);}
            if(user){return done(null,false,req.flash('message-signup',"User already exists"))}
            else{
              let newUser=new User({
                email:email,
                password:password,
                first_name:req.body.first_name,
                last_name:req.body.last_name,
              });
              newUser.save(err=>{
                console.log("User Registration");
                return done(null,newUser);
              });
            }
          });
      }else{
        done(null,false,req.flash('message-signup','Password not match'))
      }
      // };

    // process.nextTick(findOrCreateUser);
  })
);


  passport.use('login', new LocalStrategy(localConfig,
  (req,email,password,done)=>{

    User.findOne({'email':email},(err,user)=>{
      if(err) return done(err)
      if(!user) return done(null,false,req.flash('message-login','No user found'));
      if(!user.validatePassword(password)) return done(null,false,req.flash('message-login','Wrong password'));
      return done(null,user,req.flash('message-login','Success'));

    });
  }));

  return passport;
}
