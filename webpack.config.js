const path = require('path');
module.exports={
  entry:{
    style:path.join(__dirname,'src','app.js')
  },
  output:{
    path:path.join(__dirname,'public','js'),
    filename:'[name].build.js'
  },
  watch:true,
  module:{
    loaders:[
      {
        test:/\.scss$/,
        exclude:/node_modules/,
        loader:'style-loader!css-loader!sass-loader'
      }
    ]
  }



}
