import React, {  useState } from 'react'
import { PhotoIcon } from '@heroicons/react/24/solid'
const AddProduct = ({onSubmitProduct}) => {
    let [title,setTitle] = useState('')
    let [description,setDescription] = useState('')
    let [price,setPrice] = useState('')
    let [cover,setCover] = useState('')
    const sizesList = ['Medium', 'Large', 'XL', 'XXL', '3XL', '4XL', '5XL'];
    const [sizes, setSizes] = useState([]);
    let [error,setError] = useState(null)
    const [images, setImages] = useState([]);
    const handleImageChange = (e) => {
        setCover(e.target.files[0]);
      };
      const handleImagesChange = (e)=>{
        setImages([...e.target.files]);
      }
      const handleSizeChange = (size) => {
        if (sizes.includes(size)) {
          setSizes(sizes.filter(s => s !== size));
        } else {
          setSizes([...sizes, size]);
        }
      };
    const HandleSubmit = (e)=>{
        e.preventDefault();
        if(!title){
            setError("Please enter the title");
            return;
          }
          if(!description){
            setError("Please enter the description");
            return;
          }
          if(!price){
            setError("Please enter the price");
            return;
          }
          if(!cover){
            setError("Please upload the cover");
            return;
          }
          if(images.length === 0){
            setError("Please upload the product images");
            return;
          }
          if(sizes.length === 0){
            setError("Please select at least 1 size");
            return;
          }
          
        let productDetails = {
            title,
            price,
            description,
            cover,
            images,
            details: sizes.map(size => ({ size }))
        }
        onSubmitProduct(productDetails);
    }
  return (
    <>
        <div>
            <h3 className="text-4xl text-center my-8 font-extrabold">Add Product</h3>
        </div>
        <div className='flex items-center justify-center'>
            <form onSubmit={HandleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                    title
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        id="title"
                                        value={title}
                                        name="title"
                                        type="text"
                                        placeholder="shoe"
                                        onChange={(e)=>setTitle(e.target.value)}
                                        className="block tracking-wide font-bold text-primary flex-1 border-0 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                    id="description"
                                    name="description"
                                    value={description}
                                    rows={3}
                                    onChange={(e)=>setDescription(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 px-4 tracking-wide font-bold text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                price
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        id="price"
                                        name="price"
                                        value={price}
                                        type="number"
                                        onChange={(e)=>setPrice(e.target.value)}
                                        placeholder="250EGP"
                                        className="block tracking-wide font-bold text-primary flex-1 border-0 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Cover photo
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} />
                                            </label>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Product Images
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                            htmlFor="productImage-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >

                                                <span>Upload a file</span>
                                            </label>
                                                <input id="productImage-upload" name="productImage-upload" type="file" className="sr-only" multiple onChange={handleImagesChange} />
                                            
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-full">
                                <h4 className='text-2xl font-extrabold'>sizes</h4>
                                <div className="flex flex-col">
                                    {sizesList.map(size => (
                                        <label key={size} className='p-2 text-lg cursor-pointer'>
                                            <input type="checkbox" className='mr-2' value={size} onChange={() => handleSizeChange(size)} />
                                            {size}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {error && <p className='text-red-500 text-xs mt-2'>{error}</p>}
                        <button 
                        type='submit'
                            className='font-medium mt-5 p-3 w-full text-sm bg-primary text-white rounded my-1 hover:bg-gray-900'
                            >Add Product</button>
                    </div>
                </div>
            </form>
        </div>
        
    </>
  )
}

export default AddProduct