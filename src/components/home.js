import React, { useState, useEffect } from 'react'
import Pagination from 'react-js-pagination';
import { useHistory } from 'react-router-dom';
import Book from './book/book';
import { getAllBooks, sortBooks, findAllCategories, filterBooksByCategory } from '../services/bookService';
import { getReviewsByASIN } from '../services/reviewService';
import '../styles/home.scss';

export default function Home() {

    const [books, setBooks] = useState([]);

    const [categories, setCategories] = useState({});

    const [activePage, setActivePage] = useState(1);

    const [itemPerPage, setItemPerPage] = useState(6);

    const history = useHistory();

    useEffect(() => {
        (async () => {
            try {
                const data = await getAllBooks();
                if (data["message"] === "Success") {
                    setBooks(data["data"]);
                    setCategories(findAllCategories(data["data"]));
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
        <div className="container-fluid home-section">
                {allBooks.length > 0 ? 
                    <div className="container-fluid">
                        <div className="d-flex flex row">
                            <p className="text-dark mr-2">Sort By: </p>
                            <p className="text-info mr-4" style={{cursor: "pointer"}} onClick={() => { setBooks(sortBooks(books, "asc")); history.push('/');}}>Reviews (Low To High)</p>
                            <p className="text-info mr-4" style={{cursor: "pointer"}} onClick={() => { setBooks(sortBooks(books, "desc")); history.push('/');}}>Reviews (High To Low)</p>
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
                                                    try {
                                                        const data = await getAllBooks();
                                                        if (data["message"] === "Success" ) {
                                                            setBooks(filterBooksByCategory(data["data"], category));
                                                        }
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