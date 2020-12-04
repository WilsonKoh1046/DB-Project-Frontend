import React from 'react';
import Book from './book/book';
import { getReviewsByASIN } from '../services/reviewService';

export default function SearchResult(props) {

    const getReviews = async (book) => {
        try {
            const response = await getReviewsByASIN(book.asin);
            if (response.status === 200) {
                book.reviews = response.data;
            }
            return book;
        } catch(err) {
            console.log(err);
        }
    }
    return (
        <div className="container">
            <h2>Search Result:</h2>
            {props.location.state && props.location.state.found && props.location.state.detail && props.location.state.detail.length > 0 ?
                 props.location.state.detail.map((book, key) => {
                     (async () => book = await getReviews(book))();
                     return <Book detail={book} key={key} />
                 })
                :
                <p>No book matches the title, please try again</p>
            }
        </div>
    );
}