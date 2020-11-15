import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { logout } from '../services/accountService';

export default function Header() {
    const [user, setUser] = useState('Sign In');
    const [loggedIn, setLoggedIn] = useState(false);
    const history =  useHistory();
    useEffect(() => {
        if (localStorage.getItem('account')) {
            const userData = JSON.parse(localStorage.getItem('account'));
            const username = userData.username
            setUser(username);
            setLoggedIn(true);
        }
    }, [])

    const signOut = () => {
        if (logout()) {
            setLoggedIn(false);
            history.go(0);
            history.push('/');
        }
    }

    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <h1><Link to="/">Books Heaven</Link></h1>
            <ul className="nav navbar-nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/review" className="nav-link">Review</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link"><i className="far">&#xf007;</i> {user}</Link>
                </li>
                { !loggedIn && 
                    <li className="nav-item">
                        <Link to="/sign-up" className="nav-link"><i className="far">&#xf007;</i> Sign Up</Link>
                    </li>
                
                }
                { loggedIn && 
                    <li className="nav-item">
                        <button onClick={signOut} className="btn btn-secondary">Logout</button>
                    </li>
                }
            </ul>
        </nav>
    )
}