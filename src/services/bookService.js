import axios from 'axios';
import { getReviewsByASIN } from './reviewService';

export const createNewBook = async (data) => {
    try {
        const response = await axios.post('/api/metaBooks', data);
        return response;
    } catch(err) {
        console.log(err);
    }
}

export const getAllBooks = async () => {
    try {
         const response = await axios.get("/api/metaBooks/100");
         if (response.status === 200) {
            let books_with_reviews = [];
            for (let book of response.data) {
                let reviews = await getReviewsByASIN(book.asin);
                if (reviews.status === 200) {
                    book.reviews = reviews.data;
                    books_with_reviews.push(book);
                }
            }
            return {"message": "Success", "data": books_with_reviews};
         }
         return {"message": "Fail", "data": []};
    } catch(err) {
        console.log(err);
    }
}

export const findBookByAsin = async (asin) => {
    try {
        const response = await axios.get(`/api/metaBooks/${asin}`);
        return response;
    } catch(err) {
        console.log(err);
    }
}

export const findBooksByTitle = async (title) => {
    try {
        const response = await axios.get(`/api/metaBooks/title?title=${title}`);
        return response;
    } catch(err) {
        console.log(err);
    }
}

const calculateAvgReviewsScore = (reviews) => {
    if (!reviews) {
        return;
    }
    let total = 0;
    for (let review of reviews) {
        total += review.overall;
    }
    return total / reviews.length;
}

export const sortBooks = (books, order) => {
    return order === "asc" ? books.sort((a, b) => calculateAvgReviewsScore(a.reviews) - calculateAvgReviewsScore(b.reviews)) : books.sort((a, b) => calculateAvgReviewsScore(b.reviews) - calculateAvgReviewsScore(a.reviews)) 
}

export const findAllCategories = (books) => {
    if (!books) {
        return;
    }
    let all_categories = {};
    for (let book of books) {
        if (book.categories.length !== 0) {
            if (!all_categories[book.categories]) {
                all_categories[book.categories] = 1;
            } else {
                all_categories[book.categories] += 1;
            }
        }
    }
    return all_categories;
}

export const filterBooksByCategory = (books, category) => {
    if (!books) {
        return;
    }
    let result = [];
    for (let book of books) {
        if (book.categories.length !== 0) {
            if (book.categories[0][0] === category) {
                result.push(book);
            }
        }
    }
    return result;
}
