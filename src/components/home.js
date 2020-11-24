import React, { useState, useEffect } from 'react'
import Pagination from 'react-js-pagination';
import Book from './book/book';
import { getAllBooks } from '../services/bookService';
import '../styles/home.scss';

export default function Home() {

    const [books, setBooks] = useState([]);

    const [activePage, setActivePage] = useState(1);

    const [itemPerPage, setItemPerPage] = useState(6);

    useEffect(() => {
        (async () => {
            try {
                const response = await getAllBooks();
                if (response.status === 200) {
                    setBooks(response.data);
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