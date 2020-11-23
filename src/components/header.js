import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { logout } from '../services/accountService';
import { findBookByAsin } from '../services/bookService';
import '../styles/header.scss';

export default function Header() {
    const [user, setUser] = useState('Sign In');
    const [loggedIn, setLoggedIn] = useState(false);
    const { register, handleSubmit } = useForm();
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

    const searchBook = async (data) => {
        try {
            const response = await findBookByAsin(data.search);
            if (response.status === 200) {
                if (Object.keys(response.data).length === 0) {
                    history.push({pathname: "/search-result", state: { found: false }});
                } else {
                    history.push({pathname: "/search-result", state: { detail: response.data, found: true }});
                }
            }
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="container-fluid header-area">
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
                        <Link to="/login" className="nav-link"><i className="fa far">&#xf007;</i> {user}</Link>
                    </li>
                    { !loggedIn && 
                        <li className="nav-item">
                            <Link to="/sign-up" className="nav-link"><i className="fa far">&#xf007;</i> Sign Up</Link>
                        </li>
                    
                    }
                    { loggedIn && 
                        <li className="nav-item">
                            <button onClick={signOut} className="btn btn-secondary">Logout</button>
                        </li>
                    }
                </ul>
            </nav>
            <form onSubmit={handleSubmit(searchBook)}>
                <input name="search" ref={register} onSubmit={handleSubmit(searchBook)} placeholder="&#xf002; Book's ASIN" className="fontAwesome search-bar" />
                <input type="submit" style={{visibility: "hidden"}} className="submit-key" />
            </form>
        </div>
    )
}