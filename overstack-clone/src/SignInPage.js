import React from 'react'
import SignIn from './SignIn'
import CreateAccount from './CreateAccount'
import './SignInPage.css'
const SignInPage = () => {
    return (
      <div className="signinPage">
        <CreateAccount />
        <SignIn />
      </div>
    );
}

export default SignInPage
