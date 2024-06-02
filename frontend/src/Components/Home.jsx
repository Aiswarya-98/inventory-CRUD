import React, { useEffect, useState, useParams } from "react"
import { addItemApi, deleteAnItemApi, editAnItemApi, getAllItemsApi } from "../Services/allAPI"


function Home() {

  const [productDetails, setProductDetails] = useState([]);
  

  const [newProduct,setNewProduct]=useState({
    title:"",price:"",productImage:""
  })

  const [editProduct, setEditProduct] = useState({
    _id:'',title:'',price:'',productImage:''
  })


  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (productDetails.productImage) {
      setPreview(URL.createObjectURL(productDetails.productImage));
    }
  },[productDetails.productImage]);



   // Fetch all items when the component mounts
   useEffect(() => {
    const fetchAllItems = async () => {
      const result = await getAllItemsApi({
        "Content-Type":"multipart/form-data"
      });
      console.log(result);

      if (result.status === 200) {
        setProductDetails(result.data);
      } else {
        alert("Failed to fetch products");
        console.log(result.response.data);
      }
    };

    fetchAllItems();
  }, []);







  // handling add item fn

  const handleAddItem = async(e)=>{
    e.preventDefault()
    const {title,price,productImage} = newProduct

    if(!title||!price||!productImage){
      alert("Please fill all fields!!")
    }else{
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("price",price)
      reqBody.append("productImage",productImage)

      const reqHeader = {
        "Content-Type":"multipart/form-data"
      }

      const result = await addItemApi(reqBody,reqHeader)

      console.log("add",result);
      if(result.status === 200){
        alert("Item added successfully!!")
        // setProductDetails([...productDetails,newProduct])
        // setProductDetails([...productDetails,result.data])
        // when u set product in this way, then the newly added item will be shown at first row
        setProductDetails([result.data,...productDetails])
        setNewProduct({ title: "", price: "", productImage: "" });
       
      }else{
        alert("Something went wrong!!")
        console.log(result.response.data);
      }
    }
  }

  const baseUrl = "http://localhost:4000/uploads/"




  // edit an item

  const handleUpdate = async()=>{

  //  e.preventDefault()
    const {_id,title,price,productImage} = editProduct

    console.log("editproduct",editProduct);
    if(!title||!price||!productImage){
      alert("Please fill all fields ooof edit!!")
    }else{
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("price",price)
      reqBody.append("productImage", productImage);

      const reqHeader = { "Content-Type": "multipart/form-data" };
      const result = await editAnItemApi(_id, reqBody, reqHeader);

      console.log("edit result",result);
  
      if (result.status === 200) {
        alert("Item updated successfully!!");
        setProductDetails([...productDetails,editProduct])
        setEditProduct({ _id: "", title: "", price: "", productImage: "" });
      } else {
        alert(result.response.data);
      }
    };
  }



  // delete item

  const handleDelete = async(id)=>{

    const reqHeader={
      "Content-Type":"multipart/form-data"
    }
    const result = await deleteAnItemApi(id,reqHeader)
    if (result.status === 200) {
      alert("Item deleted successfully!!");
      setProductDetails(productDetails.filter(product => product._id !== id));
  }else{
    alert(result.response.data)
  }
  }



  return (
    <>
      <div className="container" style={{ padding: "50px" }}>
        <span>Add a new item</span>

        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Add Item
        </button>

        {/* modal */}

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Add new Item
                </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                {/* form in modal */}

              

                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Title
                  </label>
                  <input type="text" class="form-control" id="exampleInputEmail1" value={newProduct.title} aria-describedby="emailHelp" 
                  onChange={e=>setNewProduct({...newProduct,title:e.target.value})} />
                </div>

                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Price
                  </label>
                  <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={newProduct.price}
                  onChange={e=>setNewProduct({...newProduct,price:e.target.value})}/>
                </div>

                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Product Image
                  </label>
                  <input type="file" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  
                  onChange={e=>setNewProduct({...newProduct,productImage:e.target.files[0]})}/>
                </div>

                {/* form in modal */}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="button" class="btn btn-primary" onClick={handleAddItem}>
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* modal */}
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">title</th>
            <th scope="col">price</th>
            <th scope="col">Image</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>

          {
          productDetails.map((product,index)=>(
         
              <tr key={product._id}>
              <th scope="row">{index+1}</th>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>
                <img src={`${baseUrl}${product.productImage}`} alt={product.productImage} height={100} width={100}/>
              </td>
             
              {/* edit */}
              <td>
                
                <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={()=>setEditProduct(product)}>
                  Edit Item
                </button>
              </td>

              <td>
                <button type="button" class="btn btn-danger" onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
              </td>
            </tr>

          ))
          }
        
   
        </tbody>
      </table>


                {/* modal for edit */}

                 <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel1">
                          Edit Item
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        {/* form in modal */}


                 <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Title
                  </label>
                  <input type="text" class="form-control" id="exampleInputEmail1" value={editProduct.title} aria-describedby="emailHelp" 
                  onChange={e=>setEditProduct({...editProduct,title:e.target.value})} />
                </div>

                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Price
                  </label>
                  <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={editProduct.price}
                  onChange={e=>setEditProduct({...editProduct,price:e.target.value})}/>
                </div>

                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Product Image
                  </label>
                  <input type="file" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  
                  onChange={e=>setEditProduct({...editProduct,productImage:e.target.files[0]})}/>
                </div> 

                        {/* form in modal */}
                       </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                          Close
                        </button> 
                         <button type="button" class="btn btn-warning" onClick={handleUpdate}>
                          Edit Item
                        </button> 
                       </div>
                    </div>
                  </div>
                </div>  
                
              
       
    </>
  )
}

export default Home
