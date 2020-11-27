import axios from 'axios';

export const createNewBook = async (data) => {
    try {
        const response = await axios.post('/api/books', data);
        return response;
    } catch(err) {
        console.log(err);
    }
}

export const getAllBooks = async () => {
    try {
         const response = await axios.get("/api/books");
         return response;
    } catch(err) {
        console.log(err);
    }
}

export const findBookByAsin = async (asin) => {
    try {
        const response = await axios.get(`/api/books/${asin}`);
        return response;
    } catch(err) {
        console.log(err);
    }
}

const calculateAvgReviewsScore = (reviews) => {
    let total = 0;
    for (let review of reviews) {
        total += review.overall;
    }
    return total / reviews.length;
}

export const sortBooks = (books, order) => {
    return order === "asc" ? books.sort((a, b) => calculateAvgReviewsScore(a.reviews) - calculateAvgReviewsScore(b.reviews)) : books.sort((a, b) => calculateAvgReviewsScore(b.reviews) - calculateAvgReviewsScore(a.reviews)) 
}
