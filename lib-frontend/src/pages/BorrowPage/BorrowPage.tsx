import React, { useState } from "react";
import "./BorrowPage.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../../components/Footer";
import ImagetoAdd from "../../assets/books.jpg";
import { Button, Modal, ButtonGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';


const BorrowPage = () => {

    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleDateChange = (date) => setSelectedDate(date);

    const handleBorrow = () => {
        // Implement borrow logic here with the selectedDate
        handleCloseModal(); // Close the modal after borrowing
    };

    const handleRangeChange = (days) => {
        const today = new Date();
        const newDate = new Date(today);
        newDate.setDate(today.getDate() + days);
        setSelectedDate(newDate);
    };

    const buttonStyle = {
        backgroundColor: '#829E8E', // Custom background color
        borderColor: '#829E8E', // Border color
        color: '#fff', // Text color
    };

    return (
        <>

            <Navbar />

            <section>
                <div className="banner-borrow">
                    <div className='banner-text-borrow'>
                        <h2>find your book of choice</h2>
                        <br />
                        <p className='header-text-borrow fs-18 fw-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Fusce ut rhoncus ligula, eu viverra ex. Aliquam non mauris sed neque convallis semper ut ac magna.
                            Etiam ornare feugiat consequat.</p>
                    </div>
                </div>
            </section>

            <div className="container my-5">
                <div className="row">
                    <div className="col-md-8">
                        {/* Book Card */}
                        <div className="card book-card mb-4">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    {/* Book Image */}
                                    <img src={ImagetoAdd} className="img-fluid rounded-start" alt="Book Cover" style={{ maxWidth: '100%', height: 'auto' }} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        {/* Book Information */}
                                        <h5 className="card-title"><a href="#">Book Title</a></h5>
                                        <p className="card-text"><strong>Author:</strong> Book Author</p>
                                        <p className="card-text"><strong>Publication Year:</strong> 2022</p>
                                        <p className="card-text"><strong>Version:</strong> Paperback</p>
                                        <p className="card-text"><strong>Summary:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Curabitur auctor sem ut purus mattis, et convallis sem ultricies. Proin sed hendrerit enim.
                                            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                                            Sed eu eros scelerisque, lacinia leo quis, dictum justo.</p>
                                        <div className="card-btn-borrow">
                                            {/* Buttons */}
                                            <button className="btn btn-favorite me-2">Add to Favorites</button>
                                            {/* <button className="btn btn-borrow">Borrow</button> */}
                                            <Button variant="secondary" style={buttonStyle} onClick={handleOpenModal}>Borrow</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card book-card mb-4">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    {/* Book Image */}
                                    <img src={ImagetoAdd} className="img-fluid rounded-start" alt="Book Cover" style={{ maxWidth: '100%', height: 'auto' }} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        {/* Book Information */}
                                        <h5 className="card-title"><a href="#">Book Title</a></h5>
                                        <p className="card-text"><strong>Author:</strong> Book Author</p>
                                        <p className="card-text"><strong>Publication Year:</strong> 2022</p>
                                        <p className="card-text"><strong>Version:</strong> Paperback</p>
                                        <p className="card-text"><strong>Summary:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Curabitur auctor sem ut purus mattis, et convallis sem ultricies. Proin sed hendrerit enim.
                                            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                                            Sed eu eros scelerisque, lacinia leo quis, dictum justo.</p>
                                        <div className="card-btn-borrow">
                                            {/* Buttons */}
                                            <button className="btn btn-favorite me-2">Add to Favorites</button>
                                            {/* <button className="btn btn-borrow">Borrow</button> */}
                                            <Button variant="secondary" style={buttonStyle} onClick={handleOpenModal}>Borrow</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card book-card mb-4">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    {/* Book Image */}
                                    <img src={ImagetoAdd} className="img-fluid rounded-start" alt="Book Cover" style={{ maxWidth: '100%', height: 'auto' }} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        {/* Book Information */}
                                        <h5 className="card-title"><a href="#">Book Title</a></h5>
                                        <p className="card-text"><strong>Author:</strong> Book Author</p>
                                        <p className="card-text"><strong>Publication Year:</strong> 2022</p>
                                        <p className="card-text"><strong>Version:</strong> Paperback</p>
                                        <p className="card-text"><strong>Summary:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Curabitur auctor sem ut purus mattis, et convallis sem ultricies. Proin sed hendrerit enim.
                                            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                                            Sed eu eros scelerisque, lacinia leo quis, dictum justo.</p>
                                        <div className="card-btn-borrow">
                                            {/* Buttons */}
                                            <button className="btn btn-favorite me-2">Add to Favorites</button>
                                            {/* <button className="btn btn-borrow">Borrow</button> */}
                                            <Button variant="secondary" style={buttonStyle} onClick={handleOpenModal}>Borrow</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Borrow Modal */}
                        <Modal show={showModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Select Borrow Date</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="mb-3">
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={handleDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        minDate={new Date()}
                                        isClearable
                                        placeholderText="Select date"
                                    />
                                </div>
                                <ButtonGroup className="mt-3">
                                    <Button variant="secondary" onClick={() => handleRangeChange(3)} style={buttonStyle}>3 Days</Button>
                                    <Button variant="secondary" onClick={() => handleRangeChange(7)} style={buttonStyle}>7 Days</Button>
                                    {/* Add more buttons for different ranges as needed */}
                                </ButtonGroup>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                                <Link to="/confirm">
                                    <Button variant="primary" disabled={!selectedDate} style={buttonStyle}>Borrow</Button>
                                </Link>
                            </Modal.Footer>
                        </Modal>

                    </div>
                    <div className="col-md-4">
                        {/* Recommended Books Section */}
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Your Favorite Books</h5>
                                {/* Small Book Cards */}
                                <div className="recommended-book">
                                    <p>Book Title 1</p>
                                </div>
                                <div className="recommended-book">
                                    <p>Book Title 2</p>
                                </div>
                                <div className="recommended-book">
                                    <p>Book Title 3</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default BorrowPage;
