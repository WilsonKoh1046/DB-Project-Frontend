import React from 'react';
import '../styles/home.scss';
import { Link } from 'react-router-dom';

export default function Book({detail}) {

    return (
        <div className="book">
            <Link to={{pathname:"/reviews", state: {reviews: detail.reviews}}} className="book-details">
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