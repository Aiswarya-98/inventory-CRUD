const { BASE_URL } = require("./baseUrl");
const { commonApi } = require("./commonApi");


// add item
// passing arguments as reqBody and reqHeader, because a multipart data is being stored

export const addItemApi = async(reqBody,reqHeader)=>{
  return await commonApi("POST",`${BASE_URL}/product/add`,reqBody,reqHeader)
}

// get all item

export const getAllItemsApi = async(reqHeader)=>{
  return await commonApi("GET",`${BASE_URL}/products/get/all`,"",reqHeader)
}
