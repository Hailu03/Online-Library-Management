import axios, { AxiosError } from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/return';

export const returnBook = async (firstName: string, lastName: string, bookTitle: string, rentId: number, returnDate: string) => {
    try {
      const response = await axios.post(`${REST_API_BASE_URL}/return-book?firstName=${firstName}&lastName=${lastName}&bookTitle=${bookTitle}&rentId=${rentId}&returnDate=${returnDate}`)
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error axios return book:', error.response ? error.response.data : error);
      } else {
        console.error('Error return book:', error);
      }
      throw error;
    }
  };