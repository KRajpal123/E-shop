import React, { useState } from 'react'
import Signup from './Signup';
import Login from './Login';

const LoginSignUpPages = (props) => {
    const [signUpPage, setSignUpPage] = useState(true);

    const toggleSignUpLogin = () => {
        setSignUpPage(!signUpPage)
    }

    return (
        <div className='bg'>
            {
                signUpPage ?
                    <Signup toggleSignUpLogin={toggleSignUpLogin} /> :
                    <Login toggleSignUpLogin={toggleSignUpLogin} />
            }
        </div>
    )
}

export default LoginSignUpPages