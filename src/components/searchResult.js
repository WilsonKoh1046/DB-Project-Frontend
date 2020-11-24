import React from 'react';
import Book from './book/book';

export default function SearchResult(props) {
    return (
        <div className="container-fluid">
            <h2>Search Result:</h2>
            {props.location.state.found ? 
                <Book detail={props.location.state.detail} />
                :
                <p>No book matches the asin, please try again</p>
            }
        </div>
    );
}