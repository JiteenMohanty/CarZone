// src/components/Navbar/Navbar.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import SearchIcon from '@mui/icons-material/Search';
import { ArrowDropDown, AccountCircle } from '@mui/icons-material';
import './Navbar.scss';
import logo from './logo-color.png';

export default function Navbar({ user, setUser }) {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/LoginPage');
    };

    const handleLogoutClick = async () => {
        await signOut(auth);
        setUser(null);
        navigate('/');
    };

    const handleLogoClick = () => {
        navigate('/');
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
                            {user ? (
                                <button onClick={handleLogoutClick}>
                                    <span>
                                        <AccountCircle />
                                    </span>
                                    <p>
                                        Logout
                                    </p>
                                </button>
                            ) : (
                                <button onClick={handleLoginClick}>
                                    <span>
                                        <AccountCircle />
                                    </span>
                                    <p>
                                        Login/Register
                                    </p>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
