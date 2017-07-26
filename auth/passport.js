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

      function findOrCreateUser() {
        User.findOne({'email':email},(err,user)=>{
          if(err){ console.log("ERROR SIGN UP"+err); return done(err);}
          if(user){console.log("USER ALREADY EXISTS"); return done(null,false,req.flash('message',"User already exists"))}
          else{
            let newUser=new User({
              email:email,
              password:password
            });
            newUser.save(err=>{
              console.log("User Registration");
              return done(null,newUser);
            });
          }
        });

      };

    process.nextTick(findOrCreateUser);
  })
);


  passport.use('login', new LocalStrategy(localConfig,
  (req,email,password,done)=>{

    User.findOne({'email':email},(err,user)=>{
      if(err) return done(err)
      if(!user) return done(null,false,req.flash('message-login','No user found'));
      if(!user.validatePassword(password)) return done(null,false,req.flash('message-login','Wrong password'));
      // console.log(`LOG IN ${user}`);
      return done(null,user,req.flash('message-login','Success'));

    });
  }));

  return passport;
}
