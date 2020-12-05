import React, { useState, useEffect } from 'react'
import Pagination from 'react-js-pagination';
import { useHistory } from 'react-router-dom';
import Book from './book/book';
import { getAllBooks, sortBooks, findAllCategories, filterBooksByCategory } from '../services/bookService';
import { getReviewsByASIN } from '../services/reviewService';
import '../styles/home.scss';

export default function Home() {

    const [books, setBooks] = useState([]);
    const [booksCopy, setBooksCopy] = useState([]);

    const [categories, setCategories] = useState({});

    const [activePage, setActivePage] = useState(1);

    const [itemPerPage, setItemPerPage] = useState(6);

    const history = useHistory();

    useEffect(() => {
        (async () => {
            try {
                const response = await getAllBooks();
                if (response.status === 200) {
                    setBooksCopy(response.data);
                    let books_with_reviews = [];
                    for (let book of response.data) {
                        const reviews = await getReviewsByASIN(book.asin);
                        book.reviews = reviews.data;
                        books_with_reviews.push(book);
                    }
                    setBooks(books_with_reviews);
                    setCategories(findAllCategories(books_with_reviews));
                }
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
    let allBooks = [];
    if (end > books.length) {
        end = (end- itemPerPage) + (itemPerPage - (end - books.length));
    }
    for (let i = start - 1; i < end; i++) {
        allBooks.push(books[i]);
    }

    return (
        <div className="container home-section">
                {allBooks.length > 0 ? 
                    <div className="container">
                        <div className="d-flex flex row">
                            <p className="text-dark mr-2">Sort By: </p>
                            <p 
                            className="text-info mr-4" 
                            style={{cursor: "pointer"}} 
                            onClick={() => {
                                setBooks(sortBooks(books, "asc"));
                                history.push('/'); 
                                }}
                            >
                                Reviews (Low To High)
                            </p>
                            <p 
                            className="text-info mr-4" 
                            style={{cursor: "pointer"}} 
                            onClick={() => { 
                                setBooks(sortBooks(books, "desc"));
                                history.push('/');
                            }}
                            >
                                Reviews (High To Low)
                            </p>
                        </div>
                        <div className="d-flex flex row">
                            <p className="text-dark mr-2">Category: </p>
                            <p className="text-info mr-4" style={{cursor: "pointer"}} onClick={() => history.go(0)}>All</p>
                            {categories && Object.keys(categories).length > 0 && (
                                Object.keys(categories).map((category, key) => {
                                    return <p 
                                            className="text-info mr-4" 
                                            style={{cursor: "pointer"}} 
                                            key={key} 
                                            onClick={() => {
                                                (async () => {
                                                    setBooks(filterBooksByCategory(booksCopy, category));
                                                    try {
                                                        let books_with_reviews = [];
                                                        for (let book of books) {
                                                            const reviews = await getReviewsByASIN(book.asin);
                                                            book.reviews = reviews.data;
                                                            books_with_reviews.push(book);
                                                        }
                                                        setActivePage(1);
                                                    } catch(err) {
                                                        console.log(err);
                                                    }
                                                })();
                                                }}>
                                                    {category} ({categories[category]})
                                            </p>
                                })
                            )}
                        </div>
                        <div className="pagination-button">
                            <Pagination
                                activePage={activePage}
                                itemsCountPerPage={itemPerPage}
                                totalItemsCount={books.length}
                                pageRangeDisplayed={2}
                                itemClass="page-item"
                                linkClass="page-link"
                                onChange={handlePageChange}
                            />
                        </div>
                    </div>
                    :
                    <div className="container-fluid">
                        <br/>
                        <h2 style={{textAlign: "center"}}>
                            “For victory in life, we’ve got to keep focused on the goal, and the goal is Heaven.” 
                            <br/>
                            — Lou Holtz
                        </h2>
                    </div>
                }
            <div className="review-list">
                {allBooks.map((item, key) => 
                    <Book key={key} detail={item} />
                )} 
            </div>
        </div>
    )
}