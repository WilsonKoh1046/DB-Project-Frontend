import React from 'react';
import ReviewCard from './reviewCard';

export default function Reviews(props) {
    return (
        <div className="container-fluid">
            {props.location.state.reviews.length !== 0 ? 
                props.location.state.reviews.map((item, key) => {
                    return <ReviewCard key={key} detail={item} />
                })
                :
                <p>No reviews for this book</p>
            }
        </div>
    );
}