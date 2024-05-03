import React from "react";
import './SearchForm.css';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { searchBooksByTitle } from "../../services/BookServices";
import { useState } from "react";

interface Book {
    id: number;
    title: string;
    authorName: string;
    publisher: string;
    genre: string;
    isbn: string;
    edition: string;
    yearOfPublication: number;
    issued: number;
    quantity: number;
    available: number;
    image: String | null;
  }

interface SearchPageProps {
    onSearch: (searchResults: Book[]) => void; // Assuming Book[] is the type of the array of books
}

const SearchForm: React.FC<SearchPageProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchTerm.trim() === "") return;
        
        try {
            const response = await searchBooksByTitle(searchTerm);
            onSearch(response);
        } catch (error) {
            console.error('Error searching books:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };


    return(
        <div className="search-form">
            <div className="container d-flex justify-content-center">
                <div className="search-form-content">
                    <form className="search-form" onSubmit={handleSubmit}>
                        <div className="search-form-elem d-flex justify-content-between bg-white">
                            <input 
                                type="text"
                                className="form-control border-0" 
                                placeholder="Enter your book ..."
                                value={searchTerm} 
                                onChange={handleChange} 
                            >

                            </input>
                            <button type="submit" className="d-flex align-items-center">
                            <FaMagnifyingGlass size={20} style={{color: '#829E8E', marginLeft: '8px'}} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SearchForm