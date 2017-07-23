import config from './config';
import mongoose from 'mongoose';
import app from './app';
mongoose.Promise = global.Promise;


mongoose.connect(config.db,{useMongoClient:true}).
  then(()=>{
    console.log("CONNECT SUCCESFUL")
    app.listen(config.port,()=>{
      console.log(`The magic happens on port ${config.port}`);
    });
  })
  .catch(err=>{console.log(err);})
