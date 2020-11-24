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