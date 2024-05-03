import React, { useEffect, useState } from 'react';
import "./ConfirmPage.css"
import ImagetoAdd from "../../assets/books.jpg";
import Navbar from "../Navbar/Navbar";
import Footer from "../../components/Footer";
import { getBorrowedBooksByUser } from '../../services/RentServices';
import moment from "moment";
import { returnBook } from '../../services/ReturnService';

interface User {
    firstName: string;
    lastName: string;
}

const ConfirmPage = () => {
    const returnDate = new Date().toISOString().slice(0, 10); 

    const buttonStyle = {
        backgroundColor: '#829E8E', // Custom background color
        borderColor: '#829E8E', // Border color
        color: '#fff', // Text color
    };

    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [userData, setUserData] = useState<User>({ firstName: '', lastName: '' });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('ReaderData') || '{}');
        setUserData(user);
        const userID = user.id;
        getBorrowedBooksByUser(userID)
            .then((data) => {
                setBorrowedBooks(data);
            })
            .catch((error) => {
                console.error('Error getting borrowed books:', error);
            });
    }, []);

    const handleReturnBook = async (firstName: string, lastName: string, bookTitle: string, rentId: number, returnDate: string)=> {
        try {
            const response = await returnBook(firstName, lastName, bookTitle, rentId, returnDate);
            setBorrowedBooks(prevBooks => prevBooks.filter((book: any) => book.rentID !== rentId));
            console.log(response);
        } catch (error) {
            console.error('Error returning book:', error);
        }
    };

    return (
        <>
            <Navbar />
            <section>
            <div className="banner-confirm">
                    <div className='banner-text-confirm'>
                        <h2>find your book of choice</h2>
                        <br />
                        <p className='header-text-confirm fs-18 fw-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Fusce ut rhoncus ligula, eu viverra ex. Aliquam non mauris sed neque convallis semper ut ac magna.
                            Etiam ornare feugiat consequat.</p>
                    </div>
                </div>
            </section>
            <section className='my-5'>
                <div className='container'>
                    <div className='section-text-confirm text-center mb-5'>
                        <h3>Your Books</h3>
                    </div>
                </div>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="table-header-confirm">Order</th>
                                <th className="table-header-confirm">Product</th>
                                <th className="table-header-confirm" style={{ width: '300px' }}>Name</th>
                                <th className="table-header-confirm" style={{ width: '150px' }}>Reserve Date</th>
                                <th className="table-header-confirm" style={{ width: '150px' }}>Return Date</th>
                                <th className="table-header-confirm" style={{ width: '150px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {borrowedBooks.map((book: any, index: number) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td><img src={`data:image/jpeg;base64,${book.image}`} alt="Book" className="img-fluid" style={{ width: '100px' }} /></td>
                                    <td>{book.bookTitle}</td>
                                    <td>{moment(book.reserveDate).format('DD/MM/YYYY')}</td>
                                    <td>{moment(book.dueDate).format('DD/MM/YYYY')}</td>
                                    <td><button className="btn custom-btn-confirm" style={buttonStyle} onClick={() => handleReturnBook(userData.firstName,userData.lastName,book.bookTitle,book.rentID,returnDate)}>Return</button></td>
                                </tr>
                            
                            ))}
                        </tbody>
                    </table>   
                            
                    <div className='row justify-content-end'>
                        <div className="col-auto">
                            <button className="btn custom-btn-confirm" style={buttonStyle}>Return All</button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default ConfirmPage;
