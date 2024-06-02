const products = require('../Model/productSchema')

// add item

exports.addItem = async(req,res) =>{

  // const itemId = req.payload

  const productImage = req.file.filename

  const {title,price} = req.body

  try{
    const existingItem = await products.findOne({title})
    if(existingItem){
      res.status(409).json("Product already exists")
    }else{
      const newProduct = new products({
        title:title,price:price,productImage:productImage
      })

      await newProduct.save()
      res.status(200).json(newProduct)
    }
  }catch(err){
    res.status(401).json(`request failed ,${err}`)
  }
}

// get all products

exports.getAllProducts = async(req,res)=>{


  try{
    const allproducts = await products.find()
    res.status(200).json(allproducts)

  }catch(err){
    res.status(401).json(`request failed ${err}`)
  }
}


// update a product

exports.editProduct = async(req,res)=>{
  const {title,price,productImage} = req.body
  const {id} = req.params
  const uploadProductImage = req.file ? req.file.filename : productImage

  try{
    const updateProduct = await products.findByIdAndUpdate({_id:id},
      {title,price,productImage:uploadProductImage},
      {new:true})

      await updateProduct.save()
      res.status(200).json(updateProduct)

  }catch(err){
    res.status(401).json(`request failed ${err}`)
  }
}


// delete product

exports.deleteProduct=async(req,res)=>{
  const {id} = req.params
  try{
    const removeProduct = await products.findByIdAndDelete({_id:id})
    res.status(200).json(removeProduct)
  }catch(err){
    res.status(401).json(err)
  }
}