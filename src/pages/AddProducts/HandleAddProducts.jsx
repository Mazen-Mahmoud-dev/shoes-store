import React, { useState } from 'react'
import AddProduct from './AddProduct';
import StockInputForm from '../../components/Input/StockInputForm ';
import axios from 'axios';
import  Modal  from 'react-modal';
import { BASE_URL } from '../../utils/constants';

const HandleAddProducts = () => {
    const [step, setStep] = useState(1);
    const [productDetails, setProductDetails] = useState(null);
    const token = localStorage.getItem("token")

    let [message,setMessage] = useState({
        msg:'It is opened',
        isShown:false
    })
    const handleProductSubmit = (details) => {
        
      setProductDetails(details);
      setStep(2);
    };
  
    const handleStockSubmit = async(stockDetails) => {
      const productWithStock = {
        ...productDetails,
        details: stockDetails
      };
      let {title,price,description,cover,details} = productWithStock
      let {images} = productDetails
      const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        if (cover) {
            formData.append('cover', cover);
        }
        
        images.forEach((image) => {
          formData.append('images', image);
      });
        
        details.forEach((detail, index) => {
          formData.append(`details[${index}][size]`, detail.size);
          formData.append(`details[${index}][stock]`, detail.stock);
        });
        
      try{
        const response = await axios.post(`${BASE_URL}/api/products`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            },
            
        })
        if(response.data.data && response.data.data.product){
            setMessage({
                msg:'Product Added Successfully',
                isShown:true
            })
        }
        
      }  
    catch(error){
        console.log(error);
        
    } 
    };
  
    return (
      <div>
        {step === 1 && <AddProduct onSubmitProduct={handleProductSubmit} />}
        {step === 2 && <StockInputForm productDetails={productDetails} onSubmitStock={handleStockSubmit} />}
        <Modal
        isOpen={message.isShown}
        Style={{
          overlay:{
            backgroundColor:"rgba(0,0,0,0.2)"
          },
        }}
        contentLabel=""
        className="w-[80%] h-max-3/4 bg-primary rounded-md mx-auto mt-14 p-5 overflow-y-auto sm:w-[40%]"
        >
          <p className='flex items-center text-white'>{message.msg}<span className='ml-3 text-2xl text-green-500'><i className="fa-regular fa-circle-check"></i></span></p>
          
          <button onClick={()=>{
                setMessage({isShown:false});  
                window.location.reload()
            }}
            className='btn-primary bg-white text-primary  hover:bg-slate-50'
            >
                Ok
            </button>

      </Modal>
      </div>
    );
}

export default HandleAddProducts