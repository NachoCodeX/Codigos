module.exports={
  db: process.env.MONGODB || 'mongodb://localhost:27017/node-auth',
  port:process.env.PORT || 8000,
  SECRET_SESSION:"mysecret",
  facebook:{
    clientID:"1705921539703667",
    clientSecret:"23c54db2baa6dcb9b097a532cc8a28fc",
    callbackURL:"/auth/facebook/callback",
  },


}
