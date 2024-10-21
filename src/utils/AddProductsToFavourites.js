import axiosInstance from './axiosInstance';
import { BASE_URL } from './constants';
const addProductToFavourites = async (userId, productId,product) => {
    const url = `${BASE_URL}/favourites/${userId}/favourites`
    try {
        
        
      await axiosInstance.post(`${url}`, {
        productId,
        userId,
        product
      });
  
    } catch (error) {
      console.error('Error adding product to favourites:', error.response ? error.response.data.message : error.message);
    }
};
export default addProductToFavourites