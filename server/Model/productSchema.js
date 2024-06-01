const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },

  price:{
    type:Number,
    required:true,
  },

  productImage:{
    type:String,
    required:true
  }
})

const products = mongoose.model("Products",productSchema)
module.exports = products;