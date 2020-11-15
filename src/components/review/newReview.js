import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { postReview } from '../../services/reviewService';

export default function NewReview() {
    const { register, handleSubmit } = useForm();
    const [loggedIn, setLoggedIn] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('account')) {
            setLoggedIn(true);
        }
    }, [])

    const submitReview = async (data) => {
        try {
            let response = await postReview(data);
            if (response.status === 201) {
                alert(`${response.data.Message}`);
                history.push('/');
            }
        } catch(err) {
            console.log(err);
        } finally {
            history.go(0);
        }
    }

    return (
        <div className="container">
            <h2>New Review</h2>
            { loggedIn ?
                        <form onSubmit={handleSubmit(submitReview)}>
                            <div className="form-group">
                                <lablel>asin:</lablel>
                                <br/>
                                <input name="asin" ref={register} />
                            </div>
                            <div className="form-group">
                                <label>Helpful:</label>
                                <br/>
                                <input name="helpful" ref={register} />
                            </div>
                            <div className="form-group">
                                <label>Review:</label>
                                <br/>
                                <input name="reviewText" ref={register} />
                            </div>
                            <div className="form-group">
                                <label>Overall:</label>
                                <br/>
                                <input name="overall" ref={register} />
                            </div>
                            <div className="form-group">
                                <label>Summary:</label>
                                <br/>
                                <input name="summary" ref={register} />
                            </div>
                            <input type="submit" className="btn btn-primary" />
                        </form>
                        :
                        <p>Please login to give review!</p>
            }
        </div>
    );
}