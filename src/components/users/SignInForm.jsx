import React, { useState } from 'react'
import { auth } from '../../index';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password)
    }
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" name="emailInput" value={email} onChange={(event) => setEmail(event.target.value)} required/>
                </label>
                <label>
                    Password:
                    <input type="password" name="passwordInput" value={password} onChange={(event) => setPassword(event.target.value)} required/>
                </label>
                <button type="submit" className="submit-btn btn text-center px-4 py-2 basis-1/4 font-medium text-lg bg-cream-dark">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default SignInForm