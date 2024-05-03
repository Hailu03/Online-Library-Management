import axios, { AxiosError } from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/books';

export const getAllBooks = async () => {
  try {
    const response = await axios.get(`${REST_API_BASE_URL}`);
    return response.data; // Assuming the response contains an array of book objects
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error retrieving books:', error.response ? error.response.data : error);
    } else {
      console.error('Error retrieving books:', error);
    }
    throw error;
  }
};

export const searchBooksByTitle = async (title: string) => {
  try {
    const response = await axios.get(REST_API_BASE_URL+`/search`, {
      params: { title },
    });
    console.log('Books found:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error searching books:', error.response ? error.response.data : error);
    } else {
      console.error('Error searching books:', error);
    }
    throw error;
  }
};