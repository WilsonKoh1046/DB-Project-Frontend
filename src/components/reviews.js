import React, {useEffect, useState} from 'react';
import ReviewCard from './reviewCard';

export default function Reviews(props) {
    return (
        <div className="container-fluid">
            {props.location.state.reviews.map((item, key) => {
                return <ReviewCard key={key} detail={item} />
            })}
        </div>
    );
}