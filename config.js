module.exports={
  db: process.env.MONGODB || 'mongodb://localhost:27017/node-auth',
  port:process.env.PORT || 8000
}
