import React from 'react'
import Navbar from "../pages/Navbar/Navbar"
import "./Header.css"

const Header = () => {
    return (
        <div className='holder'>
            <Navbar />
            <header className='banner'>
                <div className='banner-text'>
                    <h2>find your book of choice</h2>
                    <br />
                    <p className='header-text fs-18 fw-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Fusce ut rhoncus ligula, eu viverra ex. Aliquam non mauris sed neque convallis semper ut ac magna. 
                    Etiam ornare feugiat consequat.</p>
                </div>
            </header>
        </div>
    )
}

export default Header