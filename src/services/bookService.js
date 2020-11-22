import axios from 'axios';

export const findBookByAsin = async (asin) => {
    try {
        const response = await axios.get(`/api/book/${asin}`);
        return response;
    } catch(err) {
        console.log(err);
    }
}