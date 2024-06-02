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


// edit an item

export const editAnItemApi = async(Id,reqBody,reqHeader)=>{
  return await commonApi("PUT",`${BASE_URL}/product/edit/${Id}`,reqBody,reqHeader)
}

// delete an item

export const deleteAnItemApi = async(id,reqHeader)=>{
  return await commonApi("DELETE",`${BASE_URL}/product/remove/${id}`,{},reqHeader)
}