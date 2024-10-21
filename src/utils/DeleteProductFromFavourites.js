import axiosInstance from './axiosInstance';
import { BASE_URL } from './constants';
const DeleteProductFromFavourites = async (userId,productId) => {
    const url = `${BASE_URL}/favourites/${userId}/favourites`
    try { 
      await axiosInstance.delete(url, {
        params: { productId },
    });
    } catch (error) {
      console.error('Error adding product to favourites:', error.response ? error.response.data.message : error.message);
    }
};
export default DeleteProductFromFavourites

