import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/books';

export const addBook = async (bookData) => {
    try {
      const response = await axios.post(REST_API_BASE_URL, bookData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Book added successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding book:', error.response ? error.response.data : error);
      throw error;
    }
  };
  
  export const deleteBook = async (bookId) => {
    try {
      await axios.delete(REST_API_BASE_URL+`/${bookId}`);
      console.log('Book deleted successfully');
    } catch (error) {
      console.error('Error deleting book:', error.response ? error.response.data : error);
      throw error;
    }
  };
  
  export const updateBook = async (bookId, bookData) => {
    try {
      const response = await axios.put(REST_API_BASE_URL+ `/${bookId}`, bookData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Book updated successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating book:', error.response ? error.response.data : error);
      throw error;
    }
  };
  
  export const searchBooksByTitle = async (title) => {
    try {
      const response = await axios.get(REST_API_BASE_URL+`/search`, {
        params: { title },
      });
      console.log('Books found:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error searching books:', error.response ? error.response.data : error);
      throw error;
    }
  };
  
  export const getAllBooks = async () => {
    try {
      const response = await axios.get(`${REST_API_BASE_URL}`);
      console.log(response.data);
      return response.data; // Assuming the response contains an array of book objects
    } catch (error) {
      console.error('Error retrieving books:', error.response ? error.response.data : error);
      throw error;
    }
  };
  