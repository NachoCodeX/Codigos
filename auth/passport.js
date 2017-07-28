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
      req.checkBody('displayName','Name is a required field').notEmpty();
      req.checkBody('email',' Email is a required field').notEmpty();
      req.checkBody('password',' Email is a required field').notEmpty();
      req.checkBody('password2',' Email is a required field').notEmpty();

      req.getValidationResult().then(function (result) {
          let isEmpty=result.isEmpty();
          if(req.body.password2 === req.body.password && isEmpty){
            User.findOne({'email':email},(err,user)=>{
              if(err){return done(err);}
              if(user){return done(null,false,req.flash('message-signup',"User already exists"))}
              else{
                let newUser=new User({
                  email:email,
                  password:password,
                  displayName:req.body.displayName,
                });
                newUser.save(err=>{
                  console.log("User Registration");
                  return done(null,newUser);
                });
              }
            });
        }
        else if(!isEmpty) return done(null,false,req.flash('message-signup',"Please fill out all fields"));
        else{
          done(null,false,req.flash('message-signup','Password don\'t match'))
        }

      });


      // function findOrCreateUser() {

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

  //FACEBOOK
  require('./auth-facebook')(passport,User);


  return passport;
}
