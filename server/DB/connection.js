const mongoose = require('mongoose')
const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
  console.log("connected successfully!!");
}).catch((err)=>{
  console.log(`connection failed !! ${err}`);
})