import React, { useState } from "react"
import "./Navbar.css"
import logoImg from "../../assets/logo.png"
import { Link } from "react-router-dom"
import { FaUser, FaBell } from "react-icons/fa";


const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-light navbar-light fixed-top" id="navbar">
            <div className="container">
                <Link to='/' className="navbar-brand">
                    <img src={logoImg} alt='site logo' />
                </Link>
                <button className="navbar-toggler" data-bs-target="#menu" data-bs-toggle="collapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="menu">
                    <ul className="nav navbar-nav justify-content-center">
                        <li className="nav-item"><Link to="/home" className="nav-link">HOME</Link></li>
                        <li className="nav-item"><Link to="/search" className="nav-link">SEARCH</Link></li>
                        <li className="nav-item"><Link to="/confirm" className="nav-link">BORROW</Link></li>
                        <li className="nav-item"><Link to="/favorite" className="nav-link">FAVORITE</Link></li>
                        <li className="nav-item"><Link to="/review" className="nav-link">REVIEW</Link></li>
                        <li className="nav-item"><Link to="/notifications" className="nav-link"><FaBell size={20} /><span>Notification</span></Link></li>
                        <li className="nav-item"><Link to="/user" className="nav-link"><FaUser size={20} /><span>User</span></Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar