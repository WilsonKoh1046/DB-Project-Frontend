import React from 'react';
import { useForm } from 'react-hook-form';
import { signUp } from '../../services/accountService';
import { useHistory } from 'react-router-dom';

export default function SignUp() {
    const { register, handleSubmit } = useForm();
    const history = useHistory();

    const onSubmit = async (data) => {
        try {
            const user = await signUp(data);
            if (user.status === 201) {
                localStorage.setItem('account', JSON.stringify(user.data));
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
            <h2>Sign Up To Share Your Love For Book With Millions of User Today!</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Name:</label>
                    <br/>
                    <input name="username" ref={register} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <br/>
                    <input name="email" ref={register} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <br/>
                    <input name="password" type="password" ref={register} />
                </div>
                <input type="submit" className="btn btn-primary" />
            </form>
        </div>
    );
}