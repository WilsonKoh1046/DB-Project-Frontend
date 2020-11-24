import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { createNewBook } from '../services/bookService';

export default function NewBook() {
    const { register, handleSubmit } = useForm();
    const [loggedIn, setLoggedIn] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('account')) {
            setLoggedIn(true);
        }
    }, [])

    const submitReview = async (data) => {
        try {
            let response = await createNewBook(data);
            if (response.status === 200) {
                alert("New book added to the database, thank you for contributing!");
                history.push('/');
            }
        } catch(err) {
            console.log(err);
        } finally {
            history.go(0);
        }
    }

    return (
        <div className="container">
            <h2>New Book</h2>
            { loggedIn ?
                        <form onSubmit={handleSubmit(submitReview)}>
                            <div className="form-group">
                                <lablel>asin:</lablel>
                                <br/>
                                <input name="asin" ref={register} />
                            </div>
                            <div className="form-group">
                                <label>Title:</label>
                                <br/>
                                <input name="title" ref={register} />
                            </div>
                            <div className="form-group">
                                <label>Price:</label>
                                <br/>
                                <input name="price" ref={register} />
                            </div>
                            <div className="form-group">
                                <label>Brand:</label>
                                <br/>
                                <input name="brand" ref={register} />
                            </div>
                            <div className="form-group">
                                <label>Image (Please provide URL):</label>
                                <br/>
                                <input name="imgUrl" ref={register} />
                            </div>
                            <div className="form-group">
                                <label>Description:</label>
                                <br/>
                                <input name="description" ref={register} />
                            </div>
                            <input type="submit" className="btn btn-primary" />
                        </form>
                        :
                        <p>Please login to add a new book to the database!</p>
            }
        </div>
    );
}