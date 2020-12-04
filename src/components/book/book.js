import React, { useState, useEffect } from 'react';
import '../../styles/home.scss';
import { Link } from 'react-router-dom';
import { getReviewsByASIN } from '../../services/reviewService';

export default function Book({detail}) {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await getReviewsByASIN(detail.asin);
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
            <Link to={{pathname:"/reviews", state: {reviews: detail.reviews}}} className="book-details">
             { detail.imUrl === "vdd" ? 
                <img src="book_icon.png" alt="book" width="100" height="100"/>
                :
                <img src={detail.imUrl} alt="book" width="100" height="100"/>
              }   
            <h3>{detail.title}</h3>
            <p>
                {detail.asin}
            </p>
            <p>Price: {detail.price} SGD</p>
            <p>Brand: {detail.brand}</p>
            <p>Category: {detail.categories}</p>
            </Link>
        </div>
    );
}