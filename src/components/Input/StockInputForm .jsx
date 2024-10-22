import { useState } from "react";

const StockInputForm = ({ productDetails, onSubmitStock }) => {
    const [stockDetails, setStockDetails] = useState(
      productDetails.details.map(detail => ({ ...detail, stock: 0 }))
    );
    let [error] = useState(null)

    const handleStockChange = (size, value) => {
      setStockDetails(stockDetails.map(d => 
        d.size === size ? { ...d, stock: Number(value) } : d
      ));
    };
  
    const handleSubmit = () => {
        if(!error){
            onSubmitStock(stockDetails);
        }
      
    };
  
    return (
      <div className="p-5">
        <h1 className="text-xl font-bold">Add Stock</h1>
        {stockDetails.map(({ size, stock }) => (
          <div key={size} className="my-2">
            <label>{size} Stock:</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => handleStockChange(size, e.target.value)}
              className="ml-2 p-2 border"
            />
          </div>
        ))}
        {error && <p className='text-red-500 text-sm font-extrabold mt-2'>{error}</p>}

        <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white">Place Product</button>
      </div>
    );
  };
  
  export default StockInputForm;
  