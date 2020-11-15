import axios from 'axios';

const processReview = (data, reviewerID, reviewerName) => {
    data.reviewerID = reviewerID;
    data.reviewerName = reviewerName;
    data.unixReviewTime = new Date().getTime();
    let currentDate = new Date();
    data.reviewTime = `${currentDate.getMonth() + 1} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
    return data;
}

export const postReview = async (data) => {
    try {
        const reviewerID = JSON.parse(localStorage.getItem('account')).id;
        const reviewerName = JSON.parse(localStorage.getItem('account')).username;
        data = processReview(data, reviewerID, reviewerName);
        let response = await axios.post('/review', data);
        return response;
    } catch(err) {
        console.log(err);
    }
}