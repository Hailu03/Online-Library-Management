import React, { useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../../components/Footer";
import "./SearchPage.css";
import ExpandableTable from "../../components/ExpandableTable";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { getAllBooks } from "../../services/BookServices";
import { Pagination } from '@mui/material';
import { lendBook } from "../../services/RentServices";
import { searchBooksByTitle } from "../../services/BookServices";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

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


const SearchPage = () => {
    let navigate = useNavigate();

    const readerData = JSON.parse(localStorage.getItem('ReaderData') || '{}');
    const firstName = readerData.firstName;
    const lastName = readerData.lastName;
    const reserveDate = new Date().toISOString().slice(0, 10); // Get today's date in 'YYYY-MM-DD' format
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // Add two weeks to today's date
    const dueDateString = dueDate.toISOString().slice(0, 10); // Get due date in 'YYYY-MM-DD' format
    
    const [books, setBooks] = useState<Book[]>([]);
    const [allBooks, setAllBooks] = useState<Book[]>([]); // Maintain a separate state for all books

    useEffect(() => {
        // Fetch all books when the component mounts
        const getBook = async () => {
            const response = await getAllBooks();
            setBooks(response);
            setAllBooks(response); // Save the original list of books
        };
        getBook();
    }, []); // Passing an empty dependency array

    //Pagination page
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    //get the current books
    const indexOfLastBook = currentPage * itemsPerPage;
    const indexOfFirstBook = indexOfLastBook - itemsPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const handleBorrowButton = async (firstName: string, lastName: string, bookTitle: string, reserveDate: string, dueDate: string) => {
        try {
            console.log(firstName, lastName, bookTitle, reserveDate, dueDateString);
            const response = await lendBook(firstName, lastName, bookTitle, reserveDate, dueDate);
            console.log(response)
            navigate('/confirm');
            // Handle success, maybe show a success message
        } catch (error: any) {
            console.error('Error lending book:', error);
            toast.error(error.response.data.message);
            // Show an error message to the user
        }
    };

    const handleResetSearch = () => {
        // Reset the displayed books to show all books
        setBooks(allBooks);
    };

    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchTerm.trim() === "") {
            // If the search term is empty, reset the displayed books to show all books
            handleResetSearch();
            return;
        }

        try {
            const response = await searchBooksByTitle(searchTerm);
            setBooks(response);
        } catch (error) {
            console.error('Error searching books:', error);
        }
    };

    const [searchSuggestions, setSearchSuggestions] = useState<Book[]>([]);

    const handleSearch = async (term: string) => {
        try {
            const response = await searchBooksByTitle(term);
            setSearchSuggestions(response);
        } catch (error) {
            console.error('Error searching books:', error);
        }
    };

    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        handleSearch(term); // Fetch search suggestions as the user types
        setShowSuggestions(true); // Show suggestions when typing
    };


    const handleSelectSuggestion = (book: Book) => {
        setSearchTerm(book.title);
        setSearchSuggestions([]); // Clear search suggestions
        setShowSuggestions(false);
        setBooks([book]); // Show only the selected book
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
                setShowSuggestions(false); // Hide suggestions when clicking outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const suggestionsRef = useRef<HTMLDivElement | null>(null);

    return (
        <main>
            <Navbar />
            <section>
                <div className="banner-search">
                    <div className='banner-text-search'>
                        <h2>find your book of choice</h2>
                        <br />
                        <p className='header-text-search fs-18 fw-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Fusce ut rhoncus ligula, eu viverra ex. Aliquam non mauris sed neque convallis semper ut ac magna.
                            Etiam ornare feugiat consequat.</p>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-sm-12 pt-5">
                            {/* FITLER ITEMS SECTION */}
                            <div className="filter-item-search">
                                <div className="btn-group">
                                    <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                        Sort: Best Match
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-lg-end">
                                        <li><button className="dropdown-item" type="button">Recently</button></li>
                                        <li><button className="dropdown-item" type="button">Date (Newest First)</button></li>
                                        <li><button className="dropdown-item" type="button">Date (Oldest First)</button></li>
                                        <li><button className="dropdown-item" type="button">Title</button></li>
                                    </ul>
                                </div>
                            </div>

                            <ExpandableTable />
                        </div>
                        <div className="col-md-8 col-sm-12 pt-5">
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
                                                    <FaMagnifyingGlass size={20} style={{ color: '#829E8E', marginLeft: '8px' }} />
                                                </button>
                                            </div>
                                            {showSuggestions && (
                                                <div ref={suggestionsRef} className="search-suggestions">
                                                    <ul>
                                                        {searchSuggestions.map((book) => (
                                                            <li key={book.id} onClick={() => handleSelectSuggestion(book)}>{book.title}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="divider-search"></div>
                            <div className="main-content">
                                {/* Book Cards */}
                                {currentBooks.map((book) => (
                                    <div className="card book-card" key={book.id}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={`data:image/jpeg;base64,${book.image}`} className="img-fluid rounded-start" alt="Book Title" />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title-search">
                                                        <Link to="#">{book.title}</Link>
                                                    </h5>
                                                    <p className="card-text-search author"><strong>Author:</strong> {book.authorName}</p>
                                                    <p className="card-text-search publisher"><strong>Publisher:</strong> {book.publisher}</p>
                                                    <p className="card-text-search genre"><strong>Genre:</strong> {book.genre}</p>
                                                    <p className="card-text-search isbn"><strong>ISBN:</strong> {book.isbn}</p>
                                                    <p className="card-text-search edition"><strong>Edition:</strong> {book.edition}</p>
                                                    <p className="card-text-search yearOfPublication"><strong>Year Of Publication:</strong> {book.yearOfPublication}</p>
                                                    <p className="card-text-search issued"><strong>Issued:</strong> {book.issued}</p>
                                                    <p className="card-text-search quantity"><strong>Quantity:</strong> {book.available}</p>
                                                    <p className="card-text-search available"><strong>Availabe:</strong> {book.available == 0 ? "No" : "Yes"}</p>

                                                    {/* Add other book details */}
                                                    <div className="card-btn">
                                                        <Button variant="secondary" className="favorite-btn" >Add to favorite</Button>
                                                        <Button variant="secondary" className="favorite-btn" onClick={() => handleBorrowButton(firstName, lastName, book.title, reserveDate, dueDateString)}>Borrow</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="pagination">
                                    {/* Pagination */}
                                    <Pagination
                                        count={currentBooks.length}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        variant="outlined"
                                        shape="rounded"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </section>
            <Footer />
        </main>
    )
}

export default SearchPage