import React from 'react';
import "./Footer.css";
import { FaFacebookMessenger, FaFacebookSquare, FaInstagram, FaTwitter, FaYoutube, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
        <footer className='footer'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-6 col-12'>
                  <div className='footer-info'>
                    <h3>Library for highland children</h3>
                    <p>
                      <strong>Ring road 4, Quarter 4, Thoi Hoa Ward, Ben Cat Town, Binh Duong Province</strong>
                    </p>
                    <p>Tel. (0274) 222 0990 - 70206</p>
                    <p>Fax: (0274) 222 0980</p>
                  </div>
                  <div>
                    <p><FaEnvelope /> onlinelibrary@gmail.com</p>
                  </div>
                  <div>
                    <p>Copyright @2024 by Online Library</p>
                  </div>
                </div>
                <div className='col-md-6 col-12'>
                  <div className='text-center'>
                    <div className='is-divider'></div>
                    <div className='footer-quote'>
                      <blockquote>
                        <p>
                          <em>"Học, học nữa, học mãi"</em>
                        </p>
                      </blockquote>
                    </div>
                    <div className='is-divider'></div>
                  </div>
                  <div className='footer-icons'>
                    <span>
                      <FaFacebookSquare />
                    </span>
                    <span>
                      <FaInstagram />
                    </span>
                    <span>
                      <FaFacebookMessenger />
                    </span>
                    <span>
                      <FaTwitter />
                    </span>
                    <span>
                      <FaYoutube />
                    </span>
                  </div>
                </div>
              </div>
            </div>
        </footer>
    </div>
  )
}

export default Footer