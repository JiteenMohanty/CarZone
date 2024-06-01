import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import SearchIcon from '@mui/icons-material/Search';
import { ArrowDropDown, AccountCircle } from '@mui/icons-material';
import './Navbar.scss';
import logo from './logo-color.png'; // Adjust the path as needed

export default function Navbar() {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLoginClick = () => {
        navigate('/LoginPage'); // Navigate to the login page
    };

    const handleLogoClick = () => {
        navigate('/'); // Navigate to the homepage
    };

    return (
        <div className="navbar">
            <div className="navbar-container">
                <div className="navbar-header">
                    <div className="navbar-header-left">
                        <div className="navbar-header-left-logo" onClick={handleLogoClick}>
                            <img src={logo} alt="Logo" />
                        </div>
                        <div className="navbar-header-left-search">
                            <div className='navbar-input'>
                                <input type='text' placeholder='Search Cars or brands eg. Swift, or Maruti' />
                            </div>
                            <div className='navbar-search-icon'>
                                <SearchIcon />
                            </div>
                        </div>
                    </div>
                    <div className="navbar-header-right">
                        <div className="languages">
                            <div className="language-name">
                                <p>English</p>
                            </div>
                            <div className="language-dropmenu">
                                <ArrowDropDown />
                            </div>
                        </div>
                        <div className="login-register">
                            <button onClick={handleLoginClick}> {/* Add onClick handler */}
                                <span>
                                    <AccountCircle />
                                </span>
                                <p>
                                    Login/Register
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
