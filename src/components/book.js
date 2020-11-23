import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/home.scss';
import { Link } from 'react-router-dom';

export default function Book({detail}) {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`/api/reviews/${detail.asin}`);
                if (response.status === 200) {
                    setReviews(response.data);
                }
            } catch(err) {
                console.log(err);
            }
        })();
    }, [])

    return (
        <div className="book">
            <Link to={{pathname:"/reviews", state: {reviews: reviews}}} className="book-details">
            <img src={detail.imgUrl} alt="book" width="100" height="100"/>
            <h3>{detail.title}</h3>
            <p>
                {detail.asin}
            </p>
            <p>Price: {detail.price} SGD</p>
            <p>Brand: {detail.brand}</p>
            <p>
                Description: {detail.description}
            </p>
            </Link>
        </div>
    );
}