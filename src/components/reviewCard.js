import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.scss';

export default function reviewCard({detail}) {

    const truncateText = (text) => {
        if (text.length > 100) {
            return text.substring(0, 101) + '...';
        }
        return text;
    }

    const helpfulFormat = (helpful) => {
        return helpful[0] + '/' + helpful[helpful.length - 1];
    }

    const dateFormat = (date) => {
        if (date.includes(',')) {
            date = date.replace(',', '');
        }
        return date;
    }

    let truncatedText = truncateText(detail.reviewText);
    // let formatedHelpful = helpfulFormat(detail.helpful);
    // let formatedDate = dateFormat(detail.reviewTime);
    detail.reviewText = truncatedText;
    // detail.helpful = formatedHelpful;
    // detail.reviewTime = formatedDate;

    return (
        <div className="review-card">
            <h3>{detail.asin}</h3>
            <p>
                Overall Score: {detail.overall}
            </p>
            <p>{detail.reviewerName}: </p>
            <p>{detail.reviewText}</p>
            <p>
                Summary: {detail.summary}
            </p>
            <p>
                Helpful: {detail.helpful}
            </p>
            {/*
            <p>
                Reviewed Date: {detail.reviewTime}
            </p>
            <p>{detail.unixReviewTime}</p> 
            */}
        </div>
    )
}
