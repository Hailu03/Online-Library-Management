import axios from "axios";
const REST_API_BASE_URL = 'http://localhost:8080/api/rent';
export const getAllRentals = async () => {
  try {
    const response = await axios.get(`${REST_API_BASE_URL}/borrowed-books`);
    console.log(response.data);
    return response.data; // Assuming the response contains an array of book objects
  } catch (error) {
    console.error('Error retrieving rentals:', error.response ? error.response.data : error);
    throw error;
  }
};