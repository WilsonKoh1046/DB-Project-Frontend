import React, { useState, useEffect } from 'react'
import Pagination from 'react-js-pagination';
import ReviewCard from './reviewCard';
import '../styles/home.scss';

export default function Home() {

    const [reviews, setReviews] = useState([]);

    const [activePage, setActivePage] = useState(1);

    const [itemPerPage, setItemPerPage] = useState(6);

    useEffect(() => {
        (async () => {
            try {
                let data = await fetch('kindle_reviews.json');
                let result = await data.json();
                setReviews(result);
            } catch(err) {
                console.log(err);
            }
        })()
    }, [])

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    }

    let end = itemPerPage * activePage;
    let start = end - (itemPerPage - 1);
    let allReviews = [];
    if (end > reviews.length) {
        end = (end- itemPerPage) + (itemPerPage - (end - reviews.length));
    }
    for (let i = start - 1; i < end; i++) {
        allReviews.push(reviews[i]);
    }

    return (
        <div className="review-list">
            {allReviews.map((item, key) => 
                <ReviewCard key={item.reviewerID} detail={item} />
            )} 
            {allReviews.length > 0 && 
                <div className="pagination-button">
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={itemPerPage}
                        totalItemsCount={reviews.length}
                        pageRangeDisplayed={2}
                        itemClass="page-item"
                        linkClass="page-link"
                        onChange={handlePageChange}
                    />
                </div>
            }
        </div>
    )
}