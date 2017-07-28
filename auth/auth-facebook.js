import config from '../config';
const FacebookStrategy=require('passport-facebook').Strategy;

module.exports=(passport,User)=>{

  const facebookConfig={
    clientID:config.facebook.clientID,
    clientSecret:config.facebook.clientSecret,
    callbackURL:config.facebook.callbackURL,
    profileFields:['id','displayName','photos','emails']
  };

  passport.use(new FacebookStrategy(facebookConfig,
  (accessToken,refreshToken,profile,done)=>{

    User.findOne({provider_id:profile.id},(err,user)=>{
        if(err) throw(err)
        if(!err && user != null ) return done(null,user)

        let newUser=new User({
          email:profile.emails[0].value,
          provider_id:profile.id,
          provider:profile.provider,
          displayName:profile.displayName,
          photo:profile.photos[0].value
        });

        newUser.save(err=>{
          if(err) throw err;
          done(null,user);
        });
    });


  }));


}
