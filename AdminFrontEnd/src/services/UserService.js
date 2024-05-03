import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/readersinfo';



export const getAllUsers = async () => {
    try {
      const response = await axios.get(`${REST_API_BASE_URL}`);
      console.log(response.data);
      return response.data; // Assuming the response contains an array of book objects
    } catch (error) {
      console.error('Error retrieving users:', error.response ? error.response.data : error);
      throw error;
    }
  };